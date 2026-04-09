import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Breadcrumbs } from '@yletlabs/frappe-ui'
import ExampleStory from '../../packages/core/src/components/Breadcrumbs/stories/Example.vue'
import SlotsStory from '../../packages/core/src/components/Breadcrumbs/stories/Slots.vue'

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Core/Breadcrumbs',
  component: Breadcrumbs,
}

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  render: () => ExampleStory,
}

export const Slots: Story = {
  render: () => SlotsStory,
}
