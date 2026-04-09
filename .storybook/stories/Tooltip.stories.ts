import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Tooltip } from '@yletlabs/frappe-ui'
import ExamplesStory from '../../packages/core/src/components/Tooltip/stories/Examples.vue'
import SlotsStory from '../../packages/core/src/components/Tooltip/stories/Slots.vue'

const meta: Meta<typeof Tooltip> = {
  title: 'Core/Tooltip',
  component: Tooltip,
}

export default meta
type Story = StoryObj<typeof meta>

export const Examples: Story = {
  render: () => ExamplesStory,
}

export const Slots: Story = {
  render: () => SlotsStory,
}
