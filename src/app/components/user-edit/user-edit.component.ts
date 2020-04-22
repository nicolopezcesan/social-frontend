import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Route } from '@angular/compiler/src/core';
import { UploadService } from 'src/app/services/upload.service';
import { GLOBAL } from '../../services/global';

@Component({
    selector: 'user-edit',
    templateUrl: 'user-edit.component.html',
    providers: [UserService, UploadService]
})

export class UserEditComponent implements OnInit {
    public title: string;
    public user: User;
    public identity: any;
    public token: any;
    public status: string;
    public url: string;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _uploadService: UploadService
    ) {
        this.title = 'Actualizar mis datos';
        this.user = this._userService.getIdentity();
        this.identity = this.user;
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
    }

    ngOnInit() {
    }

    onSubmit() {
        this._userService.updateUser(this.user).subscribe(
            response => {
                if (!response.user) {
                    this.status = 'ERROR';
                } else {
                    this.status = 'OK';
                    localStorage.setItem('identity', JSON.stringify(this.user));
                    this.identity = this.user;

                    // SUBIDA IMAGEN DE USUARIO
                    this._uploadService.makeFileRequest(
                        this.url + 'upload-image-user/' + this.user._id,
                        [],
                        this.filesToUpload,
                        this.token,
                        'image'
                    ).then((result: any) => {
                        this.user.image = result.user.image;
                        localStorage.setItem('identity', JSON.stringify(this.user));
                    }).catch(error => {
                        this.status = 'ERROR';
                        console.log(JSON.parse(error));
                    });
                }
            },
            error => {
                let errorMessage = <any>error;

                if (errorMessage != null) this.status = 'ERROR';
            }
        );
    }

    public filesToUpload: Array<File>;
    fileChangeEvent(fileInput: any) {
        this.filesToUpload = <Array<File>>fileInput.target.files;
    }
}