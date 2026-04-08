<script setup lang="ts">
import { ref } from 'vue'
import { Password } from '@yletlabs/frappe-ui'

const value = ref('')
</script>

<template>
  <Password v-model="value" placeholder="Enter password" />
</template>
