import * as e from 'express';

import { IRestaurants } from '@src/models/Restaurants';


// **** Express **** //

export interface IReq<T = void> extends e.Request {
  body: T;
}

export interface IRes extends e.Response {
  locals: {
    sessionUser?: IRestaurants;
  };
}
