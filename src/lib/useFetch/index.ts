import useSWR from 'swr'
import { ApiResponse } from 'types'

export const useFetch = <T>(url: string) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL
  const { data, error, isLoading } = useSWR<ApiResponse<T>>(url, (url) =>
    fetch(`${baseUrl}${url}`).then((res) => res.json()),
  )

  return {
    data: data?.result,
    error,
    isLoading,
  }
}
