import { useDispatch } from "react-redux";
import { toggleNoteVisibility } from "./redux/actions/actions";

export function CellNote(props) {
  const dispatch = useDispatch();
  const { cell, note } = props;

  function handleNoteClick() {
    dispatch(toggleNoteVisibility(cell, note.cellNoteNumber));
  }

  return (
    <div
      className={note.visible ? "cellNote" : "cellNote"}
      onClick={handleNoteClick}
    >
      {note.cellNoteNumber}
    </div>
  );
}
