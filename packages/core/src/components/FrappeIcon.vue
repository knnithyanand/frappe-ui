<script setup lang="ts">
import { computed } from 'vue'
import * as LucideIcons from 'lucide-vue-next'

const props = withDefaults(
  defineProps<{
    name: string
    color?: string | null
    strokeWidth?: number
  }>(),
  {
    color: null,
    strokeWidth: 1.5,
  },
)

const iconComponent = computed(() => {
  const iconName = props.name
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')

  return (
    (LucideIcons as Record<string, unknown>)[iconName] ||
    (LucideIcons as Record<string, unknown>).Circle
  )
})
</script>

<template>
  <component
    :is="iconComponent"
    v-bind="$attrs"
    :color="color || undefined"
    :stroke-width="strokeWidth"
    class="shrink-0"
  />
</template>
