import { useContext, useState } from "react";
import { ThemeContext } from "../App";
import "../style/list.css";
import AddListForm from "./AddListForm";
import SingleList from "./SingleList";
import { PlusOutlined } from "@ant-design/icons";
import { CategoryType } from "./type";

function ListContainer() {
  const [categoryName, setCategoryName] = useState("");
  const [isFormOpen, setFormOpen] = useState(false);
  const { categoryList, setCategoryList } = useContext(ThemeContext);

  const handleAddCategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newItem = {
        title: categoryName,
        id: categoryList?.length == null ? 1 : categoryList?.length + 1,
      };
      categoryList?.length == null
        ? setCategoryList([newItem])
        : setCategoryList([...categoryList, newItem]);
      categoryList?.length == null
        ? localStorage.setItem("categoryList", JSON.stringify([newItem]))
        : localStorage.setItem(
            "categoryList",
            JSON.stringify([...categoryList, newItem])
          );
      setCategoryName("");
    } catch (e) {
      console.log(e);
    } finally {
      setFormOpen(false);
    }
  };
  const handleCategoryName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value);
  };
  const singleList = categoryList?.map((i: CategoryType) => (
    <SingleList item={i} key={i.id} />
  ));
  return (
    <div className="list-container-wrapper">
      <div className="list-container" id="list-container">
        {singleList}
        {isFormOpen ? (
          <AddListForm
            handleAddCategory={handleAddCategory}
            handleCategoryName={handleCategoryName}
            listName={categoryName}
          />
        ) : (
          <div
            onClick={() => setFormOpen(true)}
            style={{ margin: "25px" }}
            className="add-card-btn"
          >
            <PlusOutlined /> Add New List
          </div>
        )}
      </div>
    </div>
  );
}

export default ListContainer;
