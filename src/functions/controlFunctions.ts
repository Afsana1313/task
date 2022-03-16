import { ListType, CategoryType } from "components/type";

// getNewList is called when a new card is dropped to a new List box  in SingleList.tsx
export const getNewList = (list: ListType[], title: string, data: string) => {
  const newList = list?.map((i: ListType) => {
    if (i.name === data) i.category = title;
    return i;
  });
  localStorage.setItem("list", JSON.stringify(newList));
  return newList;
};

// deleteListName function is called when a list is deleted, the list is deleted from list and category list
export const deleteListName = (
  title: string,
  list: ListType[],
  categoryList: CategoryType[]
) => {
  const newCategoryList = reArrangeId(
    categoryList?.filter((i: CategoryType) => title !== i.title)
  );
  const newList = reArrangeId(
    list.filter((i: ListType) => title !== i.category)
  );
  return [newCategoryList, newList];
};
// renameListName is called when list name is renamed in SingleList.tsx
export const renameListName = (
  id: number,
  newListName: string,
  list: ListType[],
  categoryList: CategoryType[]
) => {
  const a = categoryList?.find((i: CategoryType) => id === i.id);
  console.log(categoryList);
  const newList = list?.map((i: ListType) => {
    if (a?.title === i.category) i.category = newListName;
    return i;
  });
  const newCategoryList = categoryList?.map((i: CategoryType) => {
    if (a?.title === i.title) i.title = newListName;
    return i;
  });
  return [newList, newCategoryList];
};

const reArrangeId = (list: ListType[] | CategoryType[]) => {
  return list?.map((i: ListType | CategoryType, index: number) => {
    i.id = index + 1;
    return i;
  });
};
export const deleteCard = (id: number, list: ListType[]) => {
  const newList = reArrangeId(list.filter((i: ListType) => i.id !== id));
  localStorage.setItem("list", JSON.stringify(newList));
  return newList;
};

export const renameCardName = (
  list: ListType[],
  id: number,
  newCardName: string
) => {
  return list.map((i: ListType) => {
    if (id === i.id) i.name = newCardName;
    return i;
  });
};
