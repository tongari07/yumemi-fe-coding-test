export type Prefecture = {
  prefCode: string
  prefName: string
}

export type PopulationComposition = {
  prefCode: Prefecture['prefCode']
  data?: {
    year: number
    value: number
  }[]
}

export type PopulationCompositionData = Prefecture & {
  data: PopulationComposition['data']
  strokeColor: `#${string}`
}
