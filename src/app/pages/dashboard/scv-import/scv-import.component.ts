import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/config/app-constants';
import { Caisse } from 'src/app/models/caisse';
import { HttpService } from 'src/app/services/http.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-scv-import',
  templateUrl: './scv-import.component.html',
  styleUrls: ['./scv-import.component.css'],
})
export class ScvImportComponent implements OnInit {
  form!: FormGroup;
  isSubmited: boolean = false;
  title: String = 'Ajouter un fichier';
  loading : boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      file: ['', [Validators.required]],
    });
  }

  get errorControl() {
    return this.form.controls;
  }

  // handle file change
  // do some modification of the template
  // change file name
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.title = file.name;

      this.form.patchValue({
        file: file,
      });
    } else {
      this.title = 'Ajouter un fichier';
    }
  }

  // check if file is valid the submit
  submitForm() {
    this.isSubmited = true;
    if (this.form.valid) {
      console.log('Front end validation succeeded !');
      this.postData();
    } else {
      console.log('Front end validation failed !');
      console.log('Please provide all the required values!');
      this.toastService.showErrorToast(
        'Erreurs de validation',
        'vérifier que tous les champs sont valides'
      );
    }
  }


  // send multipart post request
  postData() {

    this.loading  = true;


    // add file to the request
    // check if file is a csv
    const formData = new FormData();
    formData.append(
      'file',
      new Blob([this.form.get('file')?.value], {
        type: this.title.toLowerCase().endsWith('csv') ? 'text/csv' : '',
      })
    );

// send post request
    this.httpService.authPost(AppConstants.csvCaisse, formData).subscribe({
      next: (resp) => {
        console.log('uploaded data with success');
        this.toastService.showSuccessToast(
          'Succes !',
          "La liste s'est bien ajoutée"
        );
        this.router.navigate(['/dashboard/caisses-list']);
        this.loading  = false;
      },
      error: (error) => {
        const status = error.status;
        console.log(`error status ${status}`);

        if (status == 201) {
          // to avoid angular bug when using files a success request get caught as error  
          console.log('uploaded data with success');
          this.toastService.showSuccessToast(
            'Succes !',
            "La liste s'est bien ajoutée"
          );
          this.router.navigate(['/dashboard/caisses-list']);
        } else if (status == 422) {
          // file is not a csv
          this.toastService.showErrorToast(
            'Erreur de validation !',
            'SVP Selectionner un fichier (.csv)'
          );
        } else if (status == 409) {
          // file is empty
          this.toastService.showErrorToast(
            'Problème interne',
            'Le fichier selectionné est vide'
          );
        } else if (status == 417) {
          //file is too big
          this.toastService.showErrorToast(
            'Problème interne',
            'Le fichier selectionné est très (max 2mb)'
          );
        } else {
          // wild cast case
          this.toastService.showErrorToast(
            'Erreur',
            'Veuillez réessayer plus tard !'
          );
        }
        this.loading  = false;
      },
    });
  }

      // set the default end date to this day
  checkTrue(controlName: string, errorName: string): boolean {
    return (
      this.isSubmited && this.errorControl[controlName].errors?.[errorName]
    );
  }
}
