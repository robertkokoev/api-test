import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class Interceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes(environment.detailsApiUrl) || req.url.includes(environment.filmsApiUrl)) {
      const paramReq = req.clone({
        params: req.params.set('api_key', environment.apiKey)
      });
      return next.handle(paramReq);
    } else {
      return next.handle(req);
    }
  }
}
