import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
// import { User } from '../../models/user';
// import { UserService } from '../../services/user.service';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit{
    public title: String;

    constructor() {
        this.title = 'Bienvenido a NG Social';
    }

    ngOnInit() {
        console.log('home.component cargado!');
    }
}