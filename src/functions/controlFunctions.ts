import { ListType, CategoryType } from "../components/type";

export const getNewList = (list: ListType[], title: string, data: string) => {
  const newList = list?.map((i: ListType) => {
    if (i.name === data) i.category = title;
    return i;
  });
  localStorage.setItem("list", JSON.stringify(newList));
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

  const newCategoryList = reArrangeId(
    categoryList?.filter((i: CategoryType) => title !== i.title)
  );

  const newList = reArrangeId(
    list.filter((i: ListType) => title !== i.category)
  );
  return [newCategoryList, newList];
};

export const renameListName = (
  id: number,
  title: string,
  newListName: string,
  list: ListType[],
  categoryList: CategoryType[]
) => {
  const a = categoryList?.find((i: CategoryType) => id === i.id);
  console.log(categoryList);
  const newList = list?.map((i: ListType) => {
    //console.log("title ", title, " i.category ", i.category);
    if (a?.title == i.category) i.category = newListName;
    return i;
  });
  // console.log(categoryList);
  const newCategoryList = categoryList?.map((i: CategoryType) => {
    if (a?.title == i.title) i.title = newListName;
    return i;
  });
  // console.log(newList, newCategoryList);
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
