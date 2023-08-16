import { render, screen, waitFor } from '@testing-library/react'
import App from './App'
import { rest } from 'msw'
import { setupMockServer } from 'tests/mockServer'
import { mockPrefectures } from 'tests/mocks'
import { mockResizeObserver } from 'tests/mockResizeObserver'

setupMockServer(
  rest.get('http://localhost:3000/api/getPrefectures', (_, res, ctx) =>
    res(ctx.status(200), ctx.json(mockPrefectures)),
  ),
)

mockResizeObserver()

describe('SelectPrefecture', () => {
  test('ローディング中の画面が表示される', () => {
    const { container } = render(<App />)
    expect(container).toHaveTextContent('Now Loading...')
  })

  test('タイトルが表示される', async () => {
    render(<App />)

    await waitFor(() => {
      const linkElement = screen.getByText('都道府県別 総人口推移グラフ')
      expect(linkElement).toBeInTheDocument()
    })
  })
})
