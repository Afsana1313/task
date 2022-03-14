import { ListType, CategoryType } from "../components/type";
import { useContext } from "react";
export const getNewList = (list: ListType[], title: string, data: string) => {
  const newList = list?.map((i: ListType) => {
    if (i.name === data) i.category = title;
    return i;
  });
  return newList;
};

const getNewCard = (cardName: string, cardLength: number) => {
  const newCard = {
    title: cardName,
    id: cardLength == null ? 1 : cardLength + 1,
  };
  //  console.log("new Card ", newCard);
  return newCard;
};

export const deleteListName = (
  title: string,
  list: ListType[],
  categoryList: CategoryType[]
) => {
  console.log(list, categoryList);

  const newCategoryList = categoryList?.filter((i: any) => title !== i.title);

  const newList = list.filter((i: any) => title !== i.category);
  return [newCategoryList, newList];
};

export const renameListName = (
  title: string,
  newListName: string,
  categoryList: CategoryType[],
  list: ListType[]
) => {
  const newList = list.map((i: ListType) => {
    if (title == i.category) i.category = newListName;
    return i;
  });
  const newCategoryList = categoryList?.map((i: CategoryType) => {
    if (title == i.title) i.title = newListName;
    return i;
  });
  return [newList, newCategoryList];
};
