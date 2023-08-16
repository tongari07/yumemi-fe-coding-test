import { SelectPrefecture } from 'components/SelectPrefecture'
import { usePrefectures } from 'hooks/usePrefectures'

function App() {
  const { prefectures, error, isLoading } = usePrefectures()

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
      <main className="flex min-h-screen flex-col items-center gap-4 p-24">
        <section>
          <SelectPrefecture prefectures={prefectures} />
        </section>
      </main>
    </>
  )
}

export default App
