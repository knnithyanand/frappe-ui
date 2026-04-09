import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { TextInput, Select, Checkbox, Switch } from '@yletlabs/frappe-ui'

const meta: Meta = {
  title: 'Core/Form Fields',
}

export default meta
type Story = StoryObj<typeof meta>

export const Interactive: Story = {
  render: () => ({
    components: { TextInput, Select, Checkbox, Switch },
    setup() {
      const name = ref('')
      const role = ref('developer')
      const active = ref(true)
      const notify = ref(false)

      return { name, role, active, notify }
    },
    template: `
      <div class="grid gap-3 max-w-sm">
        <TextInput v-model="name" label="Name" placeholder="Jane Doe" />
        <Select
          v-model="role"
          :options="[
            { label: 'Developer', value: 'developer' },
            { label: 'Designer', value: 'designer' }
          ]"
          placeholder="Select role"
        />
        <Checkbox v-model="notify" label="Send release notifications" />
        <Switch v-model="active" label="Active user" />
      </div>
    `,
  }),
}
