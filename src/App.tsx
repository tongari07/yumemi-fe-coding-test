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
        <h1 className="text-2xl font-bold md:text-4xl">
          Population trends by prefecture
        </h1>
      </header>
      <main className="flex min-h-screen flex-col items-center gap-8 px-4 pt-8 md:items-start md:p-24">
        <section className="flex flex-col items-center gap-2 md:items-start">
          <h2 className="w-fit rounded-sm border border-gray-200 px-2 text-xl md:text-2xl">
            都道府県
          </h2>
          <SelectPrefecture
            prefectures={prefectures}
            selectedPrefectureCallback={fetchPopulationComposition}
            disabled={populationCompositionIsLoading}
          />
        </section>
        <section className="flex w-full flex-1 flex-col items-center gap-2 md:items-start">
          <h2 className="w-fit rounded-sm border border-gray-200 px-2 text-xl md:text-2xl">
            人口構成
          </h2>
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
