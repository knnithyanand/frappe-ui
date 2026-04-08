<template>
  <div
    class="flex space-x-0.5 rounded-md bg-surface-gray-2 h-7 items-center px-[1px] text-sm"
    role="tablist"
  >
    <Button
      v-for="button in buttons"
      :key="button.label"
      v-bind="button"
      class="!h-6.5"
      :disabled="button.disabled"
      role="tab"
      :aria-selected="isSelected(button)"
      :class="[
        isSelected(button) && '!bg-surface-white text-ink-gray-8 shadow',
        !button.disabled && !isSelected(button) ? '!text-ink-gray-5' : '',
      ]"
      @click="onSelect(button)"
    >
      <span class="flex h-4 items-center" v-show="button.label && !button.hideLabel">
        {{ button.label }}
      </span>
    </Button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import Button from '../Button/Button.vue'

const props = defineProps({
  buttons: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: [String, Boolean, Number],
  },
})

const emit = defineEmits(['update:modelValue'])

const value = computed({
  get: () => props.modelValue,
  set: (nextValue) => emit('update:modelValue', nextValue),
})

const buttonValue = (button) => button.value ?? button.label

const isSelected = (button) => value.value === buttonValue(button)

const onSelect = (button) => {
  if (button.disabled) return
  value.value = buttonValue(button)
  button.onClick?.()
}
</script>
