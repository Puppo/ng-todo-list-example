import { AuthenticatedGuard } from './authenticated';
import { NotAuthenticatedGuard } from './not-authenticated';

export * from './authenticated';
export * from './not-authenticated';

export const AuthGuards: any[] = [
  AuthenticatedGuard,
  NotAuthenticatedGuard
];
