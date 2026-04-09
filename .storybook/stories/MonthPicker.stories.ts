import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { MonthPicker } from '@yletlabs/frappe-ui'
import ExampleStory from '../../packages/core/src/components/MonthPicker/stories/Example.vue'

const meta: Meta<typeof MonthPicker> = {
  title: 'Core/MonthPicker',
  component: MonthPicker,
}

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  render: () => ExampleStory,
}
