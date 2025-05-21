import { ICategory, IGroup } from '../interfaces/category.interface';

export const mockGroup1: IGroup = { id: 1, name: 'Group A', color: 'red' };
export const mockGroup2: IGroup = { id: 2, name: 'Group B', color: 'blue' };

export const mockCategories: ICategory[] = [
  { id: 1, wording: 'Cat Z', description: null, group: mockGroup1 },
  { id: 2, wording: 'Cat A', description: null, group: mockGroup1 },
  { id: 3, wording: 'Cat B', description: null, group: mockGroup2 },
  { id: 4, wording: 'Cat C', description: null, group: mockGroup2 },
  { id: 5, wording: 'No Group', description: null },
];
