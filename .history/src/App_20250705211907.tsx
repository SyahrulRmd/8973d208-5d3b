import { useLayoutEffect, useRef, useState } from 'react'
import { BASE_URL } from './common/base-url'
import { formatDate, formatStatus } from './common/formatter'
import useGet from './hooks/use-get'
import type Vehicle from './types/vehicle'
import Dialog from './components/ui/dialog'
import Button from './components/ui/button'
import CustomDialog from './components/ui/dialog'

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
            <VehicleCard key={index} vehicle={vehicle} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default App

const VehicleCard = ({ vehicle }: { vehicle: Vehicle }) => {
  const [isOpen, setIsOpen] = useState(false)


  console.log(formatStatus(vehicle.current_status));

  const statusBgColor = (status: string) => {
    switch (status) {
      case "IN_TRANSIT_TO":
        return 'bg-blue-300'
      case "STOPPED_AT":
        return 'bg-yellow-300'
      case 'INCOMING_AT':
        return 'bg-green-300'
      default:
        return 'bg-gray-300'
    }
  }


  return (
    <>
      <div onClick={() => setIsOpen(true)} className='col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3'>
        <div className='bg-white rounded-lg p-4 shadow-md'>
          <div className='flex justify-between items-center'>
            <h3 className='text-lg font-bold'>{vehicle.label}</h3>
            <p className={`text-sm  ${statusBgColor(vehicle.current_status)} px-2 py-1 rounded-md`}>{formatStatus(vehicle.current_status)}</p>
          </div>
          <p className='text-sm text-gray-500'>{vehicle.latitude} & {vehicle.longitude}</p>
          <p className='text-sm text-gray-500'>Per {formatDate(vehicle.updated_at)}</p>
        </div>
      </div>
      <CustomDialog isOpen={isOpen} setIsOpen={setIsOpen} title='Dialog'>
        <div>
          <h3 className='text-lg font-bold'>{vehicle.label}</h3>
          <p className={`text-sm  ${statusBgColor(vehicle.current_status)} px-2 py-1 rounded-md`}>{formatStatus(vehicle.current_status)}</p>
          <p className='text-sm text-gray-500'>{vehicle.latitude} & {vehicle.longitude}</p>
          <p className='text-sm text-gray-500'>Per {formatDate(vehicle.updated_at)}</p>
        </div>
      </CustomDialog>
    </>
  )
}

