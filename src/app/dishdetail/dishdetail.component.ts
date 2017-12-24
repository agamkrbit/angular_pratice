import { Component, OnInit} from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  dish: Dish;
  constructor(private route: ActivatedRoute,
              private location: Location,
              private dishService: DishService) { }

  ngOnInit() {
    let id = +this.route.snapshot.params['id'];
    this.dish = this.dishService.getDish(id);
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
}
