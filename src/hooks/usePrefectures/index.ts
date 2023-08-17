import { useFetch } from 'lib/useFetch'
import { Prefecture } from 'types'

export const usePrefectures = () => {
  const {
    data: prefectures,
    error,
    isLoading,
  } = useFetch<Prefecture[]>('/api/getPrefectures')

  if (error) {
    throw new Error('Failed to fetch prefectures')
  }

  return {
    prefectures,
    error,
    isLoading,
  }
}
