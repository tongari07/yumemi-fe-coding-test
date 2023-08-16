import { VercelRequest, VercelResponse } from '@vercel/node'

type PopulationComposition = {
  boundaryYear: number
  data: {
    label: string
    data: {
      year: number
      value: number
      rate?: number
    }[]
  }[]
}

type RESASAPIResponse = {
  message: string
  result: PopulationComposition
}

type APIResponse = {
  prefCode: string
  data?: {
    year: number
    value: number
  }[]
}

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (!request.url) return response.status(400)
  const protocol = process.env.VERCEL_ENV === 'development' ? `http` : `https`
  const url = new URL(request.url, `${protocol}://${request.headers.host}`)

  const { searchParams } = url
  const prefCode = searchParams.get('prefCode')

  if (!prefCode) {
    return response.status(400).send('prefCode is required')
  }

  const {
    result: { boundaryYear, data },
  } = await fetchResasAPI<RESASAPIResponse>(
    `/api/v1/population/composition/perYear?prefCode=${prefCode}`,
  )
  const totalPopulation = data.find((item) => item.label === '総人口')
  const realPopulationData = totalPopulation?.data
    .filter((i) => i.year <= boundaryYear)
    .map(({ year, value }) => ({
      year,
      value,
    }))

  const apiResponse: APIResponse = {
    prefCode: prefCode,
    data: realPopulationData,
  }

  response.setHeader('Cache-Control', 's-maxage=86400')
  return response.status(200).json(apiResponse)
}

// utils/_fetchResasAPI.tsに共通関数として切り出したいが、vercel devで動かないので一旦ここに記述
export const fetchResasAPI = async <T>(url: RequestInfo): Promise<T> => {
  const endpoint = process.env.RESAS_API_ENDPOINT
  const apiKey = process.env.RESAS_API_KEY

  if (!endpoint || !apiKey) throw new Error('Environment variables are not set')

  return fetch(`${endpoint}${url}`, {
    headers: {
      'X-API-KEY': apiKey,
    },
  })
    .catch((error) => {
      throw new Error(error.message)
    })
    .then(handleErrors)
    .then((response) => response?.json())
}

const handleErrors = async (response: void | Response) => {
  if (!response) return
  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return response
}
