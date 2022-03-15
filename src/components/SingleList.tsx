import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../App";
import {
  getNewList,
  deleteListName,
  renameListName,
} from "../functions/controlFunctions";
import { ListType } from "../components/type";
import { AddCardForm } from "./AddCardForm";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import CardContainer from "./CardContainer";
import { getRandomColor } from "../color/color";

type GetSingleListType = {
  item: {
    title: string;
    id: number;
  };
};
function SingleList({ item }: GetSingleListType) {
  const { title } = item;
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [newListName, setNewListName] = useState<string>(title);
  const [isFormOpen, setFormOpen] = useState<boolean>(false);
  const [card, setCard] = useState<string>("");
  const { list, setList, categoryList, setCategoryList } =
    useContext(ThemeContext);

  useEffect(() => {
    console.log("categor list", list);
  }, [list]);
  const handleSetCardName = (e: any) => {
    setCard(e.target.value);
  };
  const handleAddCard = (e: any) => {
    e.preventDefault();
    const newCard = {
      name: card,
      id: list?.length == null ? 1 : list?.length + 1,
      category: title,
      color: `${getRandomColor()}`,
    };
    list?.length == null ? setList([newCard]) : setList([...list, newCard]);
    setCard("");
    setFormOpen(false);
  };

  const handleDragStart = (e: any, cardTitle: string) => {
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
  const handleDisableInput = (e: any) => {
    setIsDisabled(false);
    console.log("clicked");
  };
  const handleOnChange = (e: any) => {
    setNewListName(e.target.value);
    console.log(newListName);
    // setTimeout(() => {
    //   const [newList, newCategoryList] = renameListName(
    //     title,
    //     newListName,
    //     list,
    //     categoryList
    //   );
    //   setList(newList);
    //   setCategoryList(newCategoryList);
    // }, 5000);
  };
  const handleRenameList = () => {};
  return (
    <div
      className="single-list"
      onDrop={(e) => handleOnDrop(e, title)}
      onDragOver={handleAllowDrop}
      onDragEnter={(e) => {
        e.preventDefault();
      }}
      key={item?.id}
    >
      <div className="list-title">
        <input
          onChange={handleOnChange}
          onClick={handleDisableInput}
          value={newListName || title}
          onFocus={handleRenameList}
          disabled={isDisabled}
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
