import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Link } from '@yletlabs/frappe-ui-ext'

const meta: Meta<typeof Link> = {
  title: 'Ext/Link',
  component: Link,
  parameters: {
    docs: {
      description: {
        component:
          'Link is a Frappe doctype link field that fetches matching records from the backend via autocomplete. Requires an active Frappe backend.',
      },
    },
  },
  args: {
    doctype: 'User',
    label: 'Assigned To',
    placeholder: 'Search user...',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Required: Story = {
  args: {
    doctype: 'User',
    label: 'Owner',
    required: true,
  },
}
