import React from 'react';
import { MedicalTerm, AiResponse } from '../types';

interface ResultCardProps {
  data: MedicalTerm | AiResponse;
  isAi?: boolean;
}

export const ResultCard: React.FC<ResultCardProps> = ({ data, isAi = false }) => {
  return (
    <div className={`relative rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
      isAi 
        ? 'bg-white border-2 border-honey-400 shadow-sm' 
        : 'bg-white border border-navy-900/10 shadow-card hover:shadow-pop hover:border-navy-900'
    }`}>
      {/* Decorative top border - Navy and Red - Keeping this as it's a structural accent */}
      <div className="h-1.5 w-full flex">
          <div className={`h-full flex-1 ${isAi ? 'bg-honey-500' : 'bg-navy-900'}`}></div>
          <div className={`h-full w-1/3 ${isAi ? 'bg-poppy-500' : 'bg-poppy-600'}`}></div>
      </div>

      <div className="px-6 py-5 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <h3 className="text-4xl font-black text-navy-900 tracking-tight">{data.abbr}</h3>
            
            {/* Badges - Bold Colors */}
            <div className="flex flex-wrap gap-2">
              {isAi && (
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-bold bg-honey-100 text-honey-700 uppercase tracking-wide">
                  AI Generated
                </span>
              )}
              {!isAi && 'category' in data && (
                <span className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wide border
                  ${data.category === 'Management' ? 'bg-navy-50 text-navy-800 border-navy-100' : 
                    data.category === 'Ortho' ? 'bg-orange-50 text-orange-800 border-orange-100' : 
                    data.category === 'Diagnosis' ? 'bg-poppy-50 text-poppy-800 border-poppy-100' :
                    'bg-gray-50 text-gray-600 border-gray-200'}`}>
                  {data.category}
                </span>
              )}
            </div>
          </div>
          
          <div className="text-right hidden sm:block">
            <span className="text-xs text-navy-900/20 font-mono font-bold">#{data.abbr}</span>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-[10px] font-black text-navy-900/30 uppercase tracking-widest block mb-1">Full Name</label>
              <p className="text-lg font-bold text-navy-900 leading-snug break-words">{data.full_name}</p>
            </div>
            
            <div>
              <label className="text-[10px] font-black text-navy-900/30 uppercase tracking-widest block mb-1">Chinese Meaning</label>
              {/* Changed from text-poppy-600 to text-navy-900 for a cleaner look */}
              <p className="text-xl font-bold text-navy-900">{data.chinese}</p>
            </div>
          </div>

          {/* Layman's Term Section - Yellow Highlight */}
          {data.layman_term && (
            <div className="bg-honey-50 rounded-lg p-5 border-l-4 border-honey-400">
               <div className="flex gap-3">
                   <div className="shrink-0 mt-0.5 text-honey-600">
                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                   </div>
                   <div>
                     <h4 className="text-xs font-bold text-honey-700 uppercase tracking-wider mb-1">大白话解释</h4>
                     <p className="text-navy-900 font-medium leading-relaxed text-sm sm:text-base">
                       {data.layman_term}
                     </p>
                   </div>
               </div>
            </div>
          )}

          {/* Professional Description */}
          {data.description && (
            <div className="pt-4 border-t-2 border-dotted border-navy-900/10">
              <p className="text-sm text-navy-800/70 leading-relaxed font-medium">
                <span className="font-bold text-navy-900 mr-2">专业说明:</span>
                {data.description}
              </p>
            </div>
          )}

          {'context_usage' in data && data.context_usage && (
             <div className="pt-0">
               <p className="text-xs text-navy-900/40 font-semibold">
                 <span className="text-navy-900/60 uppercase">Context: </span>
                 {data.context_usage}
               </p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};