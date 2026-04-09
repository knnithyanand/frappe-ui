import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Divider } from '@yletlabs/frappe-ui'

const meta: Meta<typeof Divider> = {
  title: 'Core/Divider',
  component: Divider,
  args: {
    orientation: 'horizontal',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {}

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    flexItem: true,
  },
  render: () => ({
    components: { Divider },
    template: `
      <div class="flex items-center gap-2 h-8">
        <span class="text-sm">Left</span>
        <Divider orientation="vertical" :flexItem="true" />
        <span class="text-sm">Right</span>
      </div>
    `,
  }),
}

export const WithLabel: Story = {
  render: () => ({
    components: { Divider },
    template: `
      <div class="flex flex-col gap-4">
        <Divider position="start">Start</Divider>
        <Divider position="center">Center</Divider>
        <Divider position="end">End</Divider>
      </div>
    `,
  }),
}

export const WithAction: Story = {
  args: {
    action: {
      label: 'Add Section',
      handler: () => alert('Add section clicked'),
    },
  },
}
