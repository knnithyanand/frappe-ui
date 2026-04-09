import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { HelpCenter } from '@yletlabs/frappe-ui-ext'

const meta: Meta<typeof HelpCenter> = {
  title: 'Ext/HelpCenter',
  component: HelpCenter,
  parameters: {
    docs: {
      description: {
        component:
          'HelpCenter displays a searchable list of help articles. Provide articles as an array with title, children (sub-articles), and link fields.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { HelpCenter },
    setup() {
      const articles = [
        {
          title: 'Getting Started',
          children: [
            { title: 'Installation Guide', link: '#' },
            { title: 'Quick Start Tutorial', link: '#' },
          ],
        },
        {
          title: 'Advanced Topics',
          children: [
            { title: 'API Reference', link: '#' },
            { title: 'Configuration Options', link: '#' },
          ],
        },
      ]
      return { articles }
    },
    template: `
      <div class="w-72 border rounded-lg p-3 h-64">
        <HelpCenter :articles="articles" docsUrl="https://docs.frappe.io" />
      </div>
    `,
  }),
}
