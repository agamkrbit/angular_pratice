import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { disableDebugTools } from '@angular/platform-browser/src/browser/tools/tools';

@Injectable()
export class DishService {

  constructor() { }

  getDishes(){
    return DISHES;
  }

  getDish(id: number) : Dish{
    return DISHES.filter((dish) => (dish.id === id))[0];
  }

  getFeaturedDish() : Dish{
    return DISHES.filter((dish) => dish.featured)[0];
  }

}
