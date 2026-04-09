import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ListItem } from '@yletlabs/frappe-ui'

const meta: Meta<typeof ListItem> = {
  title: 'Core/ListItem',
  component: ListItem,
  args: {
    title: 'List item title',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithSubtitle: Story = {
  args: {
    title: 'Project Alpha',
    subtitle: 'Due Jan 15, 2025',
  },
}

export const List: Story = {
  render: () => ({
    components: { ListItem },
    template: `
      <div class="divide-y border rounded-lg overflow-hidden">
        <ListItem title="Design System" subtitle="Updated 2 hours ago" />
        <ListItem title="API Documentation" subtitle="Updated yesterday" />
        <ListItem title="Onboarding Flow" subtitle="Updated 3 days ago" />
      </div>
    `,
  }),
}
