import { IUser } from '@src/models/Restaurants';
import 'supertest';


declare module 'supertest' {

  export interface Response  {
    headers: Record<string, string[]>;
    body: {
      error: string;
      users: IUser[];
    };
  }
}