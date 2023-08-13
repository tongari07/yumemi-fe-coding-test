import { useId } from 'react'
import { useSelectedPrefectures } from './hooks/useSelectedPrefectures'
import { useFetch } from 'lib/useFetch'
import { Prefecture } from 'types'

export const SelectPrefecture = () => {
  const { data, error, isLoading } = useFetch<Prefecture[]>(
    '/api/getPrefectures',
  )
  const { selectedPrefectures, handleCheckPrefecture } =
    useSelectedPrefectures()
  const id = useId()

  if (isLoading) {
    return <p>Now Loading...</p>
  }

  if (error) {
    return <p>Error</p>
  }

  return (
    <fieldset id={id} className="flex flex-row flex-wrap gap-4">
      {data?.map((prefecture) => (
        <label className="flex flex-row gap-2" key={prefecture.prefCode}>
          <input
            type="checkbox"
            name="prefecture"
            value={prefecture.prefCode}
            checked={selectedPrefectures.has(prefecture.prefCode)}
            onChange={(e) =>
              handleCheckPrefecture(
                e.currentTarget.value,
                e.currentTarget.checked,
              )
            }
          />
          {prefecture.prefName}
        </label>
      ))}
    </fieldset>
  )
}
