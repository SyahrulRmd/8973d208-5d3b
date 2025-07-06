import { useLayoutEffect, useRef, useState } from 'react'
import { BASE_URL } from './common/base-url'
import { formatDate, formatStatus } from './common/formatter'
import useGet from './hooks/use-get'
import type Vehicle from './types/vehicle'
import Dialog from './components/ui/dialog'
import Button from './components/ui/button'
import CustomDialog from './components/ui/dialog'
import BusIcon from './components/icons/bus'
import { ChevronLeft, ChevronRight, Loader2, Plus } from 'lucide-react'

function App() {
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(10)
  const fields = 'fields[vehicle]=speed,occupancy_status,revenue_status,longitude,latitude,label,direction_id,current_stop_sequence,current_status,carriages,bearing,updated_at'
  const pageParams = `page[offset]=${offset}&page[limit]=${limit}`

  const { data, loading, error, refetch } = useGet<ListWrapper<Vehicle[]>>(`${BASE_URL}/vehicles?${encodeURI(fields)}&${encodeURI(pageParams)}`, { isArray: true },)

  return (
    <div>
      <section className='container'>
        <div className='grid grid-cols-12 sm:gap-10 gap-4 min-h-[70dvh]'>
          {loading ? (
            <div className='col-span-12 h-full flex flex-col justify-center items-center'>
              <Loader2 className='w-10 h-10 animate-spin' />
            </div>
          ) : error ? (
            <div className='col-span-12'>
              <div className='bg-white rounded-lg p-4 shadow-md space-y-3'>
                <div className='flex justify-center items-center h-24'>
                  <p className='text-sm'>Something went wrong. Please try again.</p>
                </div>
              </div>
            </div>
          ) : (
            data?.data?.map((vehicle, index) => (
              <div key={index} className='col-span-12 sm:col-span-6 md:col-span-4'>
                <VehicleCard vehicle={vehicle} />
              </div>
            )))}
        </div>
        <div className='flex justify-center gap-4 mt-10'>
          <Button className='w-10 h-10 p-2!' onClick={() => data?.links.prev && refetch(data.links.prev)}>
            <ChevronLeft className='w-5 h-5' />
          </Button>
          <Button className='w-10 h-10 p-2!' onClick={() => data?.links && refetch(data?.links.next)}>
            <ChevronRight className='w-5 h-5' />
          </Button>
        </div>
        <div className='flex justify-center gap-4 mt-10'>
          <p>Menampilkan</p>
          <p>{offset + 1} - {offset + limit}</p>
          <p>dari {10}</p>
        </div>
      </section>
    </div>
  )
}

export default App

const VehicleCard = ({ vehicle }: { vehicle: Vehicle }) => {
  const [isOpen, setIsOpen] = useState(false)

  const statusBgColor = (status: string) => {
    switch (status) {
      case "IN_TRANSIT_TO":
        return 'bg-blue-500/20 text-blue-500 border border-blue-500'
      case "STOPPED_AT":
        return 'bg-orange-400/20 text-orange-400 border border-orange-400'
      case 'INCOMING_AT':
        return 'bg-green-500/20 text-green-500 border border-green-500'
      default:
        return 'bg-gray-500/20 text-gray-500 border border-gray-500'
    }
  }


  return (
    <>
      <div onClick={() => setIsOpen(true)} >
        <div className='bg-white rounded-lg p-4 shadow-md space-y-3'>
          <div className='flex justify-between items-center'>
            <div className='flex items-center gap-2'>
              <BusIcon className='w-6 h-6' />
              <h3 className='text-xl font-bold'>{vehicle.label}</h3>
            </div>
            <p className={`px-2 py-1 rounded-md text-xs ${statusBgColor(vehicle.current_status)} `}>{formatStatus(vehicle.current_status)}</p>
          </div>
          <div className='space-y-1'>
            <p className='text-sm text-gray-500'><span className='font-semibold'>Lattitude:</span> {vehicle.latitude}</p>
            <p className='text-sm text-gray-500'><span className='font-semibold'>Longitude:</span> {vehicle.longitude}</p>
          </div>
          <div>
            <p className='text-sm text-gray-500'>Terakhir Di-update</p>
            <p className='text-sm text-gray-500'>{formatDate(vehicle.updated_at)}</p>
          </div>
        </div>
      </div>
      <CustomDialog isOpen={isOpen} setIsOpen={setIsOpen} title='Dialog'>
        <div>
          <h3 className='text-lg font-bold'>{vehicle.label}</h3>
          <p className={`text-sm  ${statusBgColor(vehicle.current_status)} px-2 py-1 rounded-md`}>{formatStatus(vehicle.current_status)}</p>
          <p className='text-sm text-gray-500'>{vehicle.latitude} & {vehicle.longitude}</p>
          <p className='text-sm text-gray-500'>{formatDate(vehicle.updated_at)}</p>
        </div>
      </CustomDialog>
    </>
  )
}

