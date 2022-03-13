import { ListType } from "../components/type";
export const getNewList = (list: ListType[], id: number, cardName: string) => {
  console.log(id);
  const newList = list?.map((i: ListType, index: number) => {
    if (id === i?.id) {
    }
    //   console.log("got id matched ", id, i?.id);
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
