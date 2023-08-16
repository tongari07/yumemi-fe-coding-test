import { fetchOnce } from '.'

const baseUrl = import.meta.env.VITE_API_BASE_URL

describe('fetchOnce', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('fetchに成功したらdataを返却する', async () => {
    const mockData = { key: 'value' }
    global.fetch = vi.fn().mockResolvedValueOnce({
      json: vi.fn().mockResolvedValueOnce(mockData),
    })

    const url = '/endpoint'
    const response = await fetchOnce<typeof mockData>(url)

    expect(global.fetch).toHaveBeenCalledWith(`${baseUrl}${url}`)
    expect(response).toEqual({ data: mockData, isLoading: false, error: false })
  })

  it('fetchに失敗したらerror:trueを返却する', async () => {
    global.fetch = vi.fn().mockRejectedValueOnce(new Error('Fetch error'))

    const url = '/endpoint'
    const response = await fetchOnce(url)

    expect(global.fetch).toHaveBeenCalledWith(`${baseUrl}${url}`)
    expect(response).toEqual({ isLoading: false, error: true })
  })
})
