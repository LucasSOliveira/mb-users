import * as validators from '../validators';

export const registrationSchema = {
  email: (value) => {
    if (!value) {
      return {
        valid: false,
        message: 'E-mail é obrigatório.',
      };
    }

    const valid = validators.isValidEmail(value);
    return {
      valid,
      message: valid ? '' : 'E-mail inválido.',
    };
  },

  type: (value) => {
    const typesEnum = ['PJ', 'PF'];

    if (!value) {
      return {
        valid: false,
        message: 'Tipo de cadastro é obrigatório.',
      };
    }
    if (!typesEnum.includes(value)) {
      return {
        valid: false,
        message: 'Tipo de cadastro inválido. Tipos aceitos: PJ ou PF.',
      };
    }
    return {
      valid: true,
      message: '',
    };
  },

  name: (value) => {
    if (value.trim().length === 0) {
      return { valid: false, message: 'Nome é obrigatório.' };
    }
    return { valid: true, message: '' };
  },

  cpf: (value) => {
    if (!value) {
      return { valid: false, message: 'CPF é obrigatório.' };
    }
    const valid = validators.isValidCPF(value);
    return {
      valid,
      message: valid ? '' : 'CPF inválido.',
    };
  },

  birthDate: (value) => {
    if (!value) {
      return { valid: false, message: 'Data de nascimento é obrigatória.' };
    }
    return {
      valid: validators.isValidBirthDate(value),
      message: 'Data de nascimento inválida.',
    };
  },

  phone: (value) => {
    if (!value) {
      return { valid: false, message: 'Telefone é obrigatório.' };
    }
    return {
      valid: validators.isValidPhone(value),
      message: 'Telefone inválido.',
    };
  },

  companyName: (value) => {
    if (!value || value.trim().length === 0) {
      return { valid: false, message: 'Razão social é obrigatória.' };
    }
    return { valid: true, message: '' };
  },

  cnpj: (value) => {
    if (!value) {
      return { valid: false, message: 'CNPJ é obrigatório.' };
    }
    return {
      valid: validators.isValidCNPJ(value),
      message: 'CNPJ inválido.',
    };
  },

  openingDate: (value) => {
    if (!value) {
      return { valid: false, message: 'Data de abertura é obrigatória.' };
    }
    return {
      valid: validators.isValidBirthDate(value),
      message: 'Data de abertura inválida.',
    };
  },

  password: (value) => {
    if (!value) {
      return { valid: false, message: 'Senha é obrigatória.' };
    }

    const valid = validators.passwordValidator(value);
    return {
      valid,
      message: valid
        ? ''
        : 'Senha deve conter pelo menos 8 caracteres, incluindo letras e números.',
    };
  },
};
