import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { useNavigate } from "react-router";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const navigate = useNavigate();

  const handleDelete = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();

    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((item) => item._id !== id));
      toast.success("Note Deleted successfully");
    } catch (error) {
      console.log("Error in handleDelete", error);
      toast.error("Failed to Delete note");
    }
  };

  const handleCardKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      navigate(`/note/${note._id}`);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/note/${note._id}`)}
      onKeyDown={handleCardKeyDown}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D] cursor-pointer"
    >
      <div className="card-body gap-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="card-title text-base-content break-words">{note.title}</h3>
          <div className="flex items-center gap-2 shrink-0">
            <PenSquareIcon className="size-4 text-base-content/70" />
            <button
              type="button"
              aria-label="Delete note"
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>

        <p className="text-base-content/70 line-clamp-3 break-words min-h-[4.5rem]">
          {note.content}
        </p>

        <div className="card-actions justify-between items-center mt-2">
          <span className="text-sm text-base-content/60">
            {formatDate(new Date(note.createdAt))}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
