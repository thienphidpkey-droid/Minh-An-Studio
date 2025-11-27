import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { 
  Camera, 
  Video, 
  Menu, 
  X, 
  Instagram, 
  Facebook, 
  Mail, 
  Phone, 
  MapPin, 
  ChevronDown, 
  Star, 
  Award, 
  Clock, 
  Sparkles,
  MessageCircle,
  Send,
  Loader2,
  Aperture,
  Film,
  Zap,
  CheckCircle,
  ArrowRight,
  MonitorPlay,
  Mic2,
  Image as ImageIcon,
  Users,
  Calendar,
  Globe,
  PenTool
} from "lucide-react";
import { GoogleGenAI } from "@google/genai";

// --- Types & Interfaces ---

interface ServiceItem {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface BlogPost {
  id: number;
  image: string;
  category: string;
  title: string;
  date: string;
  excerpt: string;
  views: string;
}

// --- Hooks ---

const useOnScreen = (ref: React.RefObject<HTMLElement>, threshold = 0.1) => {
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
            setIntersecting(true);
            observer.unobserve(entry.target);
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, threshold]);
  return isIntersecting;
};

// --- Components ---

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Về Minh An", href: "#about" },
    { name: "Dịch Vụ", href: "#services" },
    { name: "Quy Trình", href: "#process" },
    { name: "Nhật Ký Dự Án", href: "#portfolio" }, // Anchor to Project Blog
    { name: "Liên Hệ", href: "#contact" },
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-dark-900/95 backdrop-blur-md shadow-lg py-4 border-b border-purple-900/30" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="text-2xl font-serif font-bold text-white tracking-wider flex items-center gap-2">
          <Aperture className="text-purple-500" />
          MINH AN<span className="text-cyan-400">.</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm uppercase tracking-widest text-gray-300 hover:text-cyan-400 transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white focus:outline-none hover:text-purple-500 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-dark-900 border-t border-gray-800 shadow-xl md:hidden flex flex-col items-center py-8 space-y-6 animate-fadeIn z-50">
             {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-lg font-medium text-gray-300 hover:text-cyan-400"
                onClick={() => setIsOpen(false)}
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

const Hero = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1511285560982-1927bb560db5?auto=format&fit=crop&q=80" 
          alt="Wedding photography background" 
          className="w-full h-[120%] object-cover opacity-60 absolute -top-[10%] left-0 will-change-transform"
          style={{ transform: `translateY(${offset * 0.5}px)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900/80 via-dark-900/60 to-dark-900"></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-900/20 backdrop-blur-sm mb-8 animate-fadeInUp">
          <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
          <span className="text-cyan-400 text-xs font-bold tracking-widest uppercase">Booking 2024-2025</span>
        </div>
        
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white leading-tight mb-8 animate-fadeInUp delay-100">
          Visual <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Storyteller</span>
        </h1>
        <p className="text-gray-300 text-lg md:text-xl font-light mb-10 max-w-2xl mx-auto animate-fadeInUp delay-200">
          Nơi cảm xúc thăng hoa. Chúng tôi ghi lại những khoảnh khắc chân thực nhất với phong cách điện ảnh sang trọng và tinh tế.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center animate-fadeInUp delay-300">
          <a href="#portfolio" className="px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_30px_rgba(147,51,234,0.5)] rounded-sm">
             Xem Dự Án
          </a>
          <a href="#contact" className="px-8 py-4 bg-transparent border border-gray-600 hover:border-cyan-400 text-white font-bold uppercase tracking-widest transition-all rounded-sm hover:bg-cyan-900/20">
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
    <section id="about" className="py-24 bg-dark-900 relative overflow-hidden scroll-mt-28">
      <div className="container mx-auto px-6 relative z-10">
        <div ref={ref} className={`flex flex-col md:flex-row items-center gap-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          <div className="md:w-1/2 relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-cyan-400 rounded-lg blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
            <img 
              src="https://images.unsplash.com/photo-1554048612-387768052bf7?auto=format&fit=crop&q=80" 
              alt="Minh An Photographer" 
              className="relative rounded-lg shadow-2xl w-full object-cover aspect-[3/4]"
            />
            <div className="absolute -bottom-6 -right-6 w-48 bg-dark-800 p-6 border border-gray-700 rounded-lg shadow-xl hidden md:block">
               <div className="flex items-center gap-2 mb-2">
                 <Award className="text-purple-500" size={20} />
                 <span className="font-bold text-white">5+ Years</span>
               </div>
               <p className="text-xs text-gray-400">Kinh nghiệm thực chiến trong lĩnh vực sự kiện & cưới hỏi cao cấp.</p>
            </div>
          </div>

          <div className="md:w-1/2">
            <h2 className="text-cyan-400 uppercase tracking-widest text-sm font-bold mb-4">Về Minh An Studio</h2>
            <h3 className="font-serif text-4xl md:text-5xl text-white mb-6 leading-tight">
              Sáng Tạo Từ <br/>
              <span className="text-purple-400">Đam Mê Bất Tận</span>
            </h3>
            <p className="text-gray-400 leading-relaxed mb-6">
              Tôi là Minh An, một người kể chuyện bằng hình ảnh. Với tôi, mỗi bức ảnh không chỉ là sự ghi lại khoảnh khắc, mà là việc nắm bắt cảm xúc, ánh sáng và tâm hồn của sự kiện.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              Phong cách của tôi hướng tới sự tự nhiên, tinh tế nhưng không kém phần sang trọng. Dù là một đám cưới lãng mạn hay một sự kiện doanh nghiệp trang trọng, tôi luôn tìm kiếm những góc máy độc đáo nhất.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                 <div className="p-2 bg-purple-900/30 rounded-lg text-purple-400"><CheckCircle size={20} /></div>
                 <div>
                   <h4 className="text-white font-bold mb-1">Chuyên Nghiệp</h4>
                   <p className="text-sm text-gray-500">Thiết bị hiện đại, quy trình chuẩn.</p>
                 </div>
              </div>
              <div className="flex items-start gap-3">
                 <div className="p-2 bg-cyan-900/30 rounded-lg text-cyan-400"><Heart size={20} /></div>
                 <div>
                   <h4 className="text-white font-bold mb-1">Tận Tâm</h4>
                   <p className="text-sm text-gray-500">Lắng nghe và thấu hiểu khách hàng.</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Heart = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
);

const ServicesSection = () => {
  const services = [
    {
      id: 1,
      title: "Chụp Ảnh Sự Kiện",
      description: "Ghi lại những khoảnh khắc quan trọng của doanh nghiệp, hội thảo, khai trương với phong cách chuyên nghiệp.",
      icon: <Camera size={32} />
    },
    {
      id: 2,
      title: "Quay Phim Highlight",
      description: "Video recap sự kiện ngắn gọn, ấn tượng, bắt trọn cảm xúc và không khí buổi tiệc.",
      icon: <Film size={32} />
    },
    {
      id: 3,
      title: "Phóng Sự Cưới",
      description: "Kể câu chuyện tình yêu của bạn qua lăng kính điện ảnh, tự nhiên và đầy cảm xúc.",
      icon: <Award size={32} />
    },
    {
      id: 4,
      title: "Livestream",
      description: "Dịch vụ livestream đa nền tảng với thiết bị chuyên dụng, đảm bảo tín hiệu ổn định.",
      icon: <MonitorPlay size={32} />
    },
    {
      id: 5,
      title: "Chụp Profile/Fashion",
      description: "Xây dựng hình ảnh cá nhân thương hiệu hoặc lookbook thời trang đẳng cấp.",
      icon: <Users size={32} />
    },
    {
      id: 6,
      title: "Flycam/Drone",
      description: "Góc nhìn từ trên cao độc đáo, bao quát toàn cảnh không gian sự kiện hoành tráng.",
      icon: <Aperture size={32} />
    }
  ];

  return (
    <section id="services" className="py-24 bg-dark-800 scroll-mt-28">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-cyan-400 uppercase tracking-widest text-sm font-bold mb-4">Dịch Vụ Cung Cấp</h2>
          <h3 className="font-serif text-4xl text-white">Giải Pháp Hình Ảnh Toàn Diện</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="bg-dark-900 border border-gray-800 p-8 rounded-xl hover:border-purple-500/50 transition-all group hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(147,51,234,0.1)]">
              <div className="mb-6 p-4 inline-block bg-dark-800 rounded-lg text-purple-500 group-hover:text-cyan-400 group-hover:scale-110 transition-all duration-300">
                {service.icon}
              </div>
              <h4 className="text-xl font-bold text-white mb-3 font-serif">{service.title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Process Section (The Journey) ---

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
        <section id="process" className="py-24 bg-dark-900 relative overflow-hidden scroll-mt-28">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-cyan-400 uppercase tracking-widest text-sm font-bold mb-4">Quy Trình Làm Việc</h2>
                    <h3 className="font-serif text-4xl text-white">Hành Trình Sáng Tạo</h3>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Central Laser Line */}
                    <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 md:-translate-x-1/2 bg-gradient-to-b from-purple-600 via-cyan-400 to-purple-600 shadow-[0_0_15px_#22d3ee] rounded-full opacity-50"></div>

                    <div className="space-y-16">
                        {steps.map((step, index) => (
                             <div key={step.id} className={`flex flex-col md:flex-row items-center relative ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                {/* Timeline Node */}
                                <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-dark-900 border-2 border-cyan-400 rounded-full z-20 md:-translate-x-1/2 transform -translate-x-1/2 shadow-[0_0_10px_#22d3ee]">
                                    <div className="absolute inset-0 bg-cyan-400 rounded-full animate-ping opacity-75"></div>
                                </div>

                                {/* Spacer for desktop zig-zag */}
                                <div className="hidden md:block md:w-1/2"></div>

                                {/* Content Card */}
                                <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${index % 2 === 0 ? 'md:pr-12 text-left md:text-right' : 'md:pl-12 text-left'}`}>
                                    <div className="bg-dark-800 border border-gray-700 p-6 rounded-xl hover:border-cyan-400 transition-colors shadow-lg relative group">
                                         {/* Laser Connector */}
                                        <div className={`absolute top-1/2 h-0.5 bg-cyan-500/50 w-8 md:w-12 shadow-[0_0_8px_#22d3ee] hidden md:block
                                            ${index % 2 === 0 ? '-right-12' : '-left-12'}
                                        `}></div>
                                        
                                        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-dark-900 border border-gray-700 text-purple-400 mb-4 group-hover:text-cyan-400 group-hover:border-cyan-400 transition-all`}>
                                            {step.icon}
                                        </div>
                                        <h4 className="text-xl font-bold text-white mb-2 font-serif">{step.title}</h4>
                                        <p className="text-gray-400 text-sm">{step.description}</p>
                                    </div>
                                </div>
                             </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

// --- Portfolio Section (Blog Style) ---

const ProjectBlogSection = () => {
  const posts: BlogPost[] = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80",
      category: "Wedding Film",
      title: "Chuyện Tình Đà Lạt Mộng Mơ: Lan & Huy",
      date: "15 Tháng 5, 2024",
      excerpt: "Một lễ cưới ấm cúng giữa rừng thông Đà Lạt. Chúng tôi đã ghi lại những giọt nước mắt hạnh phúc và lời thề nguyện dưới ánh hoàng hôn...",
      views: "1.2k"
    },
    {
      id: 2,
      title: "Lễ Ra Mắt Sản Phẩm Mới - TechCorp 2024",
      category: "Event Highlight",
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80",
      date: "02 Tháng 6, 2024",
      excerpt: "Sự kiện công nghệ đình đám nhất năm với màn trình diễn ánh sáng mãn nhãn. Video highlight đã truyền tải trọn vẹn không khí sôi động...",
      views: "850"
    },
    {
      id: 3,
      title: "Lookbook Thời Trang Thu Đông - Muse Collection",
      category: "Fashion",
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80",
      date: "20 Tháng 6, 2024",
      excerpt: "Bộ ảnh mang phong cách cổ điển pha lẫn hiện đại. Ánh sáng studio được setup tỉ mỉ để tôn vinh chất liệu và đường nét thiết kế...",
      views: "2.1k"
    },
    {
      id: 4,
      title: "Kỷ Niệm 10 Năm Thành Lập Tập Đoàn VinaGroup",
      category: "Corporate",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80",
      date: "10 Tháng 7, 2024",
      excerpt: "Đêm tiệc sang trọng tại Gem Center. Chúng tôi sử dụng 5 máy quay để không bỏ lỡ bất kỳ khoảnh khắc vinh danh nào của các thành viên...",
      views: "930"
    },
    {
      id: 5,
      title: "Behind The Scenes: MV 'Mùa Yêu Đầu'",
      category: "Music Video",
      image: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?auto=format&fit=crop&q=80",
      date: "25 Tháng 7, 2024",
      excerpt: "Khám phá hậu trường sản xuất MV ca nhạc. Từ khâu lên storyboard đến những set quay thâu đêm suốt sáng của cả ekip...",
      views: "3.5k"
    },
    {
      id: 6,
      title: "Tiệc Sinh Nhật Private: Giấc Mơ Cổ Tích",
      category: "Private Party",
      image: "https://images.unsplash.com/photo-1530103862676-de3c9da59af7?auto=format&fit=crop&q=80",
      date: "05 Tháng 8, 2024",
      excerpt: "Không gian tiệc được trang trí như một khu vườn thần tiên. Màu sắc tươi sáng và những nụ cười trẻ thơ là điểm nhấn của bộ ảnh này...",
      views: "1.1k"
    }
  ];

  return (
    <section id="portfolio" className="py-24 bg-dark-800 scroll-mt-28">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
           <div>
              <h2 className="text-cyan-400 uppercase tracking-widest text-sm font-bold mb-4">Nhật Ký Dự Án</h2>
              <h3 className="font-serif text-4xl text-white">Câu Chuyện Đằng Sau Ống Kính</h3>
           </div>
           <a href="#" className="hidden md:flex items-center gap-2 text-purple-400 hover:text-cyan-400 transition-colors mt-4 md:mt-0 group">
             Xem tất cả bài viết <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
           </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="bg-dark-900 rounded-xl overflow-hidden border border-gray-800 hover:border-purple-500/50 transition-all group hover:-translate-y-2 shadow-lg hover:shadow-2xl">
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-dark-900/20 group-hover:bg-transparent z-10 transition-colors"></div>
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 z-20 bg-dark-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-cyan-500/30">
                  <span className="text-cyan-400 text-xs font-bold uppercase tracking-wider">{post.category}</span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6">
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Globe size={14} />
                    <span>{post.views} views</span>
                  </div>
                </div>

                <h4 className="text-xl font-bold text-white mb-3 font-serif leading-snug group-hover:text-purple-400 transition-colors">
                  <a href="#">{post.title}</a>
                </h4>
                
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-6">
                  {post.excerpt}
                </p>

                <a href="#" className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-cyan-400 transition-colors uppercase tracking-wider">
                  Đọc Chi Tiết <ArrowRight size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
            <button className="px-8 py-3 border border-gray-600 text-white rounded-full hover:bg-white hover:text-dark-900 transition-all uppercase text-sm font-bold tracking-widest">
                Xem Thêm Dự Án
            </button>
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 bg-dark-900 relative scroll-mt-28">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#22d3ee_1px,transparent_1px)] [background-size:16px_16px]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="bg-dark-800 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
          
          <div className="md:w-5/12 bg-gradient-to-br from-purple-900 to-dark-900 p-12 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
            
            <div>
              <h3 className="font-serif text-3xl font-bold mb-6">Liên Hệ Ngay</h3>
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

          <div className="md:w-7/12 p-12 bg-dark-800">
             <form className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                   <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Họ & Tên</label>
                   <input type="text" className="w-full bg-dark-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-colors" placeholder="Nguyễn Văn A" />
                 </div>
                 <div>
                   <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Số Điện Thoại</label>
                   <input type="tel" className="w-full bg-dark-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-colors" placeholder="0909 xxx xxx" />
                 </div>
               </div>
               
               <div>
                 <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Dịch Vụ Quan Tâm</label>
                 <select className="w-full bg-dark-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-colors">
                   <option>Chụp Ảnh Sự Kiện</option>
                   <option>Quay Phim Cưới</option>
                   <option>Livestream</option>
                   <option>Khác</option>
                 </select>
               </div>

               <div>
                 <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Lời Nhắn</label>
                 <textarea rows={4} className="w-full bg-dark-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-colors" placeholder="Chia sẻ thêm về nhu cầu của bạn..."></textarea>
               </div>

               <button type="button" className="w-full py-4 bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold uppercase tracking-widest rounded-lg hover:opacity-90 transition-opacity shadow-lg">
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
    <footer className="bg-dark-900 border-t border-gray-800 py-12">
      <div className="container mx-auto px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Aperture className="text-purple-500" />
          <span className="text-2xl font-serif font-bold text-white tracking-wider">MINH AN<span className="text-cyan-400">.</span></span>
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

// --- Gemini AI Consultant ---

const AIConsultant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([
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
      const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

      const prompt = `
        Bạn là trợ lý ảo chuyên nghiệp của Minh An Studio (dịch vụ chụp ảnh/quay phim).
        Tính cách: Thân thiện, tinh tế, am hiểu về nghệ thuật hình ảnh.
        Thông tin studio:
        - Dịch vụ: Quay chụp sự kiện, cưới hỏi, livestream, profile.
        - Phong cách: Sang trọng, cảm xúc, cinematic.
        - Địa chỉ: TP.HCM.
        
        Câu hỏi của khách: "${userMsg}"
        Hãy trả lời ngắn gọn (dưới 100 từ), hữu ích và khuyến khích khách để lại liên hệ hoặc đặt lịch.
      `;

      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      
      setMessages(prev => [...prev, { role: 'model', text: text }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: 'Xin lỗi, hiện tại mình đang bận. Bạn vui lòng liên hệ hotline nhé!' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all hover:scale-110 ${isOpen ? 'bg-dark-800 text-white' : 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white'}`}
      >
        {isOpen ? <X /> : <MessageCircle />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 md:w-96 bg-dark-800 border border-gray-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fadeInUp">
          <div className="p-4 bg-dark-900 border-b border-gray-700 flex justify-between items-center">
             <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
               <span className="font-bold text-white text-sm">Minh An AI Support</span>
             </div>
             <Sparkles size={16} className="text-cyan-400" />
          </div>
          
          <div className="h-80 overflow-y-auto p-4 space-y-4 bg-dark-800/50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-purple-600 text-white rounded-br-none' : 'bg-dark-700 text-gray-200 rounded-bl-none border border-gray-600'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-dark-700 p-3 rounded-2xl rounded-bl-none border border-gray-600">
                  <Loader2 className="animate-spin w-4 h-4 text-cyan-400" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 bg-dark-900 border-t border-gray-700 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Nhập câu hỏi..."
              className="flex-1 bg-dark-800 border border-gray-700 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
            />
            <button 
              onClick={handleSend}
              className="p-2 bg-cyan-500 text-white rounded-full hover:bg-cyan-400 transition-colors"
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
  return (
    <div className="bg-dark-900 min-h-screen text-gray-300">
      <Navigation />
      <Hero />
      <AboutSection />
      <ServicesSection />
      <ProcessSection />
      <ProjectBlogSection />
      <ContactSection />
      <Footer />
      <AIConsultant />
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);
