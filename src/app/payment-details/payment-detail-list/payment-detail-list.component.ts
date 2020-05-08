import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';
import { ToastrService } from 'ngx-toastr';
import { PaymentDetail } from 'src/app/shared/payment-detail.model';

@Component({
  selector: 'app-payment-detail-list',
  templateUrl: './payment-detail-list.component.html',
  styles: []
})

export class PaymentDetailListComponent implements OnInit {
  public _listOfClients: PaymentDetail[];

  public get service(): PaymentDetailService {
    return this._service;
  }

  resetForm(){
    this.service.formData = {
      Id: 0,
      FirstName: '',
      LastName: '',
      Email: '',
      Telephone: ''
    };
  }

  constructor(private _service: PaymentDetailService
            , private _toastrService: ToastrService) { }

  ngOnInit() {
    this._service.GetAllClients();
  }

  populateForm(cl: PaymentDetail){
    this.service.formData = Object.assign({},cl);
  }

  onDelete(id: number){
    if(confirm('Are you sur to delete this client ?')){
      this.service.deleteClient(id).subscribe(
        res => {
          this.service.GetAllClients();
          this.resetForm();
          this._toastrService.warning('Deleted successfully', 'Client register');
        },
        err => {
          console.log(err);
        }
      );
    }
  }

}
