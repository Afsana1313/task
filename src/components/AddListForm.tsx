function AddListForm({ handleAddList, handleCategoryName, listName }: any) {
  return (
    <div>
      <form className="add-list-form" onSubmit={handleAddList}>
        <input type="text" onChange={handleCategoryName} value={listName} />
        <button type="submit" className="btn">
          {" "}
          Add List
        </button>
      </form>
    </div>
  );
}

export default AddListForm;
