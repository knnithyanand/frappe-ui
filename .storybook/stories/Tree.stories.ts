import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Tree } from '@yletlabs/frappe-ui'
import ExampleStory from '../../packages/core/src/components/Tree/stories/Example.vue'

const meta: Meta<typeof Tree> = {
  title: 'Core/Tree',
  component: Tree,
}

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  render: () => ExampleStory,
}
