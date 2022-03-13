import { useContext, useState } from "react";
import { ThemeContext } from "../App";
import "./list.css";
import AddListForm from "./AddListForm";
import SingleList from "./SingleList";

function ListContainer() {
  const [categoryName, setCategoryName] = useState("");
  const { list, setList, categoryList, setCategoryList } =
    useContext(ThemeContext);

  const handleAddCategory = (e: any) => {
    e.preventDefault();
    try {
      const newItem = {
        title: categoryName,
        id: categoryList?.length == null ? 1 : categoryList?.length + 1,
      };
      categoryList?.length == null
        ? setCategoryList([newItem])
        : setCategoryList([...categoryList, newItem]);
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
      {console.log(categoryList)}
      <div className="list-container" id="list-container">
        {categoryList?.map((i: any) => (
          // <span key={i.id}>{i.title}</span>
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