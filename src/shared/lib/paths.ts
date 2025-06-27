export const ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",
  HOME: "/",
  USER: "/user/:userId",
} as const;

export type PathParams = {
  [ROUTES.USER]: {
    userId: string;
  };
};
