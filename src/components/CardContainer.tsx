import { LockOutlined } from "@ant-design/icons";
import { useState } from "react";

function CardContainer({ i, handleDragStart }: any) {
  const [isLocked, setIslocked] = useState<boolean>(false);
  return (
    <div
      className="card-container"
      key={i.id}
      draggable={!isLocked}
      onDragStart={(e) => handleDragStart(e, i.name)}
    >
      <span></span>
      {i.name}
      <span
        style={{ color: isLocked ? "#0076ce" : "black" }}
        onClick={() => setIslocked(!isLocked)}
      >
        <LockOutlined />
      </span>
    </div>
  );
}

export default CardContainer;
