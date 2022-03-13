import { useContext, useState } from "react";
import { ThemeContext } from "../App";
import { getNewList } from "../functions/controlFunctions";
import { ListType } from "../components/type";

function SingleList({ item }: any) {
  const [card, setCard] = useState<string>("");
  const { list, setList } = useContext(ThemeContext);
  const { title, id } = item;
  const handleSetCardName = (e: any) => {
    setCard(e.target.value);
  };
  const handleAddCard = (e: any) => {
    e.preventDefault();
    const newCard = {
      name: card,
      id: list?.length == null ? 1 : list?.length + 1,
      category: title,
    };
    console.log(newCard);
    list?.length == null ? setList([newCard]) : setList([...list, newCard]);
    setCard("");
  };
  /*
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
  }; */
  /**
     * <div
          id={`${item?.name}-${i?.id}`}
          key={i.id}
          className="single-card-container"
          draggable="true"
          //  onDragStart={(e) => handleDragStart(e, i.name, item?.id)}
        >
          {i.name}
        </div>
    */
  let singleCardList = list?.filter((i: ListType) => {
    if (title === i.category) return i.name;
  });

  return (
    <div
      className="single-list"
      // onDrop={handleOnDrop}
      //onDragOver={handleAllowDrop}
      // onDragEnter={(e) => {
      //   e.preventDefault();
      //   console.log("entered");
      // }}
      key={item?.id}
    >
      {console.log("list", list)}
      <div key={id}>
        {id} {title}
      </div>
      {list
        ?.filter((i: ListType) => i.category === title)
        .map((i: ListType) => (
          <div key={i.id}>{i.name}</div>
        ))}
      <form onSubmit={handleAddCard}>
        <input type="text" onChange={handleSetCardName} value={card} />
        <button type="submit" className="btn">
          Add card
        </button>
      </form>
    </div>
  );
}

export default SingleList;
