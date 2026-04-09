import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Switch } from '@yletlabs/frappe-ui'
import ExampleStory from '../../packages/core/src/components/Switch/stories/Example.vue'
import LabelsStory from '../../packages/core/src/components/Switch/stories/Labels.vue'

const meta: Meta<typeof Switch> = {
  title: 'Core/Switch',
  component: Switch,
}

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  render: () => ExampleStory,
}

export const Labels: Story = {
  render: () => LabelsStory,
}
