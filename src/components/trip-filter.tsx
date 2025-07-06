import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react"
import { CheckIcon, ChevronDownIcon } from "lucide-react"
import { useState } from "react"
import useGet from "../hooks/use-get"
import Button from "./ui/button"
import { BASE_URL } from "../common/base-url"

const TripFilter = ({ selectedTrip, setSelectedTrip, selectedRoutes }: {
  selectedTrip: TypeWrapper<Trip>[],
  setSelectedTrip: (value: TypeWrapper<Trip>[]) => void,
  selectedRoutes: TypeWrapper<Route>[]
}) => {
  const [limit, setLimit] = useState(10)
  const pageParams = `page[offset]=0&page[limit]=${limit}&filter[route]=${selectedRoutes.map((route) => route.id).join(',')}`

  // NOTE: A id, route, route_pattern, or name filter MUST be present for any trips to be returned.
  const { data: trips, loadingAddition, refetchAddition } = useGet<ListWrapper<TypeWrapper<Trip>[]>>(`${BASE_URL}/trips?${encodeURI(pageParams)}`, { isArray: true })

  const handleSelectTrip = (value: TypeWrapper<Trip>[]) => {
    setSelectedTrip(value)
  }

  const handleLoadMore = () => {
    setLimit(limit + 10)
    if (trips?.links?.next) {
      refetchAddition(trips?.links?.next)
    }
  }

  return (
    <div className='flex flex-wrap gap-2 items-center'>
      <h3 className='text-sm font-semibold'>Trip</h3>
      {trips?.data?.length && (
        <Listbox value={selectedTrip} onChange={handleSelectTrip} multiple={true}>
          <ListboxButton className={'relative block w-auto rounded-lg bg-white/5 py-1.5 pr-8 pl-3 text-left text-sm border border-gray-500'}>
            {selectedTrip.length > 1 ? `${selectedTrip.length} Terpilih` :
              selectedTrip.length === 1 ? selectedTrip[0].attributes.name || selectedTrip[0].id
                : 'Pilih Trip'}
            <ChevronDownIcon
              className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
              aria-hidden="true"
            />
          </ListboxButton>
          <ListboxOptions anchor="bottom" className={`rounded-lg border border-gray-500 bg-white p-1 [--anchor-gap:--spacing(1)] focus:outline-none min-w-[200px]`}>
            {trips?.data.map((trip) => (
              <ListboxOption key={trip.id} value={trip} className="group text-sm flex cursor-default items-center gap-2 rounded-lg px-3 py-1.5 select-none data-focus:bg-white/10">
                <CheckIcon className="invisible size-4 group-data-selected:visible" />
                {trip.attributes.name || trip.id}
              </ListboxOption>
            ))}
            {loadingAddition && (
              <div className='bg-gray-200 rounded-lg ml-8 p-2 w-3/4 h-5 flex justify-center items-center' />
            )}
            <div className='flex justify-center items-center py-3'>
              <Button variant='outline' className='h-8 px-2 text-sm' onClick={handleLoadMore}>Load More</Button>
            </div>
          </ListboxOptions>
        </Listbox>
      )}
    </div>
  )
}

export default TripFilter;