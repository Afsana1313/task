import React, { useRef, useEffect } from "react";
type GetAddListForm = {
  handleAddCategory: (e: React.FormEvent<HTMLFormElement>) => void;
  handleCategoryName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  listName: string;
};
function AddListForm({
  handleAddCategory,
  handleCategoryName,
  listName,
}: GetAddListForm) {
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
