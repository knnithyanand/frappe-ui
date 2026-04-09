import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { GettingStartedBanner, OnboardingSteps, IntermediateStepModal } from '@yletlabs/frappe-ui-ext'
import { Button } from '@yletlabs/frappe-ui'

const meta: Meta = {
  title: 'Ext/Onboarding',
  parameters: {
    docs: {
      description: {
        component:
          'Onboarding components for guiding users through initial setup. These components use a shared onboarding store managed via useOnboarding composable.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const GettingStartedBannerExpanded: Story = {
  name: 'GettingStartedBanner',
  render: () => ({
    components: { GettingStartedBanner },
    template: `
      <div class="w-64 border rounded-lg p-2">
        <GettingStartedBanner appName="Helpdesk" />
      </div>
    `,
  }),
}

export const GettingStartedBannerCollapsed: Story = {
  name: 'GettingStartedBanner (Collapsed)',
  render: () => ({
    components: { GettingStartedBanner },
    template: `
      <div class="w-16 border rounded-lg p-2">
        <GettingStartedBanner :isSidebarCollapsed="true" appName="Helpdesk" />
      </div>
    `,
  }),
}

export const OnboardingStepsDemo: Story = {
  name: 'OnboardingSteps',
  render: () => ({
    components: { OnboardingSteps },
    template: `
      <div class="w-72 border rounded-lg p-3 h-64">
        <OnboardingSteps title="Get Started" appName="Helpdesk" />
      </div>
    `,
  }),
}
