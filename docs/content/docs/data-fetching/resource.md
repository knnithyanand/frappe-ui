# `useCall`

`useCall` is the generic request composable for non-CRUD or custom endpoint
workflows.

Use this when `useDoc` or `useList` are not a fit.

## Basic usage

```vue
<script setup lang="ts">
import { useCall } from '@yletlabs/frappe-ui'

type PingResponse = { message: string }
type PingParams = { value: string }

const ping = useCall<PingResponse, PingParams>({
  url: '/api/method/ping',
})

function submit() {
  ping.submit({ value: 'hello' })
}
</script>

<template>
  <button @click="submit" :disabled="ping.loading">Ping</button>
  <pre v-if="ping.data">{{ ping.data }}</pre>
  <pre v-if="ping.error">{{ ping.error }}</pre>
</template>
```

## API

- `submit(params)` – execute the call
- `loading` – request state
- `data` – response payload
- `error` – error state
- `reset()` – clear state

## Frappe request configuration

If your backend is Frappe, configure the fetcher once:

```ts
import { setConfig, frappeRequest } from '@yletlabs/frappe-ui'

setConfig('resourceFetcher', frappeRequest)
```
