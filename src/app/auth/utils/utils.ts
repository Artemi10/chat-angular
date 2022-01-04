import {FormControl, FormGroup } from "@angular/forms";

export const handleError = (error: any) => {
  if (error.status === 401 || error.status === 403 || error.status === 404){
    return  error.error;
  }
}

export const isInputInvalid = (form: FormGroup, inputName: string) =>
  form.controls[inputName].invalid && form.controls[inputName].touched;

