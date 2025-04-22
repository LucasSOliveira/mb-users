// vmask-directive.js

const tokenDefinitions = {
  "#": { test: (char) => /[0-9]/.test(char) }, // aceita dígitos
  A: { test: (char) => /[a-zA-Z]/.test(char) }, // aceita letras
  N: { test: (char) => /[0-9a-zA-Z\s]/.test(char) }, // aceita dígitos, letras e espaço
  M: { test: (char) => /[a-zA-Z\s]/.test(char) }, // aceita letras e espaço
  X: { test: (_char) => true }, // aceita qualquer caractere
  E: { test: (char) => /[a-zA-Z0-9!#$%&'*+/=?^_`{|}~\.\-@]/.test(char) }, // aceita caracteres válidos em um e-mail
  P: { test: (char) => /\S/.test(char) }, // aceita qualquer caractere exceto espaço
};

function selectBestMask(value, tokenList) {
  const digitCount = value.replace(/\D/g, '').length;

  return tokenList.reduce((best, current) => {
    const bestLength = best.filter(t => t.type === 'mask').length;
    const currentLength = current.filter(t => t.type === 'mask').length;

    const bestDiff = Math.abs(bestLength - digitCount);
    const currentDiff = Math.abs(currentLength - digitCount);

    return currentDiff < bestDiff ? current : best;
  });
}

function parseMask(mask) {
  const availableTokens = Object.keys(tokenDefinitions).join("");
  const repeatRegex = new RegExp(
    `^([${availableTokens}])\\.repeat\\((\\d+)\\)$`
  );

  if (mask.includes("repeat")) {
    const match = mask.match(repeatRegex);
    if (match) {
      const tokenChar = match[1];
      const count = parseInt(match[2], 10);
      return Array.from({ length: count }, () => ({
        type: "mask",
        char: tokenChar,
        optional: false,
      }));
    }
  }
  // Processamento normal se não usar repeat
  const tokens = [];
  for (let i = 0; i < mask.length; i++) {
    const char = mask[i];
    if (char === "?") {
      if (tokens.length > 0 && tokens[tokens.length - 1].type === "mask") {
        tokens[tokens.length - 1].optional = true;
      }
      continue;
    }
    if (tokenDefinitions[char]) {
      tokens.push({ type: "mask", char, optional: false });
    } else {
      tokens.push({ type: "literal", value: char });
    }
  }
  return tokens;
}

function applyMask(value, tokensOrList) {
  const tokens = Array.isArray(tokensOrList)
    ? selectBestMask(value, tokensOrList)
    : tokensOrList;

  let result = "";
  let valueIndex = 0;

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    if (token.type === "literal") {
      const restDigits = value.slice(valueIndex).replace(/\D/g, "").length;
      if (restDigits > 0) {
        result += token.value;
      }
      continue;
    }

    if (valueIndex >= value.length) break;

    const currentChar = value[valueIndex];

    if (tokenDefinitions[token.char].test(currentChar)) {
      result += currentChar;
      valueIndex++;
    } else {

      valueIndex++;
      i--;
    }
  }

  return result;
}

const vMask = {
  mounted(el, binding) {
    const maskInput = binding.value;
    const maskList = Array.isArray(maskInput) ? maskInput : [maskInput];
    const parsedMasks = maskList?.map(parseMask);

    const onInput = (e) => {
      const input = e.target;
      if (input._maskProcessing) return;

      input._maskProcessing = true;
      const originalValue = input.value;
      const maskedValue = applyMask(originalValue, parsedMasks);

      if (maskedValue !== originalValue) {
        input.value = maskedValue;
        input.dispatchEvent(new Event('input'));
      }

      input._maskProcessing = false;
    };

    el.addEventListener('input', onInput);
  }
};
export default vMask;
