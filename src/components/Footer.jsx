import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowUp
} from 'lucide-react';
import { getIcon } from '../utils/iconMapper';
import footerConfig from '../data/footerConfig.json';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  // Get data from JSON config
  const { branding, classStats, quickLinks, contact, socialLinks, copyright } = footerConfig;

  // Convert icon names to components
  const processedQuickLinks = quickLinks.map(link => ({
    ...link,
    icon: getIcon(link.icon)
  }));

  const processedSocialLinks = socialLinks.map(social => ({
    ...social,
    icon: getIcon(social.icon)
  }));

  const processedClassStats = classStats.map(stat => ({
    ...stat,
    icon: getIcon(stat.icon)
  }));

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        ></div>
        
        {/* Top Border Glow */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10">
        
        {/* Top Section */}
        <div className="border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              
              {/* Brand Section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-5"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center relative"
                    style={{
                      background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #f59e0b 100%)',
                      boxShadow: '0 8px 32px rgba(59, 130, 246, 0.3)'
                    }}
                  >
                    {React.createElement(getIcon('Sparkles'), { className: "w-8 h-8 text-white" })}
                    <div className="absolute inset-0 rounded-2xl bg-white/20 animate-pulse"></div>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      {branding.name}
                    </h2>
                    <p className="text-blue-300 font-medium">{branding.tagline} • Class of {branding.academicYear}</p>
                  </div>
                </div>
                
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  {branding.description}
                </p>

                {/* Class Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {processedClassStats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 flex flex-col items-center justify-center"
                    >
                      <stat.icon className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-sm text-gray-400 text-center">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Quick Links */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-3"
              >
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  {React.createElement(getIcon('BookOpen'), { className: "w-5 h-5 text-blue-400" })}
                  Quick Links
                </h3>
                <nav className="space-y-3">
                  {processedQuickLinks.map((link) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-3 text-gray-300 hover:text-white transition-all duration-300 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                        <link.icon className="w-4 h-4" />
                      </div>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {link.name}
                      </span>
                    </motion.a>
                  ))}
                </nav>
              </motion.div>

              {/* Contact & Social */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="lg:col-span-4"
              >
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  {React.createElement(getIcon('Heart'), { className: "w-5 h-5 text-red-400" })}
                  Connect With Us
                </h3>
                
                {/* Contact Info */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-gray-300">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                      {React.createElement(getIcon('MapPin'), { className: "w-4 h-4 text-green-400" })}
                    </div>
                    <span>{contact.schoolName}, {contact.city}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                      {React.createElement(getIcon('Mail'), { className: "w-4 h-4 text-blue-400" })}
                    </div>
                    <span>{contact.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                      {React.createElement(getIcon('Calendar'), { className: "w-4 h-4 text-purple-400" })}
                    </div>
                    <span>{contact.academicYear}</span>
                  </div>
                </div>

                {/* Social Links */}
                <div>
                  <p className="text-sm text-gray-400 mb-4">Follow our journey</p>
                  <div className="flex items-center gap-3">
                    {processedSocialLinks.map((social) => (
                      <motion.a
                        key={social.name}
                        href={social.href}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-10 h-10 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-gray-400 transition-all duration-300 ${social.color} hover:border-white/20 hover:bg-white/10`}
                      >
                        <social.icon className="w-5 h-5" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              
              {/* Copyright */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center sm:text-left"
              >
                <p className="text-gray-400 text-sm">
                  &copy; {currentYear} {branding.name}. {copyright.text}
                </p>
                <p className="text-gray-500 text-xs mt-1 flex items-center justify-center sm:justify-start gap-1">
                  {copyright.madeWithLove.split('❤️')[0]}{React.createElement(getIcon('Heart'), { className: "w-3 h-3 text-red-400 animate-pulse" })}{copyright.madeWithLove.split('❤️')[1]}
                </p>
              </motion.div>

              {/* Back to Top */}
              <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
              >
                <ArrowUp className="w-4 h-4" />
                <span className="text-sm font-medium">Back to Top</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;