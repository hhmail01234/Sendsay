import React from "react";
import VerticalDotes from "assets/VerticalDotes";
export default function DraggableSplitter({ drag }) {
  return (
    <div onMouseDown={drag} className="console-draggableSplitter">
      <VerticalDotes />
    </div>
  );
}
