const baseUrl = import.meta.env.VITE_API_BASE_URL

export const fetchOnce = async <T>(
  url: string,
): Promise<{
  data?: T
  isLoading: boolean
  error: boolean
}> => {
  try {
    const data = await fetch(`${baseUrl}${url}`).then((res) => res.json())
    return { data: data, isLoading: false, error: false }
  } catch (error) {
    return {
      isLoading: false,
      error: true,
    }
  }
}
