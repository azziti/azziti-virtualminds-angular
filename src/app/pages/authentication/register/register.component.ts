import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { matchValidator } from 'src/app/utils/validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;
  isSubmited: boolean = false;

  constructor(
    private router: Router,
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      repassword: ['', [Validators.required, Validators.minLength(8), matchValidator('password')]],
      
    });
  }

  get errorControl() {
    return this.form.controls;
  }


  //check if form is valid then register
  submitForm() {
    this.isSubmited = true;
    if (this.form.valid) {
      console.log('Front end validation succeeded !');
      this.register(this.form.value)
    } else {
      console.log('Front end validation failed !');
      console.log('Please provide all the required values!');
      this.toastService.showErrorToast(
        'Validation errors',
        'Please make sure that all fields are valid !'
      );
    }
  }

  register(user: any) {

    console.log('trying to register ...');
    this.auth.register(user).subscribe({
      next: (resp) => {
        console.log(resp);
          this.toastService.showSuccessToast(
            'Succès !',
            'Votre compte a bien été créé , Connecter vous !'
          );
          this.router.navigate(['authentication/login']);
        
      },
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

      },
    });
  }

    //check for validation errors
  checkTrue(controlName : string , errorName : string) : boolean {
    return this.isSubmited && this.errorControl[controlName].errors?.[errorName]
  }

}
