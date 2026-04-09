import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Popover } from '@yletlabs/frappe-ui'
import ClickStory from '../../packages/core/src/components/Popover/stories/Click.vue'
import HoverStory from '../../packages/core/src/components/Popover/stories/Hover.vue'

const meta: Meta<typeof Popover> = {
  title: 'Core/Popover',
  component: Popover,
}

export default meta
type Story = StoryObj<typeof meta>

export const Click: Story = {
  render: () => ClickStory,
}

export const Hover: Story = {
  render: () => HoverStory,
}
