import { SelectPrefecture } from 'components/SelectPrefecture'

function App() {
  return (
    <>
      <header className="grid place-content-center">
        <h1 className="text-6xl font-bold">Population trends by prefecture</h1>
      </header>
      <main className="flex min-h-screen flex-col items-center gap-4 p-24">
        <section>
          <SelectPrefecture />
        </section>
      </main>
    </>
  )
}

export default App
