import React from 'react'
import { Prefecture } from 'types'
import { getSearchParams } from 'utils/getSearchParams'

export const useSelectedPrefectures = (
  selectedPrefectureCallback: (prefCode: string, isChecked: boolean) => void,
) => {
  const [selectedPrefectures, setSelectedPrefectures] = React.useState<
    Set<Prefecture['prefCode']>
  >(new Set())

  React.useEffect(() => {
    const searchParams = getSearchParams('prefCode')
    const newSelectedPrefectures = searchParams
    setSelectedPrefectures(new Set(newSelectedPrefectures))
  }, [])

  const handleCheckPrefecture = React.useCallback(
    (newCheckedPrefCode: string, isChecked: boolean) => {
      const newSelectedPrefectures = new Set(selectedPrefectures)
      if (isChecked) {
        newSelectedPrefectures.add(newCheckedPrefCode)
      } else {
        newSelectedPrefectures.delete(newCheckedPrefCode)
      }

      setSelectedPrefectures(newSelectedPrefectures)
      selectedPrefectureCallback(newCheckedPrefCode, isChecked)

      const url = new URL(window.location.href)
      url.searchParams.delete('prefCode')
      newSelectedPrefectures.forEach((prefCode) => {
        url.searchParams.append('prefCode', String(prefCode))
      })
      window.history.replaceState({}, '', url.toString())
    },
    [selectedPrefectureCallback, selectedPrefectures],
  )

  return { selectedPrefectures, handleCheckPrefecture }
}
