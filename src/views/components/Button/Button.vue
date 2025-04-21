<template>
    <button class="button" :class="{
        'button--primary': props.primary,
        'button--secondary': props.secondary,
        'button--disabled': props.disabled
    }" :disabled="disabled" @click="handleClick">
        <slot />
    </button>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    primary: {
        type: Boolean,
        default: true,
    },
    secondary: {
        type: Boolean,
        default: false,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['click']);

function handleClick(event) {
    if (!props.disabled) {
        emit('click', event);
    }
}
</script>

<style lang="scss" scoped>
.button {
    width: 100%;
    padding: 8px 16px;
    font-size: $font-size-default;
    text-align: center;
    border: none;
    border-radius: $border-radius-default;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;

    &--primary {
        background-color: $color-brand-primary;
        color: $color-ui-white;
    }

    &--secondary {
        background-color: transparent;
        color: $color-brand-primary;
        border: $border-default solid $color-brand-primary;
    }

    &--disabled {
        filter: opacity(0.2);
        cursor: not-allowed;
    }

    &:hover:not(.button--disabled) {
        filter: brightness(0.9);
    }
}
</style>
