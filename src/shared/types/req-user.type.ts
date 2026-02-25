import { Request } from 'express';

export type UserReq = Request & { user: { sub: number; companyId: number } };
