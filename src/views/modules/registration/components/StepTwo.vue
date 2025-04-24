<template>
    <div class="stap-two">
        <template v-if="state.formData.type === 'PF'">
            <Input
                id="registration-field-nome"
                label="Nome"
                mask="X.repeat(60)"
                placeholder="Informe o nome completo"
                v-model="state.formData.name"
                :errorMessage="stepTwoErrors.name.message"
                :hasValidated="stepTwoErrors.name.valid"
            />
            <Input
                id="registration-field-cpf"
                label="CPF"
                v-model="state.formData.cpf"
                placeholder="000.000.000-00"
                mask="###.###.###-##"
                :errorMessage="stepTwoErrors.cpf.message"
                :hasValidated="stepTwoErrors.cpf.valid"
            />
            <Input
                id="registration-field-birth-date"
                v-model="state.formData.birthDate"
                label="Data de Nascimento"
                placeholder="01/01/1990"
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
                placeholder="Informe a razão social"
                v-model="state.formData.companyName"
                :errorMessage="stepTwoErrors.companyName.message"
                :hasValidated="stepTwoErrors.companyName.valid"
            />
            <Input
                id="registration-field-cnpj"
                label="CNPJ"
                placeholder="00.000.000/0001-00"
                v-model="state.formData.cnpj"
                mask="##.###.###/####-##"
                :errorMessage="stepTwoErrors.cnpj.message"
                :hasValidated="stepTwoErrors.cnpj.valid"
            />
            <Input
                id="registration-field-opening-date"
                v-model="state.formData.openingDate"
                placeholder="01/01/1990"
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
            placeholder="(11) 91234-5678"
            :mask="['(##) #####-####', '(##) ####-####']"
            :errorMessage="stepTwoErrors.phone.message"
            :hasValidated="stepTwoErrors.phone.valid"
        />
    </div>
</template>

<script setup>
import { useRegistration } from '../store/registration-composable';
import Input from '@components/Input/Input.vue';

const {
    state,
    stepTwoErrors,
} = useRegistration();

</script>

<style lang="scss" scoped>
.stap-two {
    display: flex;
    flex-direction: column;
    gap: 16px;
}
</style>