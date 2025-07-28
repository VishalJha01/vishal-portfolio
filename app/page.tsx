"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, MapPin, Mail, Github, Linkedin, ExternalLink, Phone, Moon, Sun, Award, Code } from "lucide-react"
import Image from "next/image"
import { useState, useEffect, useRef, useCallback, useMemo } from "react"

// Mobile detection hook
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || "ontouchstart" in window)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])
  return isMobile
}

// Throttle hook for performance
const useThrottle = (callback: Function, delay: number) => {
  const lastRun = useRef(Date.now())
  return useCallback(
    (...args: any[]) => {
      if (Date.now() - lastRun.current >= delay) {
        callback(...args)
        lastRun.current = Date.now()
      }
    },
    [callback, delay],
  )
}

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [typewriterText, setTypewriterText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [visibleElements, setVisibleElements] = useState(new Set<string>())
  const [isDarkMode, setIsDarkMode] = useState(true)
  const isMobile = useIsMobile()
  const fullName = "VISHAL JHA"
  const observerRef = useRef<IntersectionObserver | null>(null)
  const typewriterTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const typewriterIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Throttled scroll handler for better performance
  const handleScroll = useThrottle(
    () => {
      setScrollY(window.scrollY)
    },
    isMobile ? 100 : 16,
  ) // More throttling on mobile

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  // Optimized Intersection Observer
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect()
    }
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set(prev).add(entry.target.id))
          }
        })
      },
      { threshold: isMobile ? 0.05 : 0.1, rootMargin: isMobile ? "100px" : "50px" },
    )

    // Only observe essential elements on mobile
    const selector = isMobile ? ".scroll-animate-essential" : ".scroll-animate"
    const elements = document.querySelectorAll(selector)
    elements.forEach((el) => {
      if (observerRef.current && el.id) {
        observerRef.current.observe(el)
      }
    })

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [isMobile])

  // Optimized typewriter effect
  useEffect(() => {
    const startTypewriter = () => {
      // Clear any existing timeouts
      if (typewriterTimeoutRef.current) {
        clearTimeout(typewriterTimeoutRef.current)
      }
      if (typewriterIntervalRef.current) {
        clearInterval(typewriterIntervalRef.current)
      }

      setIsTyping(true)
      setTypewriterText("")
      let currentIndex = 0

      typewriterIntervalRef.current = setInterval(
        () => {
          if (currentIndex <= fullName.length) {
            setTypewriterText(fullName.slice(0, currentIndex))
            currentIndex++
          } else {
            if (typewriterIntervalRef.current) {
              clearInterval(typewriterIntervalRef.current)
            }
            typewriterTimeoutRef.current = setTimeout(() => {
              setIsTyping(false)
            }, 2000)
          }
        },
        isMobile ? 200 : 150,
      ) // Slower on mobile
    }

    // Initial typewriter
    startTypewriter()

    // Repeat typewriter - less frequent on mobile
    const repeatInterval = setInterval(startTypewriter, isMobile ? 15000 : 10000)

    return () => {
      clearInterval(repeatInterval)
      if (typewriterTimeoutRef.current) {
        clearTimeout(typewriterTimeoutRef.current)
      }
      if (typewriterIntervalRef.current) {
        clearInterval(typewriterIntervalRef.current)
      }
    }
  }, [isMobile, fullName]) // Added fullName to dependencies

  // Memoized data to prevent re-renders - Updated with better categorization and naming
  const skillCategories = useMemo(
    () => [
      {
        category: "🧠 Data Science & AI",
        skills: [
          { name: "Python", icon: "🐍" },
          { name: "Machine Learning", icon: "🤖" },
          { name: "Deep Learning", icon: "🧠" },
          { name: "TensorFlow", icon: "🔥" },
          { name: "PyTorch", icon: "⚡" },
          { name: "Scikit-learn", icon: "🤖" },
          { name: "Pandas", icon: "🐼" },
          { name: "NumPy", icon: "🔢" },
          { name: "R Programming", icon: "📊" },
          { name: "Jupyter", icon: "📓" },
          { name: "Statistical Analysis", icon: "📈" },
        ],
      },
      {
        category: "🌐 Web Development",
        skills: [
          { name: "JavaScript", icon: "⚡" },
          { name: "React.js", icon: "⚛️" },
          { name: "HTML5", icon: "🌐" },
          { name: "CSS3", icon: "🎨" },
          { name: "Tailwind CSS", icon: "💨" },
          { name: "Flask", icon: "🌶️" },
        ],
      },
      {
        category: "🔧 Version Control & Tools",
        skills: [
          { name: "Git", icon: "🔧" },
          { name: "GitHub", icon: "📚" },
        ],
      },
      {
        category: "🗄️ Databases",
        skills: [
          { name: "SQL", icon: "🗄️" },
          { name: "MySQL", icon: "🐬" },
        ],
      },
      {
        category: "📊 Analytics & BI Tools",
        skills: [
          { name: "Power BI", icon: "📊" },
          { name: "Excel", icon: "📈" },
          { name: "Tableau", icon: "📉" },
          { name: "Matplotlib", icon: "📉" },
          { name: "Seaborn", icon: "📊" },
          { name: "Google Analytics", icon: "📈" },
          { name: "Data Visualization", icon: "📊" },
        ],
      },
    ],
    [],
  )

  const projects = useMemo(
    () => [
      {
        title: "🌍 Global Development Indicators Dashboard | Power BI",
        description:
          "Comprehensive Power BI dashboard analyzing global development trends using World Bank's World Development Indicators dataset. Features 1,000+ socio-economic indicators across 200+ countries with interactive visualizations, dynamic DAX calculations, and advanced data modeling for tracking GDP, population, life expectancy, and environmental metrics.",
        tech: ["Power BI", "DAX", "Power Query", "Data Modeling", "Data Visualization", "World Bank API"],
        link: "https://github.com/VishalJha01/Global-development-indicators-Dashboard",
        image: "/projects/Global.png",
      },
      {
        title: "Heart Disease Risk Analysis Dashboard | Power BI",
        description:
          "Interactive, insight-driven Power BI dashboard built using real-world clinical data from Kaggle. Objective: To identify and visualize key risk factors contributing to heart disease using a combination of clinical data analysis, Python preprocessing, and advanced DAX logic.",
        tech: ["Power BI", "Python", "Pandas", "NumPy", "DAX", "Data Modeling", "Data Visualization"],
        link: "https://github.com/VishalJha01/Heart-disease-dashboard",
        image: "/projects/Heart Disease dashboard.png",
      },
      {
        title: "AeroPulse AQI.AI - Smart Air Quality Prediction",
        description:
          "AI-powered air quality prediction platform using machine learning models to forecast AQI levels. Features real-time data visualization, interactive dashboards, and predictive analytics for environmental monitoring.",
        tech: ["Python", "Pandas", "NumPy", "Scikit-learn", "Streamlit", "Machine Learning"],
        link: "https://github.com/VishalJha01/Aeropulse-aqi.AI",
        demo: "https://aeropulse-aqi-ai.streamlit.app",
        image: "/projects/aeropulse.png",
      },
      {
        title: "Dr. Dubey Dental Clinic",
        description:
          "Modern responsive website with appointment prediction system and patient analytics dashboard. Features optimized UI/UX and data-driven insights for clinic management.",
        tech: ["HTML5", "CSS3", "JavaScript", "Tailwind CSS", "Data Analytics"],
        link: "https://github.com/VishalJha01/Dr.-Dubey-Dental-Clinic",
        demo: "https://dr-dubey-dental-clinic.vercel.app",
        image: "/projects/dr-dubey-dental.png",
      },
      {
        title: "Wecofy - Eco-Friendly E-commerce",
        description:
          "Sustainable e-commerce platform with intelligent product recommendation system, environmental impact analytics, and responsive design. Integrated ML-based user behavior analysis.",
        tech: ["HTML", "CSS", "JavaScript", "Bootstrap", "Flask", "Machine Learning"],
        link: "https://github.com/VishalJha01/Wecofy-E-commerce-website",
        demo: "https://wecofy-website.vercel.app",
        image: "/projects/wecofy-ecommerce.png",
      },
    ],
    [],
  )

  const certifications = useMemo(
    () => [
      {
        name: "Fundamentals of Generative AI",
        issuer: "Microsoft",
        date: "2024",
        description: "Core concepts and applications of generative AI and large language models",
      },
      {
        name: "Machine Learning Specialization",
        issuer: "Stanford/Coursera",
        date: "2024",
        description: "Comprehensive ML algorithms, supervised and unsupervised learning techniques",
      },
      {
        name: "Data Science with Python",
        issuer: "IBM",
        date: "2023",
        description: "Python programming for data science using Pandas, NumPy, and ML libraries",
      },
      {
        name: "Deep Learning Fundamentals",
        issuer: "Google",
        date: "2024",
        description: "Neural networks, TensorFlow, and deep learning model development",
      },
      {
        name: "MySQL & Database Systems",
        issuer: "Trainity",
        date: "2024",
        description: "Database design, optimization, and data warehousing for ML applications",
      },
      {
        name: "Statistical Analysis & Modeling",
        issuer: "Be10x",
        date: "2024",
        description: "Advanced statistics, hypothesis testing, and predictive modeling",
      },
      {
        name: "Frontend Development (React)",
        issuer: "Great Learning",
        date: "2024",
        description: "Modern React development and full-stack web application deployment",
      },
    ],
    [],
  )

  const aboutPoints = useMemo(
    () => [
      "🎓 BCA (Hons) student at K.R. Mangalam University with 8.6/10 GPA, training to become an AI & Data Science Engineer",
      "💻 Full-stack developer building responsive web applications with modern frameworks and seamless user experiences",
      "📊 Transforming raw data into actionable insights through statistical analysis, machine learning, and data visualization",
      "🚀 Creating impactful applications that bridge the gap between complex data and real-world business solutions",
      "🤖 Training in AI & Data Science engineering to develop intelligent systems and predictive analytics models",
      "🔬 Passionate about turning innovative ideas into scalable applications that solve meaningful problems",
    ],
    [],
  )

  const handleDownloadCV = useCallback(() => {
    const pdfUrl = "https://raw.githubusercontent.com/VishalJha01/portfolio/main/vishal-jha-cv.pdf"
    const anchor = document.createElement("a")
    anchor.href = pdfUrl
    anchor.download = "Vishal_Jha_Resume.pdf"
    anchor.target = "_blank"
    try {
      document.body.appendChild(anchor)
      anchor.click()
      document.body.removeChild(anchor)
    } catch (error) {
      window.open(pdfUrl, "_blank")
    }
  }, [])

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode
      if (newMode) {
        document.documentElement.classList.remove("light-mode")
        document.documentElement.classList.add("dark") // Ensure dark class is present
      } else {
        document.documentElement.classList.add("light-mode")
        document.documentElement.classList.remove("dark") // Remove dark class for light mode
      }
      return newMode
    })
  }, [])

  // Initialize dark mode class on mount
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
      document.documentElement.classList.remove("light-mode")
    } else {
      document.documentElement.classList.add("light-mode")
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${isDarkMode ? "bg-gradient-to-br from-gray-950 via-black to-red-950" : "bg-gradient-to-br from-gray-100 via-white to-red-50"} relative overflow-hidden`}
    >
      {/* Simplified Background for Mobile */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Base Grid - Simplified on mobile */}
        <div
          className={`absolute inset-0 ${isDarkMode ? "bg-[linear-gradient(rgba(220,38,38,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.1)_1px,transparent_1px)]" : "bg-[linear-gradient(rgba(220,38,38,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.05)_1px,transparent_1px)]"} ${isMobile ? "bg-[size:120px_120px]" : "bg-[size:80px_80px]"}`}
        />
        {!isMobile && (
          <div
            className={`absolute inset-0 ${isDarkMode ? "bg-[linear-gradient(rgba(220,38,38,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.05)_1px,transparent_1px)]" : "bg-[linear-gradient(rgba(220,38,38,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.02)_1px,transparent_1px)]"} bg-[size:20px_20px]`}
          />
        )}

        {/* Saturn Rings - Only on desktop or simplified on mobile */}
        {!isMobile ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-[1600px] h-[1600px]">
              {/* Main rings only for desktop */}
              <div
                className={`absolute inset-0 scale-[0.9] border-8 ${isDarkMode ? "border-red-500/25" : "border-red-500/15"} rounded-full animate-saturn-main-ring ${isDarkMode ? "shadow-[0_0_80px_rgba(220,38,38,0.4),inset_0_0_40px_rgba(220,38,38,0.2)]" : "shadow-[0_0_50px_rgba(220,38,38,0.15),inset_0_0_20px_rgba(220,38,38,0.1)]"}`}
              />
              <div
                className={`absolute inset-0 scale-[0.85] border-6 ${isDarkMode ? "border-white/20" : "border-gray-400/15"} rounded-full animate-saturn-ring-2 ${isDarkMode ? "shadow-[0_0_60px_rgba(255,255,255,0.3),inset_0_0_30px_rgba(255,255,255,0.15)]" : "shadow-[0_0_40px_rgba(0,0,0,0.15),inset_0_0_20px_rgba(0,0,0,0.1)]"}`}
              />
              <div
                className={`absolute inset-0 scale-[0.8] border-6 ${isDarkMode ? "border-blue-500/22" : "border-blue-500/12"} rounded-full animate-saturn-ring-3 ${isDarkMode ? "shadow-[0_0_70px_rgba(59,130,246,0.35),inset_0_0_35px_rgba(59,130,246,0.2)]" : "shadow-[0_0_40px_rgba(59,130,246,0.15),inset_0_0_20px_rgba(59,130,246,0.1)]"}`}
              />
            </div>
          </div>
        ) : (
          // Simplified static rings for mobile
          <div className="absolute inset-0 flex items-center justify-center opacity-30">
            <div className="relative w-[800px] h-[800px]">
              <div
                className={`absolute inset-0 scale-[0.9] border-4 ${isDarkMode ? "border-red-500/20" : "border-red-500/10"} rounded-full`}
              />
              <div
                className={`absolute inset-0 scale-[0.7] border-2 ${isDarkMode ? "border-white/15" : "border-gray-400/10"} rounded-full`}
              />
            </div>
          </div>
        )}

        <div
          className={`absolute inset-0 ${isDarkMode ? "bg-gradient-to-t from-black/80 via-transparent to-black/40" : "bg-gradient-to-t from-white/60 via-transparent to-white/20"}`}
        />
      </div>

      {/* Responsive Navbar */}
      <nav
        className={`fixed top-0 w-full z-50 ${isDarkMode ? "bg-black/30" : "bg-white/30"} backdrop-blur-md ${isDarkMode ? "border-b border-red-900/30" : "border-b border-red-200/30"}`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Professional VJ Logo */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" })
                  // Optional: Also refresh the page
                  // window.location.reload()
                }}
                className="flex items-center space-x-4 cursor-pointer hover:opacity-80 transition-opacity duration-150"
              >
                <div className="relative flex items-center justify-center">
                  <div className="text-4xl font-black tracking-tighter">
                    <span
                      className={`bg-gradient-to-br from-white via-red-500 to-blue-900 bg-clip-text text-transparent ${!isMobile ? "animate-gradient-logo" : ""} transform -skew-x-12 inline-block`}
                    >
                      V
                    </span>
                    <span
                      className={`bg-gradient-to-br from-blue-900 via-red-500 to-white bg-clip-text text-transparent ${!isMobile ? "animate-gradient-logo" : ""} transform skew-x-12 inline-block -ml-2`}
                    >
                      J
                    </span>
                  </div>
                </div>
                <span
                  className={`${isDarkMode ? "text-white" : "text-gray-900"} font-black text-xl tracking-wider ${!isMobile ? "animate-gradient-text" : ""} bg-gradient-to-r from-red-600 via-red-400 to-blue-600 bg-clip-text text-transparent`}
                >
                  ℙ𝕆ℝ𝕋𝔽𝕆𝕃𝕀𝕆
                </span>
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#home"
                className={`${isDarkMode ? "text-gray-300 hover:text-red-400" : "text-gray-700 hover:text-red-600"} transition-all duration-150 font-medium hover:scale-105 transform`}
              >
                Home
              </a>
              <a
                href="#about"
                className={`${isDarkMode ? "text-gray-300 hover:text-red-400" : "text-gray-700 hover:text-red-600"} transition-all duration-150 font-medium hover:scale-105 transform`}
              >
                About
              </a>
              <a
                href="#skills"
                className={`${isDarkMode ? "text-gray-300 hover:text-red-400" : "text-gray-700 hover:text-red-600"} transition-all duration-150 font-medium hover:scale-105 transform`}
              >
                Skills
              </a>
              <a
                href="#projects"
                className={`${isDarkMode ? "text-gray-300 hover:text-red-400" : "text-gray-700 hover:text-red-600"} transition-all duration-150 font-medium hover:scale-105 transform`}
              >
                Projects
              </a>
              <a
                href="#certifications"
                className={`${isDarkMode ? "text-gray-300 hover:text-red-400" : "text-gray-700 hover:text-red-600"} transition-all duration-150 font-medium hover:scale-105 transform`}
              >
                Certifications
              </a>
              <a
                href="#contact"
                className={`${isDarkMode ? "text-gray-300 hover:text-red-400" : "text-gray-700 hover:text-red-600"} transition-all duration-150 font-medium hover:scale-105 transform`}
              >
                Contact
              </a>
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-all duration-150 ${isDarkMode ? "bg-gray-800/50 hover:bg-gray-700/50 text-yellow-400" : "bg-gray-200/50 hover:bg-gray-300/50 text-gray-700"}`}
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-all duration-150 ${isDarkMode ? "bg-gray-800/50 hover:bg-gray-700/50 text-yellow-400" : "bg-gray-200/50 hover:bg-gray-300/50 text-gray-700"}`}
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                className={`${isDarkMode ? "text-white" : "text-gray-900"} p-2 hover:bg-red-800/20 rounded-lg transition-all duration-150`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div
              className={`md:hidden ${isDarkMode ? "bg-black/40" : "bg-white/40"} backdrop-blur-md ${isDarkMode ? "border-t border-red-800/30" : "border-t border-red-200/30"} animate-slide-down`}
            >
              <div className="px-4 py-4 space-y-3">
                <a
                  href="#home"
                  className={`block ${isDarkMode ? "text-gray-300 hover:text-red-400" : "text-gray-700 hover:text-red-600"} transition-all duration-150 font-medium hover:translate-x-2 transform`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </a>
                <a
                  href="#about"
                  className={`block ${isDarkMode ? "text-gray-300 hover:text-red-400" : "text-gray-700 hover:text-red-600"} transition-all duration-150 font-medium hover:translate-x-2 transform`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </a>
                <a
                  href="#skills"
                  className={`block ${isDarkMode ? "text-gray-300 hover:text-red-400" : "text-gray-700 hover:text-red-600"} transition-all duration-150 font-medium hover:translate-x-2 transform`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Skills
                </a>
                <a
                  href="#projects"
                  className={`block ${isDarkMode ? "text-gray-300 hover:text-red-400" : "text-gray-700 hover:text-red-600"} transition-all duration-150 font-medium hover:translate-x-2 transform`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Projects
                </a>
                <a
                  href="#certifications"
                  className={`block ${isDarkMode ? "text-gray-300 hover:text-red-400" : "text-gray-700 hover:text-red-600"} transition-all duration-150 font-medium hover:translate-x-2 transform`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Certifications
                </a>
                <a
                  href="#contact"
                  className={`block ${isDarkMode ? "text-gray-300 hover:text-red-400" : "text-gray-700 hover:text-red-600"} transition-all duration-150 font-medium hover:translate-x-2 transform`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Content */}
      <div className="relative z-10 pt-16">
        {/* Hero Section */}
        <section id="home" className="container mx-auto px-4 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {" "}
              {/* Changed gap-12 to gap-8 and items-start to items-center */}
              {/* Left side - Name and Content */}
              <div
                className={`${isMobile ? "scroll-animate-essential" : "scroll-animate"} transition-all duration-1000 ${visibleElements.has("hero-content") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                id="hero-content"
              >
                <h1
                  className={`text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight ${isDarkMode ? "text-white" : "text-gray-900"} mb-8`}
                >
                  MY NAME IS
                </h1>
                <div className="text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight min-h-[120px] lg:min-h-[160px] mb-6">
                  {isTyping ? (
                    <span
                      className={`${!isMobile ? "animate-gradient-typewriter" : ""} bg-gradient-to-r from-red-600 via-red-500 to-blue-600 bg-clip-text text-transparent`}
                    >
                      {typewriterText}
                      <span className="animate-pulse text-red-400">|</span>
                    </span>
                  ) : (
                    <span
                      className={`${!isMobile ? "animate-gradient-typewriter" : ""} bg-gradient-to-r from-red-600 via-red-500 to-blue-600 bg-clip-text text-transparent`}
                    >
                      VISHAL JHA
                    </span>
                  )}
                </div>

                {/* Enhanced Tagline */}
                <div className="mb-8">
                  <p
                    className={`text-2xl md:text-3xl font-bold tracking-tight ${isDarkMode ? "text-gray-200" : "text-gray-800"} mb-2`}
                  >
                    Full Stack Developer | AI & Data Science Engineer in Training
                  </p>
                  <p className={`text-lg md:text-xl font-medium ${isDarkMode ? "text-red-400" : "text-red-600"} mb-4`}>
                    Turning data into insights & ideas into impactful applications.
                  </p>
                  <div className={`flex items-center space-x-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    <MapPin className="w-4 h-4 text-red-500" />
                    <span>New Delhi, India</span>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4 mb-8">
                  <Button
                    onClick={handleDownloadCV}
                    size="lg"
                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold px-8 py-6 rounded-lg transition-all duration-150 shadow-xl hover:shadow-red-500/30 transform hover:scale-105"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download Resume
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className={`${isDarkMode ? "border-red-500/50 text-red-400 hover:bg-red-500/20" : "border-red-500 text-red-600 hover:bg-red-50"} font-bold px-8 py-6 rounded-lg transition-all duration-150 transform hover:scale-105`}
                    onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    <Code className="w-5 h-5 mr-2" />
                    View Projects
                  </Button>
                </div>

                {/* Social Links */}
                <div className="flex items-center space-x-3">
                  <a
                    href="https://github.com/VishalJha01"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-4 ${isDarkMode ? "bg-gray-800/50 hover:bg-gray-700/50" : "bg-gray-200/50 hover:bg-gray-300/50"} backdrop-blur-sm rounded-lg transition-all duration-150 transform hover:scale-105 group ${isDarkMode ? "border border-gray-700/50 hover:border-red-500/50" : "border border-gray-300/50 hover:border-red-500/50"}`}
                    aria-label="GitHub Profile"
                  >
                    <Github
                      className={`w-6 h-6 ${isDarkMode ? "text-gray-300 group-hover:text-red-400" : "text-gray-700 group-hover:text-red-600"} transition-colors duration-150`}
                    />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/vishaljha1010"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-4 ${isDarkMode ? "bg-gray-800/50 hover:bg-gray-700/50" : "bg-gray-200/50 hover:bg-gray-300/50"} backdrop-blur-sm rounded-lg transition-all duration-150 transform hover:scale-105 group ${isDarkMode ? "border border-gray-700/50 hover:border-red-500/50" : "border border-gray-300/50 hover:border-red-500/50"}`}
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin
                      className={`w-6 h-6 ${isDarkMode ? "text-gray-300 group-hover:text-red-400" : "text-gray-700 group-hover:text-red-600"} transition-colors duration-150`}
                    />
                  </a>
                  <a
                    href="mailto:vishaljha055616@gmail.com"
                    className={`p-4 ${isDarkMode ? "bg-gray-800/50 hover:bg-gray-700/50" : "bg-gray-200/50 hover:bg-gray-300/50"} backdrop-blur-sm rounded-lg transition-all duration-150 transform hover:scale-105 group ${isDarkMode ? "border border-gray-700/50 hover:border-red-500/50" : "border border-gray-300/50 hover:border-red-500/50"}`}
                    aria-label="Email Contact"
                  >
                    <Mail
                      className={`w-6 h-6 ${isDarkMode ? "text-gray-300 group-hover:text-red-400" : "text-gray-700 group-hover:text-red-600"} transition-colors duration-150`}
                    />
                  </a>
                  <a
                    href="tel:+918851072378"
                    className={`p-4 ${isDarkMode ? "bg-gray-800/50 hover:bg-gray-700/50" : "bg-gray-200/50 hover:bg-gray-300/50"} backdrop-blur-sm rounded-lg transition-all duration-150 transform hover:scale-105 group ${isDarkMode ? "border border-gray-700/50 hover:border-red-500/50" : "border border-gray-300/50 hover:border-red-500/50"}`}
                    aria-label="Phone Contact"
                  >
                    <Phone
                      className={`w-6 h-6 ${isDarkMode ? "text-gray-300 group-hover:text-red-400" : "text-gray-700 group-hover:text-red-600"} transition-colors duration-150`}
                    />
                  </a>
                </div>
              </div>
              {/* Right side - Photo */}
              <div
                className={`${isMobile ? "scroll-animate-essential" : "scroll-animate"} flex justify-center lg:justify-end transition-all duration-1000 delay-300 ${visibleElements.has("hero-image") ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
                id="hero-image"
              >
                <div className="relative group">
                  <div
                    className={`w-80 h-80 lg:w-96 lg:h-96 overflow-hidden shadow-2xl ${isDarkMode ? "border-2 border-red-500/30 group-hover:shadow-[0_0_40px_rgba(220,38,38,0.7)]" : "border-2 border-red-500/20 group-hover:shadow-[0_0_30px_rgba(220,38,38,0.4)]"} transition-all duration-700 ${!isMobile ? "group-hover:scale-105" : ""} ${isDarkMode ? "group-hover:border-red-400/60" : "group-hover:border-red-500/40"} rounded-lg`}
                  >
                    <Image
                      src="/vishal-photo.png"
                      alt="Vishal Jha - Full Stack Developer"
                      width={400}
                      height={400}
                      className={`w-full h-full object-cover transition-all duration-700 ${!isMobile ? "group-hover:scale-110" : ""}`}
                      priority
                    />
                  </div>
                  <div
                    className={`absolute inset-0 ${isDarkMode ? "bg-gradient-to-t from-red-900/20 to-transparent" : "bg-gradient-to-t from-red-100/20 to-transparent"} opacity-0 group-hover:opacity-100 transition-opacity duration-150 rounded-lg`}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Divider */}
        <div
          className={`w-full h-px ${isDarkMode ? "bg-gradient-to-r from-transparent via-red-500/30 to-transparent" : "bg-gradient-to-r from-transparent via-red-500/20 to-transparent"} my-8`}
        />

        {/* About Section */}
        <section id="about" className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div
              className={`${isMobile ? "scroll-animate-essential" : "scroll-animate"} text-center mb-12 transition-all duration-1000 ${visibleElements.has("about-title") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              id="about-title"
            >
              <h2
                className={`text-5xl md:text-6xl font-black leading-tight tracking-tight mb-6 ${isDarkMode ? "text-red-500" : "text-red-600"}`}
              >
                ABOUT ME
              </h2>
              <p className={`text-xl ${isDarkMode ? "text-gray-400" : "text-gray-600"} max-w-2xl mx-auto`}>
                Turning data into insights & ideas into impactful applications
              </p>
            </div>
            <div className="max-w-3xl mx-auto">
              <div
                className={`${isMobile ? "scroll-animate-essential" : "scroll-animate"} transition-all duration-1000 ${visibleElements.has("about-content") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                id="about-content"
              >
                <h3 className={`text-2xl font-bold mb-6 text-center ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>
                  What I Do
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {aboutPoints.map((point, index) => (
                    <div
                      key={index}
                      className={`flex items-start space-x-3 p-4 rounded-lg ${isDarkMode ? "bg-gray-900/30" : "bg-gray-100/50"} backdrop-blur-sm transition-all duration-150 ${!isMobile ? "hover:scale-105" : ""}`}
                    >
                      <span className="text-2xl">{point.split(" ")[0]}</span>
                      <p className={`${isDarkMode ? "text-gray-300" : "text-gray-700"} leading-relaxed`}>
                        {point.substring(point.indexOf(" ") + 1)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Divider */}
        <div
          className={`w-full h-px ${isDarkMode ? "bg-gradient-to-r from-transparent via-red-500/30 to-transparent" : "bg-gradient-to-r from-transparent via-red-500/20 to-transparent"} my-8`}
        />

        {/* Skills Section */}
        <section id="skills" className="container mx-auto px-4 py-12">
          <div className="max-w-7xl mx-auto">
            <div
              className={`${isMobile ? "scroll-animate-essential" : "scroll-animate"} text-center mb-16 transition-all duration-1000 ${visibleElements.has("skills-title") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              id="skills-title"
            >
              <h2
                className={`text-5xl md:text-6xl font-black leading-tight tracking-tight mb-6 ${isDarkMode ? "text-red-500" : "text-red-600"}`}
              >
                SKILLS & TECHNOLOGIES
              </h2>
              <p className={`text-xl ${isDarkMode ? "text-gray-400" : "text-gray-600"} max-w-2xl mx-auto`}>
                Data science and development technologies I use to build intelligent solutions
              </p>
            </div>
            <div className="space-y-12">
              {skillCategories.map((category, categoryIndex) => (
                <div
                  key={category.category}
                  className={`${isMobile ? "scroll-animate-essential" : "scroll-animate"} transition-all duration-1000 ${visibleElements.has(`category-${categoryIndex}`) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                  style={{ transitionDelay: `${categoryIndex * (isMobile ? 200 : 300)}ms` }}
                  id={`category-${categoryIndex}`}
                >
                  {/* Category Header */}
                  <div className="text-center mb-8">
                    <h3
                      className={`text-2xl md:text-3xl font-bold ${isDarkMode ? "text-gray-200" : "text-gray-800"} mb-2`}
                    >
                      {category.category}
                    </h3>
                    <div
                      className={`w-24 h-1 ${isDarkMode ? "bg-red-500/50" : "bg-red-500/40"} mx-auto rounded-full`}
                    />
                  </div>
                  {/* Skills Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                    {category.skills.map((skill, skillIndex) => (
                      <div
                        key={skill.name}
                        className={`${isMobile ? "scroll-animate-essential" : "scroll-animate"} group flex items-center space-x-3 p-3 transition-all duration-1000 ${!isMobile ? "hover:transform hover:scale-105" : ""} ${isDarkMode ? "bg-gray-900/30 hover:bg-gray-800/50 border border-gray-700/30 hover:border-red-500/50" : "bg-white/30 hover:bg-white/60 border border-gray-200/30 hover:border-red-500/50"} backdrop-blur-sm rounded-lg shadow-md ${isDarkMode ? "hover:shadow-red-500/20" : "hover:shadow-red-500/10"} ${visibleElements.has(`skill-${categoryIndex}-${skillIndex}`) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                        style={{
                          transitionDelay: `${(categoryIndex * category.skills.length + skillIndex) * (isMobile ? 30 : 50)}ms`,
                        }}
                        id={`skill-${categoryIndex}-${skillIndex}`}
                      >
                        <span
                          className={`text-2xl ${!isMobile ? "group-hover:scale-110" : ""} transition-all duration-200`}
                        >
                          {skill.icon}
                        </span>
                        <span
                          className={`font-semibold text-sm ${isDarkMode ? "text-gray-200 group-hover:text-red-400" : "text-gray-800 group-hover:text-red-600"} transition-colors duration-150`}
                        >
                          {skill.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section Divider */}
        <div
          className={`w-full h-px ${isDarkMode ? "bg-gradient-to-r from-transparent via-red-500/30 to-transparent" : "bg-gradient-to-r from-transparent via-red-500/20 to-transparent"} my-8`}
        />

        {/* Projects Section */}
        <section id="projects" className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <div
              className={`${isMobile ? "scroll-animate-essential" : "scroll-animate"} text-center mb-12 transition-all duration-1000 ${visibleElements.has("projects-title") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              id="projects-title"
            >
              <h2
                className={`text-5xl md:text-6xl font-black leading-tight tracking-tight mb-6 ${isDarkMode ? "text-red-500" : "text-red-600"}`}
              >
                FEATURED PROJECTS
              </h2>
              <p className={`text-xl ${isDarkMode ? "text-gray-400" : "text-gray-600"} max-w-2xl mx-auto`}>
                AI-powered applications showcasing data science and full-stack development
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <Card
                  key={project.title}
                  className={`${isMobile ? "scroll-animate-essential" : "scroll-animate"} group ${isDarkMode ? "bg-gray-900/50 border-gray-700/50 hover:border-red-500/70" : "bg-white/50 border-gray-200/50 hover:border-red-500/50"} backdrop-blur-sm transition-all duration-1000 ${!isMobile ? "hover:transform hover:scale-105" : ""} shadow-xl ${isDarkMode ? "hover:shadow-red-500/20" : "hover:shadow-red-500/10"} rounded-lg ${isDarkMode ? "hover:bg-gray-800/50" : "hover:bg-white/70"} overflow-hidden ${visibleElements.has(`project-${index}`) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                  style={{ transitionDelay: `${index * (isMobile ? 150 : 200)}ms` }}
                  id={`project-${index}`}
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg?height=300&width=400"}
                      alt={`${project.title} - Project Screenshot`}
                      width={400}
                      height={300}
                      className={`w-full h-full object-cover transition-all duration-700 ${!isMobile ? "group-hover:scale-110" : ""}`}
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg?height=300&width=400"
                      }}
                    />
                    <div
                      className={`absolute inset-0 ${isDarkMode ? "bg-gradient-to-t from-gray-900/80 to-transparent" : "bg-gradient-to-t from-white/80 to-transparent"} opacity-60 group-hover:opacity-40 transition-opacity duration-150`}
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3
                      className={`font-bold text-xl mb-3 ${isDarkMode ? "text-gray-200 group-hover:text-red-400" : "text-gray-800 group-hover:text-red-600"} transition-colors duration-150`}
                    >
                      {project.title}
                    </h3>
                    <p
                      className={`${isDarkMode ? "text-gray-400 group-hover:text-gray-300" : "text-gray-600 group-hover:text-gray-700"} mb-4 leading-relaxed transition-colors duration-150`}
                    >
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className={`px-3 py-1 ${isDarkMode ? "bg-red-900/30 text-red-300 border border-red-700/30 hover:bg-red-800/40 hover:border-red-500/50" : "bg-red-100/50 text-red-700 border border-red-200/50 hover:bg-red-200/50 hover:border-red-400/50"} rounded-lg text-sm transition-all duration-150`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className={`flex-1 ${isDarkMode ? "border-red-500/50 text-red-400 hover:bg-red-500/20 hover:border-red-400 hover:text-red-300" : "border-red-500/50 text-red-600 hover:bg-red-50 hover:border-red-500 hover:text-red-700"} transition-all duration-150 rounded-lg ${!isMobile ? "transform hover:scale-105" : ""}`}
                        onClick={() => window.open(project.link, "_blank")}
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </Button>
                      {project.demo && ( // Only render if demo link exists
                        <Button
                          className={`flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white transition-all duration-150 rounded-lg ${!isMobile ? "transform hover:scale-105" : ""}`}
                          onClick={() => window.open(project.demo, "_blank")}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* CTA for more projects */}
            <div className="text-center mt-12">
              <Button
                variant="outline"
                size="lg"
                className={`${isDarkMode ? "border-red-500/50 text-red-400 hover:bg-red-500/20" : "border-red-500 text-red-600 hover:bg-red-50"} font-bold px-8 py-4 rounded-lg transition-all duration-150 ${!isMobile ? "transform hover:scale-105" : ""}`}
                onClick={() => window.open("https://github.com/VishalJha01", "_blank")}
              >
                <Github className="w-5 h-5 mr-2" />
                View All Projects on GitHub
              </Button>
            </div>
          </div>
        </section>

        {/* Section Divider */}
        <div
          className={`w-full h-px ${isDarkMode ? "bg-gradient-to-r from-transparent via-red-500/30 to-transparent" : "bg-gradient-to-r from-transparent via-red-500/20 to-transparent"} my-8`}
        />

        {/* Certifications Section */}
        <section id="certifications" className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <div
              className={`${isMobile ? "scroll-animate-essential" : "scroll-animate"} text-center mb-12 transition-all duration-1000 ${visibleElements.has("certifications-title") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              id="certifications-title"
            >
              <h2
                className={`text-5xl md:text-6xl font-black leading-tight tracking-tight mb-6 ${isDarkMode ? "text-red-500" : "text-red-600"}`}
              >
                CERTIFICATIONS
              </h2>
              <p className={`text-xl ${isDarkMode ? "text-gray-400" : "text-gray-600"} max-w-2xl mx-auto`}>
                Data science and development certifications showcasing expertise growth
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert, index) => (
                <Card
                  key={index}
                  className={`${isMobile ? "scroll-animate-essential" : "scroll-animate"} group ${isDarkMode ? "bg-gray-900/50 border-gray-700/50 hover:border-red-500/70" : "bg-white/50 border-gray-200/50 hover:border-red-500/50"} backdrop-blur-sm transition-all duration-1000 ${!isMobile ? "hover:transform hover:scale-105" : ""} shadow-xl ${isDarkMode ? "hover:shadow-red-500/20" : "hover:shadow-red-500/10"} rounded-lg ${isDarkMode ? "hover:bg-gray-800/50" : "hover:bg-white/70"} ${visibleElements.has(`cert-${index}`) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                  style={{ transitionDelay: `${index * (isMobile ? 100 : 150)}ms` }}
                  id={`cert-${index}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-3">
                      <Award
                        className={`w-8 h-8 text-red-500 mt-1 flex-shrink-0 ${!isMobile ? "group-hover:scale-110" : ""} transition-all duration-150`}
                      />
                      <div className="flex-1">
                        <h4
                          className={`font-bold text-lg mb-2 ${isDarkMode ? "text-gray-200 group-hover:text-red-400" : "text-gray-800 group-hover:text-red-600"} transition-colors duration-150`}
                        >
                          {cert.name}
                        </h4>
                        <p className={`${isDarkMode ? "text-red-400" : "text-red-600"} font-medium mb-2`}>
                          {cert.issuer} • {cert.date}
                        </p>
                        <p
                          className={`${isDarkMode ? "text-gray-400 group-hover:text-gray-300" : "text-gray-600 group-hover:text-gray-700"} text-sm leading-relaxed transition-colors duration-150`}
                        >
                          {cert.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Section Divider */}
        <div
          className={`w-full h-px ${isDarkMode ? "bg-gradient-to-r from-transparent via-red-500/30 to-transparent" : "bg-gradient-to-r from-transparent via-red-500/20 to-transparent"} my-8`}
        />

        {/* Contact Section */}
        <section id="contact" className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div
              className={`${isMobile ? "scroll-animate-essential" : "scroll-animate"} text-center mb-8 transition-all duration-1000 ${visibleElements.has("contact-title") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              id="contact-title"
            >
              <h2
                className={`text-5xl md:text-6xl font-black leading-tight tracking-tight mb-6 ${isDarkMode ? "text-red-500" : "text-red-600"}`}
              >
                LET'S BUILD SOMETHING TOGETHER
              </h2>
              <p className={`text-xl ${isDarkMode ? "text-gray-400" : "text-gray-600"} max-w-2xl mx-auto`}>
                Ready to discuss your next project? I'd love to hear from you.
              </p>
            </div>
            <div
              className={`${isMobile ? "scroll-animate-essential" : "scroll-animate"} grid md:grid-cols-3 gap-6 mb-8 transition-all duration-1000 ${visibleElements.has("contact-items") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              id="contact-items"
            >
              {/* Phone */}
              <div
                className={`group text-center p-6 ${isDarkMode ? "bg-gray-900/30 border border-gray-700/30 hover:border-red-500/50" : "bg-white/30 border border-gray-200/30 hover:border-red-500/50"} backdrop-blur-sm rounded-lg transition-all duration-150 ${isDarkMode ? "hover:bg-gray-800/40" : "hover:bg-white/50"}`}
              >
                <Phone
                  className={`w-8 h-8 text-red-500 mx-auto mb-3 ${!isMobile ? "group-hover:scale-110" : ""} transition-all duration-150`}
                />
                <h3
                  className={`font-bold text-lg mb-2 ${isDarkMode ? "text-gray-200 group-hover:text-red-400" : "text-gray-800 group-hover:text-red-600"} transition-colors duration-150`}
                >
                  Phone
                </h3>
                <a
                  href="tel:+918851072378"
                  className={`${isDarkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-600 hover:text-gray-800"} transition-colors duration-150`}
                >
                  +91 8851072378
                </a>
              </div>

              {/* Email */}
              <div
                className={`group text-center p-6 ${isDarkMode ? "bg-gray-900/30 border border-gray-700/30 hover:border-red-500/50" : "bg-white/30 border border-gray-200/30 hover:border-red-500/50"} backdrop-blur-sm rounded-lg transition-all duration-150 ${isDarkMode ? "hover:bg-gray-800/40" : "hover:bg-white/50"}`}
              >
                <Mail
                  className={`w-8 h-8 text-red-500 mx-auto mb-3 ${!isMobile ? "group-hover:scale-110" : ""} transition-all duration-150`}
                />
                <h3
                  className={`font-bold text-lg mb-2 ${isDarkMode ? "text-gray-200 group-hover:text-red-400" : "text-gray-800 group-hover:text-red-600"} transition-colors duration-150`}
                >
                  Email
                </h3>
                <a
                  href="mailto:vishaljha055616@gmail.com"
                  className={`${isDarkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-600 hover:text-gray-800"} transition-colors duration-150 text-sm break-all`}
                >
                  vishaljha055616@gmail.com
                </a>
              </div>

              {/* Location */}
              <div
                className={`group text-center p-6 ${isDarkMode ? "bg-gray-900/30 border border-gray-700/30 hover:border-red-500/50" : "bg-white/30 border border-gray-200/30 hover:border-red-500/50"} backdrop-blur-sm rounded-lg transition-all duration-150 ${isDarkMode ? "hover:bg-gray-800/40" : "hover:bg-white/50"}`}
              >
                <MapPin
                  className={`w-8 h-8 text-red-500 mx-auto mb-3 ${!isMobile ? "group-hover:scale-110" : ""} transition-all duration-150`}
                />
                <h3
                  className={`font-bold text-lg mb-2 ${isDarkMode ? "text-gray-200 group-hover:text-red-400" : "text-gray-800 group-hover:text-red-600"} transition-colors duration-150`}
                >
                  Location
                </h3>
                <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>New Delhi, India</p>
              </div>
            </div>

            {/* Final CTA */}
            <div className="text-center">
              <Button
                size="lg"
                className={`bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold px-12 py-6 rounded-lg transition-all duration-150 shadow-xl hover:shadow-red-500/30 ${!isMobile ? "transform hover:scale-105" : ""}`}
                onClick={() => window.open("mailto:vishaljha055616@gmail.com", "_blank")}
              >
                <Mail className="w-5 h-5 mr-2" />
                Start a Conversation
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer
          className={`${isMobile ? "scroll-animate-essential" : "scroll-animate"} container mx-auto px-4 py-12 text-center transition-all duration-1000 ${visibleElements.has("footer") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          id="footer"
        >
          <div className={`${isDarkMode ? "border-t border-gray-800/50" : "border-t border-gray-200/50"} pt-8`}>
            <div className="flex justify-center space-x-6 mb-6">
              <a
                href="https://github.com/VishalJha01"
                target="_blank"
                rel="noopener noreferrer"
                className={`${isDarkMode ? "text-gray-400 hover:text-red-400" : "text-gray-600 hover:text-red-600"} transition-colors duration-150`}
                aria-label="GitHub"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/vishaljha1010"
                target="_blank"
                rel="noopener noreferrer"
                className={`${isDarkMode ? "text-gray-400 hover:text-red-400" : "text-gray-600 hover:text-red-600"} transition-colors duration-150`}
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="mailto:vishaljha055616@gmail.com"
                className={`${isDarkMode ? "text-gray-400 hover:text-red-400" : "text-gray-600 hover:text-red-600"} transition-colors duration-150`}
                aria-label="Email"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
            <p
              className={`${isDarkMode ? "text-gray-500 hover:text-gray-400" : "text-gray-600 hover:text-gray-700"} transition-colors duration-150`}
            >
              © 2025 Vishal Jha. Built with curiosity and code.
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
