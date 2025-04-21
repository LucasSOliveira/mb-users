import { reactive, computed } from 'vue';
import { registrationSchema as schema } from '../../../../schemas/registration.schema';
import { isWeakPassword } from '@/validators';

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

const validateStepThree = computed(() => {
  const passwordValidation = schema.password(state.formData.password);

  return passwordValidation.valid;
});

const stepThreeErros = computed(() => {
  const passwordValidation = schema.password(state.formData.password);
  return {
    password: {
      valid: passwordValidation.valid,
      message: passwordValidation.message,
    },
  };
});

const passwordRequirements = computed(() => {
  const passwordUnmet = isWeakPassword(state.formData.password || '');

  return [
  {
    key: 'minLength',
    label: 'Mínimo de 8 caracteres',
    met: !passwordUnmet.includes('minLength')
  },
  {
    key: 'lowercase',
    label: 'Uma letra minúscula',
    met: !passwordUnmet.includes('lowercase')
  },
  {
    key: 'uppercase',
    label: 'Uma letra maiúscula',
    met: !passwordUnmet.includes('uppercase')
  },
  {
    key: 'number',
    label: 'Um número',
    met: !passwordUnmet.includes('number') },
  {
    key: 'specialChar', label: 'Um caractere especial',
    met: !passwordUnmet.includes('specialChar')
  }
]});

const validateStepFour = computed(() => {
  return validateStepOne.value && validateStepTwo.value && validateStepThree.value;
})

const validateForStep = computed(() => {
  switch (state.step) {
    case 1:
      return validateStepOne.value;
    case 2:
      return validateStepTwo.value;
    case 3:
      return validateStepThree.value;
    case 4:
      return validateStepFour.value;
    default:
      return false;
  }
});

export const useRegistrationStore = () => ({
  state,
  validateStepOne,
  stepOneErrors,
  validateStepTwo,
  stepTwoErrors,
  stepThreeErros,
  validateStepThree,
  passwordRequirements,
  validateForStep,
  validateStepFour,
  setStep,
  clearForm,
});
