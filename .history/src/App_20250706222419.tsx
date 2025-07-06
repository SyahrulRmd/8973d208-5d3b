import { useLayoutEffect, useRef, useState } from 'react'
import { BASE_URL } from './common/base-url'
import { formatDate, formatStatus } from './common/formatter'
import useGet from './hooks/use-get'
import type Vehicle from './types/vehicle'
import Dialog from './components/ui/dialog'
import Button from './components/ui/button'
import CustomDialog from './components/ui/dialog'
import BusIcon from './components/icons/bus'
import { ChevronLeft, ChevronRight, ChevronsLeftIcon, ChevronsRightIcon, Loader2, Plus } from 'lucide-react'
import Dropdown from './components/ui/dropdown'

const LIMIT_OPTIONS = [
  { label: '10', value: '10' },
  { label: '20', value: '20' },
  { label: '30', value: '30' },
]

function App() {
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(10)
  const fields = 'fields[vehicle]=speed,occupancy_status,revenue_status,longitude,latitude,label,direction_id,current_stop_sequence,current_status,carriages,bearing,updated_at'
  const pageParams = `page[offset]=${offset}&page[limit]=${limit}`

  const { data, loading, error, refetch } = useGet<ListWrapper<TypeWrapper<Vehicle>[]>>(`${BASE_URL}/vehicles?${encodeURI(fields)}&${encodeURI(pageParams)}`, { isArray: true },)

  const handleNextPage = () => {
    if (data?.links.next) {
      refetch(data.links.next)
      const newOffset = data['links']['next'].split('page[offset]=')[1]
      setOffset(Number(newOffset))
    }
  }

  const handlePrevPage = () => {
    if (data?.links.prev) {
      refetch(data.links.prev)
      const newOffset = data['links']['prev'].split('page[offset]=')[1]
      setOffset(Number(newOffset))
    }
  }

  const handleFirstPage = () => {
    if (data?.links.first) {
      refetch(data.links.first)
      setOffset(0)
    }
  }

  const handleLastPage = () => {
    if (data?.links.last) {
      refetch(data.links.last)
      const newOffset = data['links']['last'].split('page[offset]=')[1]
      setOffset(Number(newOffset))
    }
  }


  return (
    <div>
      <section className='container min-h-[70dvh]'>
        <div className='flex justify-between items-center mb-10'>
          <h1 className='text-2xl font-bold'>Data Kendaraan</h1>
          <RouteFilter />
        </div>
        <div className='grid grid-cols-12 sm:gap-10 gap-4'>
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
                <VehicleCard vehicle={vehicle.attributes} />
              </div>
            )))}
        </div>
        <div className='flex justify-end items-center flex-wrap gap-4 mt-10'>
          <div className='flex flex-wrap justify-end items-center gap-4 text-sm'>
            <div className='flex justify-center gap-1 items-center'>
              <p>Data per halaman</p>
              <Dropdown options={LIMIT_OPTIONS} selected={limit.toString()} onChange={(value) => setLimit(Number(value))} />
            </div>
            <div className='flex justify-center gap-4'>
              <p>Menampilkan {offset + 1} - {offset + limit} dari {data?.total} Data</p>
            </div>
          </div>
          <div className='flex flex-wrap gap-4'>
            <Button variant='outline' className='w-9 h-9 p-2!' onClick={handleFirstPage} disabled={offset === 0}>
              <ChevronsLeftIcon className='w-5 h-5' />
            </Button>
            <Button variant='outline' className='w-9 h-9 p-2!' onClick={handlePrevPage} disabled={!data?.links.prev}>
              <ChevronLeft className='w-5 h-5' />
            </Button>
            <Button variant='outline' className='w-9 h-9 p-2!' onClick={handleNextPage} disabled={!data?.links.next}>
              <ChevronRight className='w-5 h-5' />
            </Button>
            <Button variant='outline' className='w-9 h-9 p-2!' onClick={handleLastPage} disabled={(Number(offset) + Number(limit)) === Number(data?.total)}>
              <ChevronsRightIcon className='w-5 h-5' />
            </Button>
          </div>
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
      <div onClick={() => setIsOpen(true)} className='bg-white h-full rounded-lg p-4 shadow-md space-y-3 cursor-pointer'>
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

const RouteFilter = () => {
  const [limit, setLimit] = useState(10)
  const [selectedRoute, setSelectedRoute] = useState<string[]>([])
  const pageParams = `page[offset]=0&page[limit]=${limit}`
  const { data: routes } = useGet<ListWrapper<TypeWrapper<Route>[]>>(`${BASE_URL}/routes?${encodeURI(pageParams)}`, { isArray: true })

  return (
    <div>
      <h3 className='text-lg font-bold'>Rute</h3>
      <div className='flex flex-wrap gap-2'>
        {/* {routes?.data?.map((route, index) => (
          <div key={index}>{route.long_name}</div>
        ))} */}
        {routes?.data.length && (
          <Dropdown
            options={routes?.data?.map((route) => ({ label: route.attributes.long_name, value: route.id }))}
            selected={selectedRoute}
            onChange={setSelectedRoute}
            isMulti={true}
            placeholder='Pilih Rute'
          />
        )}
      </div>
    </div>
  )
}
