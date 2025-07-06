const Button = ({ className, children }: { className?: string, children: React.ReactNode }) => {
  return (
    <button className={`bg-[#06367c] text-white px-4 py-2 font-semibold inline-flex gap-2 items-center justify-center rounded-md ${className}`}>
      {children}
    </button>
  );
}

export default Button;