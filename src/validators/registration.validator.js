import { registrationSchema } from "../schemas/registration.schema.js";

export function validateRegister(formData) {
  if (!registrationSchema.type(formData?.type || '').valid) {
    return {
      valid: false,
      message: 'Tipo de registro inválido.',
      errors: [{ field: 'type', message: 'Tipo de registro inválido. Deve ser "PF" ou "PJ"' }],
    };
  }
  

  const paramsPf = {
    name: registrationSchema.name(formData?.name || ''),
    email: registrationSchema.email(formData?.email || ''),
    cpf: registrationSchema.cpf(formData?.cpf || ''),
    birthDate: registrationSchema.birthDate(formData?.birthDate || ''),
    phone: registrationSchema.phone(formData?.phone || ''),
    password: registrationSchema.password(formData?.password || '')
  };

  const paramsPj = {
    companyName: registrationSchema.companyName(formData.companyName),
    email: registrationSchema.email(formData.email),
    cnpj: registrationSchema.cnpj(formData.cnpj),
    openingDate: registrationSchema.openingDate(formData.openingDate),
    phone: registrationSchema.phone(formData.phone),
    password: registrationSchema.password(formData.password),
  };
  const params = formData.type === 'PF' ? paramsPf : paramsPj;
  const errors = Object.entries(params).reduce((acc, [key, { valid, message }]) => {
    if (!valid) {
      acc.push({ field: key, message });
    }
    return acc;
  }, []);

  return {
    valid: errors.length === 0,
    message: errors.length === 0 ? 'Formulário válido.' : 'Formulário inválido.',
    errors,
  }
}
