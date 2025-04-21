<template>
  <div class="input">
    <label
      :for="props.id"
      :class="{
        'input__label': true,
        'input__label--error': hasErrors && !typing
      }">
        {{props.label}}
      </label>
    <input
      :class="{
        'input__field': true,
        'input__field--error': hasErrors && !typing
      }"
      ref="input"
      :required="props.required"
      :id="props.id"
      :name="props.name"
      v-bind="$attrs"
      v-mask="props.mask"
      v-model="internalValue"
      :placeholder="props.placeholder"
      type="text"
      @keydown.enter="pressEnter"
      @input="handleInput"
      @blur="validate"
    />
    <span v-if="hasErrors && !typing" class="input__error-message">
      <i class="material-symbols-outlined">error</i>
      {{ props.errorMessage }}
    </span>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    default: 'input',
  },
  errorMessage: {
    type: String,
    default: '',
  },
  hasValidated: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  mask: {
    type: [String, Array],
    required: false,
    default: () => 'N'.repeat(240),
  },
  masked: {
    type: Boolean,
    default: false,
  },
});

const internalValue = ref(props.modelValue || '');
const hasErrors = ref(false);
const typingTimeout = ref(null);
const typing = ref(false);
const emit = defineEmits(['update:modelValue', 'keydown-enter']);

watch(
  () => props.modelValue,
  (newValue, oldValue)=> {
    if (newValue !== oldValue) {
      internalValue.value = newValue;
    }
  }
);

function pressEnter(event) {
  emit('keydown-enter', event);
}

function handleInput(event) {
  const value = event.target.value;

  internalValue.value = value;
  typing.value = true;
  clearTimeout(typingTimeout.value);
  typingTimeout.value = setTimeout(() => {
    typing.value = false;
    validate();
  }, 1000);
  emit('update:modelValue', value);
}

function validate() {
  hasErrors.value = !props.hasValidated;
}
</script>

<style lang="scss" scoped>
.input {
  margin: 0;
  padding-bottom: 12px;
  position: relative;
  &__label {
    font-size: $font-size-default;
    margin-left: 2px;
    margin-bottom: 6px;
    display: inline-block;
    color: $color-text-primary;

    &--error {
      color: $color-ui-danger;
    }
  }

  &__field {
    width: 100%;
    display: block;
    border: $border-default solid $color-ui-gray;
    border-radius: $border-radius-default;
    outline: 0;
    padding: 8px 16px;
    max-height: 36px;
    font-size: $font-size-default;
    color: $color-text-primary;

    &--error {
      border-color: $color-ui-danger;
      color: $color-ui-danger;
    }
  }

  &__error-message {
    position: absolute;
    margin-top: 6px;
    color: $color-ui-danger;
    font-size: $font-size-mb-default;
    font-weight: $font-weight-bold;
    display: flex;
    align-items: center;
    gap: 4px;

    i {
      font-size: $font-size-mb-default;
      line-height: 1;
    }
  }
}
</style>
