import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ErrorMessage } from '@yletlabs/frappe-ui'
import ExamplesStory from '../../packages/core/src/components/ErrorMessage/stories/Examples.vue'
import ErrorObjectStory from '../../packages/core/src/components/ErrorMessage/stories/ErrorObject.vue'

const meta: Meta<typeof ErrorMessage> = {
  title: 'Core/ErrorMessage',
  component: ErrorMessage,
}

export default meta
type Story = StoryObj<typeof meta>

export const Examples: Story = {
  render: () => ExamplesStory,
}

export const ErrorObject: Story = {
  render: () => ErrorObjectStory,
}
