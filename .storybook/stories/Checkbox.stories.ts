import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Checkbox } from '@yletlabs/frappe-ui'
import ExamplesStory from '../../packages/core/src/components/Checkbox/stories/Examples.vue'

const meta: Meta<typeof Checkbox> = {
  title: 'Core/Checkbox',
  component: Checkbox,
}

export default meta
type Story = StoryObj<typeof meta>

export const Examples: Story = {
  render: () => ExamplesStory,
}
