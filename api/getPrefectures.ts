import { VercelRequest, VercelResponse } from '@vercel/node'

type Prefecture = {
  prefCode: number
  prefName: string
}

export default async function handler(
  _: VercelRequest,
  response: VercelResponse,
) {
  const result = await fetchResasAPI<Prefecture[]>('/api/v1/prefectures')

  return response.status(200).json(result)
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
