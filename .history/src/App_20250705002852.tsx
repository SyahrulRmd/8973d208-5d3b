import './App.css'
import Button from './components/ui/button'
import useGet from './hooks/use-get'
import type Vehicle from './types/vehicle'

function App() {
  const { data, loading, error } = useGet<Vehicle[]>('https://api-v3.mbta.com/vehicles')

  console.log(data)

  return (
    <div>

      <Button>Button</Button>
    </div>
  )
}

export default App
