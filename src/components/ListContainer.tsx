import { useContext, useState } from "react";
import { ThemeContext } from "../App";
import "./list.css";
import AddListForm from "./AddListForm";
import SingleList from "./SingleList";
import { PlusOutlined } from "@ant-design/icons";

function ListContainer() {
  const [categoryName, setCategoryName] = useState("");
  const [isFormOpen, setFormOpen] = useState(false);
  const { categoryList, setCategoryList } = useContext(ThemeContext);

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
      setFormOpen(false);
    }
  };
  const handleCategoryName = (e: any) => {
    setCategoryName(e.target.value);
  };

  return (
    <div className="list-container-wrapper">
      {console.log(categoryList)}
      <div className="list-container" id="list-container">
        {categoryList?.map((i: any) => (
          // <span key={i.id}>{i.title}</span>
          <SingleList item={i} key={i.id} />
        ))}
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
