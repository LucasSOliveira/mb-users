<template>
    <div class="stap-one">
        <Input
            id="registration-field-email"
            label="E-mail"
            mask="E.repeat(50)"
            placeholder="Informe o e-mail"
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
import { useRegistration } from '../store/registration-composable';
import Input from '@components/Input/Input.vue';
import RadioButton from '@components/Radio/RadioButton.vue';

const {
    state,
    stepOneErrors,
} = useRegistration();

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