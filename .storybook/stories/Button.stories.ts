import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Button } from '@yletlabs/frappe-ui'

const meta: Meta<typeof Button> = {
  title: 'Core/Button',
  component: Button,
  args: {
    label: 'Save',
    theme: 'gray',
    variant: 'solid',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Solid: Story = {}

export const Outline: Story = {
  args: {
    variant: 'outline',
    theme: 'gray',
    label: 'Cancel',
  },
}

export const WithIcons: Story = {
  args: {
    label: 'Search',
    iconLeft: 'search',
    variant: 'subtle',
    theme: 'gray',
  },
}
