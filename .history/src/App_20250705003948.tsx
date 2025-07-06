import './App.css'
import { BASE_URL } from './common/base-url'
import Button from './components/ui/button'
import useGet from './hooks/use-get'
import type Vehicle from './types/vehicle'

function App() {
  const { data, loading, error } = useGet<Vehicle[]>(`${BASE_URL}/vehicles`)
  // curl -X GET "https://api-v3.mbta.com/vehicles?page%5Boffset%5D=0&page%5Blimit%5D=10" -H "accept: application/vnd.api+json"
  console.log(data)

  return (
    <div>

      <Button>Button</Button>
    </div>
  )
}

export default App
