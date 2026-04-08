<template>
  <div
    class="w-80 rounded bg-surface-modal text-ink-gray-8 p-4 shadow"
    @click.stop
  >
    <div class="flex flex-row-reverse gap-2">
      <span class="cursor-pointer" @click.stop="$emit('close')">
        <FrappeIcon name="x" class="h-4 w-4" />
      </span>
      <span
        v-if="isEditMode"
        class="cursor-pointer"
        @click.stop="$emit('edit')"
      >
        <FrappeIcon name="edit-2" class="h-4 w-4" />
      </span>
      <span
        v-if="isEditMode"
        class="cursor-pointer"
        @click.stop="$emit('delete')"
      >
        <FrappeIcon name="trash-2" class="h-4 w-4" />
      </span>
    </div>
    <div class="flex flex-col gap-5">
      <div class="flex justify-between text-xl font-semibold">
        <span>{{ calendarEvent.title || 'New Event' }}</span>
      </div>
      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-2">
          <FrappeIcon name="calendar" class="h-4 w-4" />
          <span class="text-sm font-normal">
            {{ parseDateEventPopupFormat(date) }}
          </span>
        </div>
        <div class="flex items-center gap-2" v-if="calendarEvent.participant">
          <FrappeIcon name="user" class="h-4 w-4" />
          <span class="text-sm font-normal">
            {{ calendarEvent.participant }}
          </span>
        </div>
        <div
          class="flex items-center gap-2"
          v-if="calendarEvent.fromTime && calendarEvent.toTime"
        >
          <FrappeIcon name="clock" class="h-4 w-4" />
          <span class="text-sm font-normal">
            {{ calendarEvent.fromTime }} - {{ calendarEvent.toTime }}
          </span>
        </div>
        <div class="flex items-center gap-2" v-if="calendarEvent.venue">
          <FrappeIcon name="map-pin" class="h-4 w-4" />
          <span class="text-sm font-normal">
            {{ calendarEvent.venue }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import FrappeIcon from '../FrappeIcon.vue'

import { parseDateEventPopupFormat } from './calendarUtils'

const props = defineProps({
  calendarEvent: { type: Object, required: true },
  date: { type: Date, required: true },
  isEditMode: { type: Boolean },
})

const emits = defineEmits(['close', 'edit', 'delete'])
</script>
<style></style>
