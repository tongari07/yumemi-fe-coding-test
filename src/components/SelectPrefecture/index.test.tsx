import { render, waitFor } from '@testing-library/react'
import { SelectPrefecture } from '.'
import userEvent from '@testing-library/user-event'
import { mockPrefectures } from 'tests/mocks'

const user = userEvent.setup()

describe('SelectPrefecture', () => {
  test('北海道から群馬県までの都道府県が表示される', async () => {
    const { getByRole } = render(
      <SelectPrefecture
        prefectures={mockPrefectures}
        selectedPrefectureCallback={() => undefined}
      />,
    )
    await waitFor(() => {
      expect(getByRole('checkbox', { name: '北海道' })).toBeInTheDocument()
      expect(getByRole('checkbox', { name: '山形県' })).toBeInTheDocument()
      expect(getByRole('checkbox', { name: '群馬県' })).toBeInTheDocument()

      const groups = getByRole('group')
      expect(groups.childElementCount).toBe(10)
    })
  })

  test('チェックが入りprefCodeがsearchParamに反映される。selectedPrefectureCallbackが実行される。', async () => {
    const mockSelectedPrefectureCallback = vi.fn()
    const { getByRole } = render(
      <SelectPrefecture
        prefectures={mockPrefectures}
        selectedPrefectureCallback={mockSelectedPrefectureCallback}
      />,
    )

    await waitFor(async () => {
      const target = getByRole('checkbox', { name: '北海道' })
      expect(target).not.toBeChecked()

      await user.click(target)
      expect(target).toBeChecked()
      expect(window.location.search).toBe('?prefCode=1')
      expect(mockSelectedPrefectureCallback).toBeCalledWith('1', true)

      await user.click(target)
      expect(target).not.toBeChecked()
      expect(window.location.search).toBe('')
      expect(mockSelectedPrefectureCallback).toBeCalledWith('1', false)
    })
  })

  test('disabledが渡されているとき、チェックボックスはdisabledになる', async () => {
    const { getByRole } = render(
      <SelectPrefecture
        prefectures={mockPrefectures}
        selectedPrefectureCallback={() => undefined}
        disabled
      />,
    )

    await waitFor(() => {
      const target = getByRole('checkbox', { name: '北海道' })
      expect(target).toBeDisabled()
    })
  })
})
