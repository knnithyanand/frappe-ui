import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { ConfirmDialog, Button } from '@yletlabs/frappe-ui'

const meta: Meta<typeof ConfirmDialog> = {
  title: 'Core/ConfirmDialog',
  component: ConfirmDialog,
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { ConfirmDialog, Button },
    setup() {
      const dialogRef = ref(null)
      return { dialogRef }
    },
    template: `
      <div>
        <Button label="Open Confirm Dialog" @click="dialogRef.show()" />
        <ConfirmDialog
          ref="dialogRef"
          title="Delete Item"
          message="Are you sure you want to delete this item? This action cannot be undone."
          :onConfirm="({ hideDialog }) => { alert('Confirmed!'); hideDialog(); }"
          :onCancel="() => {}"
        />
      </div>
    `,
  }),
}
