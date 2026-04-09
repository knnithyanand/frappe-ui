import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Badge } from '@yletlabs/frappe-ui'
import ThemesStory from '../../packages/core/src/components/Badge/stories/Themes.vue'
import VariantsStory from '../../packages/core/src/components/Badge/stories/Variants.vue'

const meta: Meta<typeof Badge> = {
  title: 'Core/Badge',
  component: Badge,
}

export default meta
type Story = StoryObj<typeof meta>

export const Variants: Story = {
  render: () => VariantsStory,
}

export const Themes: Story = {
  render: () => ThemesStory,
}
