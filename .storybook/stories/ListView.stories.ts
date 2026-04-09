import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ListView } from '@yletlabs/frappe-ui'
import ExamplesStory from '../../packages/core/src/components/ListView/stories/Examples.vue'
import CellSlotStory from '../../packages/core/src/components/ListView/stories/CellSlot.vue'
import CustomListStory from '../../packages/core/src/components/ListView/stories/CustomList.vue'
import EmptyStory from '../../packages/core/src/components/ListView/stories/Empty.vue'
import GroupedRowsStory from '../../packages/core/src/components/ListView/stories/GroupedRows.vue'

const meta: Meta<typeof ListView> = {
  title: 'Core/ListView',
  component: ListView,
}

export default meta
type Story = StoryObj<typeof meta>

export const Examples: Story = {
  render: () => ExamplesStory,
}

export const CellSlot: Story = {
  render: () => CellSlotStory,
}

export const CustomList: Story = {
  render: () => CustomListStory,
}

export const Empty: Story = {
  render: () => EmptyStory,
}

export const GroupedRows: Story = {
  render: () => GroupedRowsStory,
}
