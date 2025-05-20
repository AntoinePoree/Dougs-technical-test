export const RoutesEnum = {
  CATEGORY_GROUP: 'group',
  CATEGORY_ALPHABETICAL: 'alphabetical',
} as const;

export type RouteValues = (typeof RoutesEnum)[keyof typeof RoutesEnum];
