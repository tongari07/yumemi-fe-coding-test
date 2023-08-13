import { render, screen } from '@testing-library/react'
import React from 'react'
import {
  PrefecturesProvider,
  prefecturesContext,
  setPrefecturesContext,
} from '.'
import { mockPrefectures } from 'tests/mocks'

describe('PrefecturesProvider', () => {
  test('prefecturesが取得できる', () => {
    // 子コンポーネントでコンテキスト値を表示
    const TestComponent: React.FC = () => {
      const context = React.useContext(prefecturesContext)
      return <div>{context.prefectures[0].prefName}</div>
    }

    render(
      <PrefecturesProvider prefectures={mockPrefectures}>
        <TestComponent />
      </PrefecturesProvider>,
    )

    expect(screen.getByText(mockPrefectures[0].prefName)).toBeInTheDocument()
  })

  test('setSelectedPrefecturesを実行するとselectedPrefecturesを上書きできる', () => {
    // 子コンポーネントでsetSelectedPrefecturesを呼び出し
    const TestComponent: React.FC = () => {
      const setSelectedPrefectures = React.useContext(setPrefecturesContext)
      const context = React.useContext(prefecturesContext)

      React.useEffect(() => {
        setSelectedPrefectures(new Set([1, 2]))
      }, [setSelectedPrefectures])

      return <div>{Array.from(context.selectedPrefectures).join(', ')}</div>
    }

    render(
      <PrefecturesProvider prefectures={mockPrefectures}>
        <TestComponent />
      </PrefecturesProvider>,
    )

    // setSelectedPrefecturesが呼び出された後、selectedPrefecturesがアップデートされることを確認
    expect(screen.getByText('1, 2')).toBeInTheDocument()
  })
})
