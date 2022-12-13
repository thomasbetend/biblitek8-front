import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  like1 = 0;
  like2 = 0;
  
  constructor() {}

  addLike1() {
    if (this.like1 === 0) {
      this.like1++;
    } else {
      this.like1--;
    }
  }

  addLike2() {
    if (this.like2 === 0) {
      this.like2++;
    } else {
      this.like2--;
    }
  }

}
