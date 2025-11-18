import AddressUtils from '../../src/app/_utils/addressUtils';
import { IAddress } from '../../src/app/_lib/templatePicker/template/models/address';

describe('AddressUtils', () => {
  describe('isEmptyAddress', () => {
    it('should return true for completely empty address', () => {
      const emptyAddress: IAddress = {
        senderName: '',
        streetAddress: '',
        locality: '',
        administrativeArea: '',
        country: '',
        postalCode: '',
      };

      expect(AddressUtils.isEmptyAddress(emptyAddress)).toBe(true);
    });

    it('should return false when any field is filled', () => {
      const partialAddress: IAddress = {
        senderName: 'John Doe',
        streetAddress: '',
        locality: '',
        administrativeArea: '',
        country: '',
        postalCode: '',
      };

      expect(AddressUtils.isEmptyAddress(partialAddress)).toBe(false);
    });

    it('should return false for complete address', () => {
      const completeAddress: IAddress = {
        senderName: 'John Doe',
        streetAddress: '123 Main St',
        locality: 'San Francisco',
        administrativeArea: 'CA',
        country: 'USA',
        postalCode: '94102',
      };

      expect(AddressUtils.isEmptyAddress(completeAddress)).toBe(false);
    });
  });

  describe('isValidAddress', () => {
    it('should return true for empty address', () => {
      const emptyAddress: IAddress = {
        senderName: '',
        streetAddress: '',
        locality: '',
        administrativeArea: '',
        country: '',
        postalCode: '',
      };

      expect(AddressUtils.isValidAddress(emptyAddress)).toBe(true);
    });

    it('should return true for complete address', () => {
      const completeAddress: IAddress = {
        senderName: 'John Doe',
        streetAddress: '123 Main St',
        locality: 'San Francisco',
        administrativeArea: 'CA',
        country: 'USA',
        postalCode: '94102',
      };

      expect(AddressUtils.isValidAddress(completeAddress)).toBe(true);
    });

    it('should return false for partially filled address missing required fields', () => {
      const partialAddress: IAddress = {
        senderName: 'John Doe',
        streetAddress: '123 Main St',
        locality: '',
        administrativeArea: '',
        country: '',
        postalCode: '',
      };

      expect(AddressUtils.isValidAddress(partialAddress)).toBe(false);
    });

    it('should return false when missing street address', () => {
      const address: IAddress = {
        senderName: 'John Doe',
        streetAddress: '',
        locality: 'San Francisco',
        administrativeArea: 'CA',
        country: 'USA',
        postalCode: '94102',
      };

      expect(AddressUtils.isValidAddress(address)).toBe(false);
    });

    it('should return false when missing locality', () => {
      const address: IAddress = {
        senderName: 'John Doe',
        streetAddress: '123 Main St',
        locality: '',
        administrativeArea: 'CA',
        country: 'USA',
        postalCode: '94102',
      };

      expect(AddressUtils.isValidAddress(address)).toBe(false);
    });

    it('should return false when missing administrative area', () => {
      const address: IAddress = {
        senderName: 'John Doe',
        streetAddress: '123 Main St',
        locality: 'San Francisco',
        administrativeArea: '',
        country: 'USA',
        postalCode: '94102',
      };

      expect(AddressUtils.isValidAddress(address)).toBe(false);
    });

    it('should return false when missing country', () => {
      const address: IAddress = {
        senderName: 'John Doe',
        streetAddress: '123 Main St',
        locality: 'San Francisco',
        administrativeArea: 'CA',
        country: '',
        postalCode: '94102',
      };

      expect(AddressUtils.isValidAddress(address)).toBe(false);
    });

    it('should return false when missing postal code', () => {
      const address: IAddress = {
        senderName: 'John Doe',
        streetAddress: '123 Main St',
        locality: 'San Francisco',
        administrativeArea: 'CA',
        country: 'USA',
        postalCode: '',
      };

      expect(AddressUtils.isValidAddress(address)).toBe(false);
    });
  });

  describe('formatToLines', () => {
    it('should format complete address to lines', () => {
      const address: IAddress = {
        senderName: 'John Doe',
        streetAddress: '123 Main St',
        locality: 'San Francisco',
        administrativeArea: 'CA',
        country: 'USA',
        postalCode: '94102',
      };

      const lines = AddressUtils.formatToLines(address);

      expect(lines).toEqual([
        'John Doe',
        '123 Main St',
        'San Francisco, CA, 94102',
        'USA',
      ]);
    });

    it('should format address without sender name', () => {
      const address: IAddress = {
        senderName: '',
        streetAddress: '123 Main St',
        locality: 'San Francisco',
        administrativeArea: 'CA',
        country: 'USA',
        postalCode: '94102',
      };

      const lines = AddressUtils.formatToLines(address);

      expect(lines).toEqual([
        '123 Main St',
        'San Francisco, CA, 94102',
        'USA',
      ]);
    });

    it('should handle address with undefined sender name', () => {
      const address: IAddress = {
        senderName: undefined as any,
        streetAddress: '123 Main St',
        locality: 'San Francisco',
        administrativeArea: 'CA',
        country: 'USA',
        postalCode: '94102',
      };

      const lines = AddressUtils.formatToLines(address);

      expect(lines).toEqual([
        '123 Main St',
        'San Francisco, CA, 94102',
        'USA',
      ]);
    });
  });
});
