<template>
  <label class="radio">
    <input 
      type="radio" 
      class="radio__input" 
      :checked="modelValue === value"
      :value="value" 
      :name="name" 
      :disabled="disabled" 
      @change="handlerChange"
    />
    <span class="radio__custom"></span>
    <span class="radio__label">
      <slot/>
    </span>
  </label>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '' 
  },
  value: {
    type: [String, Number],
    required: true
  },
  name: {
    type: String,
    required: true 
  },
  disabled: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits(['update:modelValue']);

function handlerChange(event) {
  emit('update:modelValue', event.target.value);
}
</script>


<style lang="scss" scoped>
.radio {
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 4px;
  &__input {
    display: none;
  }

  &__custom {
    width: 16px;
    height: 16px;
    border: $border-large solid $color-ui-gray;
    border-radius: $border-radius-circle;
    display: inline-block;
    position: relative;
    transition: border-color 0.3s ease, background-color 0.3s ease;
  }

  &__input:checked + &__custom {
    background-color: $color-ui-white;
    border-color: $color-brand-primary;
  }

  &__input:disabled + &__custom {
    background-color: $color-ui-gray;
    border-color: $color-ui-gray;
    cursor: not-allowed;
  }

  &__custom::after {
    content: '';
    width: 50%;
    height: 50%;
    background-color: $color-brand-primary;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    transition: transform 0.3s ease;
  }

  &__input:checked + &__custom::after {
    transform: translate(-50%, -50%) scale(1);
  }

  &__label {
    margin-left: var(--spacing-sm);
    font-size: var(--font-size-md);
    color: $color-ui-gray;
  }

  &__input:disabled ~ &__label {
    color: $color-ui-gray;
    cursor: not-allowed;
  }
}
</style>
