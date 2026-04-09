import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { FormLabel } from '@yletlabs/frappe-ui'

const meta: Meta<typeof FormLabel> = {
  title: 'Core/FormLabel',
  component: FormLabel,
  args: {
    label: 'Email Address',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Required: Story = {
  args: {
    label: 'Full Name',
    required: true,
  },
}

export const Sizes: Story = {
  render: () => ({
    components: { FormLabel },
    template: `
      <div class="flex flex-col gap-3">
        <FormLabel label="Small label" size="sm" />
        <FormLabel label="Medium label" size="md" />
      </div>
    `,
  }),
}
