import api from "../lib/axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";
const DetailPage = () => {
  const [note, setNote] = useState(null);
  const [save, setSave] = useState(false);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/getNote/${id}`);
        setNote(res.data.note);
      } catch (error) {
        console.log("Error note fetching error", error);
        toast.error("Failed to fetch note");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);
  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title or content");
      return;
    }

    setSave(true);

    try {
      await api.put(`/updateNote/${id}`, note);
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.log("Error saving the note:", error);
      toast.error("Failed to update note");
    } finally {
      setSave(false);
    }
  };
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note!")) return;

    try {
      await api.delete(`/deleteNote/${id}`);
      toast.success("Note deleted successfully!");
      navigate("/");
    } catch (error) {
      console.log("Error deleting note", error);
      toast.error("Failed to delete note");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div>
      <div className="min-h-screen bg-base-200">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto shadow-xl rounded-2xl bg-white p-10">
            <div className="flex gap-4 items-center justify-between mb-6">
              <Link
                to="/"
                className="flex gap-2 items-center md:px-6 py-2 rounded-lg bg-gradient-to-r from-[#00FF9D] to-[#00C8FF] text-gray-900 font-semibold hover:opacity-90 transition"
              >
                <ArrowLeftIcon className="h-5 w-5" />
                Back to Notes
              </Link>
              <button
                onClick={handleDelete}
                className="btn btn-error btn-outline"
              >
                <Trash2Icon className="h-5 w-5" />
                Delete Note
              </button>
            </div>
            <div>
              <form onSubmit={handleSave}>
                <div className="my-3">
                  <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#00FF9D] to-[#00C8FF]">
                    Update Note
                  </h2>
                </div>
                <div className="mb-6">
                  <label className="block text-sm mb-2 font-semibold text-black">
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter note title..."
                    className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-black placeholder-gray-400 focus:outline-none focus:border-[#00FF9D] focus:ring-1 focus:ring-[#00FF9D] transition"
                    value={note.title}
                    onChange={(e) =>
                      setNote({ ...note, title: e.target.value })
                    }
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-sm mb-2 font-semibold text-black">
                    Content
                  </label>
                  <textarea
                    placeholder="Write your note here..."
                    className="w-full h-32 p-3 rounded-lg bg-white/10 border border-white/20 text-black placeholder-gray-400 focus:outline-none focus:border-[#00FF9D] focus:ring-1 focus:ring-[#00FF9D]  transition resize-none"
                    value={note.content}
                    onChange={(e) =>
                      setNote({ ...note, content: e.target.value })
                    }
                  ></textarea>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={handleSave}
                    type="submit"
                    className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#00FF9D] to-[#00C8FF] text-gray-900 font-semibold hover:opacity-90 transition"
                    disabled={save}
                  >
                    {save ? "Saving...." : " Save Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
