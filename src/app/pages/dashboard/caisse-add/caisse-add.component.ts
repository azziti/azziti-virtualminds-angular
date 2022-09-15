import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/config/app-constants';
import { Caisse } from 'src/app/models/caisse';
import { HttpService } from 'src/app/services/http.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-caisse-add',
  templateUrl: './caisse-add.component.html',
  styleUrls: ['./caisse-add.component.css']
})
export class CaisseAddComponent implements OnInit {

  form!: FormGroup;
  isSubmited: boolean = false;
  caisse!: Caisse;

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private router: Router,
    private toastService : ToastService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      libelle: ['', [Validators.required]],
      amountIn: [0, [Validators.required, Validators.min(0),Validators.pattern(AppConstants.numberPattern)]],
      amountOut: [0, [Validators.required, Validators.min(0),Validators.pattern(AppConstants.numberPattern)]],
      operationDate:[(new Date()).toISOString().substring(0,10), Validators.required],
    });
  }

  get errorControl() {
    return this.form.controls;
  }


  //check if form is valid then send post request
  submitForm() {
    this.isSubmited = true;
    if (this.form.valid) {

      console.log('Front end validation succeeded !');

      this.caisse = this.form.value;
      this.postData(this.caisse);

    } else {

      console.log('Front end validation failed !');
      console.log('Please provide all the required values!');
      this.toastService.showErrorToast("Erreurs de validation" , "vérifier que tous les champs sont valides");

    }

  }


  //send post request and handle response status (error or succes)
  // on error show error toast
  //on succes chow error toast and redirect to caisses list
  postData(data: any) {
    this.httpService.authPost(AppConstants.caisse, data)
      .subscribe({
        next: (resp) => {
          console.log('created data with success')
          this.toastService.showSuccessToast("Succes !" , "L'opération s'est bien ajoutée");
          this.router.navigate(['/dashboard/caisses-list']);
        } ,
        error: (error) => {
          const status = error.status;
          console.log(`error status ${status}`)

          if(status == 422){
            var message = "";
            error.error.errors.forEach( ( elt : any) => {
              message+= "- "+elt.field+" : "+elt.message+'<br>';
            });
            this.toastService.showErrorToast("Erreur de validation !" , message);
          } else if (status == 409) {
            this.toastService.showErrorToast("Problème interne" , error.error.message);
          } else {
            this.toastService.showErrorToast("Erreur" , "Veuillez réessayer plus tard !");
          }
        }
      });
  }

    //check for validation errors
  checkTrue(controlName : string , errorName : string) : boolean {
    return this.isSubmited && this.errorControl[controlName].errors?.[errorName]
  }


}
