import { useContext, useState } from "react";
import { ThemeContext } from "../App";
import { getNewList, deleteCard } from "../functions/controlFunctions";
import { CardType } from "../components/type";

function SingleList({ item }: any) {
  const [card, setCard] = useState<string>("");
  const { list, setList } = useContext(ThemeContext);
  const { name, id } = item;
  const handleSetCardName = (e: any) => {
    setCard(e.target.value);
  };
  const handleAddCard = (e: any) => {
    e.preventDefault();
    setList(() => getNewList(list, id, card));
    setCard("");
  };
  const handleDragStart = (e: any, cardTitle: string, listId: number) => {
    console.log(cardTitle, listId);
    e.dataTransfer.setData("text", cardTitle);
  };
  const handleOnDrop = (e: any) => {
    e.preventDefault();
    var data = e.dataTransfer.getData("text");
    console.log(e);
    // e.target.appendChild(data);
    setList(() => getNewList(list, item?.id, data));
    e.dataTransfer.clearData();
  };

  const handleAllowDrop = (e: any) => {
    e.preventDefault();
  };
  const singleCardList = item?.card?.map((i: CardType) => (
    <div
      id={`${item?.name}-${i?.id}`}
      key={i.id}
      className="single-card-container"
      draggable="true"
      onDragStart={(e) => handleDragStart(e, i.title, item?.id)}
    >
      {i.title}
    </div>
  ));

  return (
    <div
      className="single-list"
      onDrop={handleOnDrop}
      onDragOver={handleAllowDrop}
      onDragEnter={(e) => {
        e.preventDefault();
        console.log("entered");
      }}
      key={item?.id}
      id={`${item?.id}`}
    >
      <div key={id}>
        {id} {name}
      </div>
      <form onSubmit={handleAddCard}>
        {singleCardList}
        <input type="text" onChange={handleSetCardName} value={card} />
        <button type="submit" className="btn">
          Add card
        </button>
      </form>
    </div>
  );
}

export default SingleList;
