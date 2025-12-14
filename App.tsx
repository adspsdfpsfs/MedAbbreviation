import React, { useState, useEffect, useMemo, useRef } from "react";
import { SearchBar } from "./components/SearchBar";
import { ResultCard } from "./components/ResultCard";
import { MEDICAL_DATA } from "./data/medicalData";
import { explainAbbreviation } from "./services/geminiService";
import { MedicalTerm, AiResponse } from "./types";

// --- 新增：useDebounce 钩子，用于延迟值 (查询文本) 的更新 ---
function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
// ------------------------------------------------------------------

export default function App() {
  const [query, setQuery] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<AiResponse | null>(null);
  const [aiError, setAiError] = useState("");
  const [contextHint, setContextHint] = useState("");
  const contextInputRef = useRef<HTMLInputElement>(null);

  // 👇 【新增】调用防抖钩子，延迟 300 毫秒
  const debouncedQuery = useDebounce(query, 300);

  // State for Medical Data
  const [allMedicalData, setAllMedicalData] =
    useState<MedicalTerm[]>(MEDICAL_DATA);

  // Load saved items (保持不变)
  useEffect(() => {
    const savedItems = localStorage.getItem("my_medical_terms");
    if (savedItems) {
      try {
        const parsed = JSON.parse(savedItems);
        if (Array.isArray(parsed)) {
          setAllMedicalData([...MEDICAL_DATA, ...parsed]);
        }
      } catch (e) {
        console.error("Failed to load saved terms", e);
      }
    }
  }, []);

  // Local Search Logic
  const localResults = useMemo(() => {
    // 👇 【修改 1】让 useMemo 依赖于延迟后的 debouncedQuery
    if (!debouncedQuery.trim()) return [];
    const q = debouncedQuery.toUpperCase().trim();
    return allMedicalData.filter(
      (item) =>
        item.abbr.includes(q) ||
        item.full_name.toUpperCase().includes(q) ||
        item.chinese.includes(debouncedQuery),
    );
  }, [debouncedQuery, allMedicalData]); // 依赖项改为 debouncedQuery

  // AI Search Handler (保持不变)
  const handleAiSearch = async () => {
    if (!query.trim()) return;
    setAiLoading(true);
    setAiError("");
    setAiResult(null);

    try {
      const result = await explainAbbreviation(query, contextHint);
      if (result) {
        setAiResult(result);
      } else {
        setAiError("未能找到该缩写的详细信息，请检查拼写。");
      }
    } catch (err) {
      setAiError("AI 服务暂时不可用，请稍后再试。");
    } finally {
      setAiLoading(false);
    }
  };

  // Handle Save to Local (保持不变)
  const handleSaveToLocal = () => {
    if (!aiResult) return;

    const newTerm: MedicalTerm = {
      id: `user-${Date.now()}`,
      abbr: aiResult.abbr,
      full_name: aiResult.full_name,
      chinese: aiResult.chinese,
      category: (aiResult.category as any) || "General",
      description: aiResult.description,
      layman_term: aiResult.layman_term,
    };

    const updatedData = [...allMedicalData, newTerm];
    setAllMedicalData(updatedData);
    const userItems = updatedData.filter((item) => item.id.startsWith("user-"));
    localStorage.setItem("my_medical_terms", JSON.stringify(userItems));

    setAiResult(null);
    setContextHint("");
  };

  useEffect(() => {
    if (query === "") {
      setAiResult(null);
      setAiError("");
      setContextHint("");
    }
  }, [query]);

  // 👇 【修改 2】让自动聚焦的逻辑依赖于 debouncedQuery
  useEffect(() => {
    // 只有当 debouncedQuery 确定有内容，且搜索结果确定为空，才跳转焦点
    if (
      debouncedQuery.trim() &&
      localResults.length === 0 &&
      !aiResult &&
      !aiLoading &&
      contextInputRef.current
    ) {
      contextInputRef.current.focus();
    }
  }, [debouncedQuery, localResults.length, aiResult, aiLoading]); // 依赖项改为 debouncedQuery

  return (
    <div className="min-h-screen flex flex-col bg-cream relative selection:bg-honey-400 selection:text-navy-900">
      {/* Decorative Blobs - Keeping red ONLY in background decoration (保持不变) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-5%] left-[-5%] w-[400px] h-[400px] bg-navy-100/50 rounded-full mix-blend-multiply filter blur-[60px]"></div>
        <div className="absolute top-[10%] right-[-5%] w-[300px] h-[300px] bg-honey-100/60 rounded-full mix-blend-multiply filter blur-[60px]"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] bg-poppy-50/40 rounded-full mix-blend-multiply filter blur-[80px]"></div>
      </div>

      {/* Header (保持不变) */}
      <header className="bg-cream/90 backdrop-blur-sm border-b border-navy-900/5 sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-navy-900 text-white p-2 rounded-lg shadow-sm">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <h1 className="text-xl font-black text-navy-900 tracking-tight">
              MedDict
            </h1>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-honey-500"></div>
            <div className="text-xs text-navy-800/60 font-bold uppercase tracking-wider">
              System Ready
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-16 relative z-10">
        {/* Search Section */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl sm:text-5xl font-black text-navy-900 mb-6 tracking-tight">
            医疗缩写查询
          </h2>
          <p className="text-navy-800/60 text-lg mb-10 max-w-2xl mx-auto font-medium">
            临床文档 · 极速释义 · AI 深度解析
          </p>
          <SearchBar
            value={query}
            onChange={(val) => {
              setQuery(val);
              setAiResult(null);
              setContextHint("");
            }}
            onSearch={handleAiSearch} // 按回车时立即执行 AI 搜索
            loading={aiLoading}
          />
        </div>

        {/* Results Container (保持不变) */}
        <div className="space-y-8">
          {/* Local Data Results */}
          {localResults.length > 0 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-xs font-bold text-navy-900/40 uppercase tracking-widest">
                  本地结果 ({localResults.length})
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-5">
                {localResults.map((item) => (
                  <ResultCard key={item.id} data={item} />
                ))}
              </div>

              {/* Refine Search / Context Input when local results exist (保持不变) */}
              {!aiLoading && !aiResult && (
                <div className="mt-8 bg-white rounded-xl border-2 border-navy-900/5 p-6 shadow-sm">
                  {/* ... 保持不变 ... */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-grow">
                      <input
                        type="text"
                        value={contextHint}
                        onChange={(e) => setContextHint(e.target.value)}
                        placeholder="例如：骨科手术、心血管病史..."
                        className="block w-full px-4 py-3 bg-navy-50 border-none rounded-lg text-sm text-navy-900 placeholder-navy-900/30 focus:ring-2 focus:ring-navy-900 font-medium transition-all"
                        onKeyDown={(e) => e.key === "Enter" && handleAiSearch()}
                      />
                    </div>
                    <button
                      onClick={handleAiSearch}
                      className="px-6 py-3 bg-navy-900 hover:bg-navy-800 text-white text-sm font-bold rounded-lg transition-transform active:scale-95 whitespace-nowrap shadow-pop hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px]"
                    >
                      AI 解析
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Fallback/AI Prompt State (When NO local results) */}
          {debouncedQuery.trim() &&
            localResults.length === 0 &&
            !aiResult &&
            !aiLoading &&
            !aiError && (
              <div className="bg-white rounded-2xl border-2 border-navy-900/5 p-8 sm:p-12 text-center animate-fadeIn shadow-card">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-honey-400 text-white mb-6 transform -rotate-3 border-2 border-white shadow-md">
                  <span className="text-3xl">?</span>
                </div>

                <h3 className="text-2xl font-black text-navy-900 mb-3">
                  本地未收录 "{query}"
                </h3>
                <p className="text-navy-700/70 mb-8 max-w-md mx-auto font-medium">
                  补充语境（如科室），AI 即可精准解析。
                </p>

                <div className="max-w-md mx-auto space-y-4">
                  <div className="text-left bg-navy-50/50 p-2 rounded-xl border border-navy-900/10 focus-within:ring-2 focus-within:ring-navy-900 focus-within:border-transparent transition-all">
                    <div className="relative">
                      <input
                        ref={contextInputRef}
                        type="text"
                        value={contextHint}
                        onChange={(e) => setContextHint(e.target.value)}
                        placeholder="例如：产科手术、骨折..."
                        className="block w-full px-5 py-4 bg-transparent border-none rounded-lg text-base text-navy-900 placeholder-navy-900/30 focus:ring-0 font-medium"
                        onKeyDown={(e) => e.key === "Enter" && handleAiSearch()}
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <span className="text-[10px] font-bold text-navy-900/40 border border-navy-900/10 px-2 py-1 rounded bg-white uppercase tracking-wide">
                          Context
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleAiSearch}
                    className="w-full group flex items-center justify-center px-6 py-4 bg-navy-900 hover:bg-navy-800 text-white text-base font-bold rounded-xl transition-all shadow-pop hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
                  >
                    开始解析
                    <svg
                      className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}

          {/* AI Loading State (保持不变) */}
          {aiLoading && (
            <div className="w-full p-12 bg-white/50 backdrop-blur rounded-2xl border border-navy-900/5 text-center">
              <div className="flex justify-center mb-6 gap-2">
                <div className="w-4 h-4 bg-navy-900 rounded-full animate-bounce"></div>
                <div className="w-4 h-4 bg-poppy-600 rounded-full animate-bounce delay-100"></div>
                <div className="w-4 h-4 bg-honey-500 rounded-full animate-bounce delay-200"></div>
              </div>
              <h3 className="text-xl font-bold text-navy-900">
                正在咨询专家库...
              </h3>
            </div>
          )}

          {/* AI Result + Refinement Section (保持不变) */}
          {aiResult && (
            <div className="space-y-6 animate-fadeIn">
              {/* ... 保持不变 ... */}

              <ResultCard data={aiResult} isAi={true} />

              {/* REFINEMENT ENTRY POINT (保持不变) */}
              <div className="bg-white border-2 border-navy-900/5 rounded-xl p-6 shadow-card">
                <div className="flex flex-col gap-4">
                  <label className="text-sm font-bold text-navy-900 flex items-center gap-2">
                    <span className="text-lg">🤔</span> 结果不准？补充语境再试：
                  </label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      value={contextHint}
                      onChange={(e) => setContextHint(e.target.value)}
                      placeholder="例如：这是在产科病历中看到的..."
                      className="flex-1 bg-navy-50 border-none rounded-lg px-5 py-3 text-sm focus:ring-2 focus:ring-navy-900 font-medium placeholder-navy-900/30"
                      onKeyDown={(e) => e.key === "Enter" && handleAiSearch()}
                    />
                    <button
                      onClick={handleAiSearch}
                      className="px-6 py-3 bg-navy-900 hover:bg-navy-800 text-white text-sm font-bold rounded-lg shadow-sm transition-transform active:scale-95 whitespace-nowrap"
                    >
                      重新分析
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* AI Error (保持不变) */}
          {aiError && (
            <div className="p-4 bg-poppy-50 border border-poppy-100 rounded-xl flex items-center gap-4 text-poppy-800">
              <div className="w-10 h-10 rounded-full bg-poppy-100 flex items-center justify-center shrink-0 text-poppy-600">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="text-sm font-bold">{aiError}</div>
            </div>
          )}
        </div>
      </main>

      {/* Footer (保持不变) */}
      <footer className="relative z-10 py-10 text-center">
        <p className="text-navy-900/30 text-xs font-bold uppercase tracking-widest">
          © 2024 MedDict
        </p>
      </footer>
    </div>
  );
}
