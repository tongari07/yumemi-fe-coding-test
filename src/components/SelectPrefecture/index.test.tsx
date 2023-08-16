import { render, waitFor } from '@testing-library/react'
import { SelectPrefecture } from '.'
import userEvent from '@testing-library/user-event'
import { mockPrefectures } from 'tests/mocks'

const user = userEvent.setup()

describe('SelectPrefecture', () => {
  test('北海道から群馬県までの都道府県が表示される', async () => {
    const { getByRole } = render(
      <SelectPrefecture prefectures={mockPrefectures} />,
    )
    await waitFor(() => {
      expect(getByRole('checkbox', { name: '北海道' })).toBeInTheDocument()
      expect(getByRole('checkbox', { name: '山形県' })).toBeInTheDocument()
      expect(getByRole('checkbox', { name: '群馬県' })).toBeInTheDocument()

      const groups = getByRole('group')
      expect(groups.childElementCount).toBe(10)
    })
  })

  test('北海道を選択するとチェックが入りprefCodeがsearchParamに反映される', async () => {
    const { getByRole } = render(
      <SelectPrefecture prefectures={mockPrefectures} />,
    )

    await waitFor(async () => {
      const target = getByRole('checkbox', { name: '北海道' })
      expect(target).not.toBeChecked()

      await user.click(target)
      expect(target).toBeChecked()
      expect(window.location.search).toBe('?prefCode=1')
    })
  })
})
