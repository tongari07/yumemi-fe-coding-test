import { render } from '@testing-library/react'
import { PopulationCompositionChart } from '.'
import { mockPopulationCompositionDatas } from './__mock__/data'
import { mockResizeObserver } from 'tests/mockResizeObserver'
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

mockResizeObserver()
vi.mock('')

vi.mock('recharts', async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const actual: any = await vi.importActual('recharts')

  return {
    ...actual,
    CartesianGrid: vi.fn(() => null),
    Legend: vi.fn(() => null),
    Line: vi.fn(() => null),
    LineChart: vi.fn(({ children }: { children: React.ReactNode }) => children),
    ReferenceLine: vi.fn(() => null),
    ResponsiveContainer: vi.fn(
      ({ children }: { children: React.ReactNode }) => children,
    ),
    Tooltip: vi.fn(() => null),
    XAxis: vi.fn(() => null),
    YAxis: vi.fn(() => null),
  }
})

describe('PoplationCompositionChart', () => {
  test('データがない場合、メッセージが表示される', () => {
    const { getByText } = render(<PopulationCompositionChart datas={[]} />)

    expect(getByText('都道府県を選択してください。')).toBeInTheDocument()
  })

  test('データが存在する場合、グラフが表示される', async () => {
    render(
      <PopulationCompositionChart datas={mockPopulationCompositionDatas} />,
    )

    expect(CartesianGrid).toHaveBeenCalledTimes(1)
    expect(Legend).toHaveBeenCalledTimes(1)
    expect(Line).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        dataKey: 'value',
        data: mockPopulationCompositionDatas[0].data,
        name: mockPopulationCompositionDatas[0].prefName,
        stroke: mockPopulationCompositionDatas[0].strokeColor,
      }),
      expect.anything(),
    )
    expect(Line).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        dataKey: 'value',
        data: mockPopulationCompositionDatas[1].data,
        name: mockPopulationCompositionDatas[1].prefName,
        stroke: mockPopulationCompositionDatas[1].strokeColor,
      }),
      expect.anything(),
    )
    expect(LineChart).toHaveBeenCalledTimes(1)
    expect(ReferenceLine).toHaveBeenCalledWith(
      expect.objectContaining({
        x: 2020,
        label: '実績値と推計値の区切り年',
      }),
      expect.anything(),
    )
    expect(ResponsiveContainer).toHaveBeenCalledTimes(1)
    expect(Tooltip).toHaveBeenCalledTimes(1)
    expect(XAxis).toHaveBeenCalledWith(
      expect.objectContaining({ dataKey: 'year' }),
      expect.anything(),
    )
    expect(YAxis).toHaveBeenCalledWith(
      expect.objectContaining({ dataKey: 'value' }),
      expect.anything(),
    )
  })
})
