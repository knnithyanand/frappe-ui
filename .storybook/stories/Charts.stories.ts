import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { AxisChart, DonutChart, FunnelChart, NumberChart } from '@yletlabs/frappe-ui'

// Note: Charts/stories/Examples.vue uses the @/ alias and type-only imports
// that don't survive bundling, so we write inline stories here instead.

const meta: Meta = {
  title: 'Core/Charts',
}

export default meta
type Story = StoryObj<typeof meta>

const salesData = [
  { month: '2021-01', sales: 200, profit: 50 },
  { month: '2021-02', sales: 300, profit: 80 },
  { month: '2021-03', sales: 250, profit: 60 },
  { month: '2021-04', sales: 350, profit: 90 },
  { month: '2021-05', sales: 400, profit: 100 },
  { month: '2021-06', sales: 300, profit: 80 },
]

export const AxisChartBar: Story = {
  name: 'AxisChart — Bar',
  render: () => ({
    components: { AxisChart },
    setup() {
      const config = {
        data: salesData,
        title: 'Monthly Sales',
        xAxis: { key: 'month', type: 'category' as const },
        yAxis: { title: 'Amount' },
        series: [
          { name: 'Sales', key: 'sales', type: 'bar' as const, color: '#5470c6' },
          { name: 'Profit', key: 'profit', type: 'bar' as const, color: '#91cc75' },
        ],
      }
      return { config }
    },
    template: `<AxisChart :config="config" style="height:300px" />`,
  }),
}

export const DonutChartExample: Story = {
  name: 'DonutChart',
  render: () => ({
    components: { DonutChart },
    setup() {
      const config = {
        data: [
          { label: 'Open', value: 45 },
          { label: 'In Progress', value: 30 },
          { label: 'Closed', value: 25 },
        ],
        title: 'Task Status',
        colors: ['#5470c6', '#91cc75', '#fac858'],
      }
      return { config }
    },
    template: `<DonutChart :config="config" style="height:300px" />`,
  }),
}

export const NumberChartExample: Story = {
  name: 'NumberChart',
  render: () => ({
    components: { NumberChart },
    setup() {
      const config = {
        data: [{ value: 1284, label: 'Total Users' }],
        title: 'Total Users',
      }
      return { config }
    },
    template: `<NumberChart :config="config" style="height:200px" />`,
  }),
}

