import { getSerachParam } from '.'

describe('useSearchParams', () => {
  test('デフォルトで空になる', () => {
    const result = getSerachParam('param')

    expect(result).toEqual([])
  })

  test('paramが1つ指定されているならその値を配列で返す', () => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: {
        search: '?param=1',
      },
    })

    const result = getSerachParam('param')
    expect(result).toEqual(['1'])
  })

  test('paramが複数指定されているならそれらの値配列で返す', () => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: {
        search: '?param=1&param=2&param=3',
      },
    })

    const result = getSerachParam('param')
    expect(result).toEqual(['1', '2', '3'])
  })
})
