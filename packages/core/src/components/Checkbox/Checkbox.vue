<template>
  <div
    class="inline-flex items-center gap-2 rounded transition"
    :class="{
      'px-2.5 py-1.5': padding && size === 'sm',
      'px-3 py-2': padding && size === 'md',
      'focus-within:bg-surface-gray-2 focus-within:ring-2 focus-within:ring-outline-gray-3 hover:bg-surface-gray-3 active:bg-surface-gray-4':
        padding && !disabled,
    }"
  >
    <input
      class="rounded-sm bg-surface-white shrink-0"
      :class="inputClasses"
      :style="checkedInputStyle"
      type="checkbox"
      :disabled="disabled"
      :id="htmlId"
      :checked="Boolean(model)"
      @change="handleChange"
      v-bind="attrs"
    />
    <label class="block" :class="labelClasses" v-if="label" :for="htmlId">
      {{ label }}
    </label>
  </div>
</template>
<script lang="ts" setup>
import { computed, useAttrs } from 'vue'
import { useId } from '../../utils/useId'
import type { CheckboxProps } from './types'

const props = withDefaults(defineProps<Omit<CheckboxProps, 'modelValue'>>(), {
  size: 'sm',
  padding: false,
})
const model = defineModel<CheckboxProps['modelValue']>()

const attrs = useAttrs()

const htmlId = props.id ?? useId()

const labelClasses = computed(() => {
  return [
    {
      sm: 'text-base font-medium',
      md: 'text-lg font-medium',
    }[props.size],
    props.disabled ? 'text-ink-gray-4' : 'text-ink-gray-8',
    'select-none',
  ]
})

const inputClasses = computed(() => {
  let baseClasses = props.disabled
    ? 'border-outline-gray-2 bg-surface-menu-bar text-ink-gray-3'
    : 'border-outline-gray-4 text-ink-gray-9 hover:border-outline-gray-5 focus:ring-offset-0 focus:border-outline-gray-8 active:border-outline-gray-6 transition'

  let interactionClasses = props.disabled
    ? ''
    : props.padding
      ? 'focus:ring-0'
      : 'hover:shadow-sm focus:ring-0 focus-visible:ring-2 focus-visible:ring-outline-gray-3 active:bg-surface-gray-2'

  let sizeClasses = {
    sm: 'size-3.5',
    md: 'size-4',
  }[props.size]

  return [baseClasses, interactionClasses, sizeClasses]
})

const checkedInputStyle = computed(() => {
  if (!model.value) return null

  return {
    backgroundColor: 'currentColor',
    borderColor: 'transparent',
  }
})

const handleChange = (e: Event) => {
  model.value = (e.target as HTMLInputElement).checked
}
</script>
