export function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function isValidCPF(cpf) {
  cpf = cpf.replace(/\D/g, "");
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf[i]) * (10 - i);
  }
  let firstCheckDigit = (sum * 10) % 11;
  if (firstCheckDigit === 10) firstCheckDigit = 0;
  if (firstCheckDigit !== parseInt(cpf[9])) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf[i]) * (11 - i);
  }
  let secondCheckDigit = (sum * 10) % 11;
  if (secondCheckDigit === 10) secondCheckDigit = 0;
  return secondCheckDigit === parseInt(cpf[10]);
}

export function isValidCNPJ(cnpj) {
  cnpj = cnpj.replace(/\D/g, "");
  if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;

  const validateDigit = (cnpj, length) => {
    let sum = 0;
    let pos = length - 7;
    for (let i = 0; i < length; i++) {
      sum += parseInt(cnpj[i]) * pos--;
      if (pos < 2) pos = 9;
    }
    let checkDigit = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    return checkDigit === parseInt(cnpj[length]);
  };

  return validateDigit(cnpj, 12) && validateDigit(cnpj, 13);
}

export function isValidPhone(phone) {
  const cleanedPhone = phone.replace(/\D/g, "");

  return cleanedPhone.length >= 10 && cleanedPhone.length <= 11;
}

export function isValidDate(date) {
  return !isNaN(Date.parse(date));
}

export function isValidBirthDate(date) {
  const [day, month, year] = date.split('/').map(Number);

  const parsedDate = new Date(year, month - 1, day);
  if (
    !day || !month || !year || 
    parsedDate.getDate() !== day || 
    parsedDate.getMonth() !== month - 1 || 
    parsedDate.getFullYear() !== year
  ) {
    return false;
  }

  const today = new Date();
  const maxAgeDate = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate());

  return parsedDate <= today && parsedDate >= maxAgeDate;
}

export function isWeakPassword(password) {
  return Object.entries({
    required: (v) => !!v,
    minLength: (v) => typeof v === "string" && v.length >= 8,
    lowercase: (v) => /[a-z]/.test(v),
    uppercase: (v) => /[A-Z]/.test(v),
    number: (v) => /\d/.test(v),
    specialChar: (v) => /[!@#$%^&*(),.?":{}|<>]/.test(v),
  })
    .filter(([, test]) => !test(password))
    .map(([key]) => key);
}
