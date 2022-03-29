import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse, Career } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  // definite assignment assertion for sort
  public sort!: string;
  // WHY DOES CAREERS CAUSE AN ERROR WITHOUT TYPE ANY <_____________________>
  public careers!: Array<Career> | any;
  private routeSub!: Subscription;
  private careerSub!: Subscription;
  
  constructor(
    private httpService: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    
   }
  ngOnInit(): void {
    //activated route is used to subscribe to event
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      if (params['game-search']) {
        this.searchCareers('metacrit', params['games-search']);
      } else {
        this.searchCareers('metacrit');
      }
    });
  }

  searchCareers(sort: string, search?: string): void {
    this.careerSub = this.httpService
      .getCareerList(sort, search)
      .subscribe((careerList: APIResponse<Career>) => {
        // feed results into careers
        this.careers = careerList.results;
        console.log(careerList)
      });
    }
  
  openCareerDetails(id: string): void {
    this.router.navigate(['details', id]);
  } 

  // avoiding memory leaks
  ngOnDestroy(): void {
    if (this.careerSub) {
      this.careerSub.unsubscribe();
    }

    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }



}


