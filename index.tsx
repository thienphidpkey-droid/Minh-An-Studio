import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Camera, Film, Award, MonitorPlay, Users, Aperture,
  Menu, X, ChevronDown, ArrowRight, MapPin, Phone, Mail,
  Facebook, Instagram, Calendar, Globe, CheckCircle,
  MessageCircle, Sparkles, Send, Loader2, Heart, ImageIcon, ArrowLeft
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// Declare process for environment variables
declare const process: any;

// --- Types ---
interface ServiceItem {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
}

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  image: string;
  category: string;
  views: number;
  gallery: string[];
  client: string;
  location: string;
}

// --- Data ---
const PROJECTS: BlogPost[] = [
  {
    id: 1,
    title: "Lễ Cưới Cổ Tích Tại Đà Lạt",
    excerpt: "Một đám cưới lãng mạn giữa rừng thông với concept 'Enchanted Forest'.",
    content: `Đà Lạt luôn là điểm đến lý tưởng cho những cặp đôi yêu thích sự lãng mạn...`,
    date: "15/10/2023",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80",
    category: "Wedding",
    views: 1250,
    gallery: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1511285560982-1927bb560db5?auto=format&fit=crop&q=80"
    ],
    client: "Minh & Lan",
    location: "Dalat Palace"
  },
  {
    id: 2,
    title: "Sự Kiện Ra Mắt Tech Summit 2024",
    excerpt: "Ghi lại khoảnh khắc bùng nổ của sự kiện công nghệ lớn nhất năm.",
    content: `Tech Summit 2024 quy tụ hơn 500 chuyên gia công nghệ hàng đầu...`,
    date: "02/11/2023",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80",
    category: "Event",
    views: 980,
    gallery: [
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80"
    ],
    client: "TechCorp Vietnam",
    location: "GEM Center"
  },
  {
    id: 3,
    title: "Lookbook Thời Trang Thu Đông",
    excerpt: "Bộ ảnh lookbook đầy cảm xúc cho bộ sưu tập mới của local brand.",
    content: `Concept chụp ảnh lần này tập trung vào sự hoài cổ và ấm áp...`,
    date: "20/11/2023",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80",
    category: "Fashion",
    views: 1500,
    gallery: [
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80"
    ],
    client: "The Muse",
    location: "Studio A"
  }
];

// --- Hooks ---
function useOnScreen(ref: React.RefObject<HTMLElement>, rootMargin = "0px") {
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { rootMargin }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, rootMargin]);
  return isIntersecting;
}

// --- Components ---

const AbstractBackground = () => (
  <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
    <div className="absolute top-0 left-0 w-full h-full bg-[#0a0a0a]"></div>
    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 rounded-full blur-[120px] animate-pulse"></div>
    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-900/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>
    <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] bg-blue-900/10 rounded-full blur-[100px] animate-pulse delay-2000"></div>
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
  </div>
);

const GLASS_CARD = "bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl";
const GLASS_NAV = "bg-black/80 backdrop-blur-md border-b border-white/10";
const GLASS_INPUT = "bg-white/5 border border-white/10 focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/50 placeholder-gray-500";

const Navigation = ({ onViewChange }: { onViewChange: (view: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Trang Chủ', href: '#' },
    { name: 'Về Chúng Tôi', href: '#about' },
    { name: 'Dịch Vụ', href: '#services' },
    { name: 'Quy Trình', href: '#process' },
    { name: 'Dự Án', href: '#portfolio' },
    { name: 'Liên Hệ', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    if (href === '#') {
      onViewChange('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onViewChange('home');
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? GLASS_NAV : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div
            className="flex items-center gap-2 text-2xl font-bold tracking-tighter text-white cursor-pointer"
            onClick={() => { onViewChange('home'); window.scrollTo(0, 0); }}
          >
            <Aperture className="text-cyan-400 animate-spin-slow" size={32} />
            <span>MINH AN<span className="text-purple-500">.</span></span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors uppercase tracking-wider relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all group-hover:w-full"></span>
              </a>
            ))}
            <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-sm font-bold rounded-full hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all transform hover:-translate-y-0.5">
              Book Now
            </button>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {isOpen && (
          <div className={`absolute top-full left-0 w-full ${GLASS_NAV} md:hidden flex flex-col items-center py-8 space-y-6 animate-fadeIn z-50 border-t border-white/10`}>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-lg font-medium text-gray-200 hover:text-cyan-400"
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

const Hero = ({ onViewChange }: { onViewChange: (view: string) => void }) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let rafId: number;
    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        setOffset(window.pageYOffset);
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <header className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1511285560982-1927bb560db5?auto=format&fit=crop&q=80"
          alt="Wedding photography background"
          className="w-full h-[120%] object-cover opacity-50 absolute -top-[10%] left-0 will-change-transform filter saturate-50"
          style={{ transform: `translateY(${offset * 0.5}px)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black"></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-16">
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-900/10 backdrop-blur-md mb-8 animate-fadeInUp shadow-[0_0_20px_rgba(34,211,238,0.2)]`}>
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#22d3ee]"></span>
          <span className="text-cyan-300 text-xs font-bold tracking-widest uppercase">Booking 2024-2025</span>
        </div>

        <h1 className="font-bold tracking-tight text-5xl md:text-7xl lg:text-8xl text-white leading-tight mb-8 animate-fadeInUp delay-100 drop-shadow-2xl">
          Visual <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">Storyteller</span>
        </h1>
        <p className="text-gray-200 text-lg md:text-xl font-light mb-10 max-w-2xl mx-auto animate-fadeInUp delay-200 drop-shadow-md">
          Nơi cảm xúc thăng hoa. Chúng tôi ghi lại những khoảnh khắc chân thực nhất với phong cách điện ảnh sang trọng và tinh tế.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center animate-fadeInUp delay-300">
          <button onClick={() => onViewChange('blog')} className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 text-white font-bold uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(147,51,234,0.4)] hover:shadow-[0_0_40px_rgba(147,51,234,0.6)] rounded-sm border border-purple-500/50">
            Xem Dự Án
          </button>
          <a href="#contact" className={`px-8 py-4 ${GLASS_CARD} text-white font-bold uppercase tracking-widest transition-all rounded-sm hover:bg-white/10 hover:border-cyan-400/50 block`}>
            Tư Vấn Ngay
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-gray-500">
        <ChevronDown size={32} />
      </div>
    </header>
  );
};

const AboutSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref);

  return (
    <section id="about" className="py-24 relative overflow-hidden scroll-mt-28">
      <div className="container mx-auto px-6 relative z-10">
        <div ref={ref} className={`flex flex-col md:flex-row items-center gap-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

          <div className="md:w-1/2 relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-cyan-400 rounded-lg blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
            <div className={`relative rounded-lg p-2 ${GLASS_CARD}`}>
              <img
                src="https://i.postimg.cc/8zXr2hT4/Dang-nho-1024x493.jpg"
                alt="Minh An Photographer"
                className="w-full object-cover aspect-video rounded shadow-2xl"
              />
            </div>

            <div className={`absolute -bottom-6 -right-6 w-48 ${GLASS_CARD} p-6 rounded-lg hidden md:block`}>
              <div className="flex items-center gap-2 mb-2">
                <Award className="text-purple-400" size={20} />
                <span className="font-bold text-white">5+ Years</span>
              </div>
              <p className="text-xs text-gray-300">Kinh nghiệm thực chiến trong lĩnh vực sự kiện & cưới hỏi cao cấp.</p>
            </div>
          </div>

          <div className="md:w-1/2">
            <h2 className="text-cyan-400 uppercase tracking-widest text-sm font-bold mb-4 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">Về Minh An Studio</h2>
            <h3 className="font-bold tracking-tight text-4xl md:text-5xl text-white mb-6 leading-tight">
              Sáng Tạo Từ <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-200">Đam Mê Bất Tận</span>
            </h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              Tôi là Minh An, một người kể chuyện bằng hình ảnh. Với tôi, mỗi bức ảnh không chỉ là sự ghi lại khoảnh khắc, mà là việc nắm bắt cảm xúc, ánh sáng và tâm hồn của sự kiện.
            </p>
            <p className="text-gray-300 leading-relaxed mb-8">
              Phong cách của tôi hướng tới sự tự nhiên, tinh tế nhưng không kém phần sang trọng. Dù là một đám cưới lãng mạn hay một sự kiện doanh nghiệp trang trọng, tôi luôn tìm kiếm những góc máy độc đáo nhất.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg text-purple-400 ${GLASS_CARD}`}><CheckCircle size={20} /></div>
                <div>
                  <h4 className="text-white font-bold mb-1">Chuyên Nghiệp</h4>
                  <p className="text-sm text-gray-400">Thiết bị hiện đại, quy trình chuẩn.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg text-cyan-400 ${GLASS_CARD}`}><Heart size={20} /></div>
                <div>
                  <h4 className="text-white font-bold mb-1">Tận Tâm</h4>
                  <p className="text-sm text-gray-400">Lắng nghe và thấu hiểu khách hàng.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ServicesSection = () => {
  const services: ServiceItem[] = [
    {
      id: 1,
      title: "Chụp Ảnh Sự Kiện",
      description: "Ghi lại những khoảnh khắc quan trọng của doanh nghiệp, hội thảo, khai trương với phong cách chuyên nghiệp.",
      icon: <Camera size={24} />,
      image: "https://i.postimg.cc/SK7bXGJN/professional-equipment-camera-tripod-stand-field-front-prepared-table-evening-time-146671-14420.avif"
    },
    {
      id: 2,
      title: "Quay Phim Highlight",
      description: "Video recap sự kiện ngắn gọn, ấn tượng, bắt trọn cảm xúc và không khí buổi tiệc.",
      icon: <Film size={24} />,
      image: "https://i.postimg.cc/DZPfTTqw/kinh-nghiem-chup-anh-su-kien.jpg"
    },
    {
      id: 3,
      title: "Phóng Sự Cưới",
      description: "Kể câu chuyện tình yêu của bạn qua lăng kính điện ảnh, tự nhiên và đầy cảm xúc.",
      icon: <Award size={24} />,
      image: "https://i.postimg.cc/mkK5pctX/109983896-l-normal-none-1-scaled-1.jpg"
    },
    {
      id: 4,
      title: "Livestream",
      description: "Dịch vụ livestream đa nền tảng với thiết bị chuyên dụng, đảm bảo tín hiệu ổn định.",
      icon: <MonitorPlay size={24} />,
      image: "https://i.postimg.cc/BZd3VtWH/livestream-ban-hang-la-gi.jpg"
    },
    {
      id: 5,
      title: "Chụp Profile/Fashion",
      description: "Xây dựng hình ảnh cá nhân thương hiệu hoặc lookbook thời trang đẳng cấp.",
      icon: <Users size={24} />,
      image: "https://i.postimg.cc/8cy6TWhr/a985a4cab06973457fb0949896d8721f.jpg"
    },
    {
      id: 6,
      title: "Flycam/Drone",
      description: "Góc nhìn từ trên cao độc đáo, bao quát toàn cảnh không gian sự kiện hoành tráng.",
      icon: <Aperture size={24} />,
      image: "https://i.postimg.cc/fRYRKmJ0/165de4976ecf84b9ebf0090db461f2ff.jpg"
    }
  ];

  return (
    <section id="services" className="py-24 scroll-mt-28">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-cyan-400 uppercase tracking-widest text-sm font-bold mb-4 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">Dịch Vụ Cung Cấp</h2>
          <h3 className="font-bold tracking-tight text-4xl text-white">Giải Pháp Hình Ảnh Toàn Diện</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className={`${GLASS_CARD} rounded-xl overflow-hidden hover:border-purple-500/50 transition-all group hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(147,51,234,0.15)] flex flex-col`}>
              {/* Image Header */}
              <div className="h-48 overflow-hidden relative">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500"></div>
                <div className={`absolute bottom-4 left-4 p-3 ${GLASS_CARD} rounded-lg text-cyan-400`}>
                  {service.icon}
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex-1 flex flex-col">
                <h4 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">{service.title}</h4>
                <p className="text-gray-300 text-sm leading-relaxed flex-1">{service.description}</p>
                <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider group-hover:text-white transition-colors">Xem Chi Tiết</span>
                  <ArrowRight size={16} className="text-cyan-500 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProcessSection = () => {
  const steps = [
    {
      id: 1,
      title: "Tư Vấn & Concept",
      description: "Lắng nghe câu chuyện, thấu hiểu mong muốn và lên ý tưởng kịch bản chi tiết phù hợp với cá tính của bạn.",
      icon: <MessageCircle className="w-6 h-6" />
    },
    {
      id: 2,
      title: "Chuẩn Bị Tiền Kỳ",
      description: "Khảo sát địa điểm, setup ánh sáng, thiết bị và nhân sự. Mọi thứ được chuẩn bị chỉn chu nhất.",
      icon: <CheckCircle className="w-6 h-6" />
    },
    {
      id: 3,
      title: "Thực Hiện (Shooting)",
      description: "Đội ngũ chuyên nghiệp ghi lại mọi khoảnh khắc đắt giá với sự tập trung cao độ và thiết bị hiện đại.",
      icon: <Camera className="w-6 h-6" />
    },
    {
      id: 4,
      title: "Hậu Kỳ (Editing)",
      description: "Chỉnh sửa màu sắc, cắt dựng video với tư duy nghệ thuật, biến những source quay thô thành tác phẩm.",
      icon: <MonitorPlay className="w-6 h-6" />
    },
    {
      id: 5,
      title: "Bàn Giao Sản Phẩm",
      description: "Gửi sản phẩm hoàn thiện chất lượng cao. Hỗ trợ chỉnh sửa feedback để đạt sự hài lòng tuyệt đối.",
      icon: <Sparkles className="w-6 h-6" />
    }
  ];

  return (
    <section id="process" className="py-24 relative overflow-hidden scroll-mt-28">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-cyan-400 uppercase tracking-widest text-sm font-bold mb-4 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">Quy Trình Làm Việc</h2>
          <h3 className="font-bold tracking-tight text-4xl text-white">Hành Trình Sáng Tạo</h3>
        </div>

        <div className="max-w-3xl mx-auto relative">
          {/* Vertical Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-600 via-cyan-400 to-purple-600 opacity-30"></div>

          <div className="space-y-12">
            {steps.map((step) => (
              <div key={step.id} className="relative flex items-start gap-8 group">
                {/* Icon Node */}
                <div className="relative z-10 flex-shrink-0 w-16 h-16 flex items-center justify-center bg-black border border-cyan-500/30 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.2)] group-hover:border-cyan-400 group-hover:scale-110 transition-all duration-300">
                  <div className="text-cyan-400 group-hover:text-white transition-colors">
                    {step.icon}
                  </div>
                </div>

                {/* Content */}
                <div className={`${GLASS_CARD} p-6 rounded-xl flex-1 hover:border-cyan-400/30 transition-all group-hover:-translate-y-1`}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-purple-400 font-bold text-lg">0{step.id}.</span>
                    <h4 className="text-xl font-bold text-white">{step.title}</h4>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ProjectBlogSection = ({ onViewChange, onSelectProject }: { onViewChange: (view: string) => void, onSelectProject: (project: BlogPost) => void }) => {
  const teaserProjects = PROJECTS.slice(0, 6);

  return (
    <section id="portfolio" className="py-24 scroll-mt-28">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-cyan-400 uppercase tracking-widest text-sm font-bold mb-4 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">Nhật Ký Dự Án</h2>
            <h3 className="font-bold tracking-tight text-4xl text-white">Câu Chuyện Đằng Sau Ống Kính</h3>
          </div>
          <button
            onClick={() => onViewChange('blog')}
            className="hidden md:flex items-center gap-2 text-purple-400 hover:text-cyan-400 transition-colors mt-4 md:mt-0 group font-medium"
          >
            Xem tất cả dự án <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teaserProjects.map((post) => (
            <article key={post.id} className={`${GLASS_CARD} rounded-xl overflow-hidden hover:border-purple-500/50 transition-all group hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(147,51,234,0.15)]`}>
              <div
                className="relative h-64 overflow-hidden cursor-pointer"
                onClick={() => onSelectProject(post)}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent z-10 transition-colors"></div>
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className={`absolute top-4 left-4 z-20 ${GLASS_CARD} px-3 py-1 rounded-full`}>
                  <span className="text-cyan-400 text-xs font-bold uppercase tracking-wider">{post.category}</span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Globe size={14} />
                    <span>{post.views} views</span>
                  </div>
                </div>

                <h4 className="text-xl font-bold text-white mb-3 leading-snug group-hover:text-purple-400 transition-colors">
                  <button onClick={() => onSelectProject(post)} className="text-left">{post.title}</button>
                </h4>

                <p className="text-gray-300 text-sm leading-relaxed line-clamp-3 mb-6">
                  {post.excerpt}
                </p>

                <button onClick={() => onSelectProject(post)} className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-cyan-400 transition-colors uppercase tracking-wider">
                  Đọc Chi Tiết <ArrowRight size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <button
            onClick={() => onViewChange('blog')}
            className={`px-8 py-3 ${GLASS_CARD} text-white rounded-full hover:bg-white hover:text-black transition-all uppercase text-sm font-bold tracking-widest`}
          >
            Xem Tất Cả Dự Án
          </button>
        </div>
      </div>
    </section>
  );
};

const BlogPage = ({ onBack, onSelectProject }: { onBack: () => void, onSelectProject: (p: BlogPost) => void }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-12 animate-fadeIn">
      <div className="container mx-auto px-6">
        <button onClick={onBack} className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft size={20} /> Quay lại trang chủ
        </button>

        <div className="text-center mb-16">
          <h1 className="font-bold tracking-tight text-5xl text-white mb-6">Thư Viện Dự Án</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Tuyển tập những dự án tâm đắc nhất của Minh An Studio. Mỗi bộ ảnh là một câu chuyện, một cảm xúc riêng biệt được chúng tôi trân trọng lưu giữ.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((post) => (
            <article key={post.id} className={`${GLASS_CARD} rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all group hover:-translate-y-2`}>
              <div
                className="relative h-64 overflow-hidden cursor-pointer"
                onClick={() => onSelectProject(post)}
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2 block">{post.category}</span>
                  <h3 className="text-lg font-bold text-white leading-tight">{post.title}</h3>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProjectDetailPage = ({ project, onBack }: { project: BlogPost, onBack: () => void }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project]);

  return (
    <div className="min-h-screen animate-fadeIn relative">
      <div className="h-[60vh] w-full relative">
        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        <div className="absolute top-24 left-6 z-20">
          <button onClick={onBack} className={`${GLASS_CARD} hover:bg-white hover:text-black text-white px-4 py-2 rounded-full flex items-center gap-2 transition-all`}>
            <ArrowLeft size={18} /> Quay lại
          </button>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
          <div className="container mx-auto">
            <span className="inline-block px-3 py-1 bg-cyan-500 text-white text-xs font-bold uppercase tracking-wider rounded mb-4 shadow-lg shadow-cyan-500/20">
              {project.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4 leading-tight max-w-4xl drop-shadow-2xl">
              {project.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <div className={`${GLASS_CARD} rounded-xl p-8 sticky top-24`}>
              <h3 className="text-white font-bold text-xl mb-6 border-b border-white/10 pb-4">Thông Tin Dự Án</h3>
              <div className="space-y-6">
                <div>
                  <label className="text-gray-400 text-xs uppercase font-bold block mb-1">Khách Hàng</label>
                  <p className="text-white font-medium">{project.client}</p>
                </div>
                <div>
                  <label className="text-gray-400 text-xs uppercase font-bold block mb-1">Ngày Thực Hiện</label>
                  <p className="text-white font-medium">{project.date}</p>
                </div>
                <div>
                  <label className="text-gray-400 text-xs uppercase font-bold block mb-1">Địa Điểm</label>
                  <p className="text-white font-medium flex items-center gap-2">
                    <MapPin size={16} className="text-cyan-400" /> {project.location}
                  </p>
                </div>
                <div>
                  <label className="text-gray-400 text-xs uppercase font-bold block mb-1">Dịch Vụ</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-2 py-1 bg-purple-900/30 text-purple-400 text-xs rounded border border-purple-500/30">Photography</span>
                    <span className="px-2 py-1 bg-purple-900/30 text-purple-400 text-xs rounded border border-purple-500/30">Videography</span>
                  </div>
                </div>
              </div>
              <button className="w-full mt-8 py-3 bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold uppercase text-sm rounded-lg hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all">
                Đặt Lịch Tương Tự
              </button>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="prose prose-invert prose-lg max-w-none mb-12">
              <p className="lead text-xl text-gray-200 font-light italic border-l-4 border-cyan-400 pl-6 py-2 bg-cyan-900/10 mb-8 rounded-r-lg">
                {project.excerpt}
              </p>
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                {project.content}
              </p>
            </div>

            <h3 className="text-2xl text-white font-bold mb-6 flex items-center gap-2">
              <ImageIcon className="text-cyan-400" /> Thư Viện Hình Ảnh
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.gallery.map((img, idx) => (
                <div key={idx} className="group overflow-hidden rounded-lg shadow-lg relative aspect-[4/3] border border-white/5">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all z-10"></div>
                  <img
                    src={img}
                    alt={`Gallery ${idx}`}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 relative scroll-mt-28">
      <div className="container mx-auto px-6 relative z-10">
        <div className={`${GLASS_CARD} rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row`}>

          <div className="md:w-5/12 bg-gradient-to-br from-purple-900/80 to-black/80 p-12 text-white flex flex-col justify-between relative overflow-hidden backdrop-blur-md">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>

            <div>
              <h3 className="font-bold text-3xl mb-6">Liên Hệ Ngay</h3>
              <p className="text-purple-200 mb-8 leading-relaxed">
                Hãy để chúng tôi kể câu chuyện của bạn. Đừng ngần ngại chia sẻ ý tưởng, chúng tôi sẽ biến nó thành hiện thực.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Phone className="text-cyan-400 mt-1" />
                  <div>
                    <h5 className="font-bold">Hotline</h5>
                    <p className="text-purple-200">+84 909 000 111</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="text-cyan-400 mt-1" />
                  <div>
                    <h5 className="font-bold">Email</h5>
                    <p className="text-purple-200">contact@minhanstudio.vn</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="text-cyan-400 mt-1" />
                  <div>
                    <h5 className="font-bold">Studio</h5>
                    <p className="text-purple-200">123 Creative Street, District 1, HCMC</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-cyan-500 hover:text-white transition-all">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-cyan-500 hover:text-white transition-all">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div className="md:w-7/12 p-12 bg-transparent">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Họ & Tên</label>
                  <input type="text" className={`w-full ${GLASS_INPUT} rounded-lg px-4 py-3 text-white focus:outline-none transition-colors`} placeholder="Nguyễn Văn A" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Số Điện Thoại</label>
                  <input type="tel" className={`w-full ${GLASS_INPUT} rounded-lg px-4 py-3 text-white focus:outline-none transition-colors`} placeholder="0909 xxx xxx" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Dịch Vụ Quan Tâm</label>
                <select className={`w-full ${GLASS_INPUT} rounded-lg px-4 py-3 text-white focus:outline-none transition-colors`}>
                  <option className="bg-dark-900">Chụp Ảnh Sự Kiện</option>
                  <option className="bg-dark-900">Quay Phim Cưới</option>
                  <option className="bg-dark-900">Livestream</option>
                  <option className="bg-dark-900">Khác</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Lời Nhắn</label>
                <textarea rows={4} className={`w-full ${GLASS_INPUT} rounded-lg px-4 py-3 text-white focus:outline-none transition-colors`} placeholder="Chia sẻ thêm về nhu cầu của bạn..."></textarea>
              </div>

              <button type="button" className="w-full py-4 bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold uppercase tracking-widest rounded-lg hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-all transform hover:-translate-y-1">
                Gửi Yêu Cầu
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="relative border-t border-white/5 py-12 bg-black/40 backdrop-blur-lg">
      <div className="container mx-auto px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Aperture className="text-purple-500" />
          <span className="text-2xl font-bold tracking-tight text-white tracking-wider">MINH AN<span className="text-cyan-400">.</span></span>
        </div>
        <p className="text-gray-500 text-sm mb-8">© 2024 Minh An Studio. All rights reserved.</p>
        <div className="flex justify-center gap-6 text-sm text-gray-400">
          <a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

const AIConsultant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([
    { role: 'model', text: 'Chào bạn! Mình là trợ lý AI của Minh An Studio. Bạn cần tư vấn về gói chụp sự kiện hay quay phóng sự cưới?' }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput("");
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

      const prompt = `
                Bạn là trợ lý ảo chuyên nghiệp của Minh An Studio.
                Tính cách: Thân thiện, tinh tế, sang trọng.
                Câu hỏi của khách: "${userMsg}"
                Hãy trả lời ngắn gọn (dưới 100 từ).
                `;

      const result = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt
      });

      const text = result.text;

      setMessages(prev => [...prev, { role: 'model', text: text || "Xin lỗi, tôi không thể trả lời ngay lúc này." }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: 'Xin lỗi, hiện tại mình đang bận. Bạn vui lòng liên hệ hotline nhé!' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all hover:scale-110 ${isOpen ? 'bg-black text-white border border-gray-700' : 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white'}`}
      >
        {isOpen ? <X /> : <MessageCircle />}
      </button>

      {isOpen && (
        <div className={`fixed bottom-24 right-6 z-50 w-80 md:w-96 ${GLASS_CARD} rounded-2xl flex flex-col overflow-hidden animate-fadeInUp border-opacity-20`}>
          <div className="p-4 bg-black/40 border-b border-white/10 flex justify-between items-center backdrop-blur-md">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="font-bold text-white text-sm">Minh An AI Support</span>
            </div>
            <Sparkles size={16} className="text-cyan-400" />
          </div>

          <div className="h-80 overflow-y-auto p-4 space-y-4 bg-transparent">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm backdrop-blur-sm ${msg.role === 'user' ? 'bg-purple-600/80 text-white rounded-br-none border border-purple-500/50' : 'bg-white/10 text-gray-200 rounded-bl-none border border-white/10'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/10 p-3 rounded-2xl rounded-bl-none border border-white/10">
                  <Loader2 className="animate-spin w-4 h-4 text-cyan-400" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 bg-black/40 border-t border-white/10 flex gap-2 backdrop-blur-md">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Nhập câu hỏi..."
              className={`flex-1 ${GLASS_INPUT} rounded-full px-4 py-2 text-sm text-white focus:outline-none`}
            />
            <button
              onClick={handleSend}
              className="p-2 bg-cyan-500/80 hover:bg-cyan-400 text-white rounded-full transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const App = () => {
  const [view, setView] = useState('home');
  const [selectedProject, setSelectedProject] = useState<BlogPost | null>(null);

  const handleSelectProject = (project: BlogPost) => {
    setSelectedProject(project);
    setView('project');
  };

  const handleBack = () => {
    setView('blog');
  };

  const renderContent = () => {
    if (view === 'project' && selectedProject) {
      return <ProjectDetailPage project={selectedProject} onBack={handleBack} />;
    }
    if (view === 'blog') {
      return <BlogPage onBack={() => setView('home')} onSelectProject={handleSelectProject} />;
    }
    return (
      <>
        <Hero onViewChange={setView} />
        <AboutSection />
        <ServicesSection />
        <ProcessSection />
        <ProjectBlogSection onViewChange={setView} onSelectProject={handleSelectProject} />
        <ContactSection />
      </>
    );
  };

  return (
    <div className="min-h-screen text-gray-300 flex flex-col relative overflow-x-hidden">
      {/* Abstract Background Layer */}
      <AbstractBackground />

      {/* Navigation available on all views */}
      <Navigation onViewChange={setView} />

      <main className="flex-grow z-10">
        {renderContent()}
      </main>

      {/* Footer available on all views */}
      <Footer />
      <AIConsultant />
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);