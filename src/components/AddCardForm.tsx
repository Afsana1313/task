import React, { useRef, useEffect } from "react";
type GetAddCardForm = {
  handleAddCard: (e: React.FormEvent<HTMLFormElement>) => void;
  handleSetCardName: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  card: string;
};
export const AddCardForm = ({
  handleAddCard,
  handleSetCardName,
  card,
}: GetAddCardForm) => {
  const inputRef = useRef<any>(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <form onSubmit={handleAddCard}>
      <textarea
        ref={inputRef}
        onChange={handleSetCardName}
        value={card}
        rows={4}
        cols={20}
        style={{ width: "100%" }}
      />
      <button type="submit" className="btn">
        Add card
      </button>
    </form>
  );
};
