import { ArrowLeft } from "lucide-react";
import Lottie from "react-lottie";
import animationData from "../assets/404.json";
import { Link } from "react-router-dom";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export default function NotFound() {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-[#fff]">
      <div className="flex justify-center items-center flex-row text-left gap-6">
        <Lottie options={defaultOptions} height={800} width={800} />
        <div className="flex flex-col items-start justify-start gap-4">
          <h2 className="text-8xl font-extrabold">Oops!</h2>
          <span className="text-2xl font-bold text-gray-500">
            Nos não conseguimos encontrar a pagina <br /> que voce estava procurando.
          </span>
          <Link to={'/'} className="cursor-pointer bg-gray-900 text-white hover:bg-gray-800 transition-colors font-bold flex justify-center items-center gap-2 py-3 px-5 rounded-4xl text-md">
            <ArrowLeft size={24} /> Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
