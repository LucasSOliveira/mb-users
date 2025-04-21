<template>
    <div class="stap-one">
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
    </div>
</template>

<script setup>
import { useRegistrationStore } from '../store/registration-store';
import Input from '@components/Input/Input.vue';
import RadioButton from '@components/Radio/RadioButton.vue';

const {
    state,
    stepOneErrors,
} = useRegistrationStore();

const options = [
    { label: 'Pessoa Física', value: 'PF' },
    { label: 'Pessoa Jurídica', value: 'PJ' },
];

</script>

<style lang="scss" scoped>
.stap-one {
    display: flex;
    flex-direction: column;
    gap: 16px;
    &__radio-group {
        display: flex;
        gap: 16px;
    }
}
</style>