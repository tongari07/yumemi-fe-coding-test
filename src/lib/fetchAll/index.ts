const baseUrl = import.meta.env.VITE_API_BASE_URL

export const fetchAll = async <T>(
  urls: string[],
): Promise<{
  data?: T[]
  isLoading: boolean
  error: boolean
}> => {
  try {
    const data = await Promise.all(
      urls.map((url) => fetch(`${baseUrl}${url}`).then((res) => res.json())),
    ).then((res) => res.flat())
    return { data, isLoading: false, error: false }
  } catch (error) {
    return {
      isLoading: false,
      error: true,
    }
  }
}
