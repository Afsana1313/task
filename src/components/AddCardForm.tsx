export const AddCardForm = ({
  handleAddCard,
  handleSetCardName,
  card,
}: any) => {
  return (
    <form onSubmit={handleAddCard}>
      <input type="text" onChange={handleSetCardName} value={card} />
      <button type="submit" className="btn">
        Add card
      </button>
    </form>
  );
};
