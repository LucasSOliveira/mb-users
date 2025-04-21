<template>
    <section class="stap-two container">
        <div class="stap-two__form">
            <template v-if="state.formData.type === 'PF'">
                <Input
                    id="registration-field-nome"
                    label="Nome"
                    mask="M.repeat(60)"
                    placeholder="Lucas Santos de Oliveira"
                    v-model="state.formData.name"
                    :errorMessage="stepTwoErrors.name.message"
                    :hasValidated="stepTwoErrors.name.valid"
                />
                <Input
                    id="registration-field-cpf"
                    label="CPF"
                    v-model="state.formData.cpf"
                    placeholder="417.267.079-20"
                    mask="###.###.###-##"
                    :errorMessage="stepTwoErrors.cpf.message"
                    :hasValidated="stepTwoErrors.cpf.valid"
                />
                <Input
                    id="registration-field-birth-date"
                    v-model="state.formData.birthDate"
                    label="Data de Nascimento"
                    placeholder="31/05/1990"
                    mask="##/##/####"
                    :errorMessage="stepTwoErrors.birthDate.message"
                    :hasValidated="stepTwoErrors.birthDate.valid"
                />
            </template>
            <template v-else>
                <Input
                    id="registration-field-company-company-name"
                    label="Razão Social"
                    mask="X.repeat(60)"
                    placeholder="Lucas S de Oliveira LTDA"
                    v-model="state.formData.companyName"
                    :errorMessage="stepTwoErrors.companyName.message"
                    :hasValidated="stepTwoErrors.companyName.valid"
                />
                <Input
                    id="registration-field-cnpj"
                    label="CNPJ"
                    placeholder="41.726.707/0001-20"
                    v-model="state.formData.cnpj"
                    mask="##.###.###/####-##"
                    :errorMessage="stepTwoErrors.cnpj.message"
                    :hasValidated="stepTwoErrors.cnpj.valid"
                />
                <Input
                    id="registration-field-opening-date"
                    v-model="state.formData.openingDate"
                    placeholder="31/05/1995"
                    label="Data de Abertura"
                    mask="##/##/####"
                    :errorMessage="stepTwoErrors.openingDate.message"
                    :hasValidated="stepTwoErrors.openingDate.valid"
                />
            </template>
            <Input
                id="registration-field-phone"
                label="Telefone"
                v-model="state.formData.phone"
                :mask="['(##) #####-####', '(##) ####-####']"
                placeholder="(11) 91234-5678"
                :errorMessage="stepTwoErrors.phone.message"
                :hasValidated="stepTwoErrors.phone.valid"
            />
            <div class="stap-two__button-group">
                <Button @click="setStep(1)" secondary>
                    Voltar
                </Button>
                <Button @click="setStep(3)" :disabled="!validateStepTwo">
                    Continuar
                </Button>
            </div>
        </div>
    </section>
</template>

<script setup>
import { computed } from 'vue';
import { useRegistrationStore } from '../store/registration-store';
import Input from '@components/Input/Input.vue';
import Button from '@components/Button/Button.vue';

const { state, validateStepTwo, stepTwoErrors, setStep } = useRegistrationStore();

const cpfInputProps = {
    id: "registration-field-cpf",
    label: "CPF",
    mask: "##.###.###-##",
    errorMessage: stepTwoErrors.document?.message,
    hasValidated: stepTwoErrors.document?.valid,
};

const cnpjInputProps = {
    id: "registration-field-cnpj",
    label: "CNPJ",
    mask: "##.###.###/####-##",
    errorMessage: stepTwoErrors.document?.message,
    hasValidated: stepTwoErrors.document?.valid,
};

const birthdateInputProps = {
    id: "registration-field-birth-date",
    label: "Data de Nascimento",
    mask: "##/##/####",
    errorMessage: stepTwoErrors.birthdate?.message,
    hasValidated: stepTwoErrors.birthdate?.valid,
};

const openingDateInputProps = {
    id: "registration-field-opening-date",
    label: "Data de Abertura",
    mask: "##/##/####",
    errorMessage: stepTwoErrors.openingDate?.message,
    hasValidated: stepTwoErrors.openingDate?.valid,
};

</script>

<style lang="scss" scoped>
.stap-two {
    &__form {
        display: flex;
        flex-direction: column;
        gap: 18px;
    }

    &__button-group {
        display: flex;
        gap: 16px;

        @media only screen and (max-width: 768px) {
            flex-wrap: wrap;
        }
    }
}
</style>