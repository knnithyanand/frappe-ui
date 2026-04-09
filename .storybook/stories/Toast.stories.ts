import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { FrappeUIProvider, Button, toast } from '@yletlabs/frappe-ui'

const meta: Meta = {
  title: 'Core/Toast',
  decorators: [
    () => ({
      components: { FrappeUIProvider },
      template: '<FrappeUIProvider><story /></FrappeUIProvider>',
    }),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

export const Info: Story = {
  render: () => ({
    components: { Button },
    setup() {
      return { showInfo: () => toast.info('This is an info message.') }
    },
    template: `<Button label="Show Info Toast" @click="showInfo" />`,
  }),
}

export const Success: Story = {
  render: () => ({
    components: { Button },
    setup() {
      return { showSuccess: () => toast.success('Changes saved successfully!') }
    },
    template: `<Button label="Show Success Toast" theme="green" @click="showSuccess" />`,
  }),
}

export const Warning: Story = {
  render: () => ({
    components: { Button },
    setup() {
      return { showWarning: () => toast.warning('Disk space is running low.') }
    },
    template: `<Button label="Show Warning Toast" theme="orange" @click="showWarning" />`,
  }),
}

export const Error: Story = {
  render: () => ({
    components: { Button },
    setup() {
      return { showError: () => toast.error('An error occurred. Please try again.') }
    },
    template: `<Button label="Show Error Toast" theme="red" @click="showError" />`,
  }),
}

export const WithAction: Story = {
  render: () => ({
    components: { Button },
    setup() {
      return {
        showWithAction: () =>
          toast.info('File deleted.', {
            action: {
              label: 'Undo',
              altText: 'Undo file deletion',
              onClick: () => toast.success('File restored!'),
            },
          }),
      }
    },
    template: `<Button label="Show Toast with Action" @click="showWithAction" />`,
  }),
}
