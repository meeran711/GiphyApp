import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  tap,
  switchMap,
  map,
} from 'rxjs/operators';
import { GiphyItem } from './GiphyItem';
import { GiphyService } from './GiphyService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private giphyService: GiphyService) {}
  title = 'giphy-app';
  searchTerm: string;
  results: Observable<GiphyItem[]>;
  selectedType: string;
  currentOffset = 0;
  loadTrends = true;
  types: any = ['Gifs', 'Stickers'];

  ngOnInit(): void {
    this.loadTrendingGiphy(0);
  }

  loadTrendingGiphy = (offset: number): void => {
    this.giphyService.loadTrendingGifs(offset).subscribe((results) => {
      this.results = results;
    });
  }

  searchGiphy = (term: string): void => {
    this.loadTrends = false;
    const type = this.selectedType;
    type === 'Stickers'
      ? this.giphyService
          .loadSearchingStickers(term, this.currentOffset)
          .subscribe((results) => {
            this.results = results;
          })
      : this.giphyService
          .loadSearchingGifs(term, this.currentOffset)
          .subscribe((results) => {
            this.results = results;
          });
  }

  radioChangeHandler = (event: any): void => {
    this.selectedType = event.target.value;
    this.currentOffset = 0;
  }

  loadGiphyForward = (): void => {
    this.currentOffset += 20;
    if (this.loadTrends === true) {
      this.loadTrendingGiphy(this.currentOffset);
    } else {
      this.searchGiphy(this.searchTerm);
    }
  }

  loadGiphyReverse = (): void => {
    this.currentOffset -= 20;
    if (this.loadTrends === true) {
      this.loadTrendingGiphy(this.currentOffset);
    } else {
      this.searchGiphy(this.searchTerm);
    }
  }
}
