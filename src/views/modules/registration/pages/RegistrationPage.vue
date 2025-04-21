<template>
  <main class="registration-page">
    <section class="container">
      <h1 class="registration-page__title">
        <span>MB</span> Cadastro
      </h1>
      <p class="registration-page__indicator"> Etapa <strong>{{ state.step }}</strong> de 4</p>
      <h2 class="registration-page__step-title">{{ stepTitle }}</h2>
    </section>
    <keep-alive>
      <component :is="currentStepComponent" />
    </keep-alive>
  </main>
</template>

<script setup>
import { computed } from 'vue';
import { useRegistrationStore } from '../store/registration-store';
import StepOne from '@modules/registration/components/StepOne.vue';
import StepTwo from '@modules/registration/components/StepTwo.vue';
import StepThree from '@modules/registration/components/StepThree.vue';

const { state } = useRegistrationStore();

// mapeia o número do step para o componente
const steps = {
  1: StepOne,
  2: StepTwo,
  3: StepThree,
};

const currentStepComponent = computed(() => steps[state.step]);
const stepIndicator = computed(() => {
  return `Etapa ${state.step} de 4`;
});
const stepTitle = computed (() => {
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

</script>

<style lang="scss" scoped>
.registration-page {
  padding: 32px 0;
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
  &__indicator {
    margin-bottom: 8px;
    color: $color-text-primary;
    strong {
      color: $color-brand-primary;
    }
  }
}
</style>