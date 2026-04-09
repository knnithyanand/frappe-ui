import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Card } from '@yletlabs/frappe-ui'

const meta: Meta<typeof Card> = {
  title: 'Core/Card',
  component: Card,
  args: {
    title: 'Card Title',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { Card },
    template: `
      <Card title="Monthly Report" subtitle="January 2025">
        <p class="text-p-sm text-ink-gray-6">Card body content goes here.</p>
      </Card>
    `,
  }),
}

export const Loading: Story = {
  args: {
    title: 'Loading Card',
    loading: true,
  },
}

export const WithActions: Story = {
  render: () => ({
    components: { Card },
    template: `
      <Card title="Project Overview">
        <template #actions>
          <button class="text-sm text-ink-blue-link hover:underline">View all</button>
        </template>
        <p class="text-p-sm text-ink-gray-6">Content with actions in the header.</p>
      </Card>
    `,
  }),
}
