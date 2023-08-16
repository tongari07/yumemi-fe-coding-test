import { fetchAll } from '.'

const baseUrl = import.meta.env.VITE_API_BASE_URL

describe('fetchAll', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('全てのfetchが成功したら配列形式のdataを返却する', async () => {
    const mockData = [{ key1: 'value1' }, { key2: 'value2' }]
    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({
        json: vi.fn().mockResolvedValueOnce(mockData[0]),
      })
      .mockResolvedValueOnce({
        json: vi.fn().mockResolvedValueOnce(mockData[1]),
      })

    const urls = ['/endpoint1', '/endpoint2']
    const response = await fetchAll<typeof mockData>(urls)

    expect(global.fetch).toHaveBeenCalledTimes(urls.length)
    expect(global.fetch).toHaveBeenCalledWith(`${baseUrl}${urls[0]}`)
    expect(global.fetch).toHaveBeenCalledWith(`${baseUrl}${urls[1]}`)
    expect(response).toEqual({ data: mockData, error: false })
  })

  it('1つでもfetchが失敗したらerror:trueを返却する', async () => {
    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({
        json: vi.fn().mockResolvedValueOnce({ key1: 'value1' }),
      })
      .mockRejectedValueOnce(new Error('Fetch error'))

    const urls = ['/endpoint1', '/endpoint2']
    const response = await fetchAll(urls)

    expect(global.fetch).toHaveBeenCalledTimes(urls.length)
    expect(global.fetch).toHaveBeenCalledWith(`${baseUrl}${urls[0]}`)
    expect(global.fetch).toHaveBeenCalledWith(`${baseUrl}${urls[1]}`)
    expect(response).toEqual({ error: true })
  })
})
