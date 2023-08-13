import { render, waitFor } from '@testing-library/react'
import { SelectPrefecture } from '.'
import userEvent from '@testing-library/user-event'
import { PrefecturesProvider } from 'providers/PrefecturesProvider'
import { mockPrefectures } from 'tests/mocks'

const user = userEvent.setup()
describe('SelectPrefecture', () => {
  test('北海道から群馬県までの都道府県が表示される', async () => {
    const { getByRole } = render(
      <PrefecturesProvider prefectures={mockPrefectures}>
        <SelectPrefecture />
      </PrefecturesProvider>,
    )
    await waitFor(() => {
      expect(getByRole('checkbox', { name: '北海道' })).toBeInTheDocument()
      expect(getByRole('checkbox', { name: '山形県' })).toBeInTheDocument()
      expect(getByRole('checkbox', { name: '群馬県' })).toBeInTheDocument()

      const groups = getByRole('group')
      expect(groups.childElementCount).toBe(10)
    })
  })

  test('チェックが入りprefCodeがsearchParamに反映される', async () => {
    const { getByRole } = render(
      <PrefecturesProvider prefectures={mockPrefectures}>
        <SelectPrefecture />
      </PrefecturesProvider>,
    )

    await waitFor(async () => {
      expect(window.location.search).toBe('')

      const hokkaido = getByRole('checkbox', { name: '北海道' })
      expect(hokkaido).not.toBeChecked()
      await user.click(hokkaido)
      expect(hokkaido).toBeChecked()
      expect(window.location.search).toBe('?prefCode=1')

      const gunma = getByRole('checkbox', { name: '群馬県' })
      expect(gunma).not.toBeChecked()
      await user.click(gunma)
      expect(gunma).toBeChecked()
      expect(window.location.search).toBe('?prefCode=1&prefCode=10')

      await user.click(hokkaido)
      expect(hokkaido).not.toBeChecked()
      expect(window.location.search).toBe('?prefCode=10')
    })
  })
})
