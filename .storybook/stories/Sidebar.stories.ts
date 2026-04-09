import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Sidebar } from '@yletlabs/frappe-ui'
import ExampleStory from '../../packages/core/src/components/Sidebar/stories/Example.vue'

const meta: Meta<typeof Sidebar> = {
  title: 'Core/Sidebar',
  component: Sidebar,
}

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  render: () => ExampleStory,
}
