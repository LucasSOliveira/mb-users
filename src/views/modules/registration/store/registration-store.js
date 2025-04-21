import { reactive, computed } from 'vue';
import { registrationSchema as schema } from '../../../../schemas/registration.schema';

const state = reactive({
  step: 1,
  formData: {
    email: '',
    type: 'PF',
    name: '',
    cpf: '',
    birthDate: '',
    phone: '',
    companyName: '',
    cnpj: '',
    openingDate: '',
    password: '',
  },
});

function clearForm() {
  state.formData = {
    email: '',
    type: 'PF',
    name: '',
    cpf: '',
    birthDate: '',
    phone: '',
    companyName: '',
    cnpj: '',
    openingDate: '',
    password: '',
  };
}

function setStep(step) {
  state.step = step;
}

const validateStepOne = computed(() => {
  const emailValidation = schema.email(state.formData.email);
  const typeValidation = schema.type(state.formData.type);

  return emailValidation.valid && typeValidation.valid;
});

const stepOneErrors = computed(() => {
  const emailValidation = schema.email(state.formData.email);
  const typeValidation = schema.type(state.formData.type);

  return {
    email: {
      valid: emailValidation.valid,
      message: emailValidation.message,
    },
    type: {
      valid: typeValidation.valid,
      message: typeValidation.message,
    },
  };
});

const stepTwoErrors = computed(() => {  
  const { formData } = state;
  if (state.formData.type === 'PF') {
    const name = schema.name(formData.name);
    const cpf = schema.cpf(formData.cpf);
    const birthDate = schema.birthDate(formData.birthDate);
    const phoneValidation = schema.phone(formData.phone);

    return {
      name: {
        valid: name.valid,
        message: name.message,
      },
      cpf: {
        valid: cpf.valid,
        message: cpf.message,
      },
      birthDate: {
        valid: birthDate.valid,
        message: birthDate.message,
      },
      phone: {
        valid: phoneValidation.valid,
        message: phoneValidation.message,
      },
    };
  } else {
    const companyName = schema.companyName(formData.companyName);
    const cnpj = schema.cnpj(formData.cnpj);
    const openingDate = schema.openingDate(formData.openingDate);
    const phoneValidation = schema.phone(formData.phone);

    return {
      companyName: {
        valid: companyName.valid,
        message: companyName.message,
      },
      cnpj: {
        valid: cnpj.valid,
        message: cnpj.message,
      },
      openingDate: {
        valid: openingDate.valid,
        message: openingDate.message,
      },
      phone: {
        valid: phoneValidation.valid,
        message: phoneValidation.message,
      },
    };

  }
});

const validateStepTwo = computed(() => {
  const errors = stepTwoErrors.value;

  return Object.values(errors).every((field) => field.valid);
});

export const useRegistrationStore = () => ({
  state,
  validateStepOne,
  stepOneErrors,
  validateStepTwo,
  stepTwoErrors,
  setStep,
  clearForm,
});
