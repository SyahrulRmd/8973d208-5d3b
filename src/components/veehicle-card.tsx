import { useState } from "react"
import { formatDate, formatStatus } from "../common/formatter"
import CustomDialog from "./ui/dialog"
import type Vehicle from "../types/vehicle"
import BusIcon from "./icons/bus"

const VehicleCard = ({ vehicleWrapper }: { vehicleWrapper: TypeWrapper<Vehicle> }) => {
  const vehicle = vehicleWrapper?.attributes
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
      <CustomDialog isOpen={isOpen} setIsOpen={setIsOpen} title={
        <div className='flex items-center gap-2 justify-between'>
          <div className='flex items-center gap-2'>
            <BusIcon className='w-6 h-6' />
            <h3 className='text-xl font-bold'>{vehicle.label}</h3>
          </div>
          <p className={`text-sm font-medium ${statusBgColor(vehicle.current_status)} px-2 py-1 rounded-md`}>{formatStatus(vehicle.current_status)}</p>
        </div>
      }>
        <div className='space-y-3'>
          <div className='space-y-1'>
            <p className='text-sm text-gray-500'><span className='font-semibold'>Lattitude:</span> {vehicle.latitude}</p>
            <p className='text-sm text-gray-500'><span className='font-semibold'>Longitude:</span> {vehicle.longitude}</p>
          </div>
          <div>
            <p className='text-sm text-gray-500'><span className='font-semibold'>Rute:</span> {vehicleWrapper.relationships.route.data.id}</p>
            <p className='text-sm text-gray-500'><span className='font-semibold'>Trip:</span> {vehicleWrapper.relationships.trip.data.id}</p>
          </div>
          <div>
            <p className='text-sm text-gray-500'>Terakhir Di-update</p>
            <p className='text-sm text-gray-500'>{formatDate(vehicle.updated_at)}</p>
          </div>
          <iframe
            title="Commercial Suncity Square"
            width="100%"
            // height="800px"
            className={'rounded-lg w-full h-[50vh]'}
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src={`//maps.google.com/maps?q=${vehicle.latitude},${vehicle.longitude}&z=15&output=embed`}
          ></iframe>
        </div>
      </CustomDialog>
    </>
  )
}

export default VehicleCard;
