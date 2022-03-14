import { useRef, useEffect } from "react";
export const AddCardForm = ({
  handleAddCard,
  handleSetCardName,
  card,
}: any) => {
  const inputRef = useRef<any>(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <form onSubmit={handleAddCard}>
      <input
        ref={inputRef}
        type="text"
        onChange={handleSetCardName}
        value={card}
      />
      <button type="submit" className="btn">
        Add card
      </button>
    </form>
  );
};
