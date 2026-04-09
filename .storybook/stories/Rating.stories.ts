import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Rating } from '@yletlabs/frappe-ui'
import ExamplesStory from '../../packages/core/src/components/Rating/stories/Examples.vue'

const meta: Meta<typeof Rating> = {
  title: 'Core/Rating',
  component: Rating,
}

export default meta
type Story = StoryObj<typeof meta>

export const Examples: Story = {
  render: () => ExamplesStory,
}
