import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EyeCheck from "./components/EyeCheck";
import Hasil from "./components/Hasil";
import { useTheme } from "./contexts/ThemeContext";
import {
  Shield,
  Users,
  Award,
  Phone,
  Mail,
  MapPin,
  Star,
  ChevronRight,
  Activity,
  Leaf,
  Brain,
  Timer,
  CheckCircle,
  ArrowRight,
  Menu,
  X,
  Eye,
  AlertCircle,
  TrendingUp,
  Utensils,
  Pill,
  Apple,
  Fish,
  Beef,
  GraduationCap,
} from "lucide-react";
import EyeIllustration from "./components/EyeIllustration";

function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("symptoms");
  const { isDarkMode } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValues, setAnimatedValues] = useState({
    children: 26.8,
    teens: 32,
    overall: 29.4,
  });
  const navigate = useNavigate();

  // Eye-Nemia Hero Component
  const EyeNemiaHero = () => (
    <section className="relative bg-gradient-to-br from-emerald-50 via-blue-50 to-white overflow-hidden">
      <div className="absolute inset-0 bg-white/60"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6">
                <span className="text-gradient-eye bg-clip-text">Eye-</span>
                <span className="text-gradient-nemia bg-clip-text">Nemia</span>
              </h1>
              <div className="mb-8">
                <p className="text-gray-900 text-xl mb-1 font-bold">
                  Alat deteksi{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                    anemia
                  </span>
                </p>
                <p className="text-gray-900 text-xl font-bold">
                  menggunakan{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">
                    citra mata*
                  </span>
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/eye-check"
                className="bg-emerald-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-emerald-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                Cek Matamu!
                <Eye className="ml-2 h-5 w-5" />
              </a>
            </div>

            <p className="text-xs text-gray-600 italic">
              *alat ini hanya langkah awal deteksi anemia saja, segera hubungi
              dokter bila terdapat indikasi penyakit anemia
            </p>
          </div>

          <div className="relative">
            <div className="relative bg-trasnparent rounded-full p-8 flex items-center justify-center h-[300px]">
              <EyeIllustration />
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // Statistics Component
  const StatistikAnemia = () => {
    const stats = [
      {
        title: "Anak Usia 5-14 Tahun",
        percentage: 26.8,
        description: "Lebih dari 1 dari 4 anak mengalami anemia",
        icon: <GraduationCap className="w-8 h-8" />,
        color: "text-blue-400",
        bgColor: "bg-blue-400/20",
      },
      {
        title: "Remaja Usia 15-24 Tahun",
        percentage: 32,
        description: "Kelompok dengan prevalensi tertinggi",
        icon: <AlertCircle className="w-8 h-8" />,
        color: "text-red-400",
        bgColor: "bg-red-400/20",
      },
      {
        title: "Rata-rata Nasional",
        percentage: 29.4,
        description: "Hampir 3 dari 10 orang Indonesia",
        icon: <Users className="w-8 h-8" />,
        color: "text-purple-400",
        bgColor: "bg-purple-400/20",
      },
    ];

    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-gradient-eye">Statistik</span>{" "}
              <span className="text-gradient-nemia">Anemia</span>{" "}
              <span className="text-gray-900">di Indonesia</span>
            </h2>
            <p className="text-gray-600 text-xl max-w-4xl mx-auto leading-relaxed">
              Berdasarkan Riset Kesehatan Dasar (Riskesdas) 2018, anemia
              merupakan masalah kesehatan serius yang dialami oleh balita,
              remaja, ibu hamil bahkan usia lanjut di Indonesia
            </p>
          </div>

          {/* Highlight Statistic */}
          <div className="text-center mb-16">
            <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-3xl p-8 border border-red-400/30">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                3 dari 10 orang temanmu
              </h3>
              <p className="text-xl text-gray-700 mb-2">menderita anemia</p>
              <p className="text-gray-600">
                Itu artinya anemia sangat dekat dengan kehidupan kita
                sehari-hari
              </p>
            </div>
          </div>

          {/* Main Statistics Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                <div
                  className={`${stat.bgColor} ${stat.color} p-4 rounded-xl w-fit mb-4`}
                >
                  {stat.icon}
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {stat.title}
                </h3>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl font-bold text-gray-900">
                    {stat.percentage}%
                  </span>
                </div>

                <p className="text-gray-600 text-sm">{stat.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-500 text-sm">
              Sumber: Riset Kesehatan Dasar (Riskesdas) 2018 - Kementerian
              Kesehatan RI
            </p>
          </div>
        </div>
      </section>
    );
  };

  // Information Component
  const InformasiAnemia = () => {
    const symptoms = [
      {
        id: "physical",
        title: "Gejala Fisik",
        icon: <Activity className="w-6 h-6" />,
        color: "text-red-400",
        bgColor: "bg-red-400/20",
        items: [
          "Kelelahan dan kelemahan yang berlebihan",
          "Sesak napas saat beraktivitas ringan",
          "Pusing dan sakit kepala",
          "Kulit pucat, terutama di wajah dan telapak tangan",
          "Kuku rapuh dan mudah patah",
          "Rambut rontok lebih dari biasanya",
        ],
      },
      {
        id: "neurological",
        title: "Gejala Neurologis",
        icon: <Brain className="w-6 h-6" />,
        color: "text-purple-400",
        bgColor: "bg-purple-400/20",
        items: [
          "Kesulitan berkonsentrasi",
          "Mudah lupa dan gangguan memori",
          "Mood swing dan mudah tersinggung",
          "Gangguan tidur dan insomnia",
          "Restless leg syndrome",
          "Keinginan makan es atau pati (pica)",
        ],
      },
      {
        id: "eye",
        title: "Gejala pada Mata",
        icon: <Eye className="w-6 h-6" />,
        color: "text-emerald-400",
        bgColor: "bg-emerald-400/20",
        items: [
          "Konjungtiva (bagian dalam kelopak mata) pucat",
          "Sklera (bagian putih mata) kebiruan",
          "Penglihatan kabur atau buram",
          "Mata kering dan mudah lelah",
          "Lingkaran hitam di bawah mata",
        ],
      },
    ];

    const riskFactors = [
      {
        id: "demographic",
        title: "Faktor Demografis",
        icon: <Users className="w-6 h-6" />,
        color: "text-blue-400",
        bgColor: "bg-blue-400/20",
        items: [
          "Perempuan usia subur (menstruasi)",
          "Ibu hamil dan menyusui",
          "Bayi dan anak-anak dalam masa pertumbuhan",
          "Remaja dalam masa pubertas",
          "Lansia di atas 65 tahun",
          "Vegetarian dan vegan",
        ],
      },
      {
        id: "medical",
        title: "Kondisi Medis",
        icon: <Pill className="w-6 h-6" />,
        color: "text-orange-400",
        bgColor: "bg-orange-400/20",
        items: [
          "Penyakit ginjal kronis",
          "Penyakit radang usus (IBD)",
          "Kanker dan kemoterapi",
          "Penyakit celiac",
          "Thalassemia dan sickle cell disease",
          "Perdarahan internal (ulkus, wasir)",
        ],
      },
      {
        id: "lifestyle",
        title: "Gaya Hidup",
        icon: <Utensils className="w-6 h-6" />,
        color: "text-green-400",
        bgColor: "bg-green-400/20",
        items: [
          "Diet rendah zat besi, folat, atau vitamin B12",
          "Konsumsi alkohol berlebihan",
          "Merokok",
          "Olahraga berlebihan (atlet endurance)",
          "Donor darah terlalu sering",
          "Penggunaan obat tertentu jangka panjang",
        ],
      },
    ];

    const prevention = [
      {
        id: "nutrition",
        title: "Nutrisi Seimbang",
        icon: <Apple className="w-6 h-6" />,
        color: "text-green-400",
        bgColor: "bg-green-400/20",
        items: [
          "Konsumsi makanan kaya zat besi (daging merah, hati, bayam)",
          "Makanan tinggi vitamin C (jeruk, tomat, paprika)",
          "Sumber folat (sayuran hijau, kacang-kacangan)",
          "Vitamin B12 (ikan, telur, produk susu)",
          "Hindari teh/kopi saat makan (menghambat penyerapan zat besi)",
          "Kombinasi makanan untuk penyerapan optimal",
        ],
      },
      {
        id: "supplements",
        title: "Suplementasi",
        icon: <Pill className="w-6 h-6" />,
        color: "text-purple-400",
        bgColor: "bg-purple-400/20",
        items: [
          "Suplemen zat besi sesuai anjuran dokter",
          "Asam folat untuk ibu hamil",
          "Vitamin B12 untuk vegetarian/vegan",
          "Multivitamin dengan mineral",
          "Konsultasi dengan dokter sebelum konsumsi",
          "Perhatikan interaksi dengan obat lain",
        ],
      },
      {
        id: "lifestyle-prevention",
        title: "Gaya Hidup Sehat",
        icon: <Shield className="w-6 h-6" />,
        color: "text-blue-400",
        bgColor: "bg-blue-400/20",
        items: [
          "Olahraga teratur tapi tidak berlebihan",
          "Tidur cukup 7-9 jam per hari",
          "Kelola stress dengan baik",
          "Hindari merokok dan alkohol berlebihan",
          "Pemeriksaan kesehatan rutin",
          "Tangani kondisi medis yang mendasari",
        ],
      },
    ];

    const tabs = [
      {
        id: "symptoms",
        label: "Gejala",
        icon: <AlertCircle className="w-5 h-5" />,
      },
      {
        id: "risk-factors",
        label: "Faktor Risiko",
        icon: <TrendingUp className="w-5 h-5" />,
      },
      {
        id: "prevention",
        label: "Pencegahan",
        icon: <Shield className="w-5 h-5" />,
      },
    ];

    const getCurrentData = () => {
      switch (activeTab) {
        case "symptoms":
          return symptoms;
        case "risk-factors":
          return riskFactors;
        case "prevention":
          return prevention;
        default:
          return symptoms;
      }
    };

    const foodSources = [
      {
        category: "Sumber Zat Besi Heme",
        icon: <Beef className="w-8 h-8 text-red-400" />,
        foods: [
          "Daging sapi",
          "Hati ayam/sapi",
          "Ikan tuna",
          "Kerang",
          "Daging kambing",
        ],
        absorption: "Penyerapan tinggi (15-35%)",
      },
      {
        category: "Sumber Zat Besi Non-Heme",
        icon: <Leaf className="w-8 h-8 text-green-400" />,
        foods: [
          "Bayam",
          "Kacang merah",
          "Tahu/tempe",
          "Quinoa",
          "Dark chocolate",
        ],
        absorption: "Penyerapan sedang (2-20%)",
      },
      {
        category: "Vitamin C (Meningkatkan Penyerapan)",
        icon: <Apple className="w-8 h-8 text-orange-400" />,
        foods: ["Jeruk", "Strawberry", "Paprika", "Brokoli", "Tomat"],
        absorption: "Meningkatkan penyerapan zat besi",
      },
      {
        category: "Folat & B12",
        icon: <Fish className="w-8 h-8 text-blue-400" />,
        foods: ["Salmon", "Telur", "Alpukat", "Asparagus", "Lentil"],
        absorption: "Penting untuk produksi sel darah merah",
      },
    ];

    return (
      <section id="informasi" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-gradient-eye">Informasi</span>{" "}
              <span className="text-gradient-nemia">Anemia</span>
            </h2>
            <p className="text-gray-600 text-xl max-w-4xl mx-auto leading-relaxed">
              Pelajari lebih lanjut tentang anemia, mulai dari gejala yang perlu
              diwaspadai, faktor-faktor yang meningkatkan risiko, hingga cara
              pencegahan yang efektif
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-100 rounded-2xl p-2 border border-gray-200">
              <div className="flex space-x-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                      activeTab === tab.id
                        ? "bg-white text-gray-900 shadow-lg"
                        : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {getCurrentData().map((card, index) => (
              <div
                key={card.id}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                <div
                  className={`${card.bgColor} ${card.color} p-4 rounded-xl w-fit mb-4`}
                >
                  {card.icon}
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {card.title}
                </h3>

                <ul className="space-y-3">
                  {card.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex items-start space-x-3 text-gray-600"
                    >
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Food Sources Section */}
          {activeTab === "prevention" && (
            <div className="mb-16">
              <h3 className="text-3xl font-bold text-gray-900 text-center mb-8">
                Sumber Makanan Penting
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {foodSources.map((source, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-2xl p-6 border border-gray-100 text-center hover:shadow-lg transition-shadow"
                  >
                    <div className="flex justify-center mb-4">
                      {source.icon}
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">
                      {source.category}
                    </h4>
                    <ul className="space-y-2 mb-4">
                      {source.foods.map((food, foodIndex) => (
                        <li key={foodIndex} className="text-gray-600 text-sm">
                          {food}
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs text-gray-500 italic">
                      {source.absorption}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="text-center mb-10">
            <p className="text-gray-500 text-sm">
              Sumber:
              <br />{" "}
              <a href="https://www.who.int/news-room/fact-sheets/detail/anaemia">
                https://www.who.int/news-room/fact-sheets/detail/anaemia
              </a>
              <br />
              <a href="https://www.medicalnewstoday.com/articles/eye-anemia-symptoms">
                https://www.medicalnewstoday.com/articles/eye-anemia-symptoms
              </a>
              <br />
            </p>
          </div>
          {/* Warning Box */}
          <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-3xl p-8 border border-red-400/30 mb-12">
            <div className="flex items-start space-x-4">
              <div className="bg-red-400/20 p-3 rounded-xl">
                <AlertCircle className="w-8 h-8 text-red-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Penting untuk Diingat
                </h3>
                <div className="space-y-2 text-gray-700">
                  <p>
                    • Informasi ini hanya untuk edukasi dan tidak menggantikan
                    konsultasi medis
                  </p>
                  <p>
                    • Jika mengalami gejala anemia, segera konsultasi dengan
                    dokter
                  </p>
                  <p>• Diagnosis anemia memerlukan pemeriksaan darah lengkap</p>
                  <p>
                    • Pengobatan anemia harus disesuaikan dengan penyebab yang
                    mendasari
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Eye className="h-8 w-8 text-emerald-600" />
                <span className="ml-2 text-xl font-bold text-gradient-eye">
                  Eye
                </span>
                <span className="text-xl font-bold text-gradient-nemia">
                  Nemia
                </span>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a
                  href="#home"
                  className="text-gray-900 hover:text-emerald-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Beranda
                </a>
                <a
                  href="#statistik"
                  className="text-gray-600 hover:text-emerald-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Statistik
                </a>
                <a
                  href="#informasi"
                  className="text-gray-600 hover:text-emerald-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Informasi
                </a>
                <a
                  href="#about"
                  className="text-gray-600 hover:text-emerald-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Ringkasan
                </a>
                <a
                  href="/eye-check"
                  className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
                >
                  Cek Sekarang
                </a>
              </div>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-100">
              <a
                href="#home"
                className="text-gray-900 hover:text-emerald-600 block px-3 py-2 text-base font-medium"
              >
                Beranda
              </a>
              <a
                href="#statistik"
                className="text-gray-600 hover:text-emerald-600 block px-3 py-2 text-base font-medium"
              >
                Statistik
              </a>
              <a
                href="#informasi"
                className="text-gray-600 hover:text-emerald-600 block px-3 py-2 text-base font-medium"
              >
                Informasi
              </a>
              <a
                href="#about"
                className="text-gray-600 hover:text-emerald-600 block px-3 py-2 text-base font-medium"
              >
                Tentang
              </a>
              <button className="w-full text-left bg-emerald-600 text-white px-3 py-2 rounded-lg text-base font-medium hover:bg-emerald-700 transition-colors mt-2">
                Cek Sekarang
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div id="home">
        <EyeNemiaHero />
      </div>

      {/* Statistics Section */}
      <div id="statistik">
        <StatistikAnemia />
      </div>

      {/* Information Section */}
      <InformasiAnemia />

      {/* About Section */}
      <section
        id="about"
        className="py-20 bg-gradient-to-br from-emerald-50 to-blue-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                  <span className="text-green-500 font-bolder">Jadi,</span>
                  <span className="text-blue-500"> Apa Itu Eye-Nemia?</span>
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed text-justify">
                  <span className="font-bold">Eye-Nemia</span> adalah inovasi
                  teknologi kesehatan yang memungkinkan deteksi dini anemia
                  melalui analisis citra mata. Dengan memanfaatkan kecerdasan
                  buatan, kami membantu masyarakat untuk melakukan screening
                  awal anemia secara mudah dan cepat.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">
                    AI
                  </div>
                  <div className="text-gray-900 font-semibold">Powered</div>
                  <div className="text-gray-600 text-sm">Teknologi canggih</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    92%
                  </div>
                  <div className="text-gray-900 font-semibold">Akurasi</div>
                  <div className="text-gray-600 text-sm">
                    Deteksi yang tepat
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">
                    60 Detik
                  </div>
                  <div className="text-gray-900 font-semibold">Hasil Cepat</div>
                  <div className="text-gray-600 text-sm">Analisis instan</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    Gratis
                  </div>
                  <div className="text-gray-900 font-semibold">Akses Mudah</div>
                  <div className="text-gray-600 text-sm">Untuk semua</div>
                </div>
              </div>

              <a
                href="/eye-check"
                className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors inline-flex items-center"
              >
                Mulai Deteksi <ArrowRight className="h-5 w-5 ml-2" />
              </a>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-3xl transform -rotate-6 opacity-20"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <div className="bg-emerald-100 rounded-full p-8 mb-4 inline-block">
                    <Eye className="h-16 w-16 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Deteksi Mudah
                  </h3>
                  <p className="text-gray-600">Cukup foto mata Anda</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center mb-4">
                <Eye className="h-8 w-8 text-emerald-400" />
                <span className="ml-2 text-xl font-bold">Eye-Nemia</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Teknologi deteksi anemia melalui citra mata yang mudah, cepat,
                dan akurat. Membantu deteksi dini untuk kesehatan yang lebih
                baik.
              </p>
              <div className="flex space-x-4">
                <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
                  Cek Sekarang
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Anggota Kelompok 12</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Aufa Fahmi
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    I Made Dharma
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Fabyan Riza Kiram
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Patricia Dewinta
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Kontak</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-emerald-400" />
                  eyenemia@gmail.com
                </li>
                <li className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-emerald-400" />
                  (+62) 85733872739
                </li>
                <li className="flex items-start">
                  <MapPin className="h-4 w-4 mr-2 text-emerald-400 mt-1" />
                  <span>Surabaya, Indonesia</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Eye-Nemia. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/eye-check" element={<EyeCheck />} />
      <Route path="/hasil" element={<Hasil />} />
    </Routes>
  );
}

export default App;
