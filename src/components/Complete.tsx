import { Link } from "react-router-dom";
import { FaCheckCircle, FaHome, FaArrowLeft } from "react-icons/fa";

interface Props {
  linkHref?: string;
  linkText?: string;
  message: string;
}

export default function Complete({ linkHref, linkText, message }: Props) {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-xl mx-auto mt-12 p-8 bg-white rounded-xl shadow-lg border border-blue-100">
      <div className="mb-6 text-center">
        <div className="mb-4 inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100">
          <FaCheckCircle className="text-blue-500 text-5xl" />
        </div>
        <p className="text-xl font-medium text-gray-700">{message}</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 w-full max-w-md">
        <a
          href={linkHref || "javascript:void(0)"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-blue-400 text-white font-semibold py-3 px-6 rounded-md 
                   hover:bg-blue-500 transition-all duration-200 shadow-sm hover:shadow w-full"
        >
          <FaArrowLeft />
          <span>{linkText}</span>
        </a>

        <Link
          to="/"
          className="flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-500 font-semibold py-3 px-6 rounded-md
                   hover:bg-gray-100 hover:border-gray-400 hover:text-gray-700 
                   transition-all duration-200 shadow-sm hover:shadow w-full"
        >
          <FaHome />
          <span>홈으로</span>
        </Link>
      </div>
    </div>
  );
}
