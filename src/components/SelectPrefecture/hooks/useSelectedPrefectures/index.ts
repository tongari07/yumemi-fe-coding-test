import {
  prefecturesContext,
  setPrefecturesContext,
} from 'providers/PrefecturesProvider'
import React from 'react'
import { getSerachParam } from 'utils/getSearchParam'

export const useSelectedPrefectures = () => {
  const { selectedPrefectures } = React.useContext(prefecturesContext)
  const setSelectedPrefectures = React.useContext(setPrefecturesContext)

  React.useEffect(() => {
    const searchParams = getSerachParam('prefCode')
    const newSelectedPrefectures = searchParams.map((param) => Number(param))
    setSelectedPrefectures(new Set(newSelectedPrefectures))
  }, [setSelectedPrefectures])

  const handleCheckPrefecture = React.useCallback(
    (newCheckedPrefCode: string, isChecked: boolean) => {
      const newSelectedPrefectures = new Set(selectedPrefectures)
      if (isChecked) {
        newSelectedPrefectures.add(Number(newCheckedPrefCode))
      } else {
        newSelectedPrefectures.delete(Number(newCheckedPrefCode))
      }

      setSelectedPrefectures(newSelectedPrefectures)

      const url = new URL(window.location.href)
      url.searchParams.delete('prefCode')
      newSelectedPrefectures.forEach((prefCode) => {
        url.searchParams.append('prefCode', String(prefCode))
      })
      window.history.replaceState({}, '', url.toString())
    },
    [selectedPrefectures, setSelectedPrefectures],
  )

  return { selectedPrefectures, handleCheckPrefecture }
}
