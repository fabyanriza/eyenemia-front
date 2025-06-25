import React from "react";
import EyeIllustration from "./EyeIllustration";
import { useNavigate } from "react-router-dom";

const Hero: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-[calc(100vh-80px)] relative flex items-center">
      <div className=""></div>

      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-12 md:mb-0">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-in-up">
            <span className="text-gradient-eye">Eye-</span>
            <span className="text-gradient-nemia">Nemia</span>
          </h1>

          <div className="mb-8 animate-fade-in-up animate-delay-200">
            <p className="text-black text-xl mb-1 font-bold">
              Alat deteksi <span className="text-gradient-nemia">anemia</span>
            </p>
            <p className="text-black text-xl font-bold">
              menggunakan <span className="text-gradient-eye">citra mata*</span>
            </p>
          </div>

          <button
            className="btn-primary flex items-center animate-fade-in-up animate-delay-400"
            onClick={() => navigate("eye-check")}
          >
            Cek Matamu!
            <span className="ml-2">👁️</span>
          </button>
          <p className="text-[11px] text-black mt-7 italic">
            *alat ini hanya langkah awal deteksi anemia saja, segera hubungi
            dokter bila terdapat indikasi penyakit anemia
          </p>
        </div>

        <div className="md:w-1/2 flex justify-center animate-float rounded-xl">
          <EyeIllustration />
        </div>
      </div>
    </div>
  );
};

export default Hero;
