import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { DatePicker } from '@yletlabs/frappe-ui'
import ExamplesStory from '../../packages/core/src/components/DatePicker/stories/Examples.vue'
import DateTimeStory from '../../packages/core/src/components/DatePicker/stories/DateTime.vue'
import RangeStory from '../../packages/core/src/components/DatePicker/stories/Range.vue'

const meta: Meta<typeof DatePicker> = {
  title: 'Core/DatePicker',
  component: DatePicker,
}

export default meta
type Story = StoryObj<typeof meta>

export const Examples: Story = {
  render: () => ExamplesStory,
}

export const DateTime: Story = {
  render: () => DateTimeStory,
}

export const Range: Story = {
  render: () => RangeStory,
}
