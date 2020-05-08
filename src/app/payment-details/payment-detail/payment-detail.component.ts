import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styles: []
})
export class PaymentDetailComponent implements OnInit {

  public get service(): PaymentDetailService {
    return this._service;
  }
    
  constructor(private _service: PaymentDetailService
            , private _toastrService: ToastrService) {}

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form?: NgForm){
    if(form != null){
      form.resetForm();
    }
    this.service.formData = {
      Id: 0,
      FirstName: '',
      LastName: '',
      Email: '',
      Telephone: ''
    };
  }

  onSubmit(form: NgForm){
    if(form.value.Id == 0){
      this.service.postClientDetail(form.value).subscribe(
        res => {
          this.resetForm(form);
          this._toastrService.success("Submitted successfully","New Client");
          this.service.GetAllClients();
        },
        err => {
          console.log(err);
        }
      )
    }
    else{
      this.service.updateClientDetail(form.value).subscribe(
        res => {
          this.resetForm(form);
          this._toastrService.info("Submitted successfully","Update Client");
          this.service.GetAllClients();
        },
        err => {
          console.log(err);
        }
      );
    }
  }

}
