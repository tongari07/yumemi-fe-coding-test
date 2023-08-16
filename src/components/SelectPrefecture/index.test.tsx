import { render, waitFor } from '@testing-library/react'
import { SelectPrefecture } from '.'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { setupMockServer } from 'tests/mockServer'

const mockPrefectures = [
  { prefCode: 1, prefName: '北海道' },
  { prefCode: 2, prefName: '青森県' },
  { prefCode: 3, prefName: '岩手県' },
  { prefCode: 4, prefName: '宮城県' },
  { prefCode: 5, prefName: '秋田県' },
  { prefCode: 6, prefName: '山形県' },
  { prefCode: 7, prefName: '福島県' },
  { prefCode: 8, prefName: '茨城県' },
  { prefCode: 9, prefName: '栃木県' },
  { prefCode: 10, prefName: '群馬県' },
]

const user = userEvent.setup()
setupMockServer(
  rest.get('http://localhost:3000/api/getPrefectures', (_, res, ctx) =>
    res(ctx.status(200), ctx.json({ result: mockPrefectures })),
  ),
)
// const server = setupMockServer(
//   rest.get('http://localhost:3000/api/getPrefectures', (_, res, ctx) =>
//     res(ctx.status(200), ctx.json({ result: mockPrefectures })),
//   ),
// )

describe('SelectPrefecture', () => {
  test('ローディング中の画面が表示される', () => {
    const { container } = render(<SelectPrefecture />)
    expect(container).toHaveTextContent('Now Loading...')
  })

  test('北海道から群馬県までの都道府県が表示される', async () => {
    const { getByRole } = render(<SelectPrefecture />)
    await waitFor(() => {
      expect(getByRole('checkbox', { name: '北海道' })).toBeInTheDocument()
      expect(getByRole('checkbox', { name: '山形県' })).toBeInTheDocument()
      expect(getByRole('checkbox', { name: '群馬県' })).toBeInTheDocument()

      const groups = getByRole('group')
      expect(groups.childElementCount).toBe(10)
    })
  })

  test('北海道を選択するとチェックが入りprefCodeがsearchParamに反映される', async () => {
    const { getByRole } = render(<SelectPrefecture />)

    await waitFor(async () => {
      const target = getByRole('checkbox', { name: '北海道' })
      expect(target).not.toBeChecked()

      await user.click(target)
      expect(target).toBeChecked()
      expect(window.location.search).toBe('?prefCode=1')
    })
  })

  // test('APIでエラーが発生した場合エラー画面を表示する', async () => {
  //   server.use(
  //     rest.get('http://localhost:3000/api/getPrefectures', (_, res, ctx) =>
  //       res(ctx.status(500)),
  //     ),
  //   )
  //   const { container } = render(<SelectPrefecture />)
  //   await waitFor(() => {
  //     expect(container).toHaveTextContent('Error')
  //   })
  // })
})
