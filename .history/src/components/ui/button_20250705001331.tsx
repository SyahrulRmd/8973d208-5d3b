const Button = ({ className, children }: { className: string, children: React.ReactNode }) => {
  return (
    <button className={`bg-blue-500 text-white p-2 rounded-md ${className}`}>
      {children}
    </button>
  );
}

export default Button;