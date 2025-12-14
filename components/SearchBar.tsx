import React, { useState } from "react"; // 👈 【确保引入 useState】

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  onSearch: () => void;
  loading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSearch,
  loading,
}) => {
  // 定义中文输入状态
  const [isComposing, setIsComposing] = useState(false);
  // 【新增】临时状态：专门用于在中文输入时显示拼音，不打扰父组件状态
  const [tempCompositionValue, setTempCompositionValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 确保在中文输入组合过程中不触发搜索
    if (e.key === "Enter" && !isComposing) {
      onSearch();
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto group">
      <div className="relative transition-all duration-300 transform group-focus-within:-translate-y-1">
        {/* Hard shadow / Box style for retro feel */}
        <div className="absolute inset-0 bg-navy-900/10 rounded-xl transform translate-y-2 translate-x-2 transition-transform group-focus-within:translate-y-3 group-focus-within:translate-x-3"></div>

        <div className="relative bg-white rounded-xl border-2 border-transparent group-focus-within:border-navy-900 transition-all duration-200">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <svg
              className={`h-6 w-6 transition-colors duration-300 ${value ? "text-navy-900" : "text-navy-900/20"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full pl-14 pr-12 py-5 bg-transparent border-none rounded-xl placeholder-navy-900/30 focus:outline-none focus:ring-0 text-xl text-navy-900 font-bold"
            placeholder="输入缩写 (例如: ORIF, NBM...)"
            // 【关键修改 1】如果正在输入中文，显示临时状态的值，否则显示父组件的值
            value={isComposing ? tempCompositionValue : value}
            // 👇 最终的输入逻辑：
            onCompositionStart={(e) => {
              setIsComposing(true);
              setTempCompositionValue(e.currentTarget.value); // 捕获当前输入值
            }}
            onCompositionEnd={(e) => {
              // 组合结束：将最终值传给父组件，触发搜索/更新，并转为大写
              setIsComposing(false);
              setTempCompositionValue(""); // 清空临时状态
              onChange(e.currentTarget.value.toUpperCase());
            }}
            onChange={(e) => {
              if (isComposing) {
                // 【关键修改 2】如果正在输入中文，只更新临时状态，不调用父组件的 onChange
                setTempCompositionValue(e.target.value);
              } else {
                // 【关键修改 3】如果是正常的非中文输入，直接更新父组件状态并转大写
                onChange(e.target.value.toUpperCase());
              }
            }}
            onKeyDown={handleKeyDown}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {value && (
              <button
                onClick={() => onChange("")}
                className="p-2 text-navy-900/20 hover:text-navy-900 rounded-full hover:bg-navy-50 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
