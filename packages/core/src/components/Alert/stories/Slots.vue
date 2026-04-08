<script setup>
import { Alert, Button } from '@yletlabs/frappe-ui'
import LucideBadge from '~icons/lucide/badge-info'
</script>

<template>
  <Alert
    title="Your trial ends soon!"
    variant="outline"
    description="Upgrade to keep enjoying features and future technical support."
  >
    <template #icon>
      <LucideBadge class="size-4" />
    </template>

    <template #footer>
      <Button class="col-span-full" variant="solid"> Update now </Button>
    </template>
  </Alert>
</template>
