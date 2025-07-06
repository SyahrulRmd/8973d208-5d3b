const Button = ({ className, children, onClick }: { className?: string, children: React.ReactNode, onClick?: () => void }) => {
  return (
    <button onClick={onClick} className={`bg-[#06367c] hover:bg-[#06367c]/90 active:bg-[#06367c]/80 text-white px-4 py-2 font-semibold inline-flex gap-2 items-center justify-center rounded-lg ${className}`}>
      {children}
    </button>
  );
}

export default Button;