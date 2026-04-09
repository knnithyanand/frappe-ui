import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { DataImport } from '@yletlabs/frappe-ui-ext'

const meta: Meta<typeof DataImport> = {
  title: 'Ext/DataImport',
  component: DataImport,
  parameters: {
    docs: {
      description: {
        component:
          'DataImport provides a multi-step CSV import wizard for Frappe doctypes. Requires an active Frappe backend to load doctype fields and process imports.',
      },
    },
  },
  args: {
    doctype: 'ToDo',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
