import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Password } from '@yletlabs/frappe-ui'
import ExampleStory from '../../packages/core/src/components/Password/stories/Example.vue'

const meta: Meta<typeof Password> = {
  title: 'Core/Password',
  component: Password,
}

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  render: () => ExampleStory,
}
