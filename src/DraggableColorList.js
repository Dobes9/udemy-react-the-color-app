import React from "react";
import { SortableContainer } from "react-sortable-hoc";
import DraggableColorBox from "./DraggableColorBox";

const DraggableColorList = SortableContainer(({ colors, deleteColor }) => {
  return (
    <div style={{ height: "100%" }}>
      {colors.map((color, i) => (
        <DraggableColorBox
          index={i}
          color={color.color}
          key={color.name}
          name={color.name}
          deleteColor={deleteColor}
        />
      ))}
    </div>
  );
});

export default DraggableColorList;
