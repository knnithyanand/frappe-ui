import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { HelpModal, showHelpModal } from '@yletlabs/frappe-ui-ext'
import { Button } from '@yletlabs/frappe-ui'

const meta: Meta<typeof HelpModal> = {
  title: 'Ext/Help',
  component: HelpModal,
  parameters: {
    docs: {
      description: {
        component:
          'HelpModal is a floating help panel with onboarding steps and help center. Use showHelpModal() to open it programmatically.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { HelpModal, Button },
    setup() {
      return { showHelpModal }
    },
    template: `
      <div>
        <Button label="Open Help Modal" @click="showHelpModal()" />
        <HelpModal appName="Helpdesk" title="Getting Started" />
      </div>
    `,
  }),
}
