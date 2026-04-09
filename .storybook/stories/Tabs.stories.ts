import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Tabs } from '@yletlabs/frappe-ui'
import IconsStory from '../../packages/core/src/components/Tabs/stories/Icons.vue'
import OrientationStory from '../../packages/core/src/components/Tabs/stories/Orientation.vue'

const meta: Meta<typeof Tabs> = {
  title: 'Core/Tabs',
  component: Tabs,
}

export default meta
type Story = StoryObj<typeof meta>

export const Icons: Story = {
  render: () => IconsStory,
}

export const Orientation: Story = {
  render: () => OrientationStory,
}
