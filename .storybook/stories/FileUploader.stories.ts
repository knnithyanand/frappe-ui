import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { FileUploader } from '@yletlabs/frappe-ui'
import ExamplesStory from '../../packages/core/src/components/FileUploader/stories/Examples.vue'

const meta: Meta<typeof FileUploader> = {
  title: 'Core/FileUploader',
  component: FileUploader,
}

export default meta
type Story = StoryObj<typeof meta>

export const Examples: Story = {
  render: () => ExamplesStory,
}
