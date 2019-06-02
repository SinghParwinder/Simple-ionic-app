import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { BaseService } from 'src/app/common/base.service';

@Injectable()
export class CastService extends BaseService{

    constructor(private _http: HttpClient) { 
        super(_http);
    }

    getDetails(id): Observable<any> {
        return this.PersonREST(id, '', '&language=en-US');
    }

    getMovies(id): Observable<any> {
        return this.PersonREST(id, '/movie_credits', '&language=en-US');
    }

    getShows(id): Observable<any> {
        return this.PersonREST(id, '/tv_credits', '&language=en-US');
    }
}