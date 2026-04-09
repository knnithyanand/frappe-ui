import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Dialogs, Button } from '@yletlabs/frappe-ui'

const meta: Meta<typeof Dialogs> = {
  title: 'Core/Dialogs',
  component: Dialogs,
  parameters: {
    docs: {
      description: {
        component:
          'Dialogs is a global dialog manager component. Place it once at the app root and use the `createDialog` utility to open dialogs programmatically anywhere in the app.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { Dialogs, Button },
    template: `
      <div>
        <p class="text-p-sm text-ink-gray-6 mb-3">
          Dialogs renders programmatically-created dialogs. Use the
          <code>createDialog</code> utility to open dialogs.
        </p>
        <Dialogs />
      </div>
    `,
  }),
}
