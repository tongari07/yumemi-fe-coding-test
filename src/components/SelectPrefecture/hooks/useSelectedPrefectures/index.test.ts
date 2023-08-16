import { act, renderHook } from '@testing-library/react'
import { useSelectedPrefectures } from '.'

import * as getSearchParamModules from 'utils/getSearchParams'

const mockGetSearchParam = () => {
  vi.spyOn(getSearchParamModules, 'getSearchParams').mockReturnValue(['1', '2'])
}

describe('useSelectedPrefectures', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('selectedPrefectures', () => {
    test('デフォルトで空になる', () => {
      const { result } = renderHook(() => useSelectedPrefectures())

      expect(result.current.selectedPrefectures).toEqual(new Set())
    })

    test('useSearchParamsの結果が数値のSetで格納される', () => {
      mockGetSearchParam()
      const { result } = renderHook(() => useSelectedPrefectures())

      expect(result.current.selectedPrefectures).toEqual(new Set(['1', '2']))
      vi.mock
    })
  })

  describe('handleChange', () => {
    const assert = (
      actualSelectedPrefectures: Set<string>,
      expectedValues: string[],
    ) => {
      const expectedNumberSet = new Set(expectedValues)
      const expectedSearchParam = expectedValues.reduce((acc, value) => {
        return acc === '' ? `?prefCode=${value}` : `${acc}&prefCode=${value}`
      }, '')

      expect(actualSelectedPrefectures).toEqual(expectedNumberSet)
      expect(window.location.search).toBe(expectedSearchParam)
    }

    test('チェックを付けるとselectedPrefecturesに追加されsearchParamにprefCodeが追加される', () => {
      const { result } = renderHook(() => useSelectedPrefectures())

      assert(result.current.selectedPrefectures, [])

      act(() => {
        result.current.handleCheckPrefecture('1', true)
      })
      assert(result.current.selectedPrefectures, ['1'])

      act(() => {
        result.current.handleCheckPrefecture('2', true)
      })
      assert(result.current.selectedPrefectures, ['1', '2'])
    })

    test('チェックを外すとselectedPrefecturesから削除されsearchParamからprefCodeが削除される', () => {
      mockGetSearchParam()
      const { result } = renderHook(() => useSelectedPrefectures())

      expect(result.current.selectedPrefectures).toEqual(new Set(['1', '2']))
      expect(window.location.search).toBe('?prefCode=1&prefCode=2')

      act(() => {
        result.current.handleCheckPrefecture('1', false)
      })

      assert(result.current.selectedPrefectures, ['2'])
    })
  })
})
