export interface IAddress {
  senderName?: string; // sender name or organization
  streetAddress: string; // street address + apt no
  locality: string; // city or town
  administrativeArea: string; // state, province, region
  country: string; // 2 char iso code
  postalCode: string; // zip code
}
