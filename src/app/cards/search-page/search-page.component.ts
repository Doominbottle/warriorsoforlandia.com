import { Subscription } from 'rxjs/Rx';
import { CardSearch, CardResults, CardData } from './../../common/interfaces/card-models';
import { CardDataService } from './../../common/core/services/card-data.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit, OnDestroy {
  public results: CardResults;
  public search: CardSearch;
  public searching: boolean;
  public error: any;

  private searchSubscription: Subscription;
  private routeSubscription: Subscription;

  constructor(
    private cardDataService: CardDataService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.search = {
      name: '',
      type: '',
      set: '',
      artist: ''
    };

    this.routeSubscription = this.route.queryParams.subscribe(params => {
      this.search = {
        name: params['name'],
        type: params['type'],
        set: params['set'],
        artist: params['artist']
      };

      this.searchInternal();
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  public performSearch(search: CardSearch): void {
    this.router.navigate(['cards'], {
      queryParams: {
        name: search.name,
        type: search.type,
        set: search.set,
        artist: search.artist
      }
    });
  }

  private searchInternal() {
    if (!this.shouldPerformSearch()) {
      return;
    }

    this.error = null;
    this.searching = true;

    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }

    this.searchSubscription = this.cardDataService.searchCards(this.search).subscribe(data => {
      this.results = data;
      this.searching = false;
    }, error => {
      this.searching = false;
      this.error = error;
    });
  }

  public getCardImage(card: CardData) {
    return this.cardDataService.getCardImageUrl(card, true);
  }

  private shouldPerformSearch(): boolean {
    if (this.search.name || this.search.type || this.search.set || this.search.artist) {
      return true;
    }

    return false;
  }
}
