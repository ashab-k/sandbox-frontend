import Link from "next/link";
import { Check } from "lucide-react";
const ProcessingStatus = ({
  loadingText,
  successText,
  loading,
  success,
  link,
}: {
  loadingText: string;
  successText: string;
  loading: boolean;
  success: boolean;
  link: string;
}) => {
  if (!loading && !success) return null;

  return (
    <div className="mt-4 flex justify-center">
      {loading ? (
        <div className="flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-md">
          <div className="animate-spin h-4 w-4 border-2 border-blue-700 border-t-transparent rounded-full"></div>
          <span>{loadingText}</span>
        </div>
      ) : success ? (
        <Link
          href={link}
          className="flex items-center space-x-2 bg-green-50 text-green-700 px-4 py-2 rounded-md hover:bg-green-100 transition-colors"
        >
          <Check className="h-4 w-4" />
          <span>{successText}</span>
        </Link>
      ) : null}
    </div>
  );
};

export default ProcessingStatus;
