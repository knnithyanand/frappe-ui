import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Calendar } from '@yletlabs/frappe-ui'
import ExamplesStory from '../../packages/core/src/components/Calendar/stories/Examples.vue'
import CustomHeaderStory from '../../packages/core/src/components/Calendar/stories/CustomHeader.vue'

const meta: Meta<typeof Calendar> = {
  title: 'Core/Calendar',
  component: Calendar,
}

export default meta
type Story = StoryObj<typeof meta>

export const Examples: Story = {
  render: () => ExamplesStory,
}

export const CustomHeader: Story = {
  render: () => CustomHeaderStory,
}
