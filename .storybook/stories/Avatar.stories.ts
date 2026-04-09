import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Avatar } from '@yletlabs/frappe-ui'
import ShapesStory from '../../packages/core/src/components/Avatar/stories/Shapes.vue'
import SizesStory from '../../packages/core/src/components/Avatar/stories/Sizes.vue'

const meta: Meta<typeof Avatar> = {
  title: 'Core/Avatar',
  component: Avatar,
}

export default meta
type Story = StoryObj<typeof meta>

export const Sizes: Story = {
  render: () => SizesStory,
}

export const Shapes: Story = {
  render: () => ShapesStory,
}
