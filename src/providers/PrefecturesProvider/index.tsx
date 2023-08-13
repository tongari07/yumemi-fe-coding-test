import React, { Dispatch, SetStateAction, createContext } from 'react'
import { Prefecture } from 'types'

type PrefecturesContextType = {
  prefectures: Prefecture[]
  selectedPrefectures: Set<Prefecture['prefCode']>
}

export const prefecturesContext = createContext<PrefecturesContextType>({
  prefectures: [],
  selectedPrefectures: new Set(),
})

export const setPrefecturesContext = createContext<
  Dispatch<SetStateAction<Set<Prefecture['prefCode']>>>
>(() => undefined)

type PrefecturesProviderProps = {
  children: React.ReactNode
  prefectures: Prefecture[]
}

export const PrefecturesProvider = ({
  children,
  prefectures,
}: PrefecturesProviderProps) => {
  const [selectedPrefectures, setSelectedPrefectures] = React.useState<
    Set<Prefecture['prefCode']>
  >(new Set())

  return (
    <prefecturesContext.Provider value={{ prefectures, selectedPrefectures }}>
      <setPrefecturesContext.Provider value={setSelectedPrefectures}>
        {children}
      </setPrefecturesContext.Provider>
    </prefecturesContext.Provider>
  )
}
