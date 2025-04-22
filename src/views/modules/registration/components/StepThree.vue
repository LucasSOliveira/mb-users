<template>
    <div class="stap-three">
        <Input
            id="registration-field-password"
            label="Senha"
            :type="passwordType"
            mask="E.repeat(50)"
            placeholder="**********"
            :icon="passwordIcon"
            v-model="state.formData.password"
            :errorMessage="stepThreeErros.password.message"
            :hasValidated="stepThreeErros.password.valid"
            @clickIcon="handlerPasswordFieldType"
        />
        <span class="stap-three__password-requires-label">A senha deve conter:</span>
        <ul>
            <li
                v-for="req in passwordRequirements"
                :key="req.key"
                class="stap-three__requires-item"
                :class="{
                    'stap-three__requires-item': true,
                    'stap-three__requires-item--met': req.met,
                    'stap-three__requires-item--unmet': !req.met,
                }">
                <i class="stap-three__requires-icon material-symbols-outlined">
                    {{ req.met ? 'task_alt' : 'error' }}
                </i>
                {{ req.label }}
            </li>
      </ul>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRegistration } from '../store/registration-composable';
import Input from '@components/Input/Input.vue';

const {
    state,
    stepThreeErros,
    passwordRequirements
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
.stap-three {
    display: flex;
    flex-direction: column;
    &__password-requires-label {
        margin: 16px 0 8px;
        font-weight: $font-weight-semibold;
    }

    &__requires-icon {
        font-size: $font-size-mb-default;
    }
    &__requires-item {
        font-size: $font-size-mb-default;
        font-weight: $font-weight-medium;
        display: flex;
        align-items: center;
        gap: 4px;
        margin-bottom: 6px;
        &--met {
            color: $color-ui-success;
        }
        &--unmet {
            color: $color-ui-danger;
        }
    }
}
</style>