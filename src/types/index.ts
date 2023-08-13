export type Prefecture = {
  prefCode: number
  prefName: string
}

export type PopulationComposition = {
  boundaryYear: number
  data: {
    year: number
    value: number
    rate: number
  }
}

export type ApiResponse<T> = {
  message: string
  result: T
}
