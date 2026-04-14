"use client";

import Image from "next/image";
import {
  ChevronDown,
  Code,
  Users,
  Rocket,
  Target,
  Shield,
  Heart,
  Globe,
  Lock,
  Unlock,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
//import dynamic from "next/dynamic";
import { Roboto_Mono } from "next/font/google";
import Dither from "@/components/Dither";
import LanyardDynamic from "@/components/LanyardDynamic";

// --- Font ---
const robotoMono = Roboto_Mono({ subsets: ["latin"] });

// --- Types ---
interface TeamMember {
  name: string;
  role: string;
  description: string;
  avatarColor: string;
  image?: string;
  country: string;
  flagPath: string;
}

interface WorkflowStep {
  step: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

// --- Data ---
const teamMembers: TeamMember[] = [
  {
    name: "Felipe Pereira",
    role: "Fundador, Tech Leader y PMO",
    description: "Encargado de la visión técnica, estratégica y calidad.",
    avatarColor: "from-purple-600 to-indigo-600",
    image: "/team/Felipe.png",
    country: "Chile",
    flagPath: "/flags/chile.webp",
  },
  {
    name: "Manuel Huenchullán",
    role: "DB Manager y Asistente General",
    description: "Gestión de bases de datos y soporte operativo constante.",
    avatarColor: "from-blue-600 to-cyan-600",
    image: "/team/Manu.png",
    country: "Chile",
    flagPath: "/flags/chile.webp",
  },
  {
    name: "Verónica Rebolleda",
    role: "Desarrolladora Frontend",
    description:
      "Creación de interfaces modernas y experiencias de usuario únicas.",
    avatarColor: "from-orange-500 to-red-500",
    image: "/team/Vero.png",
    country: "Argentina",
    flagPath: "/flags/argentina.png",
  },
  {
    name: "Vanesa Carolina",
    role: "Marketing",
    description: "Estrategia digital, posicionamiento de marca y comunicación.",
    avatarColor: "from-purple-500 to-pink-500",
    image: "/team/Vane.png",
    country: "Argentina",
    flagPath: "/flags/argentina.png",
  },
  {
    name: "Daniel Abarca",
    role: "Comunicación y Relaciones Públicas",
    description:
      "Gestión de comunicación, relaciones externas y estrategia de posicionamiento.",
    avatarColor: "from-emerald-500 to-teal-600",
    image: "/team/Daniel.png",
    country: "Chile",
    flagPath: "/flags/chile.webp",
  },
  {
    name: "Carlos Martel",
    role: "Desarrollador Full Stack",
    description:
      "Desarrollo end-to-end, integrando frontend y backend impecablemente.",
    avatarColor: "from-indigo-600 to-blue-600",
    country: "Chile",
    flagPath: "/flags/chile.webp",
  },
  {
    name: "Andrés Barragán",
    role: "Desarrollador Backend",
    description:
      "Arquitectura de servidores, APIs y lógica de negocios escalable.",
    avatarColor: "from-cyan-600 to-blue-500",
    image: "/team/Andres.png",
    country: "Colombia",
    flagPath: "/flags/colombia.png",
  },
  {
    name: "Nicole Castillo",
    role: "Soporte y Mesa de Ayuda",
    description: "Resolución de incidencias y atención al usuario garantizada.",
    avatarColor: "from-orange-400 to-orange-600",
    image: "/team/Nicole.png",
    country: "República Dominicana",
    flagPath: "/flags/rd.svg",
  },
];

const workflowSteps: WorkflowStep[] = [
  {
    step: "1",
    title: "Ideación",
    description:
      "Propuestas Abiertas e innovación constante para moldear la solución ideal.",
    icon: <Rocket className="w-8 h-8 text-orange-500" />,
  },
  {
    step: "2",
    title: "Track & Sync",
    description:
      "Colaboración y seguimiento exhaustivo diario utilizando Trello y Discord.",
    icon: <Users className="w-8 h-8 text-blue-500" />,
  },
  {
    step: "3",
    title: "Desarrollo Asistido",
    description:
      "Uso de IA permitida como copiloto, siempre con validación y entendimiento humano obligatorio.",
    icon: <Code className="w-8 h-8 text-purple-500" />,
  },
  {
    step: "4",
    title: "Control de Calidad",
    description:
      "Todo código se envía mediante revisiones cruzadas y Pull Requests en GitHub.",
    icon: <Target className="w-8 h-8 text-blue-400" />,
  },
  {
    step: "5",
    title: "Aprobación",
    description:
      "Revisión técnica rigurosa y aprobación exclusiva por parte del PMO.",
    icon: <Shield className="w-8 h-8 text-orange-400" />,
  },
];

// --- Components (Can be extracted to /components folder later) ---
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 via-blue-600 to-orange-500 p-0.5">
            <div className="w-full h-full bg-black rounded-md flex items-center justify-center">
              {/* Fallback to text if logo.png is missing or fails to load, but we try image first */}
              <Image
                src="/logo.png"
                alt="LiteStartUp Logo"
                width={32}
                height={32}
                className="object-contain transition-transform group-hover:scale-110"
              />
              <span
                className="absolute text-white font-bold text-xs tracking-tighter"
                style={{ zIndex: -1 }}
              >
                LSU
              </span>
            </div>
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 tracking-tight">
            LiteStartUp
          </span>
        </Link>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-300">
          <Link
            href="#filosofia"
            className="hover:text-white transition-colors duration-200"
          >
            Filosofía
          </Link>
          <Link
            href="#equipo"
            className="hover:text-white transition-colors duration-200"
          >
            Equipo
          </Link>
          <Link
            href="#womensup"
            className="hover:text-white transition-colors duration-200"
          >
            #WomensUP
          </Link>
          <Link
            href="#metodologia"
            className="hover:text-white transition-colors duration-200"
          >
            Metodología
          </Link>
          <Link
            href="#contacto"
            className="hover:text-white transition-colors duration-200"
          >
            Contacto
          </Link>
          <Link
            href="#jointeam"
            className="hover:text-white transition-colors duration-200"
          >
            Únete al Equipo
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-300 hover:text-white focus:outline-none transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-[#050505] border-b border-white/10 shadow-xl py-6 flex flex-col px-6 gap-6 animate-in slide-in-from-top-2 duration-300">
          <Link
            href="#filosofia"
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-300 hover:text-white font-medium text-lg"
          >
            Filosofía
          </Link>
          <Link
            href="#equipo"
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-300 hover:text-white font-medium text-lg"
          >
            Equipo
          </Link>
          <Link
            href="#womensup"
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-300 hover:text-white font-medium text-lg"
          >
            #WomensUP
          </Link>
          <Link
            href="#metodologia"
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-300 hover:text-white font-medium text-lg"
          >
            Metodología
          </Link>
          <Link
            href="#contacto"
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-300 hover:text-white font-medium text-lg"
          >
            Contacto
          </Link>
          <Link
            href="#jointeam"
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-300 hover:text-white font-medium text-lg"
          >
            Únete al Equipo
          </Link>
        </div>
      )}
    </header>
  );
};

// --- Main Page ---
export default function Home() {
  const [isCardActivated, setIsCardActivated] = useState(false);
  const [activeTab, setActiveTab] = useState("buscamos");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    honeypot: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitMessage(
          "¡Mensaje enviado exitosamente! Gracias por contactarnos.",
        );
        setShowSubmitModal(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          honeypot: "",
        });
      } else {
        setSubmitMessage("Error al enviar el mensaje. Inténtalo de nuevo.");
        setShowSubmitModal(false);
      }
    } catch (error) {
      setSubmitMessage("Error al enviar el mensaje. Inténtalo de nuevo.");
      setShowSubmitModal(false);
    }
    setIsSubmitting(false);
  };

  return (
    <main className="min-h-screen bg-[#050505] text-gray-100 font-sans selection:bg-purple-500/30">
      <Navbar />

      {/* Mobile Card Activation Button - Solo en móvil */}
      <div className="md:hidden fixed bottom-8 right-6 z-40">
        <button
          onClick={() => setIsCardActivated(!isCardActivated)}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 transform ${
            isCardActivated
              ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/40 scale-100"
              : "bg-white/10 text-gray-300 border border-white/20 hover:bg-white/20 active:scale-95"
          }`}
        >
          {isCardActivated ? (
            <>
              <Unlock className="w-4 h-4" />
              Acceso Activo
            </>
          ) : (
            <>
              <Lock className="w-4 h-4" />
              Activar Tarjeta
            </>
          )}
        </button>
      </div>

      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 z-0 w-full h-full opacity-50 mix-blend-screen">
            <Dither
              waveColor={[0.55, 0.2, 0.92]} // tech purple tone
              disableAnimation={false}
              enableMouseInteraction={true}
              mouseRadius={0.4}
              colorNum={4}
              pixelSize={2}
              waveAmplitude={0.3}
              waveFrequency={3}
              waveSpeed={0.05}
            />
          </div>
          <div className="absolute inset-0 bg-[url('/bc.png')] bg-cover bg-center opacity-30 mix-blend-screen mix-blend-luminosity"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-[#050505]/80 to-[#050505]"></div>

          {/* Decorative glowing orbs */}
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] mix-blend-screen pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-80px)]">
          {/* Left Text Content */}
          <div className="text-center lg:text-left flex flex-col items-center lg:items-start pt-12 lg:pt-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8 animate-fade-in-up">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs font-medium text-gray-300 uppercase tracking-wider">
                Innovando el futuro hoy
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 leading-[1.1] relative z-10">
              <span className="block text-white drop-shadow-lg">
                LiteStartUp
              </span>

              {/* Premium Text Effect para Sociedad PA */}
              <span className="relative block w-max mt-1 md:mt-3 group cursor-default">
                {/* Outer Glow animado */}
                <span className="absolute -inset-1 md:-inset-3 bg-gradient-to-r from-purple-600/30 via-blue-600/30 to-orange-500/30 blur-2xl rounded-full opacity-60 group-hover:opacity-100 group-hover:blur-3xl transition-all duration-700 animate-pulse pointer-events-none"></span>

                {/* Texto de Contorno (Stroke) */}
                <span
                  className="absolute inset-0 text-transparent bg-clip-text pointer-events-none"
                  style={{ WebkitTextStroke: "2px rgba(255, 255, 255, 0.15)" }}
                  aria-hidden="true"
                >
                  Sociedad PA
                </span>

                {/* Texto Shimmer Animado Interno */}
                <span className="relative inline-block text-transparent bg-clip-text bg-[linear-gradient(110deg,#9333ea,45%,#60a5fa,55%,#9333ea)] bg-[length:200%_auto] [animation:textShimmer_3s_linear_infinite] drop-shadow-[0_0_12px_rgba(147,51,234,0.6)] mix-blend-plus-lighter">
                  Sociedad PA
                </span>
              </span>
            </h1>

            <p
              className={`${robotoMono.className} max-w-2xl text-lg md:text-xl text-gray-400 mb-10 font-light leading-relaxed`}
            >
              Bienvenido al epicentro del desarrollo. Transformamos ideas
              audaces en plataformas digitales de alto impacto mediante
              metodologías ágiles y talento global de excelencia.
            </p>

            <Link
              href="#equipo"
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-semibold rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                Conoce nuestro equipo
              </span>
              <ChevronDown className="relative z-10 w-5 h-5 group-hover:text-white transition-colors duration-300 animate-bounce" />
            </Link>
          </div>
        </div>

        {/* Right 3D Content - Absolute Full Screen */}
        <div
          className={`absolute top-0 right-0 w-full lg:w-[45%] h-full z-20 md:pointer-events-auto ${
            !isCardActivated
              ? "md:pointer-events-auto pointer-events-none"
              : "pointer-events-auto"
          }`}
        >
          <div
            className={`w-full h-[100vh] relative md:pointer-events-auto ${
              isCardActivated ? "block" : "hidden md:block"
            }`}
          >
            <LanyardDynamic />
          </div>
        </div>
      </section>

      {/* 2. MISIÓN, VISIÓN Y FILOSOFÍA */}
      <section
        id="filosofia"
        className="py-24 relative z-10 border-t border-white/5 bg-gradient-to-b from-[#050505] to-[#0a0a0a]"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300 group">
              <div className="w-12 h-12 bg-purple-500/20 text-purple-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Nuestra Filosofía
              </h3>
              <p className="text-gray-400 leading-relaxed font-light">
                Buscamos un equipo sano y clientes que nos hagan crecer como
                profesionales. Trabajamos a largo plazo; los proyectos exitosos
                y el buen trabajo serán recompensados justamente para cada
                integrante.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300 group">
              <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Nuestra Misión
              </h3>
              <p className="text-gray-400 leading-relaxed font-light">
                Proveer soluciones tecnológicas de alta calidad bajo
                metodologías ágiles y el uso responsable e inteligente de
                Inteligencia Artificial para potenciar los resultados.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300 group">
              <div className="w-12 h-12 bg-orange-500/20 text-orange-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Nuestra Visión
              </h3>
              <p className="text-gray-400 leading-relaxed font-light">
                Consolidarnos como un equipo global de vanguardia, fomentando
                incesantemente el talento diverso, inclusivo y la excelencia
                técnica en la industria.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. NUESTRO EQUIPO */}
      <section id="equipo" className="py-24 relative z-10 overflow-hidden">
        {/* Background Image & Overlay for Equipo section like Hero */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('/bc2.png')] bg-cover bg-center opacity-30 mix-blend-screen mix-blend-luminosity"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#050505]/80"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="mb-16 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Talento Global. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                Mismo ADN.
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl font-light">
              Nuestro mayor pilar es el equipo. Profesionales apasionados
              construyendo el futuro del software.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="group relative p-1 rounded-2xl bg-gradient-to-b from-white/10 to-transparent hover:from-white/20 transition-all duration-500"
              >
                <div className="h-full p-6 rounded-xl bg-[#0a0a0a]/50 backdrop-blur-md border border-white/5 overflow-hidden relative flex flex-col items-center text-center">
                  {/* Avatar Placeholder / Gradient */}
                  <div
                    className={`w-36 h-36 md:w-40 md:h-40 rounded-full mb-6 relative z-10 bg-gradient-to-br ${member.avatarColor} p-1 shadow-lg`}
                  >
                    <div className="w-full h-full bg-[#0a0a0a] rounded-full flex items-center justify-center overflow-hidden">
                      {member.image ? (
                        <Image
                          src={member.image}
                          alt={member.name}
                          width={160}
                          height={160}
                          className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${member.name === "Felipe Pereira" ? "object-center" : "object-top"}`}
                        />
                      ) : (
                        <span className="text-4xl font-black text-white mix-blend-screen">
                          {member.name.charAt(0)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-1 justify-center">
                    <h3 className="text-lg font-bold text-white relative z-10 whitespace-nowrap">
                      {member.name}
                    </h3>
                    <img
                      src={member.flagPath}
                      alt={member.country}
                      width={24}
                      height={18}
                      className="relative z-10 rounded-sm flex-shrink-0"
                    />
                  </div>
                  <p className="text-sm font-medium text-purple-400 mb-4 relative z-10">
                    {member.role}
                  </p>
                  <p className="text-sm text-gray-400 leading-relaxed font-light relative z-10">
                    {member.description}
                  </p>

                  {/* Hover effect glow */}
                  <div
                    className={`absolute -top-20 -left-20 md:-bottom-20 md:-right-20 w-40 h-40 md:w-60 md:h-60 bg-gradient-to-br ${member.avatarColor} rounded-full blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-0`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. INICIATIVA #WomensUP */}
      <section
        id="womensup"
        className="py-24 relative z-10 border-y border-white/5 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/10"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-sm font-semibold tracking-wide">
                <Heart className="w-4 h-4" /> Inclusión y Diversidad
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                Iniciativa{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
                  #WomensUP
                </span>
              </h2>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light border-l-4 border-pink-500 pl-6">
                En LiteStartUp la inclusión no es una moda, es nuestro
                ecosistema. Actualmente, un pilar fundamental de nuestro equipo
                son mujeres, y trabajamos activamente para alcanzar la paridad
                total.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Apoyamos activamente eventos <strong>#WomensUP</strong>,
                fomentando espacios diseñados para inspirar, visibilizar y
                empoderar el rol esencial de la mujer en la industria del
                software a nivel internacional.
              </p>
            </div>
            <div className="flex-1 w-full bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md relative">
              <div className="absolute top-0 right-0 -m-6 w-32 h-32 bg-pink-500/30 blur-[60px] rounded-full mix-blend-screen"></div>
              <div className="absolute bottom-0 left-0 -m-6 w-32 h-32 bg-purple-500/30 blur-[60px] rounded-full mix-blend-screen"></div>
              <div className="grid grid-cols-2 grid-rows-3 gap-3 relative z-10 w-full h-[360px] md:h-[440px]">
                {/* Cuadro Horizontal (Foto de grupo, ocupa las dos columnas arriba) */}
                <div className="col-span-2 row-span-1 relative rounded-2xl border border-white/10 overflow-hidden group shadow-lg">
                  <Image
                    src="/womensup/grupo1.png"
                    alt="WomensUP Equipo 1"
                    fill
                    className="object-cover object-[center_23%] opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={100}
                    priority={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-600/20 mix-blend-color pointer-events-none"></div>
                </div>
                {/* Cuadro Vertical (Ocupa la columna izquierda, con altura doble) */}
                <div className="col-span-1 row-span-2 relative rounded-2xl border border-white/10 overflow-hidden group shadow-lg">
                  <Image
                    src="/womensup/foto1.png"
                    alt="WomensUP Presencia"
                    fill
                    className="object-cover object-center opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={100}
                    priority={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 to-purple-600/20 mix-blend-color pointer-events-none"></div>
                </div>
                {/* Cuadros a la derecha (2 fotos más) */}
                <div className="col-span-1 row-span-1 relative rounded-2xl border border-white/10 overflow-hidden group shadow-lg">
                  <Image
                    src="/womensup/FOTO2.png"
                    alt="WomensUP Detalles"
                    fill
                    className="object-cover object-center opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={100}
                    priority={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-bl from-pink-500/20 to-purple-600/20 mix-blend-color pointer-events-none"></div>
                </div>
                <div className="col-span-1 row-span-1 relative rounded-2xl border border-white/10 overflow-hidden group shadow-lg">
                  <Image
                    src="/womensup/grupo2.png"
                    alt="WomensUP Equipo 2"
                    fill
                    className="object-cover object-[center_25%] opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={100}
                    priority={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-tl from-pink-500/20 to-purple-600/20 mix-blend-color pointer-events-none"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. METODOLOGÍA Y FLUJO DE TRABAJO */}
      <section id="metodologia" className="py-24 relative z-10 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Flujo de Trabajo{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
                Integrado
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light">
              Ingeniería de software con precisión quirúrgica. Así convertimos
              conceptos en productos exitosos.
            </p>
          </div>

          <div className="relative">
            {/* Connecting line for desktop */}
            <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-white/5 via-white/20 to-white/5 z-0"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
              {workflowSteps.map((step, index) => (
                <div
                  key={index}
                  className="relative z-10 flex flex-col items-center group"
                >
                  <div
                    className="w-24 h-24 rounded-full bg-[#0a0a0a] border-2 border-white/10 flex flex-col items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:border-current group-hover:scale-110 transition-all duration-300 cursor-default"
                    style={{
                      color: (
                        step.icon as React.ReactElement<any>
                      )?.props?.className
                        ?.split(" ")
                        ?.find((c: string) => c.startsWith("text-"))
                        ?.replace("text-", ""),
                    }}
                  >
                    {step.icon}
                    <div className="absolute top-0 right-0 -mr-2 -mt-2 w-8 h-8 rounded-full bg-white text-black font-black text-sm flex items-center justify-center shadow-lg border-2 border-[#0a0a0a]">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 text-center">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm text-center leading-relaxed font-light">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Únete al equipo */}
      <section
        id="jointeam"
        className="py-24 relative z-10 border-t border-white/5 bg-[#060607] overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(79,70,229,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(236,72,153,0.16),_transparent_30%)] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] items-center">
            <div className="space-y-6">
              <p className="text-md uppercase tracking-[0.3em] text-purple-300/80 font-semibold">
                Únete al equipo.
              </p>
              <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight text-justify">
                Buscamos talentos que compartan nuestros valores y estén listos
                para afrontar los desafíos del futuro.
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl font-light leading-relaxed text-justify">
                ¿Quieres sumarte a nuestra base de Talentos? En LiteStartUp
                valoramos la iniciativa, el trabajo en equipo y la pasión por
                construir software que marque la diferencia.
              </p>
              <a
                href="mailto:f.pereiraalarcn@gmail.com"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-blue-300  px-8 py-4 text-sm font-semibold text-black shadow-[0_20px_60px_rgba(139,92,246,0.18)] transition-transform duration-300 hover:-translate-y-1 hover:scale-105"
              >
                Subir CV
              </a>
            </div>

            {/* Columna Derecha: Card con Efecto Esmerilado y Switch */}
            <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-[0_40px_120px_rgba(0,0,0,0.5)] min-h-[400px] flex flex-col">
              {/* Selector / Switch */}
              <div className="flex p-1 bg-black/40 backdrop-blur-md rounded-full border border-white/10 mb-8 mx-auto w-fit">
                <button
                  onClick={() => setActiveTab("buscamos")}
                  className={`px-6 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 ${
                    activeTab === "buscamos"
                      ? "bg-purple-500/20 text-white border border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                      : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  ¿Qué buscamos?
                </button>
                <button
                  onClick={() => setActiveTab("ofrecemos")}
                  className={`px-6 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 ${
                    activeTab === "ofrecemos"
                      ? "bg-blue-500/20 text-white border border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.4)]"
                      : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  Lo que ofrecemos
                </button>
              </div>

              {/* Contenido Dinámico con transiciones */}
              <div className="flex-grow flex items-center">
                {activeTab === "buscamos" ? (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-500 w-full">
                    <ul className="space-y-4">
                      {[
                        "Personas proactivas con actitud colaborativa.",
                        "Interés por resolver desafíos técnicos con excelencia.",
                        "Capacidad de aprendizaje constante y pensamiento crítico.",
                      ].map((item, index) => (
                        <li
                          key={index}
                          className="group flex gap-4 items-center p-4 rounded-xl transition-all duration-300 hover:bg-purple-500/10 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] border border-transparent hover:border-purple-500/30"
                        >
                          <span className="text-purple-400 text-lg group-hover:scale-110 transition-transform">
                            ✦
                          </span>
                          <span className="text-gray-200 text-base leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="animate-in fade-in slide-in-from-left-4 duration-500 w-full">
                    <ul className="space-y-4">
                      {[
                        "Crecimiento en proyectos reales y con impacto.",
                        "Trabajo en equipo transparente y dinámico.",
                        "Cultura de innovación y uso responsable de IA.",
                      ].map((item, index) => (
                        <li
                          key={index}
                          className="group flex gap-4 items-center p-4 rounded-xl transition-all duration-300 hover:bg-blue-500/10 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] border border-transparent hover:border-blue-500/30"
                        >
                          <span className="text-blue-400 text-lg group-hover:scale-110 transition-transform">
                            ✦
                          </span>
                          <span className="text-gray-200 text-base leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CONTACTO */}
      <section
        id="contacto"
        className="py-24 relative z-10 border-t border-white/5 bg-[#050505]"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Contáctanos
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light">
              ¿Tienes un proyecto en mente o quieres saber más sobre nuestros
              servicios? Estamos aquí para ayudarte.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Nombre *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Tu nombre completo"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="+56 9 1234 5678"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Mensaje *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  placeholder="Cuéntanos sobre tu proyecto o consulta..."
                />
              </div>
              {/* Honeypot for anti-spam */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={handleInputChange}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto px-8 py-4 border border-purple-500 bg-purple-500/20 text-white font-semibold rounded-lg shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:bg-purple-500/30 hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#050505] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
              </button>

              {showSubmitModal && (
                <div className="mt-6 rounded-3xl border border-green-500/20 bg-green-500/10 p-5 text-center shadow-lg shadow-green-500/10">
                  <p className="text-sm font-semibold text-green-100 mb-4">
                    {submitMessage}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setShowSubmitModal(false);
                      setSubmitMessage("");
                    }}
                    className="inline-flex items-center justify-center rounded-full bg-green-400 px-5 py-2 text-sm font-semibold text-black transition hover:bg-green-300"
                  >
                    OK
                  </button>
                </div>
              )}

              {!showSubmitModal && submitMessage && (
                <p
                  className={`text-center text-sm ${submitMessage.includes("exitosamente") ? "text-green-400" : "text-red-400"}`}
                >
                  {submitMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="border-t border-white/10 py-12 relative z-10 bg-black">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
          <div className="flex gap-6 mb-8">
            <a
              href="https://github.com/LiteStartsUp"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
            >
              <Code className="w-6 h-6" />
            </a>
            <a
              href="https://fpereiradev.sppa.cl"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
            >
              <Globe className="w-6 h-6" />
            </a>
          </div>

          <h2 className="text-2xl font-bold tracking-tighter text-white mb-2">
            LiteStartUp
          </h2>
          <p className="text-gray-400 font-light mb-8 max-w-md">
            ¡Gracias por confiar en el proyecto y ser parte de este increíble
            equipo!
          </p>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8"></div>

          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} LiteStartUp - Sociedad PA. Todos
            los derechos reservados.
          </p>
        </div>
      </footer>
    </main>
  );
}
