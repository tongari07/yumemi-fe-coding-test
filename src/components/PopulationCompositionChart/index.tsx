import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
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
  datas = [],
}: PopulationCompositionChartProps) => {
  if (datas.length === 0) {
    return <span className="ml-8">都道府県を選択してください。</span>
  }

  return (
    <ResponsiveContainer height={500}>
      <LineChart
        margin={{
          top: 40,
          right: 32,
          left: 32,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          type="category"
          label={{
            value: '年度',
            position: 'insideBottomRight',
            offset: -10,
          }}
          dataKey="year"
          padding={{ left: 20, right: 20 }}
          allowDuplicatedCategory={false}
        />
        <YAxis
          type="number"
          label={{ value: '人口数', position: 'insideTop', offset: -30 }}
          dataKey="value"
        />
        <ReferenceLine x={2020} stroke="red" label="実績値と推計値の区切り年" />
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
