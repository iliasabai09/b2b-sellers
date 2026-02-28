import { Request } from 'express';

export type UserJwt = { user: { sub: number; companyId: number } };
export type UserReq = Request & UserJwt;
