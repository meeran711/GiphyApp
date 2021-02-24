import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs';
import { GiphyItem } from './GiphyItem';

@Injectable()
export class GiphyService {
  searchApi = 'http://localhost:8080/giphylookup';
  trendingGifs = '/gifs/trending';
  searchGifs = '/gifs/search';
  searchStickers = '/stickers/search';

  constructor(private http: HttpClient) {}

  loadTrendingGifs = (offset: number): Observable<any> => {
    const url = `${this.searchApi}${this.trendingGifs}?offset=${offset}`;

    return this.http.get(url).pipe(
      map((res) => {
        // return res;
        // @ts-ignore
        return res.data.map((item) => {
          return new GiphyItem(
            item.images.downsized_medium.url,
            item.images.downsized_medium.height,
            item.images.downsized_medium.width
          );
        });
      })
    );
  }

  loadSearchingGifs = (term: string, offset: number): Observable<any> => {
    const url = `${this.searchApi}${this.searchGifs}?offset=${offset}&q=${term}`;

    return this.http.get(url).pipe(
      map((res) => {
        // return res;
        // @ts-ignore
        return res.data.map((item) => {
          return new GiphyItem(
            item.images.downsized_medium.url,
            item.images.downsized_medium.height,
            item.images.downsized_medium.width
          );
        });
      })
    );
  }

  loadSearchingStickers = (term: string, offset: number): Observable<any> => {
    const url = `${this.searchApi}${this.searchStickers}?offset=${offset}&q=${term}`;

    return this.http.get(url).pipe(
      map((res) => {
        // return res;
        // @ts-ignore
        return res.data.map((item) => {
          return new GiphyItem(
            item.images.downsized_medium.url,
            item.images.downsized_medium.height,
            item.images.downsized_medium.width
          );
        });
      })
    );
  }
}
