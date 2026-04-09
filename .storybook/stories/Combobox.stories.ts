import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Combobox } from '@yletlabs/frappe-ui'
import SimpleStory from '../../packages/core/src/components/Combobox/stories/Simple.vue'
import GroupedStory from '../../packages/core/src/components/Combobox/stories/Grouped.vue'
import WithIconsStory from '../../packages/core/src/components/Combobox/stories/WithIcons.vue'
import OptionSlotsStory from '../../packages/core/src/components/Combobox/stories/OptionSlots.vue'
import CustomRenderStory from '../../packages/core/src/components/Combobox/stories/CustomRender.vue'

const meta: Meta<typeof Combobox> = {
  title: 'Core/Combobox',
  component: Combobox,
}

export default meta
type Story = StoryObj<typeof meta>

export const Simple: Story = {
  render: () => SimpleStory,
}

export const Grouped: Story = {
  render: () => GroupedStory,
}

export const WithIcons: Story = {
  render: () => WithIconsStory,
}

export const OptionSlots: Story = {
  render: () => OptionSlotsStory,
}

export const CustomRender: Story = {
  render: () => CustomRenderStory,
}
