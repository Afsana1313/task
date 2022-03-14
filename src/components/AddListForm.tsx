import { useRef, useEffect } from "react";
function AddListForm({ handleAddCategory, handleCategoryName, listName }: any) {
  const inputRef = useRef<any>(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <div>
      <form className="add-list-form" onSubmit={handleAddCategory}>
        <input
          ref={inputRef}
          type="text"
          onChange={handleCategoryName}
          value={listName}
        />
        <button type="submit" className="btn">
          {" "}
          Add List
        </button>
      </form>
    </div>
  );
}

export default AddListForm;
