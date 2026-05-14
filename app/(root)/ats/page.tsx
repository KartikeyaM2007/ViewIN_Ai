"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle, 
  Upload, 
  AlertTriangle, 
  FileText, 
  Award, 
  Brain, 
  Search, 
  Lightbulb, 
  Loader2, 
  ArrowRight,
  XCircle,
  Check,
  HelpCircle
} from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function ATSPage() {
  const [jobDesc, setJobDesc] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Please upload a resume!");

    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobDescription", jobDesc);

    try {
      const res = await fetch("/api/atsapi", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error("Error:", error);
      setResult({ error: "Something went wrong. Please try again." });
    }

    setLoading(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 50) return "text-yellow-500";
    return "text-red-500";
  };

  const getStrokeColor = (score: number) => {
    if (score >= 80) return "#10B981"; // green-500
    if (score >= 50) return "#F59E0B"; // yellow-500
    return "#EF4444"; // red-500
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          ATS <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-300">Score Analyzer</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Optimize your resume for modern applicant tracking systems. Upload your PDF, paste the job description, and receive intelligent real-time feedback.
        </p>
      </motion.div>

      <div className="flex flex-col gap-10">
        
        {/* Input Form Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card-border w-full"
        >
          <div className="dark-gradient p-6 md:p-8 rounded-2xl flex flex-col gap-6">
            <h2 className="text-2xl font-semibold flex items-center gap-2 text-white">
              <FileText className="text-primary-200" size={24} /> Analysis Criteria
            </h2>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Drag & Drop File Input */}
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-gray-300">Resume File (.pdf, .docx)</span>
                  <label className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-xl cursor-pointer transition-all bg-dark-200/30 group ${file ? 'border-primary-200 bg-dark-200/50' : 'border-zinc-800 hover:border-primary-200 hover:bg-dark-200/40'}`}>
                    <input
                      type="file"
                      accept=".pdf,.docx"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      className="hidden"
                      required
                    />
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
                      {file ? (
                        <>
                          <div className="p-3 rounded-full bg-emerald-500/10 text-emerald-400 mb-3">
                            <CheckCircle size={32} />
                          </div>
                          <p className="text-emerald-400 font-medium text-sm break-all px-2">
                            {file.name}
                          </p>
                          <p className="text-gray-500 text-xs mt-1">
                            {(file.size / (1024 * 1024)).toFixed(2)} MB • Click to replace
                          </p>
                        </>
                      ) : (
                        <>
                          <div className="p-3 rounded-full bg-zinc-800 text-gray-400 group-hover:bg-zinc-700 group-hover:text-primary-200 transition-colors mb-3">
                            <Upload size={32} />
                          </div>
                          <p className="text-gray-300 font-medium text-sm mb-1">Click or Drag to upload</p>
                          <p className="text-gray-500 text-xs">PDF or DOCX files (Max 5MB)</p>
                        </>
                      )}
                    </div>
                  </label>
                </div>

                {/* Job Description Input */}
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-gray-300">Target Job Description</span>
                  <textarea
                    placeholder="Paste the complete target job description details here to evaluate overlap..."
                    value={jobDesc}
                    onChange={(e) => setJobDesc(e.target.value)}
                    className="w-full h-48 bg-dark-200/30 hover:bg-dark-200/40 border border-zinc-800 focus:border-primary-200 focus:ring-1 focus:ring-primary-200 text-white placeholder-gray-600 p-4 rounded-xl outline-none resize-none transition-all duration-200"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-center md:justify-end mt-2">
                <Button 
                  type="submit" 
                  disabled={loading} 
                  className="relative inline-flex h-12 w-full md:w-56 overflow-hidden rounded-full p-[1px] focus:outline-none disabled:opacity-50 transition-opacity hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-5 py-1 text-sm font-semibold text-white backdrop-blur-3xl gap-2">
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-primary-200" />
                        Evaluating...
                      </>
                    ) : (
                      <>
                        Analyze Match Score
                        <ArrowRight size={16} />
                      </>
                    )}
                  </span>
                </Button>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Full Analysis Loading Screen */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center p-12 text-center border border-zinc-800 bg-dark-200/20 backdrop-blur-md rounded-3xl h-72 gap-4 mt-4"
            >
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 border-4 border-violet-500/20 rounded-full" />
                <div className="absolute inset-0 border-4 border-t-violet-400 rounded-full animate-spin" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1 animate-pulse">Scanning Resume Metrics</h3>
                <p className="text-gray-500 text-sm">Gemini 2.5 is parsing skills and matching structural alignment...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Dashboard Section */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, type: "spring" }}
              className="flex flex-col gap-8 mt-2"
            >
              {result.error ? (
                <div className="flex items-center gap-3 p-6 border border-red-500/20 bg-red-950/10 text-red-400 rounded-2xl">
                  <XCircle size={24} />
                  <p className="font-medium">{result.error}</p>
                </div>
              ) : (
                <>
                  {/* Score Header Overview */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Score Meter Widget */}
                    <div className="card-border lg:col-span-1">
                      <div className="dark-gradient p-8 rounded-2xl flex flex-col items-center justify-center text-center h-full">
                        <span className="text-gray-400 text-xs font-semibold uppercase tracking-widest mb-4">Overall ATS Fit</span>
                        
                        <div className="relative inline-flex items-center justify-center">
                          {/* SVG Circular Progress */}
                          <svg className="w-36 h-36 transform -rotate-90">
                            <circle
                              cx="72"
                              cy="72"
                              r="62"
                              stroke="#1e293b"
                              strokeWidth="10"
                              fill="transparent"
                            />
                            <motion.circle
                              cx="72"
                              cy="72"
                              r="62"
                              stroke={getStrokeColor(result.score)}
                              strokeWidth="10"
                              fill="transparent"
                              strokeDasharray={2 * Math.PI * 62}
                              initial={{ strokeDashoffset: 2 * Math.PI * 62 }}
                              animate={{ strokeDashoffset: 2 * Math.PI * 62 - (result.score / 100) * 2 * Math.PI * 62 }}
                              transition={{ duration: 1.5, ease: "easeOut" }}
                            />
                          </svg>
                          <div className="absolute flex flex-col items-center justify-center text-center">
                            <span className={`text-4xl font-extrabold ${getScoreColor(result.score)}`}>
                              {result.score}%
                            </span>
                          </div>
                        </div>

                        <div className="mt-6">
                          <span className="text-white text-sm font-medium inline-block px-3 py-1 rounded-full bg-zinc-800/80 border border-zinc-700">
                            {result.score >= 80 ? "🔥 Highly Competitive" : result.score >= 50 ? "⚠️ Needs Optimization" : "❌ Critical Gap Warning"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Metrics Details */}
                    <div className="lg:col-span-2 card-border">
                      <div className="dark-gradient p-8 rounded-2xl h-full">
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                          <Brain className="text-primary-200" size={20} /> Evaluated Extraction
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-xs text-gray-400 font-semibold uppercase tracking-wider flex items-center gap-1.5 mb-3">
                              <Award size={14} className="text-emerald-400" /> Picked Skills
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {result.picked_skills?.length > 0 ? result.picked_skills.map((skill: string, idx: number) => (
                                <span key={idx} className="text-xs px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-medium">
                                  {skill}
                                </span>
                              )) : <span className="text-gray-500 text-xs italic">No distinct technical skills identified.</span>}
                            </div>
                          </div>

                          <div>
                            <h4 className="text-xs text-gray-400 font-semibold uppercase tracking-wider flex items-center gap-1.5 mb-3">
                              <Brain size={14} className="text-blue-400" /> Experience Matches
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {result.picked_experience?.length > 0 ? result.picked_experience.map((exp: string, idx: number) => (
                                <span key={idx} className="text-xs px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-300 font-medium">
                                  {exp}
                                </span>
                              )) : <span className="text-gray-500 text-xs italic">No experience overlaps detected.</span>}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Core Analysis Breakdown Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Strengths Card */}
                    <div className="card-border">
                      <div className="dark-gradient p-6 md:p-8 rounded-2xl h-full">
                        <h3 className="text-lg font-bold text-emerald-400 mb-4 flex items-center gap-2">
                          <CheckCircle size={20} /> Key Strengths
                        </h3>
                        <ul className="flex flex-col gap-3">
                          {result.strengths?.map((item: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-300 leading-relaxed">
                              <Check size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Weaknesses Card */}
                    <div className="card-border">
                      <div className="dark-gradient p-6 md:p-8 rounded-2xl h-full">
                        <h3 className="text-lg font-bold text-amber-400 mb-4 flex items-center gap-2">
                          <AlertTriangle size={20} /> Identified Weaknesses
                        </h3>
                        <ul className="flex flex-col gap-3">
                          {result.weaknesses?.map((item: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-300 leading-relaxed">
                              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Keyword Optimization */}
                  <div className="card-border">
                    <div className="dark-gradient p-6 md:p-8 rounded-2xl">
                      <h3 className="text-lg font-bold text-rose-400 mb-4 flex items-center gap-2">
                        <Search size={20} /> Missing Job Keywords
                      </h3>
                      <p className="text-gray-500 text-xs mb-4">
                        Adding these exact phrases contextually into your experience or skills section will significantly boost matching algorithms.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {result.missing_keywords?.length > 0 ? result.missing_keywords.map((kw: string, idx: number) => (
                          <span key={idx} className="text-xs px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 font-bold tracking-wide">
                            {kw}
                          </span>
                        )) : (
                          <div className="flex items-center gap-2 p-3 rounded-xl bg-zinc-900/50 text-emerald-400 text-sm border border-zinc-800">
                            <Check size={16} />
                            No critical keywords are missing from your resume! Highly aligned.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Optimization Action Plan */}
                  <div className="card-border">
                    <div className="dark-gradient p-6 md:p-8 rounded-2xl border-2 border-dashed border-violet-900/40">
                      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Lightbulb className="text-amber-400" size={22} /> Action Plan & Improvement Tips
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                        {result.improvement_tips?.map((tip: string, idx: number) => (
                          <div key={idx} className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 flex gap-3 items-start">
                            <div className="p-1.5 rounded-md bg-indigo-500/10 text-indigo-300 text-xs font-bold shrink-0">
                              #{idx + 1}
                            </div>
                            <p className="text-sm text-gray-300 leading-relaxed pt-0.5">
                              {tip}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
