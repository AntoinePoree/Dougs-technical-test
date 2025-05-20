import { HttpErrorResponse, HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { inject, Injectable, isDevMode } from '@angular/core';
import { finalize, Observable, tap } from 'rxjs';
import { ToolService } from '../shared/services/core/tool.service';


/**
 * ApiInterceptor is an Angular service that intercepts HTTP requests and logs them if the application is in development mode.
 * It also manages a loader increment signal based on the request and response events.
 *
 * @example
 * providers: [
 *   { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true }
 * ]
 *
 * @class
 * @implements {HttpInterceptor}
 */
@Injectable({ providedIn: 'root' })
export class ApiInterceptor implements HttpInterceptor {
  private readonly toolService = inject(ToolService);

  private manageErrorLog(error: HttpErrorResponse, errorRequest: HttpErrorResponse, request: HttpRequest<unknown>) {
    if (error instanceof HttpErrorResponse) {
      errorRequest = error;

      if (isDevMode()) {
        this.toolService.createErrorConsoleLog(`[${request.method}] >> ${error.url}`, error.error);
      }

      this.toolService.loaderIncrement.update((prev) => prev - 1);
    }
    return errorRequest;
  }

  private manageSuccessLog(event: HttpEvent<unknown>, request: HttpRequest<unknown>) {
    if (event instanceof HttpResponse) {
      if (isDevMode() && [200, 201, 204].includes(event.status)) {
        this.toolService.createSuccessConsoleLog(`[${request.method}] >> ${event.url}`, event.body);
      }
      this.toolService.loaderIncrement.update((prev) => prev - 1);
    }
  }
/**
   * This method intercepts the HTTP request and modifies it before it is sent to the server.
   * If the application is in development mode, it logs the request method, URL, and body.
   * It also increments the loader signal when the request is sent and decrements it when a response is received.
   * If an error occurs, it logs the error.
   *
   * @param {HttpRequest<unknown>} request - The outgoing request object to be modified.
   * @param {HttpHandler} next - The next interceptor in the chain.
   * @returns {Observable<HttpEvent<unknown>>} - An observable of the event stream.
   */
  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let lastResponse: HttpEvent<unknown>;
    let errorRequest: HttpErrorResponse;
    let errorHandled = false;

    if (['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].includes(request.method)) {
      if (isDevMode()) {
        this.toolService.createInfoConsoleLog(`[${request.method}] >> ${request.url}`, request.body);
      }
      this.toolService.loaderIncrement.update((prev) => prev + 1);
    }

    return next.handle(request).pipe(
      tap({
        next: (event: HttpEvent<unknown>) => {
          lastResponse = event;
          this.manageSuccessLog(event, request);
          return event;
        },
        error: (error: HttpErrorResponse) => {
          errorRequest = this.manageErrorLog(error, errorRequest, request);
          errorHandled = true;

          return error;
        },
      }),
      finalize(() => {
        if (!errorHandled && lastResponse?.type === HttpEventType.Sent) {
          // last response type was 0, and we haven't received an error, so were in aborted request
          this.toolService.loaderIncrement.update((prev) => prev - 1);
        } else {
          errorHandled = false;
        }
      })
    );
  }
}
