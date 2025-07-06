interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: 'primary' | 'secondary' | 'outline'
}

const Button = ({ className, children, variant, ...props }: ButtonProps) => {
  const variantClasses = {
    primary: 'bg-[#06367c] hover:bg-[#06367c]/90 active:bg-[#06367c]/85 text-white',
    secondary: 'bg-white text-[#06367c] border border-gray-300 hover:bg-gray-100',
    outline: 'bg-white text-[#06367c] border border-[#06367c] hover:bg-gray-100',
  }

  return (
    <button {...props} className={`transition-all duration-300 px-4 py-2 font-semibold inline-flex gap-2 items-center justify-center rounded-lg disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant || 'primary']} ${className}`}>
      {children}
    </button>
  );
}

export default Button;
