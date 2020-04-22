import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
    selector: 'users',
    templateUrl: './users.component.html',
    providers: [UserService]
})

export class UsersComponent implements OnInit {
    public url: string;
    public title: string;
    public identity: any;
    public token: any;
    public page: any;
    public nextPage: any;
    public prePage: any;
    public status: string;

    public total: any;
    public pages: any;
    public users : User[];

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
    ) {
        this.url = GLOBAL.url;
        this.title = 'Gente';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
    }

    ngOnInit() {
        console.log('users.components ha sido cargado!');
        this.actualPage();
        
    }

    actualPage() {
        this._route.params.subscribe(params => {
            let page = +params['page'];
            this.page = page;

            if (!page) {
                page = 1;
            } else {
                this.nextPage = page + 1;
                this.prePage = page - 1;

                if (this.prePage <= 0) this.prePage = 1;
            }

            // Devolver listado de usuarios
            this.getUsers(page);
        });
    }

    getUsers(page) {
        this._userService.getUsers(page).subscribe(
            response => {
                if (!response.users) {
                    this.status = 'ERROR';
                } else {
                    this.total = response.total;
                    this.users = response.users;
                    this.pages = response.pages;

                    if (page > this.pages) this._router.navigate(['/gente', 1]);
                }
                
            },
            error => {
                let errorMessage = <any>error;

                if (errorMessage != null) this.status = 'ERROR';
            }
        )
    }
}

