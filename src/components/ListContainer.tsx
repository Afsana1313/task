import { useContext, useState } from "react";
import { ThemeContext } from "../App";
import "./list.css";
import AddListForm from "./AddListForm";
import SingleList from "./SingleList";

function ListContainer() {
  const [categoryName, setCategoryName] = useState("");
  const { list, setList } = useContext(ThemeContext);

  const handleAddCategory = (e: any) => {
    e.preventDefault();
    try {
      const newItem = {
        name: categoryName,
        id: list?.length == null ? 1 : list?.length + 1,
        card: [],
      };
      list?.length == null ? setList([newItem]) : setList([...list, newItem]);
      setCategoryName("");
    } catch (e) {
      console.log(e);
    } finally {
    }
  };
  const handleCategoryName = (e: any) => {
    setCategoryName(e.target.value);
  };
  var num = [1, 2, 3, 4, 5, 6];
  return (
    <div className="list-container-wrapper">
      <div className="list-container" id="list-container">
        {list?.map((i: any) => (
          <SingleList item={i} key={i.id} />
        ))}
        <AddListForm
          handleAddCategory={handleAddCategory}
          handleCategoryName={handleCategoryName}
          listName={categoryName}
        />
      </div>
    </div>
  );
}

export default ListContainer;
