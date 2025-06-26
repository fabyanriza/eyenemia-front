import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  CheckCircle,
  AlertTriangle,
  ArrowLeft,
  Camera,
  Heart,
  Activity,
  FileText,
  Eye,
  TrendingUp,
  Shield,
  Download,
} from "lucide-react";
import jsPDF from "jspdf";

interface PredictionResult {
  prediction: "anemia" | "normal" | "Anemia" | "Normal"; // Menangani variasi output
  confidence: number;
  image: string;
  nama?: string;
  usia?: string;
  gender?: string;
}

const Hasil: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const result: PredictionResult | null = location.state?.result;

  useEffect(() => {
    if (!result) {
      navigate("/eye-check");
    }
  }, [result, navigate]);

  const handleNewCheck = () => {
    navigate("/eye-check");
  };

  const generatePDF = async () => {
    if (!result) return;

    const pdf = new jsPDF();
    const isAnemia = result.prediction.toLowerCase() === "anemia";

    // Set font
    pdf.setFont("helvetica");

    // Header
    pdf.setFontSize(20);
    pdf.setTextColor(16, 185, 129); // emerald-600
    pdf.text("Eye-Nemia", 20, 25);
    pdf.setFontSize(14);
    pdf.setTextColor(75, 85, 99); // gray-600
    pdf.text("Laporan Hasil Deteksi Anemia", 20, 35);

    // Line separator
    pdf.setDrawColor(229, 231, 235); // gray-200
    pdf.line(20, 45, 190, 45);

    // Patient Information
    pdf.setFontSize(16);
    pdf.setTextColor(17, 24, 39); // gray-900
    pdf.text("Informasi Pasien", 20, 60);

    pdf.setFontSize(12);
    pdf.setTextColor(75, 85, 99); // gray-600
    let yPos = 75;

    if (result.nama) {
      pdf.text(`Nama: ${result.nama}`, 20, yPos);
      yPos += 10;
    }
    if (result.usia) {
      pdf.text(`Usia: ${result.usia} tahun`, 20, yPos);
      yPos += 10;
    }
    if (result.gender) {
      pdf.text(`Jenis Kelamin: ${result.gender}`, 20, yPos);
      yPos += 10;
    }

    pdf.text(
      `Tanggal Pemeriksaan: ${new Date().toLocaleDateString("id-ID")}`,
      20,
      yPos
    );
    pdf.text(
      `Waktu Pemeriksaan: ${new Date().toLocaleTimeString("id-ID")}`,
      20,
      yPos + 10
    );

    // Result Section
    yPos += 30;
    pdf.setFontSize(16);
    pdf.setTextColor(17, 24, 39);
    pdf.text("Hasil Deteksi", 20, yPos);

    yPos += 15;
    pdf.setFontSize(14);
    if (isAnemia) {
      pdf.setTextColor(220, 38, 38); // red-600
      pdf.text("Status: TERINDIKASI ANEMIA", 20, yPos);
    } else {
      pdf.setTextColor(22, 163, 74); // green-600
      pdf.text("Status: NORMAL", 20, yPos);
    }

    yPos += 15;
    pdf.setFontSize(12);
    pdf.setTextColor(75, 85, 99);
    pdf.text(
      `Probabilitas Anemia: ${(result.confidence * 100).toFixed(1)}%`,
      20,
      yPos
    );
    pdf.text("Metode: Analisis Citra Mata", 20, yPos + 10);

    pdf.setFontSize(14);
    pdf.setTextColor(217, 119, 6); // amber-600

    yPos += 15;
    pdf.setFontSize(10);
    pdf.setTextColor(75, 85, 99);
    const disclaimer =
      "Hasil deteksi ini menggunakan teknologi AI dan hanya sebagai indikasi awal. Untuk diagnosis yang akurat dan penanganan yang tepat, sangat disarankan untuk berkonsultasi dengan dokter atau tenaga medis profesional. Jangan menunda pemeriksaan medis jika Anda mengalami gejala anemia.";
    const disclaimerLines = pdf.splitTextToSize(disclaimer, 170);
    disclaimerLines.forEach((line: string, index: number) => {
      pdf.text(line, 20, yPos + index * 5);
    });

    // Footer
    pdf.setFontSize(8);
    pdf.setTextColor(156, 163, 175); // gray-400
    pdf.text(
      "Dokumen ini dibuat secara otomatis oleh sistem Eye-Nemia",
      20,
      280
    );
    pdf.text(`ID Laporan: EYE-${Date.now()}`, 20, 285);

    // Save PDF
    const fileName = `Eye-Nemia_Hasil_Deteksi_${
      new Date().toISOString().split("T")[0]
    }.pdf`;
    pdf.save(fileName);
  };

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50 flex items-center justify-center">
        <div className="text-gray-900 text-xl">Memuat hasil...</div>
      </div>
    );
  }

  // Menyamakan format output (misal: "anemia" dan "Anemia" dianggap sama)
  const isAnemia = result.prediction.toLowerCase() === "anemia";

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
                Hasil
              </span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                Deteksi
              </span>
            </h1>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto leading-relaxed">
              Hasil analisis AI terhadap foto mata Anda
            </p>
          </div>

          {/* Main Result Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 overflow-hidden mb-8">
            <div className="p-8 md:p-12 space-y-8">
              {/* Image Preview */}
              <div className="text-center">
                <div className="inline-block p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                  <img
                    src={result.image}
                    alt="Analyzed eye"
                    className="max-w-64 max-h-64 rounded-lg shadow-lg"
                  />
                </div>
              </div>

              {/* Result Status */}
              <div className="text-center">
                <div
                  className={`inline-flex items-center space-x-3 px-8 py-4 rounded-2xl ${
                    isAnemia
                      ? "bg-red-50 border-2 border-red-200"
                      : "bg-green-50 border-2 border-green-200"
                  }`}
                >
                  {isAnemia ? (
                    <AlertTriangle className="w-8 h-8 text-red-500" />
                  ) : (
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  )}
                  <div className="text-left">
                    <h2
                      className={`text-3xl font-bold ${
                        isAnemia ? "text-red-600" : "text-green-600"
                      }`}
                    >
                      {isAnemia ? "Terindikasi Anemia" : "Normal"}
                    </h2>
                  </div>
                </div>
              </div>

              {/* Detailed Information & Recommendations */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column - Information */}
                <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-6 border border-blue-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <span>Informasi Hasil</span>
                  </h3>
                  <div className="space-y-3 text-gray-700">
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span
                        className={`font-semibold ${
                          isAnemia ? "text-red-600" : "text-green-600"
                        }`}
                      >
                        {isAnemia ? "Terindikasi Anemia" : "Normal"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Probabilitas Anemia:</span>
                      <span className="font-semibold">
                        {(result.confidence * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Metode:</span>
                      <span className="font-semibold">Analisis Citra Mata</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Waktu Analisis:</span>
                      <span className="font-semibold">
                        {new Date().toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Column - Recommendations */}
                <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                    <Heart className="w-5 h-5 text-emerald-600" />
                    <span>Rekomendasi</span>
                  </h3>
                  <ul className="space-y-3">
                    {isAnemia ? (
                      <>
                        <li className="flex items-start space-x-3 text-gray-700">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm">
                            Konsultasi dengan dokter segera untuk pemeriksaan
                            lanjutan
                          </span>
                        </li>
                        <li className="flex items-start space-x-3 text-gray-700">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm">
                            Lakukan tes darah lengkap untuk konfirmasi diagnosis
                          </span>
                        </li>
                        <li className="flex items-start space-x-3 text-gray-700">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm">
                            Perbanyak makanan kaya zat besi dan vitamin C
                          </span>
                        </li>
                        <li className="flex items-start space-x-3 text-gray-700">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm">
                            Istirahat yang cukup dan hindari aktivitas berat
                          </span>
                        </li>
                      </>
                    ) : (
                      <>
                        <li className="flex items-start space-x-3 text-gray-700">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm">
                            Pertahankan pola hidup sehat dan gizi seimbang
                          </span>
                        </li>
                        <li className="flex items-start space-x-3 text-gray-700">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm">
                            Konsumsi makanan bergizi dan kaya nutrisi
                          </span>
                        </li>
                        <li className="flex items-start space-x-3 text-gray-700">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm">
                            Lakukan pemeriksaan kesehatan rutin
                          </span>
                        </li>
                        <li className="flex items-start space-x-3 text-gray-700">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm">
                            Tetap aktif berolahraga secara teratur
                          </span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <button
                  onClick={() => navigate("/")}
                  className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-all duration-300 border border-gray-200 flex items-center justify-center space-x-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Kembali ke Beranda</span>
                </button>
                <button
                  onClick={generatePDF}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 hover:shadow-lg"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Laporan PDF</span>
                </button>
                <button
                  onClick={handleNewCheck}
                  className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-blue-600 hover:shadow-lg hover:shadow-emerald-500/25 text-white rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Camera className="w-5 h-5" />
                  <span>Cek Lagi</span>
                </button>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
            <div className="flex items-start space-x-3">
              <Shield className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-amber-800 font-semibold mb-2">
                  Penting untuk Diketahui:
                </h4>
                <p className="text-amber-700 text-sm leading-relaxed">
                  Hasil deteksi ini menggunakan teknologi AI dan hanya sebagai
                  indikasi awal. Untuk diagnosis yang akurat dan penanganan yang
                  tepat, sangat disarankan untuk berkonsultasi dengan dokter
                  atau tenaga medis profesional. Jangan menunda pemeriksaan
                  medis jika Anda mengalami gejala anemia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hasil;
