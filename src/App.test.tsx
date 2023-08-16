import { render, screen, waitFor } from '@testing-library/react'
import App from './App'
import { rest } from 'msw'
import { setupMockServer } from 'tests/mockServer'
import { mockPrefectures } from 'tests/mocks'

setupMockServer(
  rest.get('http://localhost:3000/api/getPrefectures', (_, res, ctx) =>
    res(ctx.status(200), ctx.json(mockPrefectures)),
  ),
)

describe('SelectPrefecture', () => {
  test('ローディング中の画面が表示される', () => {
    const { container } = render(<App />)
    expect(container).toHaveTextContent('Now Loading...')
  })

  test('タイトルが表示される', async () => {
    render(<App />)

    await waitFor(() => {
      const linkElement = screen.getByText(/Population trends by prefecture/i)
      expect(linkElement).toBeInTheDocument()
    })
  })
})
