import { ShieldAlert } from "lucide-react";

interface FormSuccessProps {
  message?: string | null;
}

export const FormError = ({ message }: FormSuccessProps) => {
  if (!message) return null;
  return (
    <div className="flex space-x-4 items-center p-2 rounded-lg text-red-500 bg-red-500/30">
      <ShieldAlert size={20} />
      <p>{message}</p>
    </div>
  );
};
