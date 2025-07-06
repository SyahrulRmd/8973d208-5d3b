import { useEffect, useState } from 'react'
import { BASE_URL } from './common/base-url'
import useGet from './hooks/use-get'
import type Vehicle from './types/vehicle'
import Button from './components/ui/button'
import { ChevronLeft, ChevronRight, ChevronsLeftIcon, ChevronsRightIcon, Loader2 } from 'lucide-react'
import Dropdown from './components/ui/dropdown'
import RouteFilter from './components/route-filter'
import TripFilter from './components/trip-filter'
import VehicleCard from './components/veehicle-card'


const LIMIT_OPTIONS = [
  { label: '10', value: '10' },
  { label: '20', value: '20' },
  { label: '30', value: '30' },
]

function App() {
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(10)
  const [selectedRoute, setSelectedRoute] = useState<TypeWrapper<Route>[]>([])
  const [selectedTrip, setSelectedTrip] = useState<TypeWrapper<Trip>[]>([])
  const routeFilter = selectedRoute.length > 0 ? `&filter[route]=${selectedRoute.map((route) => route.id).join(',')}` : ''
  const tripFilter = selectedTrip.length > 0 ? `&filter[trip]=${selectedTrip.map((trip) => trip.id).join(',')}` : ''

  const pageParams = `page[offset]=${offset}&page[limit]=${limit}${routeFilter}${tripFilter}`

  const { data, loading, error, refetch } = useGet<ListWrapper<TypeWrapper<Vehicle>[]>>(`${BASE_URL}/vehicles?${encodeURI(pageParams)}`, { isArray: true },)

  const handleNextPage = () => {
    if (data?.links?.next) {
      refetch(data.links.next)
      const newOffset = data['links']['next'].split('page[offset]=')[1]
      setOffset(Number(newOffset))
    }
  }

  const handlePrevPage = () => {
    if (data?.links?.prev) {
      refetch(data.links.prev)
      const newOffset = data['links']['prev'].split('page[offset]=')[1]
      setOffset(Number(newOffset))
    }
  }

  const handleFirstPage = () => {
    if (data?.links?.first) {
      refetch(data.links.first)
      setOffset(0)
    }
  }

  const handleLastPage = () => {
    if (data?.links?.last) {
      refetch(data.links.last)
      const newOffset = data['links']['last'].split('page[offset]=')[1]
      setOffset(Number(newOffset))
    }
  }

  useEffect(() => {
    setSelectedTrip([])
    setLimit(10)
  }, [selectedRoute])

  return (
    <div>
      <section className='container min-h-[70dvh]'>
        <div className='flex justify-between items-center mb-10'>
          <h1 className='text-2xl font-bold'>Data Kendaraan</h1>
          <div className='flex flex-wrap gap-4 items-center'>
            <RouteFilter selectedRoute={selectedRoute} setSelectedRoute={setSelectedRoute} />
            {selectedRoute.length > 0 ? (
              <TripFilter selectedTrip={selectedTrip} setSelectedTrip={setSelectedTrip} selectedRoutes={selectedRoute} />
            ) : (
              <p className='text-sm text-gray-500'>Pilih Rute terlebih dahulu</p>
            )}
          </div>
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
          ) : data?.data?.length && data?.data?.length > 0 ? (
            data?.data?.map((vehicle, index) => (
              <div key={index} className='col-span-12 sm:col-span-6 md:col-span-4'>
                <VehicleCard vehicleWrapper={vehicle} />
              </div>
            ))) : (
            <div className='col-span-12'>
              <div className='bg-white rounded-lg p-4 shadow-md space-y-3'>
                <div className='flex justify-center items-center h-24'>
                  <p className='text-sm'>Data tidak ditemukan.</p>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className='flex justify-between items-center flex-wrap gap-4 mt-10 text-sm'>
          <div className='flex justify-center gap-1 items-center'>
            <p>Data per halaman</p>
            <Dropdown options={LIMIT_OPTIONS} selected={limit.toString()} onChange={(value) => setLimit(Number(value))} />
          </div>
          <div className='flex flex-wrap gap-4 items-center '>
            <p>Menampilkan {offset + 1} - {offset + limit} dari {data?.total} Data</p>
            <div className='flex flex-wrap items-center gap-4'>
              <Button variant='outline' className='w-9 h-9 p-2!' onClick={handleFirstPage} disabled={offset === 0}>
                <ChevronsLeftIcon className='w-5 h-5' />
              </Button>
              <Button variant='outline' className='w-9 h-9 p-2!' onClick={handlePrevPage} disabled={!data?.links?.prev}>
                <ChevronLeft className='w-5 h-5' />
              </Button>
              <Button variant='outline' className='w-9 h-9 p-2!' onClick={handleNextPage} disabled={!data?.links?.next}>
                <ChevronRight className='w-5 h-5' />
              </Button>
              <Button variant='outline' className='w-9 h-9 p-2!' onClick={handleLastPage} disabled={(Number(offset) + Number(limit)) === Number(data?.total)}>
                <ChevronsRightIcon className='w-5 h-5' />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
