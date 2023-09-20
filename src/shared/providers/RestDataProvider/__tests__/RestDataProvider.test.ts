import {RestDataProvider} from "@/shared/providers/RestDataProvider/RestDataProvider";

describe('RestDataProvider', () => {
  // Mock the fetch function
  const mockFetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue({data: 'response data'}),
  });
  global.fetch = mockFetch;

  // Successful GET request
  it('should make a successful GET request', async () => {
    // Create an instance of RESTDataProvider
    const restDataProvider = new RestDataProvider({});

    // Call the get method
    const response = await restDataProvider.get('/api/data');

    // Check that the fetch function was called with the correct arguments
    expect(mockFetch).toHaveBeenCalledWith('https://dummyjson.com/api/data', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    });

    // Check that the response data is correct
    expect(response).toEqual({data: 'response data'});
  });

  // Successful POST request
  it('should make a successful POST request', async () => {

    // Create an instance of RESTDataProvider
    const restDataProvider = new RestDataProvider({});

    // Call the post method
    const response = await restDataProvider.post('/api/data', {body: 'request body'});

    // Check that the fetch function was called with the correct arguments
    expect(mockFetch).toHaveBeenCalledWith('https://dummyjson.com/api/data', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({body: 'request body'}),
    });

    // Check that the response data is correct
    expect(response).toEqual({data: 'response data'});
  });

  // Custom headers are added to requests
  it('should add custom headers to requests', async () => {

    // Create an instance of RESTDataProvider with custom headers
    const restDataProvider = new RestDataProvider({
      initialHeaders: {
        'X-Custom-Header': 'custom value',
      },
    });

    // Call the get method
    await restDataProvider.get('/api/data');

    // Check that the fetch function was called with the custom headers
    expect(mockFetch).toHaveBeenCalledWith('https://dummyjson.com/api/data', {
      headers: {
        'Content-Type': 'application/json',
        'X-Custom-Header': 'custom value',
      },
      method: 'GET',
    });
  });

  it('should update headers with valid headers object', () => {
    // Create an instance of RESTDataProvider
    const restDataProvider = new RestDataProvider({});

    // Set initial headers
    const initialHeaders = { Authorization: 'Bearer token' };
    restDataProvider.updateHeaders(initialHeaders);

    // Update headers
    const newHeaders = { 'X-Custom-Header': 'value' };
    restDataProvider.updateHeaders(newHeaders);

    // Check that the headers are updated correctly
    expect(restDataProvider['headers']).toEqual({
      'Content-Type': 'application/json',
      ...initialHeaders,
      ...newHeaders,
    });
  });
});
