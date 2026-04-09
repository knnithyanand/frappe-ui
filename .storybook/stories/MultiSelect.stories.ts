import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { MultiSelect } from '@yletlabs/frappe-ui'
import ExampleStory from '../../packages/core/src/components/MultiSelect/stories/Example.vue'
import FooterStory from '../../packages/core/src/components/MultiSelect/stories/Footer.vue'
import OptionsStory from '../../packages/core/src/components/MultiSelect/stories/Options.vue'

const meta: Meta<typeof MultiSelect> = {
  title: 'Core/MultiSelect',
  component: MultiSelect,
}

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  render: () => ExampleStory,
}

export const Footer: Story = {
  render: () => FooterStory,
}

export const Options: Story = {
  render: () => OptionsStory,
}
