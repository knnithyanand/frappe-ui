import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { TextEditor } from '@yletlabs/frappe-ui'
import ExampleStory from '../../packages/core/src/components/TextEditor/stories/Example.vue'
import CommentStory from '../../packages/core/src/components/TextEditor/stories/Comment.vue'

const meta: Meta<typeof TextEditor> = {
  title: 'Core/TextEditor',
  component: TextEditor,
}

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  render: () => ExampleStory,
}

export const Comment: Story = {
  render: () => CommentStory,
}
