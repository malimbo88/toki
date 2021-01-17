import {HttpClient} from 'aurelia-http-client';

export class Api {

  /* Http client */
  http = null;

  /* Url */
  baseUrl = "http://www.arancinomania.com/toki/";

  /* Constructor */
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

  /* Get authData */
  get authData() {
    if (!this._authData) {
      let authData = localStorage.getItem('authData');
      if (authData) this._authData = JSON.parse(authData);
    }
    return this._authData || null;
  }
  
  /* Set authData */
  set authData(value) {
    this._authData = value;
    localStorage.setItem('authData', JSON.stringify(value));
  }

  /* Get */
  get(service, params = {}) {
    return this.http.createRequest(service)
    .asGet()
    .withParams(params)
    .send()
  }

  /* Patch */
  patch(service, data) {
    return this.http.patch(service, data);
  }

  /* Post */
  post(service, data) {
    let formData = new FormData();
    formData.append('service', service);
    formData.append('params', encodeURIComponent(JSON.stringify(data)));
    return this.http.post('', formData);
  }

  /* Delete */
  delete(service, data) {
    return this.client.delete(service, data);
  }
}
