import { Injectable } from '@angular/core';
import { PaymentDetail } from './payment-detail.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {

  _listOfClients: PaymentDetail[];

  readonly rootUrl = 'http://localhost:65034/api';

  formData: PaymentDetail = {
    Id: 0,
    FirstName: null,
    LastName: null,
    Email: null,
    Telephone: null
  };

  constructor(private http: HttpClient) { }

  postClientDetail(formData: PaymentDetail): Observable<any>{
    return this.http.post(this.rootUrl + '/Clients',formData);
  }

  updateClientDetail(formData: PaymentDetail): Observable<any>{
    return this.http.put(this.rootUrl + '/Clients/' + formData.Id,formData);
  }
  
  GetAllClients() {
    return this.http.get(this.rootUrl + '/Clients')
    .toPromise()
    .then(res => this._listOfClients = res as PaymentDetail[]);
  }

  deleteClient(Id: number){
    return this.http.delete(this.rootUrl + '/Clients/' + Id);
  }


}
