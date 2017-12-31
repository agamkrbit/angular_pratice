import { Component, OnInit} from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Comment } from '../shared/comment';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  dish: Dish;
  dishIds: number[];
  index: number;
  prev: number;
  next: number;
  comment: Comment;
  commentForm: FormGroup;

  formErrors = {
    'author': '',
    'comment': '',
  };

  validatorMessages = {
    'author': {
      'required': 'User name is required',
      'minlength': 'Min character is 2',
      'maxlength': 'Max character is 28'
    },
    'comment': {
      'required': 'Comment is required'
    },
  }


  constructor(private route: ActivatedRoute,
              private location: Location,
              private dishService: DishService,
              private fb: FormBuilder) { 
              this.createForm();
              }

  ngOnInit() {
    this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.switchMap((params : Params) => 
      this.dishService.getDish(+params['id'])
    ).subscribe(dish => {
                    this.dish = dish;
                    this.setPrevNext(dish.id);
    });
  }
  generateSeq(i : number){
    var arr: number[] = new Array();
    for(var j: number = 0; j < i; j++){
      arr.push(j);
    }
    return arr;
  }
  goBack(){
    this.location.back();
  }

  setPrevNext(dishId: number){
    this.index = dishId;
    this.prev = this.dishIds[(this.dishIds.length + this.index -1)%this.dishIds.length];
    this.next = this.dishIds[(this.index + 1)%this.dishIds.length];
  }

  createForm(){
    this.commentForm = this.fb.group({
      'author': ['', [Validators.required, Validators.minLength(2),Validators.maxLength(28)]],
      'comment': ['', [Validators.required]],
      'rating': 0,
      'date': ''
    });
    this.commentForm.valueChanges.subscribe(data => this.onValueChange(data));
    this.onValueChange();
  }

  onValueChange(data?: any){
    if(!this.commentForm){ return };
    const form = this.commentForm;
    var error: boolean = false;
    for(const field in this.formErrors){
      this.formErrors[field] = '';
      const control = form.get(field);
      const message = this.validatorMessages[field];
      if(control && control.dirty && !control.valid){
        for(const key in control.errors){
          this.formErrors[field] += message[key] + ' ';
          error = true;
        }
      }
    }
    if(!error && this.commentForm.dirty){
      this.comment = this.commentForm.value;
    }else{
      this.comment = null;
    }
  }
  onSubmit(){
      this.dish.comments.push(this.commentForm.value);
      this.comment = null;
      this.commentForm.reset({
        'author': '',
        'comment': '',
        'rating': 0,
        'date': ''
      });
  }
}
