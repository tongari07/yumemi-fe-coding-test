export const mockResizeObserver = () => {
  const { ResizeObserver } = window

  beforeEach(() => {
    // https://github.com/maslianok/react-resize-detector/issues/145
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delete window.ResizeObserver
    window.ResizeObserver = vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }))
  })

  afterEach(() => {
    window.ResizeObserver = ResizeObserver
    vi.restoreAllMocks()
  })
}
