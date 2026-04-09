import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { FormControl } from '@yletlabs/frappe-ui'

const meta: Meta<typeof FormControl> = {
  title: 'Core/FormControl',
  component: FormControl,
  args: {
    label: 'Full Name',
    type: 'text',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const TextInput: Story = {
  args: {
    label: 'Full Name',
    type: 'text',
    description: 'Enter your full legal name.',
  },
}

export const SelectInput: Story = {
  args: {
    label: 'Role',
    type: 'select',
    options: [
      { label: 'Developer', value: 'developer' },
      { label: 'Designer', value: 'designer' },
      { label: 'Manager', value: 'manager' },
    ],
  },
}

export const TextareaInput: Story = {
  args: {
    label: 'Description',
    type: 'textarea',
    description: 'Provide a short description.',
  },
}

export const CheckboxInput: Story = {
  args: {
    label: 'Agree to terms',
    type: 'checkbox',
  },
}

export const Sizes: Story = {
  render: () => ({
    components: { FormControl },
    template: `
      <div class="flex flex-col gap-3 max-w-sm">
        <FormControl label="Small" type="text" size="sm" placeholder="Small input" />
        <FormControl label="Medium" type="text" size="md" placeholder="Medium input" />
      </div>
    `,
  }),
}
