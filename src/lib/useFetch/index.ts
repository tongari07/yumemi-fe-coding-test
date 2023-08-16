import useSWR from 'swr'

export const useFetch = <T>(url: string) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL
  const { data, error, isLoading } = useSWR<T>(url, (url) =>
    fetch(`${baseUrl}${url}`).then((res) => res.json()),
  )

  return {
    data,
    error,
    isLoading,
  }
}
