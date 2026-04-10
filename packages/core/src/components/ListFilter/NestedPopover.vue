<template>
  <Popover :placement="placement">
    <template #target="{ togglePopover, isOpen }">
      <div @click="togglePopover">
        <slot name="target" v-bind="{ open: isOpen }" />
      </div>
    </template>
    <template #body="{ isOpen, close }">
      <div class="z-100">
        <slot name="body" v-bind="{ open: isOpen, close }" />
      </div>
    </template>
  </Popover>
</template>

<script setup>
import { Popover } from '../Popover'

defineProps({
  placement: {
    type: String,
    default: 'bottom-start',
  },
})
</script>
