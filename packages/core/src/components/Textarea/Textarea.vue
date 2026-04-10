<template>
  <div class="space-y-1.5">
    <label class="block" :class="labelClasses" v-if="label" :for="id">
      {{ label }}
    </label>
    <textarea
      ref="textareaRef"
      :placeholder="placeholder"
      :class="inputClasses"
      :disabled="disabled"
      :id="id"
      :value="model"
      :rows="rows"
      @input="handleChange"
      @change="handleChange"
      v-bind="attrs"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, useAttrs, useTemplateRef } from 'vue'
import debounce from '../../utils/debounce'
import type { TextareaProps } from './types'

const {
  size = 'sm',
  variant = 'subtle',
  rows = 3,
  label,
  placeholder,
  disabled = false,
  id,
  debounce: debounceMs,
} = defineProps<Omit<TextareaProps, 'modelValue'>>()

const model = defineModel<TextareaProps['modelValue']>()
const attrs = useAttrs()
const textareaRef = useTemplateRef<HTMLTextAreaElement>('textareaRef')

const inputClasses = computed(() => {
  let sizeClasses = {
    sm: 'text-base rounded',
    md: 'text-base rounded',
    lg: 'text-lg rounded-md',
    xl: 'text-xl rounded-md',
  }[size]

  let paddingClasses = {
    sm: ['py-1.5 px-2'],
    md: ['py-1.5 px-2.5'],
    lg: ['py-1.5 px-3'],
    xl: ['py-1.5 px-3'],
  }[size]

  let inputVariant = disabled ? 'disabled' : variant
  let variantClasses = {
    subtle:
      'border border-[var(--surface-gray-2)] bg-surface-gray-2 placeholder-ink-gray-4 hover:border-outline-gray-modals hover:bg-surface-gray-3 focus:bg-surface-white focus:border-outline-gray-4 focus:shadow-sm focus:ring-0 focus-visible:ring-2 focus-visible:ring-outline-gray-3',
    outline:
      'border border-outline-gray-2 bg-surface-white placeholder-ink-gray-4 hover:border-outline-gray-3 hover:shadow-sm focus:bg-surface-white focus:border-outline-gray-4 focus:shadow-sm focus:ring-0 focus-visible:ring-2 focus-visible:ring-outline-gray-3',
    disabled: [
      'border bg-surface-gray-1 placeholder-ink-gray-3',
      variant === 'outline'
        ? 'border-outline-gray-2'
        : 'border-transparent',
    ],
  }[inputVariant]

  return [
    sizeClasses,
    paddingClasses,
    variantClasses,
    disabled ? 'text-ink-gray-5' : 'text-ink-gray-8',
    'transition-colors w-full block',
  ]
})

const labelClasses = computed(() => {
  return [
    {
      sm: 'text-xs',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    }[size],
    'text-ink-gray-5',
  ]
})

let emitChange = (value: string) => {
  model.value = value
}
if (debounceMs) {
  emitChange = debounce(emitChange, debounceMs)
}

let handleChange = (e: Event) => {
  emitChange((e.target as HTMLInputElement).value)
}

defineExpose({ el: textareaRef })
</script>
