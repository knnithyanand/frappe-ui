import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { CircularProgressBar } from '@yletlabs/frappe-ui'

const meta: Meta<typeof CircularProgressBar> = {
  title: 'Core/CircularProgressBar',
  component: CircularProgressBar,
  args: {
    step: 3,
    totalSteps: 9,
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Complete: Story = {
  args: {
    step: 9,
    totalSteps: 9,
  },
}

export const Themes: Story = {
  render: () => ({
    components: { CircularProgressBar },
    template: `
      <div class="flex gap-4 flex-wrap">
        <CircularProgressBar v-for="theme in ['black','red','green','blue','orange']"
          :key="theme" :step="3" :totalSteps="9" :theme="theme" />
      </div>
    `,
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: { CircularProgressBar },
    template: `
      <div class="flex gap-4 items-center flex-wrap">
        <CircularProgressBar v-for="size in ['xs','sm','md','lg','xl']"
          :key="size" :step="5" :totalSteps="9" :size="size" />
      </div>
    `,
  }),
}

export const ShowPercentage: Story = {
  args: {
    step: 6,
    totalSteps: 9,
    showPercentage: true,
  },
}

export const OutlineVariant: Story = {
  args: {
    step: 4,
    totalSteps: 9,
    variant: 'outline',
  },
}
