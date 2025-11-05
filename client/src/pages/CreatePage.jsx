import { Link, useNavigate } from "react-router";
import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import api from "../lib/axios";

const CreateNotePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleCreate = async (e) => {
    e.preventDefault();
    // if (!title.trim() || !content.trim()) {
    //   return toast.error("All fields are required");
    // }
    setLoading(true);
    try {
      await api.post("/createNote", {
        title,
        content,
      });
      toast.success("Note create successfully!");
      navigate("/");
    } catch (error) {
      console.log("Error creating note", error);
      if (error.response?.status === 429) {
        toast.error("Slow down ! You're creating note fast", {
          duration: 400,
        });
      } else {
        toast.error("Failed to create note");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen to-[#0f172a] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md bg-white/10 border border-white/10">
          <idv className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-[#00FF9D] to-[#00C8FF]" />

          <div className="p-8">
            <Link
              to="/"
              className="mb-4 flex items-center gap-2 w-fit md:px-6 py-2 rounded-lg bg-gradient-to-r from-[#00FF9D] to-[#00C8FF] text-gray-900 font-semibold hover:opacity-90 transition"
            >
              <ArrowLeftIcon className="size-5" />
              Back to Notes
            </Link>

            <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#00FF9D] to-[#00C8FF]">
              Create New Note
            </h2>

            <form onSubmit={handleCreate}>
              <div className="mb-6">
                <label className="block text-sm mb-2 font-semibold text-black">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Enter note title..."
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-black placeholder-gray-400 focus:outline-none focus:border-[#00FF9D] focus:ring-1 focus:ring-[#00FF9D] transition"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm mb-2 font-semibold text-black">
                  Content
                </label>
                <textarea
                  placeholder="Write your note here..."
                  className="w-full h-32 p-3 rounded-lg bg-white/10 border border-white/20 text-black placeholder-gray-400 focus:outline-none focus:border-[#00FF9D] focus:ring-1 focus:ring-[#00FF9D]  transition resize-none"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#00FF9D] to-[#00C8FF] text-gray-900 font-semibold hover:opacity-90 transition"
                  disabled={loading}
                >
                  {loading ? "Creating" : " Create Note"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateNotePage;
