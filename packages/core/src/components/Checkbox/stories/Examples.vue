<script setup lang="ts">
import { ref } from 'vue'
import { Checkbox } from '@yletlabs/frappe-ui'

const accepted = ref(true)
const subscribed = ref(false)
</script>

<template>
  <div class="grid gap-4 p-6">
    <Checkbox v-model="accepted" label="Accept terms and conditions" />
    <Checkbox v-model="subscribed" label="Subscribe to daily newsletter" />
  </div>
</template>
