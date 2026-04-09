import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { LoadingIndicator } from '@yletlabs/frappe-ui'

const meta: Meta<typeof LoadingIndicator> = {
  title: 'Core/LoadingIndicator',
  component: LoadingIndicator,
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Sizes: Story = {
  render: () => ({
    components: { LoadingIndicator },
    template: `
      <div class="flex items-center gap-4">
        <LoadingIndicator class="size-4" />
        <LoadingIndicator class="size-6" />
        <LoadingIndicator class="size-8" />
        <LoadingIndicator class="size-12" />
      </div>
    `,
  }),
}

export const Colored: Story = {
  render: () => ({
    components: { LoadingIndicator },
    template: `
      <div class="flex items-center gap-4">
        <LoadingIndicator class="size-6 text-ink-gray-7" />
        <LoadingIndicator class="size-6 text-ink-blue-3" />
        <LoadingIndicator class="size-6 text-ink-green-3" />
        <LoadingIndicator class="size-6 text-ink-red-3" />
      </div>
    `,
  }),
}
