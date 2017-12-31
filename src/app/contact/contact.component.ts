import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Feedback, ContactType } from '../shared/feedback';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  feedbackForm : FormGroup;
  feedback: Feedback;
  contactType = ContactType;

  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };

  validatorMessages = {
    'firstname': {
      'required' : 'First name is required',
      'minlength': 'Min length is 2 character',
      'maxlength': 'Max length is 28 character'
    },
    'lastname': {
      'required' : 'Last name is required',
      'minlength': 'Min length is 2 character',
      'maxlength': 'Max length is 28 character'
    },
    'telnum': {
      'required' : 'Tel. number is required',
      'pattern': 'only number is allowed'
    },
    'email': {
      'required' : 'Email is required',
      'email': 'Enter a valid pattern'
    }
  };

  constructor( private fb: FormBuilder) {
    this.createForm();
   }

  ngOnInit() {
  }

  createForm(){
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(28)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(28)]],
      telnum: [0, [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      agree: false,
      contactType: 'None',
      message: ''
    });

    this.feedbackForm.valueChanges.subscribe( data => {
      this.onValueChange(data);
    });

    this.onValueChange();
  }

  onSubmit(){
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: 0,
      email: '',
      agree: false,
      contactType: 'None',
      message: ''
    });
  }

  onValueChange(data?: any){
    if(!this.feedbackForm){return};

    const form = this.feedbackForm;
    for(const field in this.formErrors){
      this.formErrors[field] = '';
      const control = form.get(field);
      if(control && control.dirty && !control.valid){
        const messages = this.validatorMessages[field];
        for(const key in control.errors){
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

}
