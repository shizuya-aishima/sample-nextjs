'use client';

type PrimaryButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
};

export const PrimaryButton = ({ onClick, children }: PrimaryButtonProps) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <button
      className="flex justify-center rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      onClick={handleClick}
    >
      {children}
    </button>
  );
};
