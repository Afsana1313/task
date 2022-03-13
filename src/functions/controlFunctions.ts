import { ListType } from "../components/type";
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

export const deleteCard = () => {};
