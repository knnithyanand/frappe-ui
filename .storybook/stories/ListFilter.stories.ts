import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ListFilter } from '@yletlabs/frappe-ui'

const meta: Meta<typeof ListFilter> = {
  title: 'Core/ListFilter',
  component: ListFilter,
  parameters: {
    docs: {
      description: {
        component:
          'ListFilter requires a Frappe backend to load doctype fields dynamically. The stories below show the component in its initial state.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    doctype: 'ToDo',
    filters: [],
  },
}

export const WithFilters: Story = {
  args: {
    doctype: 'ToDo',
    filters: [
      { fieldname: 'status', operator: '=', value: 'Open' },
      { fieldname: 'priority', operator: '=', value: 'High' },
    ],
  },
}
