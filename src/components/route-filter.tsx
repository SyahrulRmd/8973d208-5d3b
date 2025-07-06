import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react"
import { CheckIcon, ChevronDownIcon } from "lucide-react"
import { useState } from "react"
import useGet from "../hooks/use-get"
import Button from "./ui/button"
import { BASE_URL } from "../common/base-url"

const RouteFilter = ({ selectedRoute, setSelectedRoute }: {
  selectedRoute: TypeWrapper<Route>[],
  setSelectedRoute: (value: TypeWrapper<Route>[]) => void
}) => {
  const [limit, setLimit] = useState(10)
  const pageParams = `page[offset]=0&page[limit]=${limit}`
  const { data: routes, loading, refetchAddition, loadingAddition } = useGet<ListWrapper<TypeWrapper<Route>[]>>(`${BASE_URL}/routes?${encodeURI(pageParams)}`, { isArray: true })

  const handleSelectRoute = (value: TypeWrapper<Route>[]) => {
    setSelectedRoute(value)
  }

  const handleLoadMore = () => {
    setLimit(limit + 10)
    if (routes?.links?.next) {
      refetchAddition(routes?.links?.next)
    }
  }

  return (
    <div className='flex flex-wrap gap-2 items-center'>
      <h3 className='text-sm font-semibold'>Rute</h3>
      {loading && !loadingAddition ? (
        <div className='bg-gray-200 rounded-lg p-2 w-20 h-8 flex justify-center items-center' />
      ) : routes?.data?.length && (
        <Listbox value={selectedRoute} onChange={handleSelectRoute} multiple={true}>
          <ListboxButton className={'relative block w-auto rounded-lg bg-white/5 py-1.5 pr-8 pl-3 text-left text-sm border border-gray-500'}>
            {selectedRoute.length > 1 ? `${selectedRoute.length} Terpilih` :
              selectedRoute.length === 1 ? selectedRoute[0].attributes.long_name
                : 'Pilih Rute'}
            <ChevronDownIcon
              className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
              aria-hidden="true"
            />
          </ListboxButton>
          <ListboxOptions anchor="bottom" className={'rounded-lg border border-gray-500 bg-white p-1 [--anchor-gap:--spacing(1)] focus:outline-none'}>
            {routes?.data.map((route) => (
              <ListboxOption key={route.id} value={route} className="group text-sm flex cursor-default items-center gap-2 rounded-lg px-3 py-1.5 select-none data-focus:bg-white/10">
                <CheckIcon className="invisible size-4 group-data-selected:visible" />
                {route.attributes.long_name}
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

export default RouteFilter
