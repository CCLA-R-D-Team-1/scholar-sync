'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function ContactPage() {
  const [countedStats, setCountedStats] = useState({
    partners: 0,
    courses: 0,
    countries: 0,
    awards: 0
  });

  // AI Assistant State
  const [aiOpen, setAiOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{text: string, sender: 'user' | 'ai'}>>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sample knowledge base for the AI assistant
  const knowledgeBase = [
    {
      question: /course|program|learn/i,
      answer: "We offer over 80 courses across various disciplines including Technology, Business, Arts, and Sciences. Our most popular courses are AI Fundamentals, Digital Marketing, and Data Science."
    },
    {
      question: /price|cost|fee/i,
      answer: "Course fees vary depending on the program. On average, our courses range from $199 to $999. We also offer payment plans and scholarships for eligible students."
    },
    {
      question: /event|workshop|seminar/i,
      answer: "We host regular events throughout the year. Upcoming events include our Tech Innovation Summit on June 15th and Career Development Workshop on July 3rd. Would you like me to check availability for you?"
    },
    {
      question: /apply|enroll|register/i,
      answer: "You can enroll in courses directly through our website or visit our campus. The application process typically takes about 10 minutes. Would you like me to guide you through it?"
    },
    {
      question: /contact|reach|email|phone/i,
      answer: "You can reach us at info@scholarsync.com or call +1 (555) 123-4567. Our office hours are Mon-Fri 9am-5pm. We also have 24/7 online support through our website."
    },
    {
      question: /scholarship|financial aid|funding/i,
      answer: "We offer several scholarship programs based on merit and financial need. The application deadline for the next term is August 15th. Would you like more details?"
    }
  ];

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage = { text: inputValue, sender: 'user' as const };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    // Simulate AI thinking
    setTimeout(() => {
      // Find the best matching answer
      const userQuestion = inputValue.toLowerCase();
      let response = "I'm an AI assistant here to help with course information and event booking. Could you clarify your question?";
      
      for (const item of knowledgeBase) {
        if (item.question.test(userQuestion)) {
          response = item.answer;
          break;
        }
      }
      
      // Add AI response
      const aiMessage = { text: response, sender: 'ai' as const };
      setMessages(prev => [...prev, aiMessage]);
    }, 800);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });

    // Animated counting effect
    const animateCount = () => {
      const duration = 2000;
      const startTime = Date.now();

      const animate = () => {
        const progress = Math.min((Date.now() - startTime) / duration, 1);
        setCountedStats({
          partners: Math.floor(progress * 58),
          courses: Math.floor(progress * 83),
          countries: Math.floor(progress * 10),
          awards: Math.floor(progress * 21)
        });
        if (progress < 1) requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);
    };

    setTimeout(animateCount, 500);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-deep-sky/10 via-ocean-base/30 to-midnight-blue/20 text-deep-navy font-sans relative overflow-hidden">
      {/* Space for navbar */}
      <div className="h-20"></div>

      {/* Hero Section */}
      <section className="min-h-[80vh] md:min-h-[auto] flex flex-col md:flex-row items-center pt-10 md:pt-16 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/grid-pattern.svg')] opacity-10"></div>
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full bg-action-blue/10 blur-3xl animate-pulse-slow delay-1000"></div>
        </div>

        {/* Text Content */}
        <div className="text-left mb-16 md:mb-0 max-w-2xl relative z-10 md:mt-16" data-aos="fade-right">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-action-blue glow-text">Connect</span> With Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-hover to-primary glow-text">Future</span>
          </h1>
          <p className="text-lg md:text-xl text-deep-sky mb-4">
            Where innovation meets education. Our team is ready to guide you through your learning journey with cutting-edge solutions.
          </p>
          <p className="text-md md:text-lg text-muted-slate mb-8 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-action-blue glow-dot"></span>
            Available 24/7 for course & event support
          </p>
          <Link href="#contact-form" scroll={false}>
            <button className="px-8 md:px-10 py-3 md:py-4 bg-gradient-to-r from-primary to-action-blue text-white font-medium rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer relative overflow-hidden group">
              <span className="relative z-10">Get in Touch</span>
              <span className="absolute inset-0 bg-gradient-to-r from-action-blue to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </button>
          </Link>
        </div>

        {/* Avatar and Floating Icons */}
        <div className="relative w-full md:w-1/2 h-full z-0 flex items-center justify-center md:mt-16">
          {/* Advanced Hologram Avatar */}
          <div 
            className="relative w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-primary/30 to-action-blue/30 backdrop-blur-sm border-2 border-primary/40 flex items-center justify-center animate-pulse-slow cursor-pointer"
            onClick={() => setAiOpen(true)}
          >
            {/* Decorative rings */}
            <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-spin-slow" style={{ animationDuration: '25s' }}></div>
            <div className="absolute inset-4 rounded-full border-4 border-action-blue/20 animate-spin-slow-reverse" style={{ animationDuration: '30s' }}></div>
            <div className="absolute inset-8 rounded-full border-2 border-white/20 animate-spin-slow" style={{ animationDuration: '35s' }}></div>
            
            {/* Main avatar container */}
            <div className="w-40 h-40 md:w-56 md:h-56 rounded-full bg-gradient-to-br from-primary/20 to-action-blue/20 backdrop-blur-sm flex items-center justify-center">
              <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full bg-white/5 backdrop-blur-sm border-2 border-white/20 flex items-center justify-center overflow-hidden">
                {/* Holographic grid background */}
                <div className="absolute inset-0 bg-[url('/images/hologram-grid.png')] bg-cover opacity-40"></div>
                
                {/* Avatar content */}
                <div className="relative z-10 flex flex-col items-center justify-center">
                  <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-primary/30 to-action-blue/30 backdrop-blur-sm flex items-center justify-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 md:h-16 md:w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="text-white text-sm md:text-base font-medium mt-2">AI Assistant</div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-action-blue animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Contact Icons */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Top Right Icon */}
            <div 
              className={`absolute w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 flex items-center justify-center contact-float-icon`}
              style={{ 
                top: '10%',
                right: '10%',
                animationDelay: '0s'
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>

            {/* Bottom Right Icon */}
            <div 
              className={`absolute w-16 h-16 md:w-24 md:h-24 rounded-full bg-action-blue/10 backdrop-blur-sm border border-action-blue/20 flex items-center justify-center contact-float-icon`}
              style={{ 
                bottom: '15%',
                right: '15%',
                animationDelay: '0.2s'
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-action-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>

            {/* Top Left Icon */}
            <div 
              className={`absolute w-16 h-16 md:w-20 md:h-20 rounded-full bg-blue-hover/10 backdrop-blur-sm border border-blue-hover/20 flex items-center justify-center contact-float-icon`}
              style={{ 
                top: '20%',
                left: '15%',
                animationDelay: '0.4s'
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-hover" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>

            {/* Bottom Left Icon */}
            <div 
              className={`absolute w-16 h-16 md:w-24 md:h-24 rounded-full bg-blue-hover/10 backdrop-blur-sm border border-muted-cyan/20 flex items-center justify-center contact-float-icon`}
              style={{ 
                bottom: '20%',
                left: '20%',
                animationDelay: '0.6s'
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-deep-sky" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>

            {/* Top Center Right Icon */}
            <div 
              className={`absolute w-16 h-16 md:w-20 md:h-20 rounded-full bg-deep-sky/10 backdrop-blur-sm border border-deep-sky/20 flex items-center justify-center contact-float-icon`}
              style={{ 
                top: '15%',
                right: '5%',
                animationDelay: '0.8s'
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-deep-sky" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* AI Assistant Chat Modal */}
      {aiOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-md max-h-[80vh] bg-gradient-to-br from-ocean-base to-sky-shell rounded-t-2xl md:rounded-2xl shadow-2xl overflow-hidden border border-glass-overlay">
            {/* Chat header */}
            <div className="bg-gradient-to-r from-primary to-action-blue p-4 text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="font-medium">Course & Event Assistant</h3>
              </div>
              <button 
                onClick={() => setAiOpen(false)}
                className="p-1 rounded-full hover:bg-white/20 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Chat messages */}
            <div className="p-4 h-[60vh] overflow-y-auto">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-muted-slate">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-medium text-deep-navy mb-2">How can I help you today?</h4>
                  <p className="max-w-xs">Ask me about courses, events, enrollment, or anything else!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div 
                      key={index} 
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-xs md:max-w-md rounded-2xl px-4 py-2 ${message.sender === 'user' 
                          ? 'bg-primary text-white rounded-br-none' 
                          : 'bg-white text-deep-navy rounded-bl-none shadow-sm'}`}
                      >
                        {message.text}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Chat input */}
            <div className="p-4 border-t border-glass-overlay bg-white/50 backdrop-blur-sm">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your question..."
                  className="flex-1 p-3 bg-white border border-glass-overlay rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="px-4 bg-primary text-white rounded-lg disabled:opacity-50 transition-opacity"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
              <p className="text-xs text-muted-slate mt-2 text-center">
                AI assistant may produce inaccurate information about courses and events.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Glowing Stats Section */}
      <section className="py-8 md:py-12 bg-gradient-to-r from-deep-sky to-midnight-blue text-white" data-aos="fade-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center">
          {[
            { value: countedStats.partners, label: "Global Partners" },
            { value: countedStats.courses, label: "Courses Offered" },
            { value: countedStats.countries, label: "Countries" },
            { value: countedStats.awards, label: "Awards Won" }
          ].map((stat, index) => (
            <div 
              key={index}
              className="p-4 md:p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105 cursor-pointer"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="text-3xl md:text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-primary to-muted-cyan">
                {stat.value}+
              </div>
              <p className="text-sm md:text-base text-gray-300">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Vision & Mission - Enhanced Futuristic Cards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gradient-to-br from-ocean-base/30 to-sky-shell/30">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vision Card */}
          <div 
            className="group relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-primary/20 transition-all duration-500 cursor-pointer"
            data-aos="fade-right"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-muted-cyan/20 z-0" />
            <div className="relative h-64 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80" 
                alt="Our Vision - Team collaboration"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-sky/60 to-transparent"></div>
            </div>
            <div className="p-6 relative z-10 bg-white/90 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-3 text-deep-navy">OUR VISION</h2>
              <div className="space-y-2 text-muted-slate">
                <p className="flex items-center gap-2 hover:text-deep-navy transition-colors">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  Redefining education through innovation
                </p>
                <p className="flex items-center gap-2 hover:text-deep-navy transition-colors">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  Global learning accessibility
                </p>
                <p className="flex items-center gap-2 hover:text-deep-navy transition-colors">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  Future-ready curriculum
                </p>
              </div>
              <div className="mt-6 flex justify-between items-center">
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-muted-cyan">
                  21+ Awards
                </div>
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Mission Card */}
          <div 
            className="group relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-primary/20 transition-all duration-500 cursor-pointer"
            data-aos="fade-left"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-muted-cyan/20 to-primary/20 z-0" />
            <div className="relative h-64 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                alt="Our Mission - Education technology"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-sky/60 to-transparent"></div>
            </div>
            <div className="p-6 relative z-10 bg-white/90 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-3 text-deep-navy">OUR MISSION</h2>
              <p className="text-muted-slate mb-6 hover:text-deep-navy transition-colors">
                To empower learners worldwide with cutting-edge education technology and personalized learning pathways that adapt to the future.
              </p>
              <div className="flex justify-between items-center">
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-muted-cyan to-primary">
                  4 Core Values
                </div>
                <div className="flex gap-2">
                  {['Innovation', 'Quality', 'Access', 'Impact'].map((value, i) => (
                    <span key={i} className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                      {value}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & FAQ - Futuristic Layout */}
      <section id="contact-form" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gradient-to-br from-ocean-base/20 to-sky-shell/20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Holographic Contact Form */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-action-blue rounded-2xl opacity-75 blur-lg group-hover:opacity-100 transition-all duration-500"></div>
            <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden p-0.5">
              <div className="bg-soft-ice rounded-[15px] p-6">
                <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-action-blue text-transparent bg-clip-text">
                  SEND US A MESSAGE
                </h2>
                <form className="space-y-4">
                  <div>
                    <label className="block mb-2 font-medium text-deep-navy">Name</label>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full p-3 bg-white border border-glass-overlay rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-medium text-deep-navy">Email</label>
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full p-3 bg-white border border-glass-overlay rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-medium text-deep-navy">Message</label>
                    <textarea
                      rows={4}
                      placeholder="Your Message"
                      className="w-full p-3 bg-white border border-glass-overlay rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-gradient-to-r from-primary to-action-blue text-white font-medium rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 cursor-pointer"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* FAQ Section with Hover Effects */}
          <div data-aos="fade-left">
            <h2 className="text-2xl font-bold mb-5 bg-gradient-to-r from-primary to-action-blue text-transparent bg-clip-text">
              FREQUENTLY ASKED QUESTIONS
            </h2>
            <p className="text-muted-slate mb-6">
              Find quick answers to common questions about our courses and services.
            </p>
            
            <div className="space-y-3">
              {[
                {
                  question: "How do I enroll in a course?",
                  answer: "Simply browse our courses, select the one you're interested in, and click 'Enroll Now'."
                },
                {
                  question: "What payment methods do you accept?",
                  answer: "We accept all major credit cards, debit cards, and bank transfers."
                },
                {
                  question: "Can I get a refund if I'm not satisfied?",
                  answer: "Yes, we offer a 30-day money-back guarantee for all our courses."
                },
                {
                  question: "Do you provide certificates?",
                  answer: "Yes, upon completion you'll receive a certificate for your LinkedIn or resume."
                }
              ].map((faq, index) => (
                <div 
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-transparent hover:border-primary hover:scale-[1.01] cursor-pointer"
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
                >
                  <h3 className="font-bold mb-1 text-lg text-deep-navy">{faq.question}</h3>
                  <p className="text-muted-slate">{faq.answer}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-6 group">
              <a href="#" className="text-primary font-medium inline-flex items-center hover:underline cursor-pointer">
                {`Can't find what you're looking for? View All FAQs`}
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Futuristic Global Campus Section */}
      <section className="py-16 bg-sky-shell">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-10 text-center bg-gradient-to-r from-primary to-action-blue text-transparent bg-clip-text">
            OUR GLOBAL CAMPUS
          </h2>
          
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-glass-overlay">
            {/* Interactive 3D Map */}
            <div className="relative h-80 w-full bg-gradient-to-br from-deep-sky to-midnight-blue">
              <iframe
                src="https://www.google.lk/maps/place/SLIM+KANDY/@7.2818016,80.6203463,19.36z/data=!4m6!3m5!1s0x3ae369ebc5c940e7:0xf7e1365583e8c5dc!8m2!3d7.2820484!4d80.6207375!16s%2Fg%2F11h8918w2f?entry=ttu&g_ep=EgoyMDI1MDczMC4wIKXMDSoASAFQAw%3D%3D"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>
            </div>

            {/* Futuristic Contact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-glass-overlay">
              {/* Address Card */}
              <div className="p-8 group hover:bg-white/50 transition-all duration-300 cursor-pointer">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4 group-hover:bg-primary/20 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-deep-navy">Global Headquarters</h3>
                </div>
                <div className="space-y-2 pl-16">
                  <p className="text-muted-slate flex items-center">
                    123 Education Street, <br />
                    Learning District, <br />
                    Knowledge City 12345. <br />
                  </p>
                </div>
              </div>

              {/* Contact Card */}
              <div className="p-8 group hover:bg-white/50 transition-all duration-300 cursor-pointer">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-action-blue/10 flex items-center justify-center mr-4 group-hover:bg-action-blue/20 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-action-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-deep-navy">Digital Connect</h3>
                </div>
                <div className="space-y-3 pl-16">
                  <p className="text-muted-slate flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2"
                      viewBox="0 0 32 32"
                      fill="none"
                    >
                      <path
                        fill="#25D366"
                        d="M16.04 0C7.183 0 .007 7.174.007 16.013c0 2.823.741 5.585 2.143 7.997L0 32l8.188-2.121a15.89 15.89 0 007.85 2.014c8.857 0 16.033-7.176 16.033-16.015C32.072 7.174 24.897 0 16.04 0z"
                      />
                      <path
                        fill="#FFF"
                        d="M24.605 22.105c-.348-.174-2.06-1.016-2.38-1.13-.318-.115-.551-.174-.784.174-.233.348-.9 1.13-1.105 1.363-.204.233-.407.261-.755.087-.348-.174-1.472-.516-2.799-1.642-1.034-.922-1.733-2.063-1.937-2.411-.204-.348-.022-.537.152-.711.156-.157.348-.408.522-.613.174-.204.232-.348.348-.58.115-.232.058-.435-.029-.609-.087-.174-.783-1.89-1.073-2.59-.283-.68-.566-.587-.78-.596-.203-.01-.435-.012-.667-.012-.232 0-.609.087-.928.435-.319.348-1.221 1.19-1.221 2.91 0 1.72 1.25 3.385 1.424 3.628.174.244 2.46 3.758 5.963 5.27.833.359 1.48.573 1.987.732.835.266 1.594.229 2.191.138.67-.1 2.06-.841 2.35-1.653.29-.813.29-1.51.203-1.654-.086-.145-.319-.232-.667-.406z"
                      />
                    </svg>
                    +1 (555) 123-4567 (WhatsApp)
                  </p>

                  <p className="text-muted-slate flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    +1 (555) 987-6543 (Office)
                  </p>
                </div>
              </div>

              {/* Hours & Email Card */}
              <div className="p-8 group hover:bg-white/50 transition-all duration-300 cursor-pointer">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-hover/10 flex items-center justify-center mr-4 group-hover:bg-blue-hover/20 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-hover" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-deep-navy">Connect With Us</h3>
                </div>
                <div className="space-y-3 pl-16">
                  <div>
                    <h4 className="text-sm font-semibold text-primary mb-1">Opening Hours</h4>
                    <p className="text-muted-slate text-sm">Mon-Fri: 9am-5pm</p>
                    <p className="text-muted-slate text-sm">Sat: 10am-2pm</p>
                    <p className="text-muted-slate text-sm">Sun: Closed</p>
                  </div>
                  <div className="pt-2">
                    <h4 className="text-sm font-semibold text-primary mb-1">Email</h4>
                    <p className="text-muted-slate text-sm">info@scholarsync.com</p>
                    <p className="text-muted-slate text-sm">support@scholarsync.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-16 bg-gradient-to-br from-ocean-base/40 to-sky-shell/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-10 text-center bg-gradient-to-r from-primary to-action-blue text-transparent bg-clip-text">
            CONNECT WITH US
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { name: 'Twitter', icon: 'twitter', color: 'text-[#1DA1F2]', url: 'https://twitter.com' },
              { name: 'Facebook', icon: 'facebook', color: 'text-[#1877F2]', url: 'https://facebook.com' },
              { name: 'LinkedIn', icon: 'linkedin', color: 'text-[#0077B5]', url: 'https://linkedin.com' },
              { name: 'Instagram', icon: 'instagram', color: 'text-[#E4405F]', url: 'https://instagram.com' },
              { name: 'YouTube', icon: 'youtube', color: 'text-[#FF0000]', url: 'https://youtube.com' },
            ].map((social, index) => (
              <a 
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                data-aos="zoom-in"
                data-aos-delay={index * 100}
              >
                <svg className={`h-8 w-8 ${social.color}`} fill="currentColor" viewBox="0 0 24 24">
                  {social.icon === 'twitter' && (
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  )}
                  {social.icon === 'facebook' && (
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  )}
                  {social.icon === 'linkedin' && (
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  )}
                  {social.icon === 'instagram' && (
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  )}
                  {social.icon === 'youtube' && (
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  )}
                </svg>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Futuristic CTA Section */}
      <section className="py-16 bg-gradient-to-r from-midnight-blue to-primary text-white" data-aos="fade-up">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-5">
            READY TO <span className="text-transparent bg-clip-text bg-gradient-to-r from-muted-cyan to-white">TRANSFORM</span> YOUR FUTURE?
          </h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto text-gray-300">
            Join thousands of successful students who have advanced their careers with Scholar Sync.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-primary font-medium rounded-full hover:bg-gray-100 transition-all duration-300 hover:shadow-lg hover:shadow-white/20 cursor-pointer">
              Browse Courses
            </button>
            <button className="px-8 py-3 border-2 border-white text-white font-medium rounded-full hover:bg-white/10 transition-all duration-300 hover:shadow-lg hover:shadow-white/20 cursor-pointer">
              Contact Advisor
            </button>
          </div>
        </div>
      </section>

      {/* Global CSS for animations */}
      <style jsx global>{`
        /* Floating animation for contact icons */
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        
        .contact-float-icon {
          animation: float 6s ease-in-out infinite;
          transition: all 0.3s ease;
        }
        
        .contact-float-icon:hover {
          transform: scale(1.2) rotate(10deg) !important;
          animation-play-state: paused;
        }
        
        /* Slow pulse animation for central avatar */
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.02); opacity: 1; }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        
        /* Slow spin animations */
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-slow-reverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 60s linear infinite;
        }
        
        .animate-spin-slow-reverse {
          animation: spin-slow-reverse 80s linear infinite;
        }
        
        /* Glow effect for text */
        .glow-text {
          text-shadow: 0 0 10px rgba(45, 125, 210, 0.5);
          transition: text-shadow 0.3s ease;
        }
        
        .glow-text:hover {
          text-shadow: 0 0 15px rgba(45, 125, 210, 0.7);
        }
        
        /* Glow effect for dot */
        .glow-dot {
          box-shadow: 0 0 8px 2px rgba(45, 125, 210, 0.7);
          animation: glow-pulse 2s infinite;
        }
        
        @keyframes glow-pulse {
          0% { box-shadow: 0 0 8px 2px rgba(45, 125, 210, 0.7); }
          50% { box-shadow: 0 0 12px 4px rgba(45, 125, 210, 0.9); }
          100% { box-shadow: 0 0 8px 2px rgba(45, 125, 210, 0.7); }
        }
        
        /* Scroll animation styles */
        [data-aos] {
          transition-property: transform, opacity;
        }
        
        [data-aos="fade-up"] {
          transform: translateY(30px);
          opacity: 0;
          transition-duration: 0.6s;
        }
        
        [data-aos="fade-up"].aos-animate {
          transform: translateY(0);
          opacity: 1;
        }
        
        [data-aos="fade-right"] {
          transform: translateX(-30px);
          opacity: 0;
          transition-duration: 0.6s;
        }
        
        [data-aos="fade-right"].aos-animate {
          transform: translateX(0);
          opacity: 1;
        }
        
        [data-aos="fade-left"] {
          transform: translateX(30px);
          opacity: 0;
          transition-duration: 0.6s;
        }
        
        [data-aos="fade-left"].aos-animate {
          transform: translateX(0);
          opacity: 1;
        }
      `}</style>
    </main>
  );
}