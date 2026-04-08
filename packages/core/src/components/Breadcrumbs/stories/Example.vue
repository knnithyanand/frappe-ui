<script setup lang="ts">
import { Breadcrumbs } from '@yletlabs/frappe-ui'
</script>

<template>
  <Breadcrumbs
    :items="[
      { label: 'Home', route: { name: 'Home' } },
      { label: 'Views', route: '/components' },
      { label: 'List', route: '/components/breadcrumbs' },
    ]"
  />
</template>
