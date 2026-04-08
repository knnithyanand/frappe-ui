<script setup lang="ts">
import { ref } from "vue";
import { MonthPicker } from '@yletlabs/frappe-ui';

const val = ref("");
</script>

<template>
  <MonthPicker v-model="val" />
</template>
