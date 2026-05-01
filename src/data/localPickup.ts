/** Kings Park pickup — same location linked from PDP (ProductInfoPanel). */
export const LOCAL_PICKUP_LOCATION = {
  shortName: 'Kings Park',
  streetLine: '490 Pulaski Road',
  city: 'Kings Park',
  stateCode: 'NY',
  zip: '11754',
} as const

export const LOCAL_PICKUP_MAPS_QUERY =
  `${LOCAL_PICKUP_LOCATION.streetLine}, ${LOCAL_PICKUP_LOCATION.city}, ${LOCAL_PICKUP_LOCATION.stateCode} ${LOCAL_PICKUP_LOCATION.zip}`

export function localPickupMapsSearchUrl(): string {
  return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(LOCAL_PICKUP_MAPS_QUERY)
}
