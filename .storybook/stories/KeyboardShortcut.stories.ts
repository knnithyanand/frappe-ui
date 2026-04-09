import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { KeyboardShortcut } from '@yletlabs/frappe-ui'

const meta: Meta<typeof KeyboardShortcut> = {
  title: 'Core/KeyboardShortcut',
  component: KeyboardShortcut,
}

export default meta
type Story = StoryObj<typeof meta>

export const Simple: Story = {
  args: {
    combo: 'Mod+K',
  },
}

export const MultiKey: Story = {
  args: {
    combo: 'Mod+Shift+P',
  },
}

export const CommonShortcuts: Story = {
  render: () => ({
    components: { KeyboardShortcut },
    template: `
      <div class="flex flex-col gap-3">
        <div class="flex items-center justify-between max-w-xs">
          <span class="text-sm text-ink-gray-7">Open command palette</span>
          <KeyboardShortcut combo="Mod+K" />
        </div>
        <div class="flex items-center justify-between max-w-xs">
          <span class="text-sm text-ink-gray-7">Save</span>
          <KeyboardShortcut combo="Mod+S" />
        </div>
        <div class="flex items-center justify-between max-w-xs">
          <span class="text-sm text-ink-gray-7">Undo</span>
          <KeyboardShortcut combo="Mod+Z" />
        </div>
        <div class="flex items-center justify-between max-w-xs">
          <span class="text-sm text-ink-gray-7">Find and replace</span>
          <KeyboardShortcut combo="Mod+Shift+H" />
        </div>
      </div>
    `,
  }),
}
