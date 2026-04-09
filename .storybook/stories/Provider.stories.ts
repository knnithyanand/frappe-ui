import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { FrappeUIProvider, Button, toast } from '@yletlabs/frappe-ui'

const meta: Meta<typeof FrappeUIProvider> = {
  title: 'Core/Provider',
  component: FrappeUIProvider,
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { FrappeUIProvider, Button },
    setup() {
      function showToast() {
        toast.success('FrappeUIProvider is active!')
      }
      return { showToast }
    },
    template: `
      <FrappeUIProvider>
        <div class="flex flex-col gap-3 p-4">
          <p class="text-sm text-ink-gray-7">
            FrappeUIProvider enables global features like toast notifications.
            Wrap your app root with this component.
          </p>
          <Button label="Show Toast" theme="blue" @click="showToast" />
        </div>
      </FrappeUIProvider>
    `,
  }),
}
