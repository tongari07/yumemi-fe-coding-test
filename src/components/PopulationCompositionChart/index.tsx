import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { PopulationCompositionData } from 'types'

type PopulationCompositionChartProps = {
  datas?: PopulationCompositionData[]
}

export const PopulationCompositionChart = ({
  datas,
}: PopulationCompositionChartProps) => {
  return (
    <ResponsiveContainer height={500}>
      <LineChart
        margin={{
          top: 40,
          right: 20,
          left: 30,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          type="category"
          label={{ value: '年度', position: 'insideBottomRight', offset: -10 }}
          dataKey="year"
          padding={{ left: 20, right: 20 }}
          allowDuplicatedCategory={false}
        />
        <YAxis
          type="number"
          label={{ value: '人口数', position: 'insideTop', offset: -30 }}
          dataKey="value"
        />
        <Tooltip />
        <Legend />
        {datas?.map(({ data, prefName, prefCode, strokeColor }) => (
          <Line
            dataKey="value"
            data={data}
            name={prefName}
            key={prefCode}
            stroke={strokeColor}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}
