import { useId } from 'react'

import { Prefecture } from 'types'
import { useSelectedPrefectures } from './hooks/useSelectedPrefectures'

type SelectPrefectureProps = {
  prefectures: Prefecture[]
  selectedPrefectureCallback: (prefCode: string, isChecked: boolean) => void
  disabled?: boolean
}

export const SelectPrefecture = ({
  prefectures,
  selectedPrefectureCallback,
  disabled,
}: SelectPrefectureProps) => {
  const { selectedPrefectures, handleCheckPrefecture } = useSelectedPrefectures(
    selectedPrefectureCallback,
  )
  const id = useId()

  return (
    <fieldset id={id} className="grid w-full grid-cols-fluid">
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
            disabled={disabled}
          />
          {prefecture.prefName}
        </label>
      ))}
    </fieldset>
  )
}
