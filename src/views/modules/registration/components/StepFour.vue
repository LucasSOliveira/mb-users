<template>
    <div class="step-four">
        <Input
            id="registration-field-email"
            label="E-mail"
            type="email"
            mask="E.repeat(50)"
            placeholder="lucas@mail.com"
            v-model="state.formData.email"
            :errorMessage="stepOneErrors.email.message"
            :hasValidated="stepOneErrors.email.valid"
        />
        <StepTwo/>
        <Input
            id="registration-field-password"
            label="Senha"
            :type="passwordType"
            mask="E.repeat(50)"
            placeholder="**********"
            :icon="passwordIcon"
            @clickIcon="handlerPasswordFieldType"
            v-model="state.formData.password"
            :errorMessage="stepThreeErros.password.message"
            :hasValidated="stepThreeErros.password.valid"
        />
    </div>
</template>

<script setup>
import { useRegistrationStore } from '../store/registration-store';
import Input from '@components/Input/Input.vue';
import StepTwo from '@modules/registration/components/StepTwo.vue';

const {
    state,
    stepOneErrors,
    stepThreeErros
} = useRegistrationStore();

</script>

<style lang="scss" scoped>
.step-four {
    display: flex;
    flex-direction: column;
    gap: 16px;
}
</style>