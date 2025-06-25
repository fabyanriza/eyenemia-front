import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  Camera,
  AlertCircle,
  Image as ImageIcon,
  Sparkles,
  X,
  Eye,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";

// Utility function to convert data URL to File object
function dataURLtoFile(dataurl: string, filename: string): File {
  const arr = dataurl.split(",");
  const mimeMatch = arr[0].match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : "image/jpeg";
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

const EyeCheck: React.FC = () => {
  // Image and process state
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Camera functionality state and refs
  const [cameraMode, setCameraMode] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const navigate = useNavigate();
  const BACKEND_URL = "https://outstanding-clarity-production.up.railway.app";

  // Image handling logic
  const processFile = (file: File | null) => {
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Silakan pilih file gambar yang valid.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        // 5MB
        setError("Ukuran gambar harus kurang dari 5MB.");
        return;
      }
      setSelectedImage(file);
      setError(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    processFile(event.target.files?.[0] || null);
  };

  // Camera logic
  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      setStream(mediaStream);
      setCameraMode(true);
    } catch (err) {
      setError(
        "Tidak bisa mengakses kamera. Pastikan Anda telah memberikan izin."
      );
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    setStream(null);
    setCameraMode(false);
  };

  useEffect(() => {
    if (cameraMode && stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [cameraMode, stream]);

  const takePicture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        const dataUrl = canvas.toDataURL("image/jpeg");
        const file = dataURLtoFile(dataUrl, "capture.jpg");
        processFile(file);
        stopCamera();
      }
    }
  };

  // Prediction logic
  const handlePredict = async () => {
    if (!selectedImage) {
      setError("Harap unggah foto mata terlebih dahulu.");
      return;
    }

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("gambar", selectedImage);

    try {
      const response = await fetch(`${BACKEND_URL}/api/predict`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Terjadi kesalahan pada server.");
      }

      // Navigate to results page with the prediction data
      navigate("/hasil", {
        state: {
          result: {
            ...data,
            image: imagePreview,
          },
        },
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Gagal terhubung ke server."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const resetImage = () => {
    setImagePreview(null);
    setSelectedImage(null);
    setError(null);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50 flex items-center justify-center">
        <div className="text-center bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/50">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-500 border-t-transparent mx-auto mb-6"></div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Menganalisis Foto Mata...
          </h2>
          <p className="text-gray-600 text-lg">
            AI sedang memproses gambar Anda untuk deteksi anemia
          </p>
          <div className="mt-6 flex justify-center">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Camera mode
  if (cameraMode) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              Ambil Foto Mata
            </h2>
            <p className="text-white/80">
              Posisikan mata Anda di dalam frame dan pastikan pencahayaan cukup
            </p>
          </div>

          <div className="relative">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full max-w-2xl mx-auto rounded-2xl shadow-2xl"
            />

            {/* Camera overlay guide */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="border-2 border-emerald-400 rounded-full w-64 h-64 flex items-center justify-center">
                <Eye className="w-12 h-12 text-emerald-400" />
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-6 mt-8">
            <button
              onClick={takePicture}
              className="bg-emerald-600 hover:bg-emerald-700 text-white p-6 rounded-full shadow-2xl transition-all duration-300 hover:scale-110"
            >
              <Camera className="w-8 h-8" />
            </button>
            <button
              onClick={stopCamera}
              className="bg-red-500 hover:bg-red-600 text-white p-6 rounded-full shadow-2xl transition-all duration-300 hover:scale-110"
            >
              <X className="w-8 h-8" />
            </button>
          </div>
        </div>
        <canvas ref={canvasRef} className="hidden" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate("/")}
              className="flex items-center text-gray-600 hover:text-emerald-600 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              <span className="font-medium">Kembali</span>
            </button>
            <div className="flex items-center">
              <Eye className="h-8 w-8 text-emerald-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                Eye-Nemia
              </span>
            </div>
            <div className="w-20"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Title Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">
                Eye
              </span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                Check
              </span>
            </h1>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto leading-relaxed">
              Unggah foto mata Anda untuk deteksi dini anemia menggunakan
              teknologi AI
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
            <div className="p-8 md:p-12 space-y-8">
              {/* Image Upload Section */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center justify-center">
                  <Eye className="h-6 w-6 mr-3 text-emerald-600" />
                  Upload Foto Mata
                </h3>

                <div className="border-2 border-dashed border-emerald-200 rounded-2xl bg-emerald-50/50 p-8 transition-all hover:border-emerald-300 hover:bg-emerald-50">
                  {imagePreview ? (
                    <div className="text-center space-y-4">
                      <div className="relative inline-block">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="max-w-xs max-h-64 mx-auto rounded-xl shadow-lg border-2 border-white"
                        />
                        <button
                          onClick={resetImage}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors shadow-lg"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-center text-emerald-600">
                        <CheckCircle className="h-5 w-5 mr-2" />
                        <span className="font-medium">
                          Foto berhasil diunggah
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center space-y-6">
                      <div className="bg-emerald-100 rounded-full p-6 w-fit mx-auto">
                        <ImageIcon className="h-12 w-12 text-emerald-600" />
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">
                          Pilih cara upload foto
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Pastikan foto mata jelas dan pencahayaan cukup
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <label className="cursor-pointer">
                          <div className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center gap-2">
                            <Upload className="h-5 w-5" />
                            <span>Upload dari Galeri</span>
                          </div>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageUpload}
                          />
                        </label>

                        <button
                          onClick={startCamera}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                        >
                          <Camera className="h-5 w-5" />
                          <span>Buka Kamera</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Guidelines */}
              <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl p-6 border border-blue-100">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 text-blue-600" />
                  Panduan Pengambilan Foto
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm">
                        Pastikan pencahayaan cukup terang dan merata
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm">
                        Fokus pada area kelopak mata bagian bawah
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm">
                        Hindari bayangan atau refleksi cahaya berlebihan
                      </span>
                    </li>
                  </ul>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm">
                        Pastikan gambar tidak buram atau kabur
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm">
                        Jarak optimal antara mata dan kamera 10-15 cm
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm">
                        Buka mata lebar dan lihat langsung ke kamera
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-red-800">
                      Terjadi Kesalahan
                    </h4>
                    <p className="text-red-700 text-sm mt-1">{error}</p>
                  </div>
                </div>
              )}

              {/* Action Button */}
              <div className="text-center pt-4">
                <button
                  onClick={handlePredict}
                  disabled={!selectedImage || isLoading}
                  className={`px-12 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-3 mx-auto ${
                    selectedImage && !isLoading
                      ? "bg-gradient-to-r from-emerald-600 to-blue-600 text-white shadow-lg hover:shadow-xl hover:scale-105"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <Sparkles className="h-6 w-6" />
                  <span>Mulai Analisis Anemia</span>
                </button>
              </div>

              {/* Disclaimer */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-amber-800 mb-2">
                      Penting untuk Diketahui
                    </h4>
                    <div className="text-amber-700 text-sm space-y-1">
                      <p>
                        • Hasil deteksi ini hanya sebagai indikasi awal dan
                        tidak menggantikan diagnosis medis
                      </p>
                      <p>
                        • Konsultasikan dengan dokter untuk pemeriksaan dan
                        diagnosis yang akurat
                      </p>
                      <p>
                        • Teknologi AI memiliki keterbatasan dan tidak 100%
                        akurat
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden canvas for camera functionality */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default EyeCheck;
