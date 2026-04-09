import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { TimePicker } from '@yletlabs/frappe-ui'
import BasicStory from '../../packages/core/src/components/TimePicker/stories/Basic.vue'
import RangeStory from '../../packages/core/src/components/TimePicker/stories/Range.vue'
import TwentyFourStory from '../../packages/core/src/components/TimePicker/stories/TwentyFour.vue'
import CustomOptionsStory from '../../packages/core/src/components/TimePicker/stories/CustomOptions.vue'

const meta: Meta<typeof TimePicker> = {
  title: 'Core/TimePicker',
  component: TimePicker,
}

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => BasicStory,
}

export const Range: Story = {
  render: () => RangeStory,
}

export const TwentyFourHour: Story = {
  render: () => TwentyFourStory,
}

export const CustomOptions: Story = {
  render: () => CustomOptionsStory,
}
