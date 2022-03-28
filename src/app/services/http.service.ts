import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { APIResponse, Career } from '../models';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getCareerList(
    ordering: string,
    search?: string
  ): Observable<APIResponse<Career>> {
    let params = new HttpParams().set('ordering', ordering);

    if (search) {
      params = new HttpParams().set('ordering', ordering);
    }

    return this.http.get<APIResponse<Career>>(`${env.BASE_URL}/games`, {
      params: params, 
    });
  }
}
