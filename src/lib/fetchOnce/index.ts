const baseUrl = import.meta.env.VITE_API_BASE_URL

export const fetchOnce = async <T>(
  url: string,
): Promise<{
  data?: T
  error: boolean
}> => {
  try {
    const data = await fetch(`${baseUrl}${url}`).then((res) => res.json())
    return { data: data, error: false }
  } catch (error) {
    return {
      error: true,
    }
  }
}
