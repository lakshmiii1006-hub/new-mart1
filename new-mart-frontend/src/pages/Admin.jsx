import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  useUser,
} from "@clerk/clerk-react";
import { Package, Star, Trash2, CheckCircle, XCircle } from "lucide-react";

const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export default function Admin() {
  const navigate = useNavigate();
  const { user, isLoaded } = useUser();

  const [testimonials, setTestimonials] = useState([]);
  const [status, setStatus] = useState("pending");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoaded) fetchTestimonials();
  }, [isLoaded]);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/testimonials`);
      const data = await res.json();
      if (data.success || data.testimonials) {
        setTestimonials(data.testimonials || []);
      }
      setLoading(false);
    } catch (err) {
      console.error("Fetch testimonials error:", err);
      setLoading(false);
    }
  };

  const updateStatus = async (id, action) => {
    try {
      await fetch(`${API_BASE}/api/testimonials/${id}/${action}`, {
        method: "PATCH",
      });
      window.dispatchEvent(new CustomEvent("testimonial-approved"));
      fetchTestimonials();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTestimonial = async (id) => {
    if (!confirm("Delete testimonial?")) return;
    try {
      await fetch(`${API_BASE}/api/testimonials/${id}`, { method: "DELETE" });
      fetchTestimonials();
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = testimonials.filter((t) => t.status === status);

  const counts = {
    pending: testimonials.filter((t) => t.status === "pending").length,
    approved: testimonials.filter((t) => t.status === "approved").length,
    denied: testimonials.filter((t) => t.status === "denied").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-emerald-50 p-4">
      {/* LOGGED OUT */}
      <SignedOut>
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-white p-6 rounded-xl shadow-md max-w-sm w-full text-center border">
            <h2 className="text-xl font-bold mb-4">Admin Login</h2>
            <SignInButton mode="modal">
              <button className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-emerald-700">
                Login
              </button>
            </SignInButton>
          </div>
        </div>
      </SignedOut>

      {/* LOGGED IN - WIDER */}
      <SignedIn>
        {/* HEADER */}
        <header className="bg-white shadow-sm border-b px-6 py-4 mb-6 rounded-lg">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div>
              <h1 className="text-lg font-bold text-gray-900">Admin</h1>
              <p className="text-xs text-gray-500">{user?.firstName}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => navigate("/add-products")}
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1 hover:bg-emerald-700"
              >
                <Package className="w-4 h-4" />
                Products
              </button>
              <SignOutButton>
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700">
                  Logout
                </button>
              </SignOutButton>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto">
          {/* STATS */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {["pending", "approved", "denied"].map((s) => (
              <div
                key={s}
                className={`p-4 rounded-lg border cursor-pointer hover:shadow-sm transition-all ${
                  status === s 
                    ? "bg-emerald-50 border-emerald-300" 
                    : "bg-white border-gray-200 hover:bg-gray-50"
                }`}
                onClick={() => setStatus(s)}
              >
                <p className="text-xs text-gray-600 capitalize mb-1">{s}</p>
                <h2 className="text-lg font-bold text-gray-900">{counts[s]}</h2>
              </div>
            ))}
          </div>

          {/* FILTERS */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
            {["pending", "approved", "denied"].map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap flex-shrink-0 transition-all ${
                  status === s
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {s.toUpperCase()}
              </button>
            ))}
          </div>

          {/* WIDE TESTIMONIALS LIST */}
          <div className="bg-white rounded-lg shadow-sm border">
            {loading ? (
              <div className="p-8 text-center">
                <p className="text-gray-500">Loading...</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-gray-500">No {status} testimonials</p>
              </div>
            ) : (
              <div className="max-h-96 overflow-y-auto">
                <div className="divide-y divide-gray-100">
                  {filtered.map((t) => (
                    <div key={t._id} className="p-6 hover:bg-gray-50">
                      <div className="flex items-center justify-between mb-3">
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          t.status === "approved" ? "bg-emerald-100 text-emerald-800" :
                          t.status === "denied" ? "bg-red-100 text-red-800" :
                          "bg-yellow-100 text-yellow-800"
                        }`}>
                          {t.status}
                        </div>
                        <div className="text-sm text-gray-500">
                          {t.name.split(' ')[0]?.[0]}.
                        </div>
                      </div>
                      
                      <h4 className="font-semibold text-gray-900 mb-2">{t.name}</h4>
                      
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < t.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} 
                          />
                        ))}
                        <span className="text-sm text-gray-600 ml-1">{t.rating}</span>
                      </div>

                      <p className="text-gray-700 text-sm mb-4 leading-relaxed">{t.comment}</p>

                      <div className="flex gap-2">
                        {status === "pending" && (
                          <>
                            <button
                              onClick={() => updateStatus(t._id, "approve")}
                              className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-emerald-700 flex items-center justify-center gap-1"
                            >
                              <CheckCircle className="w-4 h-4" />
                              Approve
                            </button>
                            <button
                              onClick={() => updateStatus(t._id, "deny")}
                              className="flex-1 bg-yellow-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-yellow-700 flex items-center justify-center gap-1"
                            >
                              <XCircle className="w-4 h-4" />
                              Deny
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => deleteTestimonial(t._id)}
                          className="bg-red-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-red-700 flex items-center gap-1"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </SignedIn>
    </div>
  );
}
