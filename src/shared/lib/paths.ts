export const ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",
  HOME: "/",
  USER: "/user/:userId",
  USER_STATS: "/user/:userId/stats",
  USER_LAST_GAMES: "/user/:userId/games",
} as const;

export type PathParams = {
  [ROUTES.USER]: {
    userId: string;
  };
};
