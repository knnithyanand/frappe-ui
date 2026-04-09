import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Textarea } from '@yletlabs/frappe-ui'
import VariantsStory from '../../packages/core/src/components/Textarea/stories/Variants.vue'

const meta: Meta<typeof Textarea> = {
  title: 'Core/Textarea',
  component: Textarea,
}

export default meta
type Story = StoryObj<typeof meta>

export const Variants: Story = {
  render: () => VariantsStory,
}
