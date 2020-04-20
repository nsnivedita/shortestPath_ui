
import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Configuration } from '../configuration';
import { Planets } from '../model/planets';
import { Distance } from '../model/distance';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private actionUrl: string;
  constructor(private http: HttpClient, private configuration: Configuration) { this.actionUrl = configuration.serverWithApiUrl;}
  public findAll(): Observable<Planets[]> {
    return this.http.get<Planets[]>(this.actionUrl + 'planets');
  }
  public findDirection(src: string, dest: string): Observable<any> {
    const body ={
      source: src,
      destination: dest
    }
    return this.http.post<Distance>(this.actionUrl + 'findroute', body);
  }

}



@Injectable()
export class CustomInterceptor implements HttpInterceptor {

intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.headers.has('Content-Type')) {
        req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
    }

    req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
    return next.handle(req);
}
}
