import { IAddress } from "@/_lib/templatePicker/template/models/address";
import { FormEventHandler, useState } from "react";
import Modal from "./modal";
import FormError from "./formError";
import AddressUtils from "@/_utils/addressUtils";

interface IAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultAddress?: IAddress;
  callback: (address?: IAddress) => any;
}

const AddressFormModal: React.FC<IAddressModalProps> = ({
  isOpen,
  onClose,
  defaultAddress,
  callback,
}) => {
  const FORM_INPUT_STYLE =
    "w-full min-w-full max-w-lg px-0.5 py-1 border-b-2 bd-b-secondary focus:outline-none focus:ring-none focus:bd-b-primary";

  const [hasError, setHasError] = useState<boolean>(false);

  const clearAddress = () => {
    callback(undefined);
    onClose();
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    // HTMLFormControlsCollection not ready for typescript yet!
    const {
      senderName,
      streetAddress,
      locality,
      administrativeArea,
      country,
      postalCode,
    } = (event.target as HTMLFormElement).elements as any;

    const address: IAddress = {
      senderName: senderName.value,
      streetAddress: streetAddress.value,
      locality: locality.value,
      administrativeArea: administrativeArea.value,
      country: country.value,
      postalCode: postalCode.value,
    };

    if (AddressUtils.isEmptyAddress(address)) {
      callback(undefined);
      onClose();
    }

    if (AddressUtils.isValidAddress(address)) {
      callback(address);
      onClose();
    }

    setHasError(true);
  };

  return (
    <Modal isOpen={isOpen} onClose={() => onClose()}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-2 min-w-[40vw]">
        <p>optional: enter a return address</p>
        <input
          type="text"
          name="senderName"
          placeholder="sender name"
          defaultValue={defaultAddress?.senderName}
          className={FORM_INPUT_STYLE}
        />
        <input
          type="text"
          name="streetAddress"
          required
          placeholder="street address"
          defaultValue={defaultAddress?.streetAddress}
          className={FORM_INPUT_STYLE}
        />
        <input
          type="text"
          name="locality"
          required
          placeholder="city/province"
          defaultValue={defaultAddress?.locality}
          className={FORM_INPUT_STYLE}
        />
        <input
          type="text"
          name="administrativeArea"
          required
          placeholder="state/region"
          defaultValue={defaultAddress?.administrativeArea}
          className={FORM_INPUT_STYLE}
        />
        <input
          type="text"
          name="postalCode"
          required
          placeholder="postal code"
          defaultValue={defaultAddress?.postalCode}
          className={FORM_INPUT_STYLE}
        />
        <input
          type="text"
          name="country"
          required
          placeholder="country"
          defaultValue={defaultAddress?.country}
          className={FORM_INPUT_STYLE}
        />
        <div className="flex items-center gap-2">
          <button className="btn-primary">done!</button>
          <button
            type="button"
            className="btn-primary-outline"
            onClick={clearAddress}
          >
            clear
          </button>
        </div>
        {hasError && <FormError>enter a valid address</FormError>}
      </form>
    </Modal>
  );
};

export default AddressFormModal;
