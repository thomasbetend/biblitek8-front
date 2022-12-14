import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  data: any;
  like1 = 0;
  like2 = 0;
  imageUrl?: string;


  urlAvatar1 = "https://www.revue-ballast.fr/wp-content/uploads/2017/11/fbsdb.jpg";
  urlAvatar2 = "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSBoUFHEYefJOcVH6Fa_RwKCKwd6K9vyWB7hy-XXLWsYwdaFqBA";

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.refreshList();
    this.imageUrl = "../../assets/images/";
  }




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

  refreshList() {
    this.apiService.getPostsList().subscribe(data => {
      console.log(data);
      this.data = data;
  });
  }

  


}
