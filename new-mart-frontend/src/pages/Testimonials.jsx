import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { SignedIn, SignedOut, SignInButton, SignOutButton } from "@clerk/clerk-react";
import { Star, Send, User, Quote } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";


export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");

  const fetchTestimonials = async () => {
    try {
      const res = await axios.get(`${API_BASE}/testimonials?status=approved`);
      setTestimonials(res.data.testimonials || []);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching testimonials:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // ✅ REAL-TIME ADMIN APPROVALS
  useEffect(() => {
    const handleApproval = () => fetchTestimonials();
    window.addEventListener("testimonial-approved", handleApproval);
    return () => window.removeEventListener("testimonial-approved", handleApproval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE}/testimonials`, {
        name,
        comment,
        rating,
      });
      if (res.status === 201) {
        setMessage("✅ Submitted successfully! Awaiting admin approval.");
        setName("");
        setComment("");
        setRating(5);
        fetchTestimonials();
      }
    } catch (err) {
      console.error("Submit failed:", err);
      setMessage("❌ Submit failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-emerald-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-20 gap-6"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
            Customer Testimonials
          </h1>
          <div className="flex gap-4">
           
          </div>
        </motion.header>

        {/* FORM */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-10 mb-24 border border-emerald-100"
        >
          {/* FORM CONTENT - SAME AS YOURS */}
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl text-white text-2xl">
              💬
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Share Your Experience</h2>
            <p className="text-lg text-gray-600">Tell us about your shopping at New Mart</p>
          </div>
          <form className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto" onSubmit={handleSubmit}>
            {/* YOUR FORM FIELDS - SAME */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <User className="w-4 h-4" /> Name
              </label>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-400"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" /> Rating
              </label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-400"
              >
                {[1, 2, 3, 4, 5].map((r) => (
                  <option key={r} value={r}>{r} Stars</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Quote className="w-4 h-4" /> Your Story
              </label>
              <textarea
                placeholder="Share your New Mart experience..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                rows={4}
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-400 resize-vertical"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              type="submit"
              className="md:col-span-2 bg-emerald-600 text-white py-4 px-8 rounded-xl font-semibold shadow-lg hover:shadow-xl mx-auto w-fit flex items-center gap-2"
            >
              <Send className="w-5 h-5" />
              Submit Testimonial
            </motion.button>
            {message && (
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="md:col-span-2 text-center p-4 rounded-xl font-semibold mx-auto max-w-2xl"
                style={{ 
                  backgroundColor: message.includes("successfully") ? '#10b9811a' : '#ef44441a',
                  color: message.includes("successfully") ? '#059669' : '#dc2626',
                  border: `1px solid ${message.includes("successfully") ? '#059669' : '#dc2626'}`
                }}
              >
                {message}
              </motion.p>
            )}
          </form>
        </motion.section>

        {/* 🔥 SEAMLESS MOVING TESTIMONIALS */}
        <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Happy Customers</h2>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">Real stories from Shaktinagar locals</p>
          </div>

          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Loading...</p>
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl p-12 shadow-lg mx-auto max-w-2xl">
              <Quote className="w-20 h-20 text-gray-300 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-500 mb-4">No testimonials yet</h3>
              <p className="text-gray-600">Be the first to share your experience!</p>
            </div>
          ) : (
            <div className="space-y-12">
              {/* ROW 1 - LEFT */}
              <motion.div 
                className="flex overflow-hidden py-8 h-[170px]"
                animate={{ x: [0, -520] }}
                transition={{ 
                  x: { repeat: Infinity, repeatType: "loop", duration: 16, ease: "linear" }
                }}
              >
                {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
                  <div key={`row1-${i}`} className="flex-shrink-0 w-[260px] px-2 h-full">
                    <SmallTestimonialCard testimonial={t} />
                  </div>
                ))}
              </motion.div>

              {/* ROW 2 - RIGHT */}
              <motion.div 
                className="flex overflow-hidden py-8 h-[170px]"
                animate={{ x: [0, 520] }}
                transition={{ 
                  x: { repeat: Infinity, repeatType: "loop", duration: 16, ease: "linear" }
                }}
              >
                {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
                  <div key={`row2-${i}`} className="flex-shrink-0 w-[260px] px-2 h-full">
                    <SmallTestimonialCard testimonial={t} />
                  </div>
                ))}
              </motion.div>
            </div>
          )}
        </motion.section>
      </div>
    </div>
  );
}

// ✅ SmallTestimonialCard - PERFECT
function SmallTestimonialCard({ testimonial }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -4 }}
      className="w-full h-[150px] bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg hover:border-emerald-200 p-5 flex flex-col transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`w-3.5 h-3.5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} 
            />
          ))}
        </div>
        <div className="w-9 h-9 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 text-xs font-bold">
          {testimonial.name.split(' ')[0]?.[0] || 'C'}
        </div>
      </div>
      <div className="flex-1 mb-3 pr-1 line-clamp-3 overflow-hidden">
        <Quote className="w-4 h-4 text-emerald-400 mb-1.5 inline -mt-0.5 mr-1.5" />
        <span className="text-xs leading-tight text-gray-700 font-medium">"{testimonial.comment}"</span>
      </div>
      <div className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-1 rounded-lg w-fit">
        {testimonial.rating}★
      </div>
    </motion.div>
  );
}
