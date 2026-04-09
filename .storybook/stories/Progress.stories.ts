import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Progress } from '@yletlabs/frappe-ui'
import ExamplesStory from '../../packages/core/src/components/Progress/stories/Examples.vue'
import HintStory from '../../packages/core/src/components/Progress/stories/Hint.vue'
import IntervalsStory from '../../packages/core/src/components/Progress/stories/Intervals.vue'
import SizesStory from '../../packages/core/src/components/Progress/stories/Sizes.vue'

const meta: Meta<typeof Progress> = {
  title: 'Core/Progress',
  component: Progress,
}

export default meta
type Story = StoryObj<typeof meta>

export const Examples: Story = {
  render: () => ExamplesStory,
}

export const Hint: Story = {
  render: () => HintStory,
}

export const Intervals: Story = {
  render: () => IntervalsStory,
}

export const Sizes: Story = {
  render: () => SizesStory,
}
