import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { GridLayout } from '@yletlabs/frappe-ui'

const meta: Meta<typeof GridLayout> = {
  title: 'Core/VueGridLayout',
  component: GridLayout,
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { GridLayout },
    setup() {
      const layout = ref([
        { i: 'a', x: 0, y: 0, w: 4, h: 2 },
        { i: 'b', x: 4, y: 0, w: 4, h: 2 },
        { i: 'c', x: 8, y: 0, w: 4, h: 2 },
        { i: 'd', x: 0, y: 2, w: 6, h: 3 },
        { i: 'e', x: 6, y: 2, w: 6, h: 3 },
      ])
      return { layout }
    },
    template: `
      <div style="height: 400px;">
        <GridLayout v-model:layout="layout" :col-num="12" :row-height="60">
          <template #item="{ i }">
            <div class="h-full w-full rounded-lg bg-surface-gray-2 flex items-center justify-center text-ink-gray-6 font-medium border border-outline-gray-2">
              {{ i }}
            </div>
          </template>
        </GridLayout>
      </div>
    `,
  }),
}
