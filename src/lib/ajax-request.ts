export type ConfigureFn = (request: XMLHttpRequest) => any;
export interface AjaxResponse {
  data: any;
  status: number;
  statusText: string;
  headers: string;
  request: XMLHttpRequest;
}
export type AjaxRequestData = FormData | any;
export interface AjaxError extends Error {
  error: true;
  code: string;
  request: XMLHttpRequest;
  response?: AjaxResponse;
}

/* inspired by axios */
class AjaxRequest {
  public createError(
    message: string,
    code: string | null,
    request: XMLHttpRequest,
    response?: AjaxResponse,
  ): AjaxError {
    const error: AjaxError = new Error(message) as AjaxError;
    error.error = true;
    if (code) {
      error.code = code;
    }
    error.request = request;
    error.response = response;
    return error;
  }

  public settle(resolve: any, reject: any, response: AjaxResponse) {
    const validateStatus = (status: number) => {
      return status >= 200 && status < 300;
    };
    // Note: status is not exposed by XDomainRequest
    if (!response.status || !validateStatus || validateStatus(response.status)) {
      resolve(response);
    } else {
      reject(this.createError('Request failed with status code ' + response.status, null, response.request, response));
    }
  }

  public request(
    method: string,
    url: string,
    formData: AjaxRequestData | null = null,
    configureFn?: ConfigureFn,
  ): Promise<AjaxResponse> {
    return new Promise((resolve, reject) => {
      // tslint:disable-next-line
      let request = new XMLHttpRequest();
      const loadEvent = 'onreadystatechange';

      request.open(method, url, true);

      // Listen for ready state
      request[loadEvent] = () => {
        if (!request || request.readyState !== 4) {
          return;
        }

        // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        }

        // Prepare the response
        const responseHeaders = request.getAllResponseHeaders();
        let responseData: any = request.responseText;
        const contentType = request.getResponseHeader('Content-Type');
        if (contentType && contentType.indexOf('application/json') !== -1) {
          responseData = JSON.parse(responseData);
        } else {
          try {
            responseData = JSON.parse(responseData);
          } catch (e) {
            /* ignore, possibly non json response */
          }
        }
        const response: AjaxResponse = {
          data: responseData,
          // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)
          status: request.status === 1223 ? 204 : request.status,
          statusText: request.status === 1223 ? 'No Content' : request.statusText,
          headers: responseHeaders,
          request,
        };

        this.settle(resolve, reject, response);

        // Clean up request
        (request as any) = null;
      };

      // Handle browser request cancellation (as opposed to a manual cancellation)
      request.onabort = () => {
        if (!request) {
          return;
        }

        reject(this.createError('Request aborted', 'ECONNABORTED', request));

        // Clean up request
        (request as any) = null;
      };

      // Handle low level network errors
      request.onerror = () => {
        // Real errors are hidden from us by the browser
        // onerror should only fire if it's a network error
        reject(this.createError('Network Error', null, request));

        // Clean up request
        (request as any) = null;
      };

      // Handle timeout
      request.ontimeout = () => {
        reject(this.createError('timeout exceeded', 'ECONNABORTED', request));

        // Clean up request
        (request as any) = null;
      };

      // // Handle progress if needed
      // if (typeof config.onDownloadProgress === 'function') {
      //   request.addEventListener('progress', config.onDownloadProgress);
      // }

      // Not all browsers support upload events
      // if (typeof progressCallback === 'function' && request.upload) {
      //   request.upload.addEventListener('progress', progressCallback);
      // }

      if (typeof configureFn === 'function') {
        configureFn(request);
      }

      request.send(formData);
    });
  }

  public post(url: string, formData: AjaxRequestData, configureFn?: ConfigureFn) {
    return this.request('POST', url, formData, configureFn);
  }

  public delete(url: string, formData: AjaxRequestData, configureFn?: ConfigureFn) {
    return this.request('DELETE', url, formData, configureFn);
  }

  public put(url: string, formData: AjaxRequestData, configureFn?: ConfigureFn) {
    return this.request('PUT', url, formData, configureFn);
  }
}

export default new AjaxRequest();
