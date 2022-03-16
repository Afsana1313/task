import { LockOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import React, { useState, useContext } from "react";
import { ThemeContext } from "../App";
import { deleteCard, renameCardName } from "../functions/controlFunctions";

type GetCardContainerType = {
  i: {
    name: string;
    id: number;
    color: string;
  };
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, name: string) => void;
};
function CardContainer({ i, handleDragStart }: GetCardContainerType) {
  const { list, setList } = useContext(ThemeContext);
  const [cardValue, setCardValue] = useState<string>(i.name);
  const [isEditOn, setIsEditOn] = useState<boolean>(false);
  const [isLocked, setIslocked] = useState<boolean>(false);
  return (
    <div
      className="card-container"
      key={i.id}
      draggable={!isLocked}
      onDragStart={(e) => handleDragStart(e, i.name)}
      style={{ borderBottom: `8px solid ${i.color}` }}
    >
      <span className="card-text-container">
        {isEditOn ? (
          <input
            onChange={(e) => setCardValue(e.target.value)}
            value={cardValue}
            onKeyUp={(e) => {
              setTimeout(() => {
                setList(() => renameCardName(list, i.id, cardValue));
                setIsEditOn(false);
              }, 5000);
            }}
            autoFocus
          />
        ) : (
          i.name
        )}
      </span>

      <div className="card-icon-container">
        <span
          style={{ marginRight: "10px" }}
          onClick={() => setIsEditOn(!isEditOn)}
        >
          <EditOutlined />
        </span>
        <span
          style={{ color: isLocked ? "#0076ce" : "gray", marginRight: "10px" }}
          onClick={() => setIslocked(!isLocked)}
        >
          <LockOutlined />
        </span>
        <span onClick={() => setList(() => deleteCard(i.id, list))}>
          <DeleteOutlined />
        </span>
      </div>
    </div>
  );
}

export default CardContainer;
