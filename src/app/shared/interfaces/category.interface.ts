export interface IGroup {
  id: number;
  name: string;
  color: string;
}

export interface ICategory {
  id: number;
  wording: string;
  description: string | null;
  group?: IGroup;
}

export interface IGroupedCategory extends IGroup {
  categories: ICategory[];
}