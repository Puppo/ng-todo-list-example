export interface ILoginActionProps {
  email: string;
  password: string;
}

export interface ILoginSuccessActionProps {
  token: string;
  email: string;
}

export interface ILoginFailActionProps {
  error: any;
}
