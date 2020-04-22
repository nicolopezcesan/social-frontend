import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    providers: [UserService]
})

export class LoginComponent implements OnInit {
    public title:string;
    public user:User
    public status:string
    public identity;
    public token;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
    ) {
        this.title = 'Identificate';
        this.user = new User(
            '',
            '',
            '',
            '',
            '',
            '',
            'ROLE_USER',
            ''
        );
    }
    
    ngOnInit() {
        console.log('componente de login cargado!');
    }
    
    onSubmit() {
        // Loguear al usuario y conseguir sus datos
        this._userService.signup(this.user).subscribe(
            response => {
                this.identity = response.user;
                
                if (!this.identity || !this.identity._id) {
                    this.status = 'ERROR';
                } else {
                    // PERSISTIR DATOS DEL USUARIO
                    localStorage.setItem('identity', JSON.stringify(this.identity));
                    
                    // CONSEGUIR TOKEN
                    this.getToken();
                }
            },
            error => {
                let errorMessage = <any> error;
                console.log(errorMessage);
                
                if (errorMessage != null) {
                    this.status = 'ERROR';
                }
            }
        );
    }

    getToken() {
        this._userService.signup(this.user, 'true').subscribe(
            response => {
                this.token = JSON.stringify(response.token);
                
                if (this.token.length <= 0) {
                    this.status = 'ERROR';
                } else {
                    // PERSISTIR TOKEN DEL USUARIO
                    localStorage.setItem('token', this.token);
                    // Conseguir los contadores o estadísticas del usuario
                    this.getCounters();
                }

            },
            error => {
                let errorMessage = <any> error;
                if (errorMessage != null) {
                    this.status = 'ERROR';
                }
            }
        );
    }

    getCounters() {
        this._userService.getCounters().subscribe(
            response => {
                localStorage.setItem('stats', JSON.stringify(response));
                this.status = 'OK';
                
                this._router.navigate(['/']);
                // if (response.following.length)
            },
            error => {
            }
        );
    }
}