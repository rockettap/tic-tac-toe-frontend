export const ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",
  HOME: "/",
  ROOM: "/room/:roomId",
  USER_LAST_GAMES: "/user/:userId/games",
  USER_STATS: "/user/:userId/stats",
  USER: "/user/:userId",
} as const;

export type PathParams = {
  [ROUTES.USER]: {
    userId: string;
  };
  [ROUTES.ROOM]: {
    roomId: string;
  };
};
