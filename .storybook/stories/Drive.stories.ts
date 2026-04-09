import type { Meta, StoryObj } from '@storybook/vue3-vite'
// Import only DriveLogo — other drive components (MoveDialog, RenameDialog, etc.)
// have internal deps on ext-package exports that aren't available outside Frappe Drive.
import DriveLogo from '../../packages/ext/src/drive/components/DriveLogo.vue'

const meta: Meta = {
  title: 'Ext/Drive',
  parameters: {
    docs: {
      description: {
        component: 'Drive-related components for Frappe Drive integration.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Logo: Story = {
  name: 'DriveLogo',
  render: () => ({
    components: { DriveLogo },
    template: `
      <div class="flex items-center gap-4">
        <DriveLogo class="size-8" />
        <DriveLogo class="size-12" />
        <DriveLogo class="size-16" />
      </div>
    `,
  }),
}
