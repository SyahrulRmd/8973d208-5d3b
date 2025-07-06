import './App.css'
import { BASE_URL } from './common/base-url'
import Button from './components/ui/button'
import useGet from './hooks/use-get'
import type Vehicle from './types/vehicle'

function App() {
  const fields = 'fields[vehicle]=speed,occupancy_status,revenue_status,longitude,latitude,label,direction_id,current_stop_sequence,current_status,carriages,bearing'
  const page = 'page[offset]=0&page[limit]=10'

  const { data, loading, error } = useGet<Vehicle[]>(`${BASE_URL}/vehicles?${encodeURI(fields)}&${encodeURI(page)}`, { isArray: true })

  console.log(data)

  return (
    <div>

      <Button>Button</Button>
    </div>
  )
}

export default App
