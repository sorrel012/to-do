import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

export interface IToDo {
  text: string;
  id: number;
  categoryId: number;
}

export interface ICategory {
  text: string;
  id: number;
}

export interface ICategoryState {
  categories: ICategory[];
  selectedCategoryId: number;
}

const { persistAtom } = recoilPersist();

export const categoryState = atom<ICategoryState>({
  key: 'categories',
  default: {
    categories: [{ text: 'To Do', id: 1 }],
    selectedCategoryId: 1,
  },
  effects_UNSTABLE: [persistAtom],
});

export const categorySelector = selector({
  key: 'categorySelector',
  get: ({ get }) => {
    const categories = get(categoryState);
    return categories.categories.filter(
      (category) => category.id === categories.selectedCategoryId,
    );
  },
});

export const toDoState = atom<IToDo[]>({
  key: 'toDo',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const toDoSelector = selector({
  key: 'toDoSelector',
  get: ({ get }) => {
    const toDos = get(toDoState);
    const categoriesInfo = get(categoryState);
    return toDos.filter(
      (toDo) => toDo.categoryId === categoriesInfo.selectedCategoryId,
    );
  },
});