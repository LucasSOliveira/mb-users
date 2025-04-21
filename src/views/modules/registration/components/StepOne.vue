<template>
    <section class="stap-one container">
        <div class="stap-one__form">
            <Input
                id="registration-field-email"
                label="E-mail"
                mask="E.repeat(50)"
                placeholder="lucas@mail.com"
                v-model="state.formData.email"
                :errorMessage="stepOneErrors.email.message"
                :hasValidated="stepOneErrors.email.valid"
            />
            <div class="stap-one__radio-group">
                <RadioButton
                    v-for="option in options"
                    :key="option.value"
                    v-model="state.formData.type"
                    :value="option.value"
                    :name="'registrationType'">
                    {{ option.label }}
                </RadioButton>
            </div>
            <Button
                @click="setStep(2)"
                :disabled="!validateStepOne">
                Continuar
            </Button>
        </div>
    </section>
</template>

<script setup>
import { useRegistrationStore } from '../store/registration-store';
import Input from '@components/Input/Input.vue';
import RadioButton from '@components/Radio/RadioButton.vue';
import Button from '@components/Button/Button.vue';

const { state, validateStepOne, stepOneErrors, stepTwoErrors, setStep } = useRegistrationStore();

const options = [
    { label: 'Pessoa Física', value: 'PF' },
    { label: 'Pessoa Jurídica', value: 'PJ' },
];

</script>

<style lang="scss" scoped>
.stap-one {
    &__form {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    &__radio-group {
        display: flex;
        gap: 16px;
    }
}
</style>