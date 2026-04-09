import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Filter } from '@yletlabs/frappe-ui-ext'

const meta: Meta<typeof Filter> = {
  title: 'Ext/Filter',
  component: Filter,
  parameters: {
    docs: {
      description: {
        component:
          'Filter component requires a Frappe backend to load doctype field definitions. The stories below demonstrate the component with a real doctype (requires active Frappe backend).',
      },
    },
  },
  args: {
    doctype: 'ToDo',
    filters: [],
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
