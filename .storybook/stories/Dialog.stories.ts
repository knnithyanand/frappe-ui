import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Dialog } from '@yletlabs/frappe-ui'
import InteractiveStory from '../../packages/core/src/components/Dialog/stories/Interactive.vue'
import ModalStory from '../../packages/core/src/components/Dialog/stories/Modal.vue'
import ConfirmStory from '../../packages/core/src/components/Dialog/stories/Confirm.vue'
import CustomStory from '../../packages/core/src/components/Dialog/stories/Custom.vue'

const meta: Meta<typeof Dialog> = {
  title: 'Core/Dialog',
  component: Dialog,
}

export default meta
type Story = StoryObj<typeof meta>

export const Interactive: Story = {
  render: () => InteractiveStory,
}

export const Modal: Story = {
  render: () => ModalStory,
}

export const Confirm: Story = {
  render: () => ConfirmStory,
}

export const Custom: Story = {
  render: () => CustomStory,
}
