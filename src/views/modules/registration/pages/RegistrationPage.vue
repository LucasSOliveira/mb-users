<template>
  <main class="registration-page">
    <form class="container" @submit.prevent="handleSubmit">
      <section>
        <h1 class="registration-page__title">
          <span>MB</span> Cadastro
        </h1>
        <p class="registration-page__indicator">
          Etapa <strong>{{ state.step }}</strong> de 4
        </p>
        <h2 class="registration-page__step-title">{{ stepTitle }}</h2>
      </section>
      <keep-alive>
        <component :is="currentStepComponent" />
      </keep-alive>
      <section class="registration-page__button-group">
        <Button
          v-if="state.step !== 1"
          id="registration-button-back"
          type="button"
          @click="setStep(state.step - 1)"
          secondary>
          Voltar
        </Button>
        <Button
          id="registration-button-submit"
          type="submit"
          :disabled="!validateForStep"
          :loading="state.loading">
          {{ stepButtonTitle }}
        </Button>
      </section>
      <section
        v-if="state.serverErrors.length"
        class="registration-page__server-errors">
        <p
          class="registration-page__server-error"
          v-for="(error, index) in state.serverErrors"
          :key="`erro-${index}`">
          <i class="material-symbols-outlined">error</i> <span>{{ error.message }}</span>
        </p>
      </section>
    </form>
  </main>
</template>

<script setup>
import { computed } from 'vue';
import { useRegistration } from '../store/registration-composable';
import StepOne from '@modules/registration/components/StepOne.vue';
import StepTwo from '@modules/registration/components/StepTwo.vue';
import StepThree from '@modules/registration/components/StepThree.vue';
import StepFour from '@modules/registration/components/StepFour.vue';

import Button from '@components/Button/Button.vue';

const { state, validateForStep, setStep, submit } = useRegistration();

const steps = {
  1: StepOne,
  2: StepTwo,
  3: StepThree,
  4: StepFour,
};

const currentStepComponent = computed(() => steps[state.step]);
const stepTitle = computed(() => {
  switch (true) {
    case state.step === 1:
      return 'Seja bem-vindo(a)';
    case state.step === 2 && state.formData.type === 'PF':
      return 'Pessoa Física';
    case state.step === 2 && state.formData.type === 'PJ':
      return 'Pessoa Jurídica';
    case state.step === 3:
      return 'Senha de acesso';
    case state.step === 4:
      return 'Revise suas informações';
    default:
      return 'Insira suas informações';
  }
});
const stepButtonTitle = computed(() => {
  return state.step === 4 ? 'Cadastrar' : 'Continuar';
});

function handleSubmit() {
  if (state.step === 4) {
    submit();
  } else {
    setStep(state.step + 1);
  }
}

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
  &__server-errors {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 16px;
  }
  &__server-error {
    display: flex;
    align-items: center;

    gap: 4px;
    color: $color-ui-danger;
    line-height: 1;
    height: 20px;
    font-size: $font-size-default;
    i {
      color: $color-ui-danger;
      font-size: $font-size-display-sm;
    }
  }
}
</style>