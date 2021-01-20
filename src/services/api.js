import {HttpClient} from 'aurelia-http-client';

export class Api {
  http = null;
  baseUrl = "http://www.arancinomania.com/toki/";

  constructor() {
    this.http = new HttpClient();
    this.http.configure(x => {
      x.withBaseUrl(this.baseUrl);
      x.withInterceptor({
        request: (message) => {
          if (this.authData && this.authData.session) {
            let urlSearchParams = new URLSearchParams(message.url || '');
            urlSearchParams.set('MAID', this.authData.session);
            message.url = `?${urlSearchParams.toString()}`;
          }
          return message;
        },
        response(message) {
          return message;
        },
        responseError(error) {
          throw error;
        }
      });
    });
  }

  get authData() {
    if (!this._authData) {
      let authData = localStorage.getItem('authData');
      if (authData) this._authData = JSON.parse(authData);
    }
    return this._authData || null;
  }
  
  set authData(value) {
    this._authData = value;
    localStorage.setItem('authData', JSON.stringify(value));
  }

  get(service, params = {}) {
    return this.http.createRequest(service)
    .asGet()
    .withParams(params)
    .send()
  }

  patch(service, data) {
    return this.http.patch(service, data);
  }

  post(service, data) {
    let formData = new FormData();
    formData.append('service', service);
    formData.append('params', encodeURIComponent(JSON.stringify(data)));
    return this.http.post('', formData);
  }

  delete(service, data) {
    return this.client.delete(service, data);
  }
}
