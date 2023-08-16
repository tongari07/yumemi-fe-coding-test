export type Prefecture = {
  prefCode: string
  prefName: string
}

export type PopulationComposition = {
  prefCode: Prefecture['prefCode']
  boundaryYear: number
  data?: {
    year: number
    value: number
  }[]
}
