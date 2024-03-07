import { decode } from 'jsonwebtoken';
import { Cookie } from 'next-cookie';
import { UserToken } from '@web/interfaces/UserToken';

export function getUser(): UserToken | void {
  const token: string = new Cookie().get('access_token');
  if (!token) {
    return;
  }

  const user: UserToken | any = decode(token);

  return user;
}
