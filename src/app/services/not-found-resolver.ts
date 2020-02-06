import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {DomSanitizer} from '@angular/platform-browser';
import {HttpClient} from '@angular/common/http';
import {Resolve} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable()
export class NotFoundResolver implements Resolve<any> {

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {}

  resolve = (): Observable<any> =>
    this.http.get('assets/img/page-not-found-img.png', { responseType: 'blob' }).pipe(
      map( image => {
        const blob: Blob = new Blob([image], { type: 'image/png' });
        const imageStyle = `${window.URL.createObjectURL(blob)}`;
        return this.sanitizer.bypassSecurityTrustUrl(imageStyle);
      })
    )
}
