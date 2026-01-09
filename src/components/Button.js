"use client";

export default function Button({ 
  children, 
  variant = "primary", 
  size = "md", 
  disabled = false, 
  loading = false, 
  onClick, 
  className = "",
  ...props 
}) {
  const baseClasses = "btn";
  const variantClasses = {
    primary: "btn-primary",
    secondary: "btn-secondary", 
    danger: "btn-danger",
    success: "btn-success",
    ghost: "btn-ghost"
  };
  
  const sizeClasses = {
    sm: "btn-sm",
    md: "btn-md", 
    lg: "btn-lg"
  };

  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  ].filter(Boolean).join(" ");

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}