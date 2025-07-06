import { useLayoutEffect, useRef, useState } from 'react'
import { BASE_URL } from './common/base-url'
import { formatDate } from './common/formatter'
import useGet from './hooks/use-get'
import type Vehicle from './types/vehicle'

function App() {
  const fields = 'fields[vehicle]=speed,occupancy_status,revenue_status,longitude,latitude,label,direction_id,current_stop_sequence,current_status,carriages,bearing,updated_at'
  const page = 'page[offset]=0&page[limit]=10'

  const { data, loading, error } = useGet<Vehicle[]>(`${BASE_URL}/vehicles?${encodeURI(fields)}&${encodeURI(page)}`, { isArray: true },)

  console.log(data)


  const dialogRef = useRef<HTMLDialogElement>(null)

  const [isShowModal, setIsShowModal] = useState(false)

  useLayoutEffect(() => {
    if (dialogRef.current?.open && !isShowModal) {
      dialogRef.current?.close()
    } else if (!dialogRef.current?.open && isShowModal) {
      dialogRef.current?.showModal()
    }
  }, [isShowModal])


  return (
    <div>
      <section className='container'>
        <div className='grid grid-cols-12 sm:gap-10 gap-4'>
          {data?.map((vehicle, index) => (
            <div key={index} onClick={() => setIsShowModal(true)} className='col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3'>
              <div className='bg-white rounded-lg p-4 shadow-md'>
                <h3 className='text-lg font-bold'>{vehicle.label}</h3>
                <p className='text-sm text-gray-500'>{vehicle.current_status}</p>
                <p className='text-sm text-gray-500'>{vehicle.latitude} & {vehicle.longitude}</p>
                <p className='text-sm text-gray-500'>Per {formatDate(vehicle.updated_at)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <dialog ref={dialogRef} aria-modal='true' className='bg-white rounded-lg p-4 shadow-md'>
        Dialog
      </dialog>
    </div>
  )
}

export default App
