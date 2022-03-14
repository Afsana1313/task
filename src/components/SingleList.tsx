import { useContext, useState } from "react";
import { ThemeContext } from "../App";
import {
  getNewList,
  deleteListName,
  renameListName,
} from "../functions/controlFunctions";
import { ListType } from "../components/type";
import { AddCardForm } from "./AddCardForm";
import { PlusOutlined, DeleteOutlined, LockOutlined } from "@ant-design/icons";
import CardContainer from "./CardContainer";

function SingleList({ item }: any) {
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [newListName, setNewListName] = useState<string>(item.title);
  const [isFormOpen, setFormOpen] = useState<boolean>(false);
  const [card, setCard] = useState<string>("");
  const { list, setList, categoryList, setCategoryList } =
    useContext(ThemeContext);
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
    setList(() => getNewList(list, title, data));
    e.dataTransfer.clearData();
  };

  const handleAllowDrop = (e: any) => {
    e.preventDefault();
  };
  const handleDeleteList = (e: any) => {
    const [newCategoryList, newList] = deleteListName(
      title,
      list,
      categoryList
    );
    setList(newList);
    setCategoryList(newCategoryList);
  };
  const handleRenameListName = (e: any) => {
    console.log("check korte ashsi");
    setIsDisabled(true);
  };
  const handleOnChange = (e: any) => {
    setNewListName(e.target.value);

    const [newList, newCategoryList] = renameListName(
      title,
      newListName,
      list,
      categoryList
    );
    setList(newList);
    setCategoryList(newCategoryList);
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
      <div className="list-title" onDoubleClick={handleRenameListName}>
        <input
          onChange={handleOnChange}
          //onDoubleClick={handleRenameListName}
          value={title}
          disabled={true}
        />

        <span onClick={handleDeleteList}>
          <DeleteOutlined />
        </span>
      </div>
      {list
        ?.filter((i: ListType) => i.category === title)
        .map((i: ListType) => (
          <CardContainer key={i.id} i={i} handleDragStart={handleDragStart} />
        ))}
      {isFormOpen ? (
        <AddCardForm
          handleAddCard={handleAddCard}
          handleSetCardName={handleSetCardName}
          card={card}
        />
      ) : (
        <div onClick={() => setFormOpen(true)} className="add-card-btn">
          <PlusOutlined />
        </div>
      )}
    </div>
  );
}

export default SingleList;
