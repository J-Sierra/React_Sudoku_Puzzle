import React, { useState } from "react";

const CellNote = (props) => {
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    setVisible(!visible);
  };

  return (
    <div
      className={visible ? "cellNote active" : "cellNote"}
      onClick={handleClick}
    >
      <span className="cellNoteNumber">{props.note}</span>
    </div>
  );
};

export default CellNote;
