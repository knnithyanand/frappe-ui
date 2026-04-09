import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { TrialBanner, SignupBanner } from '@yletlabs/frappe-ui-ext'

const meta: Meta = {
  title: 'Ext/Billing',
  parameters: {
    docs: {
      description: {
        component:
          'Billing banners for TrialBanner (requires Frappe Cloud backend) and SignupBanner (static display).',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const SignupBannerDefault: Story = {
  name: 'SignupBanner',
  render: () => ({
    components: { SignupBanner },
    template: `
      <div class="w-64 p-2">
        <SignupBanner appName="Helpdesk" />
      </div>
    `,
  }),
}

export const SignupBannerCollapsed: Story = {
  name: 'SignupBanner (Collapsed)',
  render: () => ({
    components: { SignupBanner },
    template: `
      <div class="w-16 p-2">
        <SignupBanner :isSidebarCollapsed="true" appName="Helpdesk" />
      </div>
    `,
  }),
}

export const TrialBannerCollapsed: Story = {
  name: 'TrialBanner (Collapsed)',
  render: () => ({
    components: { TrialBanner },
    template: `
      <div class="w-16 p-2">
        <TrialBanner :isSidebarCollapsed="true" />
      </div>
    `,
  }),
}
