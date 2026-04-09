import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { TextInput } from '@yletlabs/frappe-ui'

// TextInput/stories/List.vue uses the @/ alias (dev playground only), so we write inline here.

const meta: Meta<typeof TextInput> = {
  title: 'Core/TextInput',
  component: TextInput,
  args: {
    label: 'Name',
    placeholder: 'Jane Doe',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Sizes: Story = {
  render: () => ({
    components: { TextInput },
    template: `
      <div class="flex flex-col gap-3">
        <TextInput size="sm" label="Small" placeholder="Small input" />
        <TextInput size="md" label="Medium" placeholder="Medium input" />
        <TextInput size="lg" label="Large" placeholder="Large input" />
      </div>
    `,
  }),
}

export const Variants: Story = {
  render: () => ({
    components: { TextInput },
    template: `
      <div class="flex flex-col gap-3">
        <TextInput variant="subtle" label="Subtle" placeholder="Subtle variant" />
        <TextInput variant="outline" label="Outline" placeholder="Outline variant" />
        <TextInput variant="ghost" label="Ghost" placeholder="Ghost variant" />
      </div>
    `,
  }),
}

export const WithIcons: Story = {
  render: () => ({
    components: { TextInput },
    template: `
      <div class="flex flex-col gap-3">
        <TextInput label="Search" placeholder="Search..." prefix-icon="search" />
        <TextInput label="Email" placeholder="you@example.com" type="email" prefix-icon="mail" />
      </div>
    `,
  }),
}

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    placeholder: 'Cannot edit',
    disabled: true,
  },
}

