import { PopulationCompositionData } from 'types'

export const mockPopulationCompositionDatas = [
  {
    prefCode: '1',
    prefName: '北海道',
    data: [
      {
        year: 2010,
        value: 5506419,
      },
      {
        year: 2015,
        value: 5381733,
      },
      {
        year: 2020,
        value: 5224614,
      },
    ],
    strokeColor: '#AE9376',
  },
  {
    prefCode: '2',
    prefName: '青森県',
    data: [
      {
        year: 2010,
        value: 1373339,
      },
      {
        year: 2015,
        value: 1308265,
      },
      {
        year: 2020,
        value: 1237984,
      },
    ],
    strokeColor: '#0EBAF9',
  },
] satisfies PopulationCompositionData[]
