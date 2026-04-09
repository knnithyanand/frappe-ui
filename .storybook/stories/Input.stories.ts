import type { Meta, StoryObj } from '@storybook/vue3-vite'
// Input is not exported from the main package index; import directly
import Input from '../../packages/core/src/components/Input.vue'

const meta: Meta<typeof Input> = {
  title: 'Core/Input',
  component: Input,
  parameters: {
    docs: {
      description: {
        component:
          'Input is a lower-level input primitive. For most use cases, prefer TextInput which provides better styling and accessibility.',
      },
    },
  },
  args: {
    label: 'Name',
    placeholder: 'Enter your name',
    type: 'text',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Text: Story = {}

export const Email: Story = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'you@example.com',
  },
}

export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
  },
}

export const Textarea: Story = {
  args: {
    label: 'Description',
    type: 'textarea',
  },
}

export const Checkbox: Story = {
  args: {
    label: 'I agree to the terms',
    type: 'checkbox',
  },
}
