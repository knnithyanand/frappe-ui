import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Slider } from '@yletlabs/frappe-ui'
import ExampleStory from '../../packages/core/src/components/Slider/stories/Example.vue'
import RangeStory from '../../packages/core/src/components/Slider/stories/Range.vue'

const meta: Meta<typeof Slider> = {
  title: 'Core/Slider',
  component: Slider,
}

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  render: () => ExampleStory,
}

export const Range: Story = {
  render: () => RangeStory,
}
