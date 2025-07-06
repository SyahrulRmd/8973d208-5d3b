interface Vehicle {
  "updated_at": string,
  "speed": number,
  "revenue_status": string,
  "occupancy_status": string,
  "longitude": number,
  "latitude": number,
  "label": string,
  "direction_id": number,
  "current_stop_sequence": number,
  "current_status": string,
  "carriages": [
    {
      "occupancy_status": string,
      "occupancy_percentage": number,
      "label": string
    }
  ],
  "bearing": number
}

export default Vehicle;
