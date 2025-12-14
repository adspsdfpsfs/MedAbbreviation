import React, { useState } from "react"; // 👈 【修改点 1】引入 useState

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
  // 👇 【新增点 1】定义中文输入状态
  const [isComposing, setIsComposing] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 确保在中文输入组合过程中（isComposing=true）不触发搜索
    if (e.key === "Enter" && !isComposing) {
      onSearch();
    }
  };

  // ... (下面的 return 保持不变，直到 input 标签)

  return (
    <div className="relative w-full max-w-2xl mx-auto group">
      {/* ... 保持不变 ... */}
      <div className="relative bg-white rounded-xl border-2 border-transparent group-focus-within:border-navy-900 transition-all duration-200">
        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
          {/* ... 保持不变 ... */}
        </div>
        <input
          type="text"
          className="block w-full pl-14 pr-12 py-5 bg-transparent border-none rounded-xl placeholder-navy-900/30 focus:outline-none focus:ring-0 text-xl text-navy-900 font-bold"
          placeholder="输入缩写 (例如: ORIF, NBM...)"
          value={value}
          // 👇 【修改点 2】关键的中文输入逻辑
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={(e) => {
            setIsComposing(false);
            // 组合结束后，处理输入值
            onChange(e.currentTarget.value.toUpperCase());
          }}
          onChange={(e) => {
            // 只有在非中文输入时才更新状态，避免打断输入法
            if (!isComposing) {
              onChange(e.target.value.toUpperCase());
            }
          }}
          onKeyDown={handleKeyDown}
        />
        {/* ... 下面的按钮和 div 保持不变 ... */}
      </div>
    </div>
  );
};
