import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import TabButtons from '../../packages/core/src/components/TabButtons/TabButtons.vue'

const meta: Meta<typeof TabButtons> = {
  title: 'Core/TabButtons',
  component: TabButtons,
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { TabButtons },
    setup() {
      const active = ref('tasks')
      return { active }
    },
    template: `
      <TabButtons
        v-model="active"
        :buttons="[
          { label: 'Tasks', value: 'tasks' },
          { label: 'Comments', value: 'comments' },
          { label: 'Activity', value: 'activity' },
        ]"
      />
    `,
  }),
}

export const WithIcons: Story = {
  render: () => ({
    components: { TabButtons },
    setup() {
      const active = ref('list')
      return { active }
    },
    template: `
      <TabButtons
        v-model="active"
        :buttons="[
          { label: 'List', value: 'list', icon: 'list' },
          { label: 'Board', value: 'board', icon: 'trello' },
          { label: 'Calendar', value: 'calendar', icon: 'calendar' },
        ]"
      />
    `,
  }),
}
