import { PopulationCompositionChart } from 'components/PopulationCompositionChart'
import { SelectPrefecture } from 'components/SelectPrefecture'
import { usePopulationComposition } from 'hooks/usePopulationComposition'
import { usePrefectures } from 'hooks/usePrefectures'

function App() {
  const { prefectures, error, isLoading } = usePrefectures()
  const {
    populationCompositionDatas,
    isLoading: populationCompositionIsLoading,
    fetchPopulationComposition,
  } = usePopulationComposition(prefectures)

  if (isLoading || !prefectures) {
    return <div>Now Loading...</div>
  }

  if (error) {
    return <div>Error</div>
  }

  return (
    <>
      <header className="grid place-content-center">
        <h1 className="text-6xl font-bold">Population trends by prefecture</h1>
      </header>
      <main className="flex min-h-screen flex-col items-center gap-8 p-24">
        <section>
          <SelectPrefecture
            prefectures={prefectures}
            selectedPrefectureCallback={fetchPopulationComposition}
            disabled={populationCompositionIsLoading}
          />
        </section>
        <section className="w-full flex-1">
          {populationCompositionIsLoading && !populationCompositionDatas ? (
            <div>Now Loading...</div>
          ) : (
            <PopulationCompositionChart datas={populationCompositionDatas} />
          )}
        </section>
      </main>
    </>
  )
}

export default App
