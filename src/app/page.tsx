'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, Users, BookOpen, Shield, Linkedin, Clock, TrendingUp, Star, ArrowRight, Globe, Mail, Phone, MapPin, ChevronDown, ChevronUp, Stethoscope, GraduationCap, Microscope, Heart, Brain, BookMarked, Video, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { addToWaitlist } from './actions';

// Predefined floating particle positions and animations to prevent hydration mismatch
const FLOATING_PARTICLES = [
  { left: '10%', top: '15%', delay: '2s', duration: '15s' },
  { left: '85%', top: '25%', delay: '5s', duration: '18s' },
  { left: '20%', top: '45%', delay: '1s', duration: '12s' },
  { left: '75%', top: '35%', delay: '8s', duration: '20s' },
  { left: '45%', top: '10%', delay: '3s', duration: '16s' },
  { left: '90%', top: '60%', delay: '6s', duration: '14s' },
  { left: '15%', top: '70%', delay: '4s', duration: '19s' },
  { left: '80%', top: '80%', delay: '7s', duration: '17s' },
  { left: '30%', top: '85%', delay: '2s', duration: '13s' },
  { left: '65%', top: '90%', delay: '9s', duration: '21s' },
  { left: '5%', top: '30%', delay: '1s', duration: '15s' },
  { left: '95%', top: '40%', delay: '5s', duration: '18s' },
  { left: '25%', top: '55%', delay: '3s', duration: '16s' },
  { left: '70%', top: '65%', delay: '6s', duration: '14s' },
  { left: '40%', top: '75%', delay: '4s', duration: '20s' },
  { left: '55%', top: '20%', delay: '8s', duration: '17s' },
  { left: '35%', top: '50%', delay: '2s', duration: '19s' },
  { left: '60%', top: '30%', delay: '7s', duration: '13s' },
  { left: '50%', top: '60%', delay: '1s', duration: '18s' },
  { left: '12%', top: '8%', delay: '3s', duration: '14s' },
  { left: '88%', top: '12%', delay: '6s', duration: '16s' },
  { left: '18%', top: '22%', delay: '2s', duration: '18s' },
  { left: '82%', top: '28%', delay: '7s', duration: '15s' },
  { left: '38%', top: '18%', delay: '4s', duration: '17s' },
  { left: '62%', top: '32%', delay: '1s', duration: '19s' },
  { left: '28%', top: '38%', delay: '5s', duration: '13s' },
  { left: '72%', top: '42%', delay: '8s', duration: '20s' },
  { left: '42%', top: '48%', delay: '3s', duration: '16s' },
  { left: '58%', top: '52%', delay: '6s', duration: '14s' },
  { left: '32%', top: '58%', delay: '2s', duration: '18s' },
  { left: '68%', top: '62%', delay: '7s', duration: '15s' },
  { left: '48%', top: '68%', delay: '4s', duration: '17s' },
  { left: '52%', top: '72%', delay: '1s', duration: '19s' },
  { left: '22%', top: '78%', delay: '5s', duration: '13s' },
  { left: '78%', top: '82%', delay: '8s', duration: '20s' },
  { left: '36%', top: '88%', delay: '3s', duration: '16s' },
  { left: '64%', top: '92%', delay: '6s', duration: '14s' },
  { left: '8%', top: '5%', delay: '2s', duration: '18s' },
  { left: '92%', top: '8%', delay: '7s', duration: '15s' },
  { left: '16%', top: '12%', delay: '4s', duration: '17s' },
  { left: '84%', top: '16%', delay: '1s', duration: '19s' },
  { left: '24%', top: '20%', delay: '6s', duration: '13s' },
  { left: '76%', top: '24%', delay: '3s', duration: '20s' },
  { left: '44%', top: '26%', delay: '8s', duration: '16s' },
  { left: '56%', top: '30%', delay: '5s', duration: '14s' },
  { left: '26%', top: '34%', delay: '2s', duration: '18s' },
  { left: '74%', top: '36%', delay: '7s', duration: '15s' },
  { left: '46%', top: '40%', delay: '4s', duration: '17s' },
  { left: '54%', top: '44%', delay: '1s', duration: '19s' },
  { left: '34%', top: '46%', delay: '6s', duration: '13s' },
  { left: '66%', top: '50%', delay: '3s', duration: '20s' },
  { left: '14%', top: '54%', delay: '8s', duration: '16s' },
  { left: '86%', top: '56%', delay: '5s', duration: '14s' },
  { left: '18%', top: '60%', delay: '2s', duration: '18s' },
  { left: '82%', top: '64%', delay: '7s', duration: '15s' },
  { left: '48%', top: '66%', delay: '4s', duration: '17s' },
  { left: '52%', top: '70%', delay: '1s', duration: '19s' },
  { left: '28%', top: '74%', delay: '6s', duration: '13s' },
  { left: '72%', top: '76%', delay: '3s', duration: '20s' },
  { left: '38%', top: '80%', delay: '8s', duration: '16s' },
  { left: '62%', top: '84%', delay: '5s', duration: '14s' },
  { left: '22%', top: '86%', delay: '2s', duration: '18s' },
  { left: '78%', top: '88%', delay: '7s', duration: '15s' },
  { left: '42%', top: '90%', delay: '4s', duration: '17s' },
  { left: '58%', top: '94%', delay: '1s', duration: '19s' },
  { left: '6%', top: '96%', delay: '6s', duration: '13s' },
  { left: '94%', top: '98%', delay: '3s', duration: '20s' },
  { left: '11%', top: '3%', delay: '8s', duration: '16s' },
  { left: '89%', top: '6%', delay: '5s', duration: '14s' },
  { left: '19%', top: '9%', delay: '2s', duration: '18s' },
  { left: '81%', top: '11%', delay: '7s', duration: '15s' },
  { left: '29%', top: '14%', delay: '4s', duration: '17s' },
  { left: '71%', top: '17%', delay: '1s', duration: '19s' },
  { left: '41%', top: '19%', delay: '6s', duration: '13s' },
  { left: '59%', top: '21%', delay: '3s', duration: '20s' },
  { left: '31%', top: '23%', delay: '8s', duration: '16s' },
  { left: '69%', top: '27%', delay: '5s', duration: '14s' },
  { left: '47%', top: '29%', delay: '2s', duration: '18s' },
  { left: '53%', top: '31%', delay: '7s', duration: '15s' },
  { left: '33%', top: '33%', delay: '4s', duration: '17s' },
  { left: '67%', top: '37%', delay: '1s', duration: '19s' },
  { left: '43%', top: '39%', delay: '6s', duration: '13s' },
  { left: '57%', top: '41%', delay: '3s', duration: '20s' },
  { left: '27%', top: '43%', delay: '8s', duration: '16s' },
  { left: '73%', top: '47%', delay: '5s', duration: '14s' },
  { left: '49%', top: '49%', delay: '2s', duration: '18s' },
  { left: '51%', top: '51%', delay: '7s', duration: '15s' },
  { left: '37%', top: '53%', delay: '4s', duration: '17s' },
  { left: '63%', top: '55%', delay: '1s', duration: '19s' },
  { left: '23%', top: '57%', delay: '6s', duration: '13s' },
  { left: '77%', top: '59%', delay: '3s', duration: '20s' },
  { left: '45%', top: '61%', delay: '8s', duration: '16s' },
  { left: '55%', top: '63%', delay: '5s', duration: '14s' },
  { left: '25%', top: '65%', delay: '2s', duration: '18s' },
  { left: '75%', top: '67%', delay: '7s', duration: '15s' },
  { left: '39%', top: '69%', delay: '4s', duration: '17s' },
  { left: '61%', top: '71%', delay: '1s', duration: '19s' },
  { left: '21%', top: '73%', delay: '6s', duration: '13s' },
  { left: '79%', top: '75%', delay: '3s', duration: '20s' },
  { left: '35%', top: '77%', delay: '8s', duration: '16s' },
  { left: '65%', top: '79%', delay: '5s', duration: '14s' },
  { left: '17%', top: '81%', delay: '2s', duration: '18s' },
  { left: '83%', top: '83%', delay: '7s', duration: '15s' },
  { left: '47%', top: '85%', delay: '4s', duration: '17s' },
  { left: '53%', top: '87%', delay: '1s', duration: '19s' },
  { left: '31%', top: '89%', delay: '6s', duration: '13s' },
  { left: '69%', top: '91%', delay: '3s', duration: '20s' },
  { left: '41%', top: '93%', delay: '8s', duration: '16s' },
  { left: '59%', top: '95%', delay: '5s', duration: '14s' },
  { left: '13%', top: '97%', delay: '2s', duration: '18s' },
  { left: '87%', top: '99%', delay: '7s', duration: '15s' },
  { left: '9%', top: '1%', delay: '4s', duration: '17s' },
  { left: '91%', top: '2%', delay: '1s', duration: '19s' },
  { left: '7%', top: '4%', delay: '6s', duration: '13s' },
  { left: '93%', top: '7%', delay: '3s', duration: '20s' },
  { left: '15%', top: '10%', delay: '8s', duration: '16s' },
  { left: '85%', top: '13%', delay: '5s', duration: '14s' },
  { left: '33%', top: '25%', delay: '2s', duration: '18s' },
  { left: '67%', top: '35%', delay: '7s', duration: '15s' },
  { left: '37%', top: '45%', delay: '4s', duration: '17s' },
  { left: '63%', top: '55%', delay: '1s', duration: '19s' },
  { left: '27%', top: '65%', delay: '6s', duration: '13s' },
  { left: '73%', top: '75%', delay: '3s', duration: '20s' },
  { left: '43%', top: '85%', delay: '8s', duration: '16s' },
  { left: '57%', top: '95%', delay: '5s', duration: '14s' },
];

export default function Home() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [waitlistCount, setWaitlistCount] = useState(2847);
  const [userPosition, setUserPosition] = useState<number | null>(null);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 7,
    hours: 23,
    minutes: 45,
    seconds: 30
  });
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Animate waitlist count
  useEffect(() => {
    const interval = setInterval(() => {
      setWaitlistCount(prev => prev + Math.floor(Math.random() * 3));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const result = await addToWaitlist(formData);
    
    if (result.success) {
      setIsSubmitted(true);
      setUserPosition(result.position || null);
      setIsDuplicate(result.isDuplicate || false);
    } else {
      // Handle error - you could add error state here
      console.error(result.message);
    }
    
    setIsLoading(false);
  };

  const toggleFAQ = (index: number) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 relative overflow-hidden">
        {/* Floating particles */}
        <div className="absolute inset-0">
          {FLOATING_PARTICLES.map((particle, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full animate-float"
              style={{
                left: particle.left,
                top: particle.top,
                animationDelay: particle.delay,
                animationDuration: particle.duration
              }}
            />
          ))}
        </div>
        
        <div className="relative flex items-center justify-center min-h-screen px-4">
          <div className="max-w-lg w-full bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 text-center shadow-2xl">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-white mb-1">Wish Consult</h2>
              <p className="text-blue-200">The Future of Medical Mentorship</p>
            </div>
            <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-white mb-4">
              {isDuplicate ? 'Welcome Back! 🎉' : 'You\'re In! 🎉'}
            </h1>
            <p className="text-blue-100 mb-6 text-lg">
              {isDuplicate 
                ? `Great to see you again! You're still #${userPosition} on our exclusive invite list. Please be patient - we're working hard to get you access soon.`
                : `Welcome to the elite! You're now #${userPosition} on our exclusive invite list. You'll be among the very first to experience our revolutionary platform.`
              }
            </p>
            <p className="text-blue-200 mb-6 text-base">
              We'll notify you at{' '}
              <span className="font-semibold text-green-400">{email}</span> when we launch with exclusive founding member benefits, special discounts, and priority access to all our courses and mentorship programs.
            </p>
            
            <p className="text-sm text-blue-200 mb-6">
              {isDuplicate 
                ? 'Stay tuned for updates on your exclusive access.'
                : 'Get ready to transform your medical career with expert guidance.'
              }
            </p>
            
            <div className="flex items-center justify-center gap-3 text-blue-200 mb-6">
              <Linkedin className="w-5 h-5" />
              <span className="font-medium">Follow us for updates</span>
            </div>
            
            <button
              onClick={() => {
                setIsSubmitted(false);
                setEmail('');
                setUserPosition(null);
                setIsDuplicate(false);
              }}
              className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-white font-medium hover:bg-white/20 transition-all duration-300"
            >
              Back to Homepage
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 relative overflow-hidden">
      {/* Floating particles */}
      <div className="absolute inset-0">
        {FLOATING_PARTICLES.map((particle, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full animate-float"
            style={{
              left: particle.left,
              top: particle.top,
              animationDelay: particle.delay,
              animationDuration: particle.duration
            }}
          />
        ))}
        
        {/* Medical & Course Floating Icons */}
        <motion.div
          className="absolute top-20 left-10 text-blue-400/30"
          animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <Stethoscope className="w-8 h-8" />
        </motion.div>
        
        <motion.div
          className="absolute top-40 right-20 text-green-400/30"
          animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <GraduationCap className="w-6 h-6" />
        </motion.div>
        
        <motion.div
          className="absolute top-1/3 left-1/4 text-purple-400/30"
          animate={{ y: [-15, 15, -15], rotate: [0, 10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          <Microscope className="w-7 h-7" />
        </motion.div>
        
        <motion.div
          className="absolute bottom-1/3 right-1/3 text-blue-400/30"
          animate={{ y: [15, -15, 15], rotate: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        >
          <Heart className="w-6 h-6" />
        </motion.div>
        
        <motion.div
          className="absolute bottom-1/4 left-1/3 text-green-400/30"
          animate={{ y: [-8, 8, -8], rotate: [0, 8, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        >
          <Brain className="w-7 h-7" />
        </motion.div>
        
        <motion.div
          className="absolute top-1/2 right-1/4 text-purple-400/30"
          animate={{ y: [8, -8, 8], rotate: [0, -8, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        >
          <BookMarked className="w-6 h-6" />
        </motion.div>
        
        <motion.div
          className="absolute bottom-20 left-1/4 text-blue-400/30"
          animate={{ y: [-12, 12, -12], rotate: [0, 12, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 6 }}
        >
          <Video className="w-7 h-7" />
        </motion.div>
        
        <motion.div
          className="absolute top-1/4 right-1/3 text-green-400/30"
          animate={{ y: [12, -12, 12], rotate: [0, -12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 7 }}
        >
          <Target className="w-6 h-6" />
        </motion.div>
      </div>
      
      {/* Header Section */}
      <div className="relative max-w-7xl mx-auto px-4 py-8">
        {/* Navigation */}
        <nav className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-green-400 rounded-lg"></div>
            <span className="text-xl font-bold text-white">Wish Consult</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-blue-200">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#experts" className="hover:text-white transition-colors">Experts</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>
        </nav>

        {/* Hero Section */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Professional Badge */}
          <motion.div 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-green-500/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-blue-500/20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-blue-200">Early Access Platform</span>
          </motion.div>

          {/* Brand & Headline */}
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h2 className="text-5xl font-bold text-white mb-4 tracking-tight">Wish Consult</h2>
            <p className="text-xl text-blue-200 font-light">The Future of Medical Education</p>
          </motion.div>
          
          {/* 3D Cube */}
          <motion.div 
            className="flex justify-center mb-12"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="cube rotate-3d">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl shadow-2xl"></div>
            </div>
          </motion.div>
          
          <motion.h1 
            className="text-7xl font-bold text-white mb-8 leading-tight tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Expert Medical<br />
            <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              Guidance
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-2xl text-blue-100 max-w-4xl mx-auto mb-8 font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Join the exclusive learning platform where leading medical consultants provide structured mentorship to help medical students master complex specialties and advance their careers.
          </motion.p>

          {/* Countdown Timer - Smaller and repositioned */}
          <motion.div 
            className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-white/10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Clock className="w-4 h-4 text-yellow-400" />
            <span className="text-white text-sm">Special access opens in:</span>
            <div className="flex gap-2">
              <div className="bg-white/10 rounded px-2 py-1">
                <span className="text-white font-bold text-sm">{timeLeft.days}</span>
                <span className="text-blue-200 text-xs ml-1">d</span>
              </div>
              <div className="bg-white/10 rounded px-2 py-1">
                <span className="text-white font-bold text-sm">{timeLeft.hours}</span>
                <span className="text-blue-200 text-xs ml-1">h</span>
              </div>
              <div className="bg-white/10 rounded px-2 py-1">
                <span className="text-white font-bold text-sm">{timeLeft.minutes}</span>
                <span className="text-blue-200 text-xs ml-1">m</span>
              </div>
            </div>
          </motion.div>

          {/* Social Proof */}
          <motion.div 
            className="flex items-center justify-center gap-12 mb-16 text-blue-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-green-400" />
              <div>
                <div className="font-bold text-xl">{waitlistCount.toLocaleString()}+</div>
                <div className="text-sm text-blue-300">medical students joined</div>
              </div>
            </div>
            <div className="w-px h-12 bg-white/20"></div>
            <div className="flex items-center gap-3">
              <Star className="w-6 h-6 text-yellow-400" />
              <div>
                <div className="font-bold text-xl">94%</div>
                <div className="text-sm text-blue-300">success rate</div>
              </div>
            </div>
          </motion.div>
          
          {/* Email Form */}
          <motion.form 
            onSubmit={handleSubmit} 
            className="max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your professional email"
                className="flex-1 px-8 py-5 bg-transparent border-b-2 border-white/30 focus:border-blue-400 text-lg text-white placeholder-white/50 outline-none transition-colors"
                required
              />
              <button
                type="submit"
                disabled={isLoading}
                className="px-10 py-5 bg-gradient-to-r from-blue-500 to-green-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-green-700 transition-all duration-300 disabled:opacity-50 shadow-lg flex items-center gap-3 text-lg"
              >
                {isLoading ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Requesting...
                  </>
                ) : (
                  <>
                    Request Special Access
                    <ArrowRight className="w-6 h-6" />
                  </>
                )}
              </button>
            </div>
          </motion.form>
          
          <motion.p 
            className="text-sm text-blue-200 font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            Join a curated list of professionals preparing for the next step in their career.
          </motion.p>
        </motion.div>

        {/* Value Proposition Section */}
        <div id="features" className="grid md:grid-cols-3 gap-8 mb-20 relative">
          {/* 3D Floating Hexagons */}
          <div className="absolute -top-10 -left-10">
            <div className="hexagon w-12 h-12 bg-blue-500/20 float-3d"></div>
          </div>
          <div className="absolute -top-5 -right-10">
            <div className="hexagon w-8 h-8 bg-green-500/20 float-3d" style={{animationDelay: '2s'}}></div>
          </div>
          <div className="absolute -bottom-10 left-1/3">
            <div className="hexagon w-10 h-10 bg-blue-500/20 float-3d" style={{animationDelay: '4s'}}></div>
          </div>
          
          <motion.div 
            className="group text-center p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Users className="w-10 h-10 text-blue-400" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">
              Learn Directly from Consultants
            </h3>
            <p className="text-blue-200 leading-relaxed">
              Our programs are designed and led by experienced, practicing consultants, giving you access to the practical knowledge you won't find in textbooks.
            </p>
          </motion.div>

          <motion.div 
            className="group text-center p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <div className="w-20 h-20 bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <BookOpen className="w-10 h-10 text-green-400" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">
              Follow a Structured Mentorship Path
            </h3>
            <p className="text-blue-200 leading-relaxed">
              Move beyond random videos. Our courses provide a logical, step-by-step curriculum that ensures true mastery of the subject, from fundamentals to advanced application.
            </p>
          </motion.div>

          <motion.div 
            className="group text-center p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Shield className="w-10 h-10 text-purple-400" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">
              Trusted, Vetted Knowledge
            </h3>
            <p className="text-blue-200 leading-relaxed">
              Rely on a platform where all content is curated for accuracy and clinical relevance, so you can learn with confidence.
            </p>
          </motion.div>
        </div>

        {/* Expert Profiles Section */}
        <div id="experts" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Meet Our Expert Consultants</h2>
            <p className="text-xl text-blue-200">Learn from the best in their fields</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300 pulse-3d">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">DR</span>
              </div>
              <h3 className="text-xl font-semibold text-white text-center mb-2">Dr. Sarah Chen</h3>
              <p className="text-blue-300 text-center mb-3">Cardiovascular Surgery</p>
              <p className="text-blue-200 text-sm text-center">20+ years experience, Harvard Medical School</p>
            </div>
            
            <div className="group bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300 pulse-3d">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-teal-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">DR</span>
              </div>
              <h3 className="text-xl font-semibold text-white text-center mb-2">Dr. Michael Rodriguez</h3>
              <p className="text-blue-300 text-center mb-3">Neurology</p>
              <p className="text-blue-200 text-sm text-center">15+ years experience, Johns Hopkins</p>
            </div>
            
            <div className="group bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300 pulse-3d">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">DR</span>
              </div>
              <h3 className="text-xl font-semibold text-white text-center mb-2">Dr. Emily Watson</h3>
              <p className="text-blue-300 text-center mb-3">Oncology</p>
              <p className="text-blue-200 text-sm text-center">18+ years experience, Mayo Clinic</p>
            </div>
          </div>
        </div>

        {/* Feature Comparison Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose Wish Consult?</h2>
            <p className="text-xl text-blue-200">Compare with traditional learning methods</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
              <h3 className="text-2xl font-semibold text-white mb-6 text-center">Traditional Learning</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-blue-200">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span>Generic, one-size-fits-all approach</span>
                </li>
                <li className="flex items-center gap-3 text-blue-200">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span>No direct access to experts</span>
                </li>
                <li className="flex items-center gap-3 text-blue-200">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span>Unstructured, random content</span>
                </li>
                <li className="flex items-center gap-3 text-blue-200">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span>No accountability or progress tracking</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-2xl border border-blue-400/30 p-8">
              <h3 className="text-2xl font-semibold text-white mb-6 text-center">Wish Consult</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-blue-100">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Personalized mentorship paths</span>
                </li>
                <li className="flex items-center gap-3 text-blue-100">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Direct access to practicing consultants</span>
                </li>
                <li className="flex items-center gap-3 text-blue-100">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Structured, progressive curriculum</span>
                </li>
                <li className="flex items-center gap-3 text-blue-100">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Regular progress assessments & feedback</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div id="faq" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-blue-200">Everything you need to know</p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                question: "How does the special access work?",
                answer: "Join our exclusive invite list to get early access when we launch. We'll notify you via email when your spot is available, and you'll have priority access to our mentorship programs with special founding member benefits."
              },
              {
                question: "What medical specialties do you cover?",
                answer: "We cover all major medical specialties including cardiology, neurology, oncology, surgery, pediatrics, emergency medicine, and more. Our expert consultants represent the top 1% in their respective fields."
              },
              {
                question: "When will the platform launch?",
                answer: "We're launching in early 2025. Early access members will be notified first and receive exclusive benefits including priority enrollment and special pricing."
              },
              {
                question: "Is this suitable for medical students and residents?",
                answer: "Absolutely! Our programs are designed for medical students, residents, fellows, and practicing physicians at all levels who want to advance their expertise and career."
              },
              {
                question: "What makes Wish Consult different?",
                answer: "Unlike traditional learning platforms, we provide direct access to practicing medical consultants who create structured mentorship programs. You'll learn from experts who are actively working in their fields, not just academics."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
                >
                  <span className="text-white font-semibold text-lg">{faq.question}</span>
                  {activeFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-blue-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-blue-400" />
                  )}
                </button>
                {activeFAQ === index && (
                  <div className="px-6 pb-6">
                    <p className="text-blue-200">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="text-center mb-20">
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-3xl border border-white/20 p-12">
            <h2 className="text-4xl font-bold text-white mb-4">Ready for Exclusive Early Access?</h2>
            <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
              Join thousands of medical students who are already on the special invite list for early access to expert mentorship.
            </p>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your professional email"
                  className="flex-1 px-6 py-4 bg-transparent border-b-2 border-white/30 focus:border-blue-400 text-lg text-white placeholder-white/50 outline-none transition-colors"
                  required
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-green-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-green-700 transition-all duration-300 disabled:opacity-50 shadow-lg flex items-center gap-2 text-lg whitespace-nowrap"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Requesting...
                    </>
                  ) : (
                    <>
                      Get Access
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-sm border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-green-400 rounded-lg"></div>
                <span className="text-xl font-bold text-white">Wish Consult</span>
              </div>
              <p className="text-blue-200 mb-4">The future of medical mentorship is here.</p>
              <div className="flex gap-4">
                <Linkedin className="w-5 h-5 text-blue-400 hover:text-blue-300 cursor-pointer" />
                <Globe className="w-5 h-5 text-blue-400 hover:text-blue-300 cursor-pointer" />
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-blue-200">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Experts</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Success Stories</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-blue-200">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-blue-200">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>hello@wishconsult.org</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>San Francisco, CA</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-blue-200">
            <p>&copy; 2025 Wish Consult. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
