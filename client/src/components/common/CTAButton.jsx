import React from 'react';
import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi';

const CTAButton = ({ 
  to, 
  href, 
  children, 
  text,
  variant = 'primary', 
  className = '', 
  icon = true,
  onClick,
  type = 'button'
}) => {
  const content = children || text;
  const baseClasses = "inline-flex items-center justify-center gap-3 px-8 py-3.5 text-xs font-semibold uppercase tracking-widest rounded-full transition-all duration-300 shadow-sm hover:shadow-xl group";
  
  const variants = {
    primary: "bg-black text-white hover:bg-accent-terracotta",
    secondary: "bg-transparent border border-white/20 text-white hover:bg-white hover:text-black",
    accent: "bg-accent-terracotta text-white hover:bg-white hover:text-black",
    dark: "bg-[#141517] text-white hover:bg-accent-terracotta"
  };

  const buttonContent = (
    <>
      <span>{content}</span>
      {icon && (
        <HiArrowRight className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </>
  );

  const combinedClasses = `${baseClasses} ${variants[variant] || variants.primary} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedClasses} onClick={onClick}>
        {buttonContent}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={combinedClasses} onClick={onClick}>
        {buttonContent}
      </a>
    );
  }

  return (
    <button type={type} className={combinedClasses} onClick={onClick}>
      {buttonContent}
    </button>
  );
};

export default CTAButton;
