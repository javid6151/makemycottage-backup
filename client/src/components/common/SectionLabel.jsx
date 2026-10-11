import React from 'react';

const SectionLabel = ({ text, className = '' }) => {
  return (
    <div className={`flex items-center gap-4 mb-6 ${className}`}>
      <span className="w-12 h-[1px] bg-accent-terracotta"></span>
      <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-terracotta">
        {text}
      </h3>
    </div>
  );
};

export default SectionLabel;
