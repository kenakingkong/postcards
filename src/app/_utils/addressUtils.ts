import { IAddress } from "@/_lib/templatePicker/template/models/address";

namespace AddressUtils {
  export const isEmptyAddress = (address: IAddress) => {
    return (
      !address.senderName &&
      !address.streetAddress &&
      !address.locality &&
      !address.administrativeArea &&
      !address.country &&
      !address.postalCode
    );
  };

  export const isValidAddress = (address: IAddress) => {
    if (isEmptyAddress(address)) return true;

    return (
      !!address.streetAddress &&
      !!address.locality &&
      !!address.administrativeArea &&
      !!address.country &&
      !!address.postalCode
    );
  };

  export const formatToLines = (address: IAddress) => {
    const lines = [];
    if (address.senderName) lines.push(address.senderName);
    lines.push(address.streetAddress);
    lines.push(
      `${address.locality}, ${address.administrativeArea}, ${address.postalCode}`
    );
    lines.push(address.country)
    return lines;
  };
}

export default AddressUtils;
