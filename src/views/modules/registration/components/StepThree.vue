<template>
    <div>
        <h2>Passo 3: Definir Senha</h2>
        <form @submit.prevent="handleNext">
            <Input v-model="formData.password" label="Senha" type="password" required />
            <Button @click="previousStep">Voltar</Button>
            <Button type="submit">Continuar</Button>
        </form>
    </div>
</template>

<script setup>
import { useRegistrationStore } from '../store/registration-store';
import Input from '@components/Input/Input.vue';
import Button from '@components/Button/Button.vue';

const { state, nextStep, previousStep } = useRegistrationStore();
const formData = state.formData;

function handleNext() {
    if (formData.password) {
        nextStep();
    } else {
        alert('Por favor, preencha o campo de senha.');
    }
}
</script>