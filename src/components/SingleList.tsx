import { useContext, useState } from "react";
import { ThemeContext } from "../App";
import { getNewList } from "../functions/controlFunctions";
import { ListType } from "../components/type";
import { AddCardForm } from "./AddCardForm";
import { PlusOutlined } from "@ant-design/icons";

function SingleList({ item }: any) {
  const [isFormOpen, setFormOpen] = useState<boolean>(false);
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
    setFormOpen(false);
  };

  const handleDragStart = (e: any, cardTitle: string) => {
    // console.log(cardTitle, listId);
    e.dataTransfer.setData("text", cardTitle);
  };
  const handleOnDrop = (e: any, title: string) => {
    e.preventDefault();
    var data = e.dataTransfer.getData("text");
    //console.log(e);
    // e.target.appendChild(data);
    setList(() => getNewList(list, title, data));
    /* setList(() => {
      const newList = list?.map((i: ListType) => {
        if (i.name === data) i.category = title;
        return i;
      });
      return newList;
    });*/
    e.dataTransfer.clearData();
  };

  const handleAllowDrop = (e: any) => {
    e.preventDefault();
  };
  return (
    <div
      className="single-list"
      onDrop={(e) => handleOnDrop(e, title)}
      onDragOver={handleAllowDrop}
      onDragEnter={(e) => {
        e.preventDefault();
        console.log("entered");
      }}
      key={item?.id}
    >
      {console.log("list", list)}
      <div key={id}>
        {id} {title}
      </div>
      {list
        ?.filter((i: ListType) => i.category === title)
        .map((i: ListType) => (
          <div
            key={i.id}
            draggable="true"
            onDragStart={(e) => handleDragStart(e, i.name)}
          >
            {i.name}
          </div>
        ))}
      {!!isFormOpen && (
        <AddCardForm
          handleAddCard={handleAddCard}
          handleSetCardName={handleSetCardName}
          card={card}
        />
      )}
      {!isFormOpen && (
        <div onClick={() => setFormOpen(true)} className="add-card-btn">
          <PlusOutlined />
        </div>
      )}
    </div>
  );
}

export default SingleList;
