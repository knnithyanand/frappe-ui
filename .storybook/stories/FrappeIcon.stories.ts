import type { Meta, StoryObj } from '@storybook/vue3-vite'
// FrappeIcon is not exported from the main package index; import directly
import FrappeIcon from '../../packages/core/src/components/FrappeIcon.vue'

const meta: Meta<typeof FrappeIcon> = {
  title: 'Core/FrappeIcon',
  component: FrappeIcon,
  args: {
    name: 'home',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'home',
  },
}

export const CommonIcons: Story = {
  render: () => ({
    components: { FrappeIcon },
    template: `
      <div class="flex flex-wrap gap-4">
        <div v-for="icon in icons" :key="icon" class="flex flex-col items-center gap-1">
          <FrappeIcon :name="icon" class="size-6 text-ink-gray-7" />
          <span class="text-xs text-ink-gray-5">{{ icon }}</span>
        </div>
      </div>
    `,
    setup() {
      return {
        icons: ['home', 'search', 'settings', 'user', 'bell', 'calendar', 'file', 'folder', 'star', 'heart'],
      }
    },
  }),
}
