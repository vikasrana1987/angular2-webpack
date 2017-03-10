import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

import { User } from '../_models/user';

@Injectable()
export class UserService {
    constructor(private http: Http) { }

    getAll(): Observable<User[]>  {
        return this.http.get('http://localhost:8090/api/users', this.jwt())
        .map((response: Response) => {
            let users = response.json();
            return users;
        })
        .catch(e => {
            if (e.status === 401) {
                return Observable.throw('Unauthorized');
            }
        });
    }

    getUserById(id: number): Observable<User[]>  {
        return this.http.get('http://localhost:8090/api/users/' + id, this.jwt())
        .map((response: Response) => {
            let user = response.json();
            return user;
        })
        .catch(e => {
            if (e.status === 401) {
                return Observable.throw('Unauthorized');
            }
        });
    }

    create(user: User) {
        return this.http.post('/api/users', user, this.jwt()).map((response: Response) => response.json());
    }

    update(user: User) {
        return this.http.put('/api/users/' + user.id, user, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({'Content-Type': 'application/json'});
            headers.append('Authorization',  'Bearer ' + currentUser.token);
            return new RequestOptions({ headers: headers });
        }
    }
}
