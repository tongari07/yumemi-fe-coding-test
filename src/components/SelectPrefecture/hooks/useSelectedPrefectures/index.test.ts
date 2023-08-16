import { act, renderHook } from '@testing-library/react'
import { useSelectedPrefectures } from '.'

import * as getSearchParamModules from 'utils/getSearchParams'

describe('useSelectedPrefectures', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('selectedPrefectures', () => {
    test('デフォルトで空になる', () => {
      const { result } = renderHook(() =>
        useSelectedPrefectures(() => undefined),
      )

      expect(result.current.selectedPrefectures).toEqual(new Set())
    })

    test('getSearchParamsの結果が数値のSetで格納される', () => {
      vi.spyOn(getSearchParamModules, 'getSearchParams').mockReturnValue([
        '1',
        '2',
      ])
      const { result } = renderHook(() =>
        useSelectedPrefectures(() => undefined),
      )

      expect(result.current.selectedPrefectures).toEqual(new Set(['1', '2']))
      vi.mock
    })
  })

  describe('handleChange', () => {
    const mockSelectedPrefectureCallback = vi.fn()

    afterEach(() => {
      mockSelectedPrefectureCallback.mockClear()
      // URLSearchParamsを初期化
      window.history.replaceState({}, '', '/')
    })

    test('チェックを付けるとselectedPrefecturesに追加されsearchParamにprefCodeが追加される', () => {
      const { result } = renderHook(() =>
        useSelectedPrefectures(mockSelectedPrefectureCallback),
      )

      expect(result.current.selectedPrefectures).toEqual(new Set([]))
      expect(window.location.search).toBe('')
      act(() => {
        result.current.handleCheckPrefecture('1', true)
      })
      expect(mockSelectedPrefectureCallback).toHaveBeenCalledWith('1', true)
      act(() => {
        result.current.handleCheckPrefecture('2', true)
      })
      expect(mockSelectedPrefectureCallback).toHaveBeenCalledWith('2', true)
      expect(result.current.selectedPrefectures).toEqual(new Set(['1', '2']))
      expect(window.location.search).toBe('?prefCode=1&prefCode=2')
      expect(mockSelectedPrefectureCallback).toBeCalledTimes(2)
    })

    test('チェックを外すとselectedPrefecturesから削除されsearchParamからprefCodeが削除される', () => {
      // SearchParamsを設定
      window.history.replaceState({}, '', '?prefCode=1&prefCode=2')
      const { result } = renderHook(() =>
        useSelectedPrefectures(mockSelectedPrefectureCallback),
      )

      expect(result.current.selectedPrefectures).toEqual(new Set(['1', '2']))
      expect(window.location.search).toBe('?prefCode=1&prefCode=2')

      act(() => {
        result.current.handleCheckPrefecture('1', false)
      })

      expect(mockSelectedPrefectureCallback).toHaveBeenCalledWith('1', false)
      expect(result.current.selectedPrefectures).toEqual(new Set(['2']))
      expect(window.location.search).toBe('?prefCode=2')
      expect(mockSelectedPrefectureCallback).toBeCalledTimes(1)
    })
  })
})
