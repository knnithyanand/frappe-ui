import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Dropdown } from '@yletlabs/frappe-ui'
import ExamplesStory from '../../packages/core/src/components/Dropdown/stories/Examples.vue'
import GroupedStory from '../../packages/core/src/components/Dropdown/stories/Grouped.vue'
import SubmenusStory from '../../packages/core/src/components/Dropdown/stories/Submenus.vue'
import SwitchesStory from '../../packages/core/src/components/Dropdown/stories/Switches.vue'
import CustomTriggerStory from '../../packages/core/src/components/Dropdown/stories/CustomTrigger.vue'

const meta: Meta<typeof Dropdown> = {
  title: 'Core/Dropdown',
  component: Dropdown,
}

export default meta
type Story = StoryObj<typeof meta>

export const Examples: Story = {
  render: () => ExamplesStory,
}

export const Grouped: Story = {
  render: () => GroupedStory,
}

export const Submenus: Story = {
  render: () => SubmenusStory,
}

export const Switches: Story = {
  render: () => SwitchesStory,
}

export const CustomTrigger: Story = {
  render: () => CustomTriggerStory,
}
