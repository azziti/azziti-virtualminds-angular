import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConstants } from 'src/app/config/app-constants';
import { Caisse } from 'src/app/models/caisse';
import { HttpService } from 'src/app/services/http.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-caisse-edit',
  templateUrl: './caisse-edit.component.html',
  styleUrls: ['./caisse-edit.component.css'],
})
export class CaisseEditComponent implements OnInit {
  form!: FormGroup;
  isSubmited: boolean = false;
  caisse!: Caisse;
  id: any;

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private router: Router,
    private toastService: ToastService,
    private activatedRoute: ActivatedRoute
  ) // private location : Location
  {}

  //we should load data when component is instaciated
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      libelle: ['', [Validators.required]],
      amountIn: [
        0,
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern(AppConstants.numberPattern),
        ],
      ],
      amountOut: [
        0,
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern(AppConstants.numberPattern),
        ],
      ],
      operationDate: ['', Validators.required],
    });

    // get route params to send a get request to the server
    this.activatedRoute.paramMap.subscribe({
      next: (value) => {
        this.id = (value as any).params.id;
        console.log(`getting caisse with id : ${this.id} ...`);
        //load caisse from server
        this.getCaisse(this.id);
      },
      error: (error) => {
        console.log('failed to get route params');
        this.toastService.showErrorToast('Oops !', "Id d'opération trouvée");
        this.router.navigate(['/dashboard/error-404'], { replaceUrl: true });
      },
    });
  }

  get errorControl() {
    return this.form.controls;
  }

  // get caisse by id  from server
  getCaisse(id: any) {
    this.httpService.authGet(AppConstants.caisse + `/${id}`).subscribe({
      next: (data: any) => {
        console.log('data received succefully');
        this.caisse = data.body;
        this.caisse.operationDate = new Date(
          data.body.operationDate.substring(0, 10)
        );

        this.form.patchValue({
          libelle: this.caisse.libelle,
          amountIn: this.caisse.amountIn,
          amountOut: this.caisse.amountOut,
          operationDate: this.caisse?.operationDate
            ?.toISOString()
            .substring(0, 10),
        });
      },
      error: (error) => {
        console.log(`failed to get data from server using id : ${id} .`);
        this.toastService.showErrorToast('Oops !', 'Opération inexistante !');
        this.router.navigate(['/dashboard/caisses-list'], { replaceUrl: true });
      },
    });
  }

  // check if form is valid then submit data to the server
  submitForm() {
    this.isSubmited = true;
    if (this.form.valid) {
      console.log('Front end validation succeeded !');

      this.caisse = this.form.value;
      this.postData(this.caisse);
    } else {
      console.log('Front end validation failed !');
      console.log('Please provide all the required values!');
      this.toastService.showErrorToast(
        'Erreurs de validation',
        'vérifier que tous les champs sont valides'
      );
    }
  }

  // post data and handle response
  postData(data: any) {
    this.httpService
      .authPut(`${AppConstants.caisse}/${this.id}`, data)
      .subscribe({
        next: (resp: any) => {
          console.log('updated data with success');
          this.toastService.showSuccessToast(
            'Succes !',
            "L'opération s'est bien modifiée"
          );
          this.router.navigate(['/dashboard/caisses-list']);
        },
        error: (error) => {
          const status = error.status;
          console.log(`error status ${status}`);

          if (status == 422) {
            var message = '';
            error.error.errors.forEach((elt: any) => {
              message += '- ' + elt.field + ' : ' + elt.message + '<br>';
            });
            this.toastService.showErrorToast('Erreur de validation !', message);
          } else if (status == 409) {
            this.toastService.showErrorToast(
              'Problème interne',
              error.error.message
            );
          } else {
            this.toastService.showErrorToast(
              'Erreur',
              'Veuillez réessayer plus tard !'
            );
          }
        },
      });
  }

  //check for validation errors
  checkTrue(controlName: string, errorName: string): boolean {
    return (
      this.isSubmited && this.errorControl[controlName].errors?.[errorName]
    );
  }
}
