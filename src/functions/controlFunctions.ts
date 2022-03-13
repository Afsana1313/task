import { ListType } from "../components/type";
export const getNewList = (
  list: ListType[],
  title: string,
  cardName: string
) => {
  //console.log(id);
  var newList = list;
  newList.push({ name: cardName, id: list?.length + 1, category: title });
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
