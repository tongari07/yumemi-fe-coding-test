import { fetchOnce } from 'lib/fetchOnce'
import { fetchAll } from 'lib/fetchAll'
import React from 'react'
import {
  PopulationComposition,
  PopulationCompositionData,
  Prefecture,
} from 'types'
import { getSearchParams } from 'utils/getSearchParams'
import { getRandomColor } from 'utils/getRandomColor'

const createDataFromFetchedData = (
  fetchedData: PopulationComposition,
  prefectures?: Prefecture[],
): PopulationCompositionData => {
  return {
    prefCode: fetchedData.prefCode,
    prefName:
      prefectures?.find((pref) => pref.prefCode === fetchedData.prefCode)
        ?.prefName || '',
    data: fetchedData.data?.map((d) => ({
      year: d.year,
      value: d.value,
    })),
    strokeColor: getRandomColor(),
  }
}

export const usePopulationComposition = (prefectures?: Prefecture[]) => {
  const [populationCompositionDatas, setPopulationCompositionDatas] =
    React.useState<PopulationCompositionData[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(false)

  React.useEffect(() => {
    const fetchAllPopulationComposition = async (prefectures: Prefecture[]) => {
      const { data, isLoading, error } = await fetchAll<PopulationComposition>(
        getSearchParams('prefCode').map(
          (prefCode) => `/api/getPopulationComposition?prefCode=${prefCode}`,
        ),
      )
      const addPrefNameData =
        data?.map((d) => createDataFromFetchedData(d, prefectures)) || []
      setPopulationCompositionDatas(addPrefNameData)
      setIsLoading(isLoading)
      setError(error)
    }

    if (!prefectures) return
    fetchAllPopulationComposition(prefectures)
  }, [prefectures])

  const fetchPopulationComposition = React.useCallback(
    async (prefCode: string, isChecked: boolean) => {
      if (!isChecked) {
        setPopulationCompositionDatas((datas) =>
          datas.filter((data) => data.prefCode !== prefCode),
        )
        return
      }

      const { data, error } = await fetchOnce<PopulationComposition>(
        `/api/getPopulationComposition?prefCode=${String(prefCode)}`,
      )
      if (data) {
        const newDataWithPrefCode = createDataFromFetchedData(data, prefectures)
        setPopulationCompositionDatas((datas) => [
          ...datas,
          newDataWithPrefCode,
        ])
      }
      setError(error)
    },
    [prefectures],
  )

  return {
    populationCompositionDatas,
    isLoading,
    error,
    fetchPopulationComposition,
  }
}
