import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Alert } from '@yletlabs/frappe-ui'
import ControlledStory from '../../packages/core/src/components/Alert/stories/Controlled.vue'
import SlotsStory from '../../packages/core/src/components/Alert/stories/Slots.vue'
import ThemesStory from '../../packages/core/src/components/Alert/stories/Themes.vue'

const meta: Meta<typeof Alert> = {
  title: 'Core/Alert',
  component: Alert,
}

export default meta
type Story = StoryObj<typeof meta>

export const Themes: Story = {
  render: () => ThemesStory,
}

export const Controlled: Story = {
  render: () => ControlledStory,
}

export const Slots: Story = {
  render: () => SlotsStory,
}
