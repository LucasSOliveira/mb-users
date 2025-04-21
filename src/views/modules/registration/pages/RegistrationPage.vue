<template>
  <main class="registration-page">
    <section class="container">
      <h1 class="registration-page__title">
        <span>MB</span> Cadastro
      </h1>
      <p class="registration-page__indicator">
        Etapa <strong>{{ state.step }}</strong> de 4
      </p>
      <h2 class="registration-page__step-title">{{ stepTitle }}</h2>
    </section>
    <keep-alive class="container">
      <component :is="currentStepComponent" />
    </keep-alive>
    <section class="registration-page__button-group container">
      <Button
        v-if="state.step !== 1"
        id="registration-button-back"
        @click="setStep(state.step - 1)"
        secondary>
        Voltar
      </Button>
      <Button
        id="registration-button-submit"
        @click="setStep(state.step + 1)"
        :disabled="!validateForStep">
        {{ stepButtonTitle }}
      </Button>
    </section>
  </main>
</template>

<script setup>
import { computed } from 'vue';
import { useRegistrationStore } from '../store/registration-store';
import StepOne from '@modules/registration/components/StepOne.vue';
import StepTwo from '@modules/registration/components/StepTwo.vue';
import StepThree from '@modules/registration/components/StepThree.vue';
import StepFour from '@modules/registration/components/StepFour.vue';

import Button from '@components/Button/Button.vue';

const { state, validateForStep, setStep } = useRegistrationStore();

const steps = {
  1: StepOne,
  2: StepTwo,
  3: StepThree,
  4: StepFour,
};

const currentStepComponent = computed(() => steps[state.step]);
const stepTitle = computed(() => {
  switch (state.step) {
    case 1:
      return 'Seja bem-vindo(a)';
    case 2 && state.formData.type === 'PF':
      return 'Pessoa Física';
    case 2 && state.formData.type === 'PJ':
      return 'Pessoa Jurídica';
    case 3:
      return 'Senha de acesso';
    case 4:
      return 'Revise suas informações';
    default:
      return 'Insira suas informações';
  }
});
const stepButtonTitle = computed(() => {
  return state.step === 4 ? 'Cadastrar' : 'Continuar';
});

</script>

<style lang="scss" scoped>
.registration-page {
  padding: 32px 0;
  display: flex;
  flex-direction: column;
  gap: 16px;

  &__title {
    margin-bottom: 32px;
    color: $color-text-primary;

    span {
      font-weight: bold;
      color: $color-brand-primary;
    }
  }

  &__step-title {
    margin-bottom: 32px;
  }

  &__button-group {
    display: flex;
    gap: 16px;
    margin-top: 16px;
    @media only screen and (max-width: 768px) {
      flex-wrap: wrap;
    }
  }

  &__indicator {
    margin-bottom: 8px;
    color: $color-text-primary;

    strong {
      color: $color-brand-primary;
    }
  }
}
</style>