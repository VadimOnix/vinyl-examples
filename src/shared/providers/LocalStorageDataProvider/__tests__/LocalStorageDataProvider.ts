import {LocalStorageDataProvider} from "@/shared/providers/LocalStorageDataProvider/LocalStorageDataProvider";

describe('LocalStorageDataProvider', () => {
  describe('Return type validate', () => {
    // Able to set and retrieve items with different data types (e.g. string, number, boolean, object)
    it('should set and retrieve items with different data types', () => {
      const dataProvider = new LocalStorageDataProvider();
      const key = 'testKey';
      const stringValue = 'testValue';
      const numberValue = 123;
      const booleanValue = true;
      const objectValue = {name: 'John', age: 30};

      dataProvider.setItem(key, stringValue);
      expect(dataProvider.getItem(key)).toBe(stringValue);

      dataProvider.setItem(key, numberValue);
      expect(dataProvider.getItem(key)).toBe(numberValue);

      dataProvider.setItem(key, booleanValue);
      expect(dataProvider.getItem(key)).toBe(booleanValue);

      dataProvider.setItem(key, objectValue);
      expect(dataProvider.getItem(key)).toEqual(objectValue);
    });
  })

  describe('Native Storage', () => {
    jest.spyOn(Storage.prototype, 'setItem');
    jest.spyOn(Storage.prototype, 'getItem');
    jest.spyOn(Storage.prototype, 'removeItem');
    jest.spyOn(Storage.prototype, 'clear');
    jest.spyOn(Storage.prototype, 'key');

    // Able to set an item in local storage with a given key and value
    it('should set an item in local storage when given a key and value', () => {
      const dataProvider = new LocalStorageDataProvider();
      const key = 'testKey';
      const value = 'testValue';

      dataProvider.setItem(key, value);

      expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value));
    });

    // Able to retrieve an item from local storage with a given key
    it('should retrieve an item from local storage when given a key', () => {
      const dataProvider = new LocalStorageDataProvider();
      const key = 'testKey';
      const value = 'testValue';
      // @ts-ignore
      localStorage.getItem.mockReturnValue(JSON.stringify(value));

      const result = dataProvider.getItem(key);

      expect(localStorage.getItem).toHaveBeenCalledWith(key);
      expect(result).toEqual(value);
    });

    // Able to remove an item from local storage with a given key
    it('should remove an item from local storage when given a key', () => {
      const dataProvider = new LocalStorageDataProvider();
      const key = 'testKey';

      dataProvider.removeItem(key);

      expect(localStorage.removeItem).toHaveBeenCalledWith(key);
    });

    // Able to clear all key-value pairs from local storage
    it('should clear all key-value pairs from local storage when called', () => {
      const dataProvider = new LocalStorageDataProvider();

      dataProvider.clear();

      expect(localStorage.clear).toHaveBeenCalled();
    });
  })
});


