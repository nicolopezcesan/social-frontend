import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable'; // Para recoger las respuestas
import { User } from '../models/user';
import { GLOBAL } from './global'; // Variable Global de mi servicio

@Injectable()

export class UserService {
    public url: string;
    public identity: any;
    public token: any;

    constructor(public _http: HttpClient) {
        this.url = GLOBAL.url;
    }

    register(user: User): Observable<any> {
        const params = JSON.stringify(user); // Convierte un json en string
        const headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url + 'register', params, { headers: headers });
    }

    signup(user, gettoken = null): Observable<any> {
        if (gettoken != null) {
            user.gettoken = gettoken;
        }

        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url + 'login', params, { headers: headers });
    }

    getIdentity() {
        let identity = JSON.parse(localStorage.getItem('identity')); // JSON.parse(); Convierte un json a un objeto de javascript

        this.identity = (identity != 'undefined') ? identity : null;

        return this.identity;
    }

    getToken() {
        let token = localStorage.getItem('token');

        this.token = (token != 'undefined') ? token : null;

        return this.token;
    }

    getStats() {
        let stats = JSON.parse(localStorage.getItem('stats'));

        return (stats != undefined) ? stats : null;
    }

    getCounters(userId = null): Observable<any> {
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', this.getToken());

        if (userId != null) {
            return this._http.get(this.url + 'counters/' + userId, { headers: headers });
        }

        return this._http.get(this.url + 'counters', { headers: headers });
    }

    updateUser(user: User): Observable<any> {
        let params = JSON.stringify(user);

        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', this.getToken());

        return this._http.put(this.url + 'update-user/' + user._id, params, { headers: headers });
    }

    getUsers(page = null): Observable<any> {
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', this.getToken());

        return this._http.get(this.url + 'users/' + page, { headers });
    }

    getUser(id: string): Observable<any> {
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', this.getToken());

        return this._http.get(this.url + 'users/' + id, { headers });
    }
}