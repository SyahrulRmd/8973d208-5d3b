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


// {
//   "links": {
//     "self": "string"
//   },
//   "included": [
//     {
//       "type": "string",
//       "id": "string"
//     }
//   ],
//   "data": {
//     "type": "string",
//     "relationships": {
//       "trip": {
//         "links": {
//           "self": "string",
//           "related": "string"
//         },
//         "data": {
//           "type": "string",
//           "id": "string"
//         }
//       },
//       "stop": {
//         "links": {
//           "self": "string",
//           "related": "string"
//         },
//         "data": {
//           "type": "string",
//           "id": "string"
//         }
//       },
//       "route": {
//         "links": {
//           "self": "string",
//           "related": "string"
//         },
//         "data": {
//           "type": "string",
//           "id": "string"
//         }
//       }
//     },
//     "links": {},
//     "id": "string",
//     "attributes": {
//       "updated_at": "2017-08-14T16:04:44-04:00",
//       "speed": 16,
//       "revenue_status": "REVENUE",
//       "occupancy_status": "FEW_SEATS_AVAILABLE",
//       "longitude": 42.32941818237305,
//       "latitude": -71.27239990234375,
//       "label": "1817",
//       "direction_id": 0,
//       "current_stop_sequence": 8,
//       "current_status": "IN_TRANSIT_TO",
//       "carriages": [
//         {
//           "occupancy_status": "MANY_SEATS_AVAILABLE",
//           "occupancy_percentage": 80,
//           "label": "some-carriage"
//         }
//       ],
//       "bearing": 174
//     }
//   }
// }