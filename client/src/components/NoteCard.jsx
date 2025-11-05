import { Link } from "react-router";
import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { formatDate } from "../lib/Utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this note!")) return;
    try {
      await api.delete(`/deleteNote/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id)); // update ui
      toast.success("Note delete successfully");
    } catch (error) {
      console.log("Error in handleDelete", error);
      toast.error("Failed to delete note");
    }
  };
  return (
    <Link to={`/note/${note._id}`}>
      <div
        className="relative flex flex-col h-full bg-base-200 rounded-lg overflow-hidden 
        hover:shadow-lg transition-all duration-200"
      >
        <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-[#00FF9D] to-[#00C8FF]"></div>

        <div className="p-4">
          <h1 className="text-lg font-semibold">{note.title}</h1>
          <p className="text-gray-600 mt-2 flex-shrink">{note.content}</p>

          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-base-content/60">
              {formatDate(new Date(note.createdAt))}
            </span>
            <div className="flex items-center gap-2">
              <button className="btn btn-ghost btn-xs text-success">
                <PenSquareIcon className="size-4" />
              </button>
              <button
                onClick={(e) => handleDelete(e, note._id)}
                className="btn btn-ghost btn-xs text-error"
              >
                <Trash2Icon className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
