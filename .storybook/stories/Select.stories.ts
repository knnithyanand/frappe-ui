import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Select } from '@yletlabs/frappe-ui'
import ExampleStory from '../../packages/core/src/components/Select/stories/Example.vue'
import OptionSlotStory from '../../packages/core/src/components/Select/stories/OptionSlot.vue'
import TriggerSlotsStory from '../../packages/core/src/components/Select/stories/TriggerSlots.vue'

const meta: Meta<typeof Select> = {
  title: 'Core/Select',
  component: Select,
}

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  render: () => ExampleStory,
}

export const OptionSlot: Story = {
  render: () => OptionSlotStory,
}

export const TriggerSlots: Story = {
  render: () => TriggerSlotsStory,
}
