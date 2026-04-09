<script setup lang="ts">
import { ref } from 'vue'
import { Alert, Button, Select, TextInput } from '@yletlabs/frappe-ui'

const name = ref('')
const role = ref('developer')
</script>

<template>
  <main class="app">
    <section class="card">
      <h1>Frappe UI Playground</h1>
      <p>Use this sandbox to verify workspace package consumption.</p>

      <Alert
        title="Workspace package loaded"
        description="The playground is importing @yletlabs/frappe-ui directly."
        theme="blue"
      />

      <TextInput v-model="name" label="Name" placeholder="Jane Doe" />

      <Select
        v-model="role"
        :options="[
          { label: 'Developer', value: 'developer' },
          { label: 'Designer', value: 'designer' },
        ]"
      />

      <Button label="Submit" theme="blue" />
    </section>
  </main>
</template>
