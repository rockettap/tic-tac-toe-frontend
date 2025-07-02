export const ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",
  HOME: "/",
  ROOM: "/rooms/:roomId",
  ROOM_CREATE: "/rooms/create",
  ROOM_JOIN: "/rooms/join",
  USER_LAST_GAMES: "/users/:userId/games",
  USER_STATS: "/users/:userId/stats",
  USER: "/users/:userId",
  GAME: "/games/:gameId",
} as const;

export type PathParams = {
  [ROUTES.USER]: {
    userId: string;
  };
  [ROUTES.ROOM]: {
    roomId: string;
  };
  [ROUTES.GAME]: {
    gameId: string;
  };
};
