import { Component, OnInit } from '@angular/core';
import { Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Career } from 'src/app/models';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  gameRating = 0;
  gameId: string;
  // custom type created inside models file
  career: Career;
  routeSub: Subscription;
  gameSub: Subscription;

  constructor(
    // provides us with the api of the route once activated
    private ActivatedRoute: ActivatedRoute,

    //created to communicate with api
    private httpService: httpService
  ) { }

  ngOnInit(): void {
    //subscribing subscription to routesub
    this.routeSub = this.ActivatedRoute.params.subscribe((params: Params) => {
      this.careerID = params['id'];
      this.getCareerDetails(this.careerId);
    });
  }

  getCareerDetails(id: string): void {
    this.careerSub = this.httpService
      //pass in the id from the route
      .getCareerDetails(id)
      .subscribe((careerResp: Career) => {
        this.career = careerResp;

        //setting delay for rating
        setTimeout(() => {
          this.careerRating = this.career.metacritic;
        })
      })
  }

  getColor(value: number): string{
    if (value > 75) {
      return '#5ee432';
    } else if (value > 50) {
      return '#fffa50';
    } else if (value > 30) {
      return '#f7aa38'
    } else {
      return '#ef4655';
    }
  }

}
