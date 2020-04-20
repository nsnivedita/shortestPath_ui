import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {

    public server = 'http://localhost:3200/api/';
   
    public serverWithApiUrl = this.server;
}
