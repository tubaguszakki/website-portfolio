"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import { Download } from "lucide-react";

// Type untuk certificate/project
interface Item {
  id: number;
  title: string;
  image: string;
  link: string;
}

type SlideType = "certificate" | "project";

const Portfolio: React.FC = () => {
  const [typedText, setTypedText] = useState("");
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [certificateSlide, setCertificateSlide] = useState(0);
  const [projectSlide, setProjectSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const texts: string[] = ["Hello, I'm Zakki. Undergraduate student computer science and statistics.", "Welcome to my website!"];

  // Mock data
  const certificates: Item[] = [
    {
      id: 1,
      title: "Microsoft Applied Skills: Create an intelligent document processing solution with Azure AI Document Intelligence - May 2025",
      image: "/images/microsoft1.jpg",
      link: "https://learn.microsoft.com/api/credentials/share/en-us/TubagusZakki-5589/9BB230D1D2B8E951?sharingId=13228AD497C7C532",
    },
    {
      id: 2,
      title: "Microsoft Applied Skills: Build a natural language processing solution with Azure AI Language - May 2025 ",
      image: "/images/microsoft2.jpg",
      link: "https://learn.microsoft.com/api/credentials/share/en-us/TubagusZakki-5589/F00C3E979AC95951?sharingId=13228AD497C7C532",
    },
    {
      id: 3,
      title: "AWS Academy Graduate: AWS Academy Cloud Foundations - August 2024",
      image: "/images/aws.jpg",
      link: "https://www.credly.com/go/bkMm608d",
    },
  ];

  const projects: Item[] = [
    {
      id: 1,
      title: "Most Favourite Poster – International Conference on Computer Science and Computational Intelligence 2025",
      image: "/images/poster.jpg",
      link: "https://drive.google.com/file/d/1EoAHwD_wiCXRwWbiZLqhdQFmRq20uB9k/view?usp=sharing",
    },
    {
      id: 2,
      title: "Createx - A digital platform based on a Full Self-Service ecosystem that enables users to independently book and access photo/video studios, live streaming rooms, editing cafés, and event halls.",
      image: "/images/createx.jpg",
      link: "https://resourceful-fulfillment-production.up.railway.app",
    },
    { id: 3, title: "Paper - Impact of Digital Consumption on Focus and Attention Span", image: "/images/paper1.jpg", link: "https://drive.google.com/file/d/11g88jnO_akY_T1Iq_vUvWCgGpNzfaHdx/view?usp=sharing" },
    { id: 4, title: "Paper - Forecasting Nuclear Outage Using Time Series Models", image: "/images/paper2.jpg", link: "https://drive.google.com/file/d/1qlFeqqr8P1tB38jpelq1qq6JEDePvm7v/view?usp=sharing" },
    { id: 5, title: "Personal Website", image: "/images/website-portfolio.jpg", link: "#" },
  ];

  // Typing animation
  useEffect(() => {
    if (currentTextIndex < texts.length) {
      const currentFullText = texts[currentTextIndex];

      if (typedText.length < currentFullText.length) {
        const timeout = setTimeout(() => {
          setTypedText(currentFullText.slice(0, typedText.length + 1));
        }, 80);
        return () => clearTimeout(timeout);
      } else {
        if (currentTextIndex === texts.length - 1) {
          setIsTypingComplete(true);
        } else {
          const timeout = setTimeout(() => {
            setCurrentTextIndex((prev) => prev + 1);
            setTypedText("");
          }, 1000);
          return () => clearTimeout(timeout);
        }
      }
    }
  }, [typedText, currentTextIndex, texts]);

  // Auto-slide
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCertificateSlide((prev) => (prev + 1) % certificates.length);
        setProjectSlide((prev) => (prev + 1) % projects.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [certificates.length, projects.length, isHovered]);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  const nextSlide = (type: SlideType) => {
    if (type === "certificate") {
      setCertificateSlide((prev) => (prev + 1) % certificates.length);
    } else {
      setProjectSlide((prev) => (prev + 1) % projects.length);
    }
  };

  const prevSlide = (type: SlideType) => {
    if (type === "certificate") {
      setCertificateSlide((prev) => (prev - 1 + certificates.length) % certificates.length);
    } else {
      setProjectSlide((prev) => (prev - 1 + projects.length) % projects.length);
    }
  };

  // Carousel Component
  const Carousel: React.FC<{
    items: Item[];
    currentSlide: number;
    type: SlideType;
  }> = ({ items, currentSlide, type }) => (
    <div className="relative w-full max-w-2xl mx-auto" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="overflow-hidden rounded-xl shadow-lg bg-white">
        <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {items.map((item) => (
            <div key={item.id} className="w-full flex-shrink-0">
              <div className="cursor-pointer group" onClick={() => window.open(item.link, "_blank")}>
                <div className="relative w-full h-full min-h-[24rem]">
                  <Image src={item.image} alt={item.title} fill className="w-full group-hover:scale-105 transition-transform duration-300 rounded-t-xl" />
                  <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <ExternalLink className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={24} />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-slate-700">{item.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <button onClick={() => prevSlide(type)} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md transition-all duration-300">
        <ChevronLeft className="text-slate-600" size={20} />
      </button>
      <button onClick={() => nextSlide(type)} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md transition-all duration-300">
        <ChevronRight className="text-slate-600" size={20} />
      </button>

      {/* Dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => (type === "certificate" ? setCertificateSlide(index) : setProjectSlide(index))}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-sky-500" : "bg-sky-200"}`}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white bg-opacity-90 backdrop-blur-sm shadow-sm z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-center space-x-8 md:space-x-12">
            {["About Me", "Experience", "Certificate", "Project"].map((item) => (
              <button key={item} onClick={() => scrollToSection(item.toLowerCase().replace(" ", "-"))} className="text-slate-600 hover:text-sky-600 font-medium transition-all duration-300 hover:scale-105 relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Welcome */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6">
            {currentTextIndex === 0 ? (
              <span>
                {typedText}
                {!isTypingComplete && <span className="animate-pulse">|</span>}
              </span>
            ) : (
              <>
                {texts[0]}
                <br />
                <span className="text-sky-600">
                  {typedText}
                  {!isTypingComplete && <span className="animate-pulse">|</span>}
                </span>
              </>
            )}
          </h1>
        </div>
      </section>

      {/* About Me */}
      <section id="about-me" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 mb-12">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img src="/images/zakki-photo.jpg" alt="Zakki" className="rounded-2xl shadow-xl w-full max-w-md mx-auto" />
            </div>
            <div className="space-y-6">
              <p className="text-lg text-slate-600 leading-relaxed">
                I am a passionate undergraduate student pursuing Computer Science and Statistics. With a strong foundation in both technical and analytical skills, I enjoy solving complex problems and creating innovative solutions.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                My journey in technology began with curiosity about how things work, and has evolved into a deep appreciation for the intersection of data, algorithms, and real-world applications. I'm always eager to learn new technologies
                and contribute to meaningful projects.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                When I'm not coding or analyzing data, I enjoy sharing knowledge through teaching and mentoring, which has become an integral part of my personal and professional development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="py-20 px-6 bg-white bg-opacity-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 mb-12">Experience</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Education Staff</h3>
                <h4 className="text-xl text-sky-600 font-semibold mb-2">Teach For Indonesia Student Community</h4>
                <h5 className="text-lg text-slate-600 font-medium mb-2">Bina Nusantara University</h5>
                <p className="text-slate-500 mb-4">Feb 2024 - Mar 2025</p>

                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-sky-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Designed and delivered interactive English lessons.
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-sky-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Developed age-appropriate learning materials.
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-sky-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Implemented engaging teaching strategies.
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <img src="/images/teaching.jpg" alt="Teaching" className="rounded-2xl shadow-xl w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Certificate */}
      <section id="certificate" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 mb-12">Certificate of Completed Course</h2>
          <Carousel items={certificates} currentSlide={certificateSlide} type="certificate" />
        </div>
      </section>

      {/* Project */}
      <section id="project" className="py-20 px-6 bg-white bg-opacity-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 mb-12">Project</h2>
          <Carousel items={projects} currentSlide={projectSlide} type="project" />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-slate-800 text-white">
        <div className="container mx-auto max-w-6xl text-center">
          <p className="text-slate-300">
            <a href="/files/CV_Tubagus_Zakki.pdf" download className="relative inline-flex items-center gap-2 text-slate-300 transition-all duration-300 hover:text-white hover:scale-105 group">
              <Download size={18} className="transition-transform duration-300 group-hover:-translate-y-1" />
              <span className="relative z-10">Download CV</span>
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
