import { Pipe, PipeTransform } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './services/user.service';

@Pipe({
  name: 'authImage'
})

export class AuthImagePipe implements PipeTransform {

  constructor(
    private _http: HttpClient,
    private _userService: UserService,
  ) { }

  async transform(src: string): Promise<string> {
    const token = this._userService.getToken();
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);

    try {
      const imageBlob = await this._http.get(src, { headers, responseType: 'blob' }).toPromise();
      const reader = new FileReader();

      return new Promise((resolve, reject) => {
        
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(imageBlob);
      });

    } catch (error) {
      return error;
    }
  }


}
