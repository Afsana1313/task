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
  const { title, id } = item;
  const [isDisabled, setIsDisabled] = useState(true);
  const [newListName, setNewListName] = useState(title);
  const [isFormOpen, setFormOpen] = useState(false);
  const [card, setCard] = useState<string>("");
  const { list, setList, categoryList, setCategoryList } =
    useContext(ThemeContext);

  useEffect(() => {
    // console.log("categor list", list);
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
    list?.length == null
      ? localStorage.setItem("list", JSON.stringify([newCard]))
      : localStorage.setItem("list", JSON.stringify([...list, newCard]));
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
    localStorage.setItem("list", JSON.stringify(newList));
    localStorage.setItem("categoryList", JSON.stringify(newCategoryList));
  };
  const handleDisableInput = (e: any) => {
    setIsDisabled(!isDisabled);
    console.log("clicked");
  };
  const handleOnChange = (e: any) => {
    setNewListName(e.target.value);
    console.log("newlistname ", e.target.value);
  };
  const handleRenameList = () => {
    //console.log("title keno undefined hobe ??? ", title);
    //
    setTimeout(() => {
      const [newList, newCategoryList] = renameListName(
        id,
        title,
        newListName,
        list,
        categoryList
      );
      console.log(newList, newCategoryList);
      localStorage.setItem("list", JSON.stringify(newList));
      localStorage.setItem("categoryList", JSON.stringify(newCategoryList));
      setList(newList);
      setCategoryList(newCategoryList);
      setIsDisabled(!isDisabled);
    }, 5000);
  };
  let inputStyle = { userSelect: "none" };
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
        <div onMouseEnter={handleDisableInput} onMouseOut={handleRenameList}>
          <input
            onChange={handleOnChange}
            value={newListName}
            disabled={isDisabled}
            style={{ userSelect: "none" }}
            autoFocus
          />
        </div>

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
