import {RestDataProvider} from "@/shared/providers/RestDataProvider/RestDataProvider";

describe('RestDataProvider', () => {
  // Can update headers successfully
  it('should update headers successfully', () => {
    const restDataProvider = new RestDataProvider({initialHeaders: {Authorization: 'Bearer token'}, baseUrl: 'https://example.com'});
    restDataProvider.updateHeaders({Authorization: 'Bearer newToken'});
    expect(restDataProvider['headers']).toEqual({Authorization: 'Bearer newToken', 'Content-Type': 'application/json'});
  });

  // Throws error when invalid baseUrl is provided
  it('should throw an error when invalid baseUrl is provided', () => {
    expect(() => {
      new RestDataProvider({initialHeaders: {Authorization: 'Bearer token'}, baseUrl: 'invalidUrl'});
    }).toThrow('Invalid baseUrl');
  });

  // Throws error when invalid baseUrl is provided
  it('should throw an error when invalid baseUrl is provided', () => {
    expect(() => {
      new RestDataProvider({initialHeaders: {Authorization: 'Bearer token'}, baseUrl: 'invalidUrl'});
    }).toThrow('Invalid baseUrl');
  });
});

