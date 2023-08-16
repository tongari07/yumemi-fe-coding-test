import { useId } from 'react'
import { useSelectedPrefectures } from './hooks/useSelectedPrefectures'

import { Prefecture } from 'types'

type Props = {
  prefectures: Prefecture[]
}

export const SelectPrefecture = ({ prefectures }: Props) => {
  const { selectedPrefectures, handleCheckPrefecture } =
    useSelectedPrefectures()
  const id = useId()

  return (
    <fieldset id={id} className="flex flex-row flex-wrap gap-4">
      {prefectures.map((prefecture) => (
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
