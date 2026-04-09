import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { CommandPalette } from '@yletlabs/frappe-ui'

const meta: Meta<typeof CommandPalette> = {
  title: 'Core/CommandPalette',
  component: CommandPalette,
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { CommandPalette },
    setup() {
      const show = ref(true)
      const searchQuery = ref('')
      const groups = [
        {
          title: 'Navigation',
          items: [
            { name: 'home', title: 'Home', description: 'Go to home page' },
            { name: 'inbox', title: 'Inbox', description: 'View your inbox' },
            { name: 'settings', title: 'Settings', description: 'App settings' },
          ],
        },
        {
          title: 'Actions',
          items: [
            { name: 'new-task', title: 'New Task', description: 'Create a new task' },
            { name: 'new-project', title: 'New Project', description: 'Create a new project' },
          ],
        },
      ]
      return { show, searchQuery, groups }
    },
    template: `
      <div>
        <button @click="show = true" class="px-3 py-1.5 border rounded text-sm">Open Command Palette</button>
        <CommandPalette v-model:show="show" v-model:searchQuery="searchQuery" :groups="groups" />
      </div>
    `,
  }),
}
