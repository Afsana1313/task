import { LockOutlined, DeleteOutlined } from "@ant-design/icons";
import React, { useState, useContext } from "react";
import { ThemeContext } from "../App";
import { getRandomColor } from "../color/color";
import { deleteCard } from "../functions/controlFunctions";

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
  const [isLocked, setIslocked] = useState<boolean>(false);
  return (
    <div
      className="card-container"
      key={i.id}
      draggable={!isLocked}
      onDragStart={(e) => handleDragStart(e, i.name)}
      style={{ borderBottom: `8px solid ${i.color}` }}
    >
      <span className="card-text-container">{i.name}</span>

      <div className="card-icon-container">
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
