<template>
    <div class="step-four">
        <Input
            id="registration-field-email"
            label="E-mail"
            mask="E.repeat(50)"
            placeholder="Informe seu e-mail"
            v-model="state.formData.email"
            :errorMessage="stepOneErrors.email.message"
            :hasValidated="stepOneErrors.email.valid"
        />
        <StepTwo/>
        <Input
            id="registration-field-password"
            v-model="state.formData.password"
            label="Senha"
            :type="passwordType"
            mask="E.repeat(50)"
            placeholder="**********"
            :icon="passwordIcon"
            :errorMessage="stepThreeErros.password.message"
            :hasValidated="stepThreeErros.password.valid"
            @clickIcon="handlerPasswordFieldType"
        />
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRegistration } from '../store/registration-composable';
import Input from '@components/Input/Input.vue';
import StepTwo from '@modules/registration/components/StepTwo.vue';

const {
    state,
    stepOneErrors,
    stepThreeErros
} = useRegistration();

const showPassword = ref(false);

const passwordIcon = computed(() => {
  return showPassword.value ? "password" : "password_2";
});
const handlerPasswordFieldType = () => {
  showPassword.value = !showPassword.value;
};
const passwordType = computed(() => {
  return showPassword.value ? "text" : "password";
});

</script>

<style lang="scss" scoped>
.step-four {
    display: flex;
    flex-direction: column;
    gap: 16px;
}
</style>