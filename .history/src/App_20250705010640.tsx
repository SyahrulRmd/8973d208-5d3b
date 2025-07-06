import { BASE_URL } from './common/base-url'
import { formatDate } from './common/formatter'
import useGet from './hooks/use-get'
import type Vehicle from './types/vehicle'

function App() {
  const fields = 'fields[vehicle]=speed,occupancy_status,revenue_status,longitude,latitude,label,direction_id,current_stop_sequence,current_status,carriages,bearing,updated_at'
  const page = 'page[offset]=0&page[limit]=10'

  const { data, loading, error } = useGet<Vehicle[]>(`${BASE_URL}/vehicles?${encodeURI(fields)}&${encodeURI(page)}`, { isArray: true },)

  console.log(data)

  return (
    <div>
      <section className='container'>
        <div className='grid grid-cols-12 sm:gap-10 gap-4'>
          {data?.map((vehicle, index) => (
            <div key={index} className='col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3'>
              <div className='bg-white rounded-lg p-4'>
                <h3 className='text-lg font-bold'>{vehicle.label}</h3>
                <p className='text-sm text-gray-500'>{vehicle.current_status}</p>
                <p className='text-sm text-gray-500'>{vehicle.latitude}</p>
                <p className='text-sm text-gray-500'>{vehicle.longitude}</p>
                <p className='text-sm text-gray-500'>{formatDate(vehicle.updated_at)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default App
