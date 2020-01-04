export declare type ConfigureFn = (request: XMLHttpRequest) => any;
export interface AjaxResponse {
    data: any;
    status: number;
    statusText: string;
    headers: string;
    request: XMLHttpRequest;
}
export declare type AjaxRequestData = FormData | any;
export interface AjaxError extends Error {
    code: string;
    request: XMLHttpRequest;
    response?: AjaxResponse;
}
declare class AjaxRequest {
    createError(message: string, code: string | null, request: XMLHttpRequest, response?: AjaxResponse): AjaxError;
    settle(resolve: any, reject: any, response: AjaxResponse): void;
    request(method: string, url: string, formData?: AjaxRequestData | null, configureFn?: ConfigureFn): Promise<AjaxResponse>;
    post(url: string, formData: AjaxRequestData, configureFn?: ConfigureFn): Promise<AjaxResponse>;
    delete(url: string, formData: AjaxRequestData, configureFn?: ConfigureFn): Promise<AjaxResponse>;
    put(url: string, formData: AjaxRequestData, configureFn?: ConfigureFn): Promise<AjaxResponse>;
}
declare const _default: AjaxRequest;
export default _default;
