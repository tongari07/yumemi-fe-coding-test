import { SelectPrefecture } from 'components/SelectPrefecture'
import { useFetch } from 'lib/useFetch'
import { PrefecturesProvider } from 'providers/PrefecturesProvider'
import { Prefecture } from 'types'

function App() {
  const { data, error, isLoading } = useFetch<Prefecture[]>(
    '/api/getPrefectures',
  )

  if (isLoading || !data) {
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
      <main className="flex min-h-screen flex-col items-center gap-4 p-24">
        <section>
          <PrefecturesProvider prefectures={data}>
            <SelectPrefecture />
          </PrefecturesProvider>
        </section>
      </main>
    </>
  )
}

export default App
