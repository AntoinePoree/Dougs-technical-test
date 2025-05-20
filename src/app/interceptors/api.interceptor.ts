import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, finalize, throwError } from 'rxjs';
import { ToolService } from '../shared/services/core/tool.service';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const toolService = inject(ToolService);

  toolService.createInfoConsoleLog('Intercepting request to ' + req.url);
  toolService.loaderIncrement.update(prev => prev + 1);

  return next(req).pipe(
    finalize(() => {
      toolService.loaderIncrement.update(prev => prev - 1);
    }),
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Une erreur est survenue';

      if (error.error instanceof ErrorEvent) {
        errorMessage = `Erreur: ${error.error.message}`;
      } else {
        errorMessage = `Code d'erreur: ${error.status}, message: ${error.message}`;
      }

      toolService.createErrorConsoleLog(errorMessage);
      return throwError(() => error);
    }),
  );
};
