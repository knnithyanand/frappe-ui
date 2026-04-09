import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { LoadingText } from '@yletlabs/frappe-ui'

const meta: Meta<typeof LoadingText> = {
  title: 'Core/LoadingText',
  component: LoadingText,
  args: {
    text: 'Loading...',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const CustomText: Story = {
  args: {
    text: 'Fetching data, please wait...',
  },
}
