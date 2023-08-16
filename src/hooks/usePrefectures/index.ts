import { useFetch } from 'lib/useFetch'
import { Prefecture } from 'types'

export const usePrefectures = () => {
  const {
    data: prefectures,
    error,
    isLoading,
  } = useFetch<Prefecture[]>('/api/getPrefectures')

  return {
    prefectures,
    error,
    isLoading,
  }
}
