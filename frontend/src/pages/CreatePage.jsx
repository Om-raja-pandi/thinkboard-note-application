import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import toast  from "react-hot-toast";
import api from "../lib/axios";


const CreatePage = () => {
  const [title,setTitle] = useState("");
  const [content,setContent] = useState("");
  const [loading,setLoading] = useState(false);

  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    if(!title.trim() || !content.trim()){
      toast.error("All Field are Required");
      return;
    }

    setLoading(true)
    try {
      await api.post("/notes", {title,content});
      toast.success("Note Created Successfully");
      navigate("/");
    } catch (error) {
      console.log("Error creating note",error);
      if (error.response?.status === 429) {
        toast.error("Slow Down! You're creating notes too fast", {
          duration: 4000,
          icon: "⚠️",
        });
      }
      
      toast.error("Failed to create note")
    }finally{
      setLoading(false)
    }
    
  };
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>

          <div className="card bg-base-100 shadow-xl border border-base-content/10">
            <div className="card-body gap-6">
              <h2 className="card-title text-2xl">Create New Note</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Note Title"
                    className="input input-bordered w-full"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea
                    placeholder="Write Your Note Here"
                    className="textarea textarea-bordered h-32 w-full"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                <div className="card-actions justify-end pt-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePage