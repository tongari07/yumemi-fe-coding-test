const baseUrl = import.meta.env.VITE_API_BASE_URL

export const fetchAll = async <T>(
  urls: string[],
): Promise<{
  data?: T[]
  error: boolean
}> => {
  try {
    const data = await Promise.all(
      urls.map((url) => fetch(`${baseUrl}${url}`).then((res) => res.json())),
    ).then((res) => res.flat())
    return { data, error: false }
  } catch (error) {
    return {
      error: true,
    }
  }
}
