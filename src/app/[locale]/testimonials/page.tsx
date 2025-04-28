'use client';

import { useParams } from 'next/navigation';
import { getTranslations } from '@/lib/getTranslations';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import { useState, useEffect } from 'react';
import { FaQuoteLeft, FaThumbsUp, FaBuilding, FaBriefcase, FaUserCircle, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Testimonial } from '@/models/Testimonial';

export default function Testimonials() {
  const params = useParams();
  const locale = params.locale as string;
  const t = getTranslations(locale);
  
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    position: '',
    testimonial: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [activeSlide, setActiveSlide] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Buscar depoimentos ao carregar a página
  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const response = await fetch('/api/testimonials');
        if (!response.ok) throw new Error('Falha ao buscar depoimentos');
        const data = await response.json();
        setTestimonials(data);
      } catch (error) {
        console.error('Erro ao buscar depoimentos:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTestimonials();
  }, []);

  // Gerenciar mudanças no formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Limpar erros ao digitar
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validar formulário
  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      errors.name = locale === 'en' ? 'Name is required' : 'Nome é obrigatório';
    }
    
    if (!formData.company.trim()) {
      errors.company = locale === 'en' ? 'Company is required' : 'Empresa é obrigatória';
    }
    
    if (!formData.position.trim()) {
      errors.position = locale === 'en' ? 'Position is required' : 'Cargo é obrigatório';
    }
    
    if (!formData.testimonial.trim()) {
      errors.testimonial = locale === 'en' ? 'Testimonial is required' : 'Depoimento é obrigatório';
    } else if (formData.testimonial.length < 20) {
      errors.testimonial = locale === 'en' 
        ? 'Testimonial must be at least 20 characters' 
        : 'Depoimento deve ter pelo menos 20 caracteres';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Enviar novo depoimento
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) throw new Error('Falha ao enviar depoimento');
      
      // Limpar formulário após o envio bem-sucedido
      setFormData({
        name: '',
        company: '',
        position: '',
        testimonial: ''
      });
      
      setSuccessMessage(
        locale === 'en' 
          ? 'Your testimonial has been submitted and is awaiting approval. Thank you!' 
          : 'Seu depoimento foi enviado e está aguardando aprovação. Obrigado!'
      );
      
      // Esconder mensagem após 5 segundos
      setTimeout(() => setSuccessMessage(''), 5000);
      
    } catch (error) {
      console.error('Erro ao enviar depoimento:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Votar em um depoimento
  const handleVote = async (id: number) => {
    try {
      const response = await fetch('/api/testimonials/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      
      if (!response.ok) throw new Error('Falha ao votar');
      
      const updatedTestimonial = await response.json();
      
      // Atualizar o estado com o depoimento atualizado
      setTestimonials(prev => 
        prev.map(t => t.id === updatedTestimonial.id ? updatedTestimonial : t)
      );
      
    } catch (error) {
      console.error('Erro ao votar:', error);
    }
  };

  // Controles do carrossel
  const nextSlide = () => {
    setActiveSlide((prev) => 
      prev === Math.ceil(testimonials.length / 3) - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setActiveSlide((prev) => 
      prev === 0 ? Math.ceil(testimonials.length / 3) - 1 : prev - 1
    );
  };

  // Variantes de animação
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const cardVariants = {
    hover: {
      scale: 1.03,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.3 }
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, delay: 0.2 }
    }
  };

  // Calcular índices de depoimentos para exibição por página
  const itemsPerPage = 3;
  const startIdx = activeSlide * itemsPerPage;
  const visibleTestimonials = testimonials.slice(startIdx, startIdx + itemsPerPage);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-950">
      <Navigation locale={locale} />
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl sm:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-4">
              {locale === 'en' ? 'Testimonials' : 'Depoimentos'}
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              {locale === 'en' 
                ? 'See what people are saying about my work and share your experience.'
                : 'Veja o que as pessoas estão dizendo sobre meu trabalho e compartilhe sua experiência.'}
            </p>
          </motion.div>

          {/* Lista de depoimentos */}
          <div className="mb-16">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center"
            >
              {locale === 'en' ? 'What People Say' : 'O Que Dizem Sobre Mim'}
            </motion.h2>
            
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="relative w-20 h-20">
                  <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-t-blue-500 border-r-blue-300 border-b-purple-500 border-l-purple-300 animate-spin"></div>
                  <div className="absolute top-2 left-2 w-16 h-16 rounded-full border-4 border-t-transparent border-r-blue-400 border-b-transparent border-l-purple-400 animate-spin animation-delay-200"></div>
                </div>
              </div>
            ) : testimonials.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-10 max-w-2xl mx-auto"
              >
                <p className="text-center text-gray-500 dark:text-gray-400 mb-4">
                  {locale === 'en' 
                    ? 'No testimonials yet. Be the first to share your experience!'
                    : 'Nenhum depoimento ainda. Seja o primeiro a compartilhar sua experiência!'}
                </p>
                <div className="flex justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => document.getElementById('testimonial-form')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    {locale === 'en' ? 'Add Your Testimonial' : 'Adicionar Seu Depoimento'}
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <>
                <div className="relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeSlide}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.5 }}
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8"
                    >
                      {visibleTestimonials.map((testimonial) => (
                        <motion.div
                          key={testimonial.id}
                          variants={cardVariants}
                          whileHover="hover"
                          onHoverStart={() => setHoveredCard(testimonial.id)}
                          onHoverEnd={() => setHoveredCard(null)}
                          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 relative overflow-hidden border border-gray-100 dark:border-gray-700"
                        >
                          <div 
                            className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 opacity-20 rounded-2xl"
                            style={{ 
                              clipPath: 'polygon(0 0, 100% 0, 100% 70%, 0 100%)',
                              transition: 'all 0.3s ease'
                            }}
                          />
                          
                          <div className="absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-800/20 dark:to-purple-800/20 rounded-full opacity-60 z-0" />
                          
                          <button 
                            onClick={() => handleVote(testimonial.id)}
                            className={`absolute top-6 right-6 flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-300 z-10 ${
                              hoveredCard === testimonial.id 
                                ? 'bg-blue-500 text-white shadow-md'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                            }`}
                            aria-label={locale === 'en' ? 'Vote for this testimonial' : 'Votar neste depoimento'}
                          >
                            <FaThumbsUp className={hoveredCard === testimonial.id ? 'animate-bounce' : ''} />
                            <span className="font-medium">{testimonial.votes}</span>
                          </button>
                          
                          <div className="relative">
                            <FaQuoteLeft className="text-blue-400 dark:text-blue-500 opacity-30 text-5xl absolute -top-1 -left-2" />
                            <div className="mt-6 mb-8 relative z-10 pl-6">
                              <p className="text-gray-700 dark:text-gray-300 italic leading-relaxed">
                                "{testimonial.testimonial}"
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 relative z-10">
                            <div className="mr-4">
                              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold shadow-md transform transition-transform duration-300 hover:scale-110">
                                {testimonial.name.charAt(0)}
                              </div>
                            </div>
                            <div className="flex-1">
                              <h3 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h3>
                              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                                <FaBriefcase className="mr-1.5 text-gray-400" size={12} />
                                <span>{testimonial.position}</span>
                                <span className="mx-1.5">•</span>
                                <FaBuilding className="mr-1.5 text-gray-400" size={12} />
                                <span>{testimonial.company}</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                  
                  {testimonials.length > 3 && (
                    <div className="flex justify-center mt-8 gap-4">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={prevSlide}
                        className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center text-gray-800 dark:text-white hover:bg-blue-500 hover:text-white dark:hover:bg-blue-600 transition-colors duration-300"
                      >
                        <FaChevronLeft />
                      </motion.button>
                      <div className="flex gap-2">
                        {Array.from({ length: Math.ceil(testimonials.length / itemsPerPage) }).map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveSlide(idx)}
                            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                              activeSlide === idx 
                                ? 'bg-blue-500 w-8' 
                                : 'bg-gray-300 dark:bg-gray-600 hover:bg-blue-300 dark:hover:bg-blue-700'
                            }`}
                            aria-label={`Page ${idx + 1}`}
                          />
                        ))}
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={nextSlide}
                        className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center text-gray-800 dark:text-white hover:bg-blue-500 hover:text-white dark:hover:bg-blue-600 transition-colors duration-300"
                      >
                        <FaChevronRight />
                      </motion.button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Formulário para enviar depoimento */}
          <motion.div 
            id="testimonial-form"
            variants={formVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-10"
          >
            <h2 className="text-2xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              {locale === 'en' ? 'Share Your Experience' : 'Compartilhe Sua Experiência'}
            </h2>
            
            {successMessage && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-700 dark:text-green-300"
              >
                {successMessage}
              </motion.div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {locale === 'en' ? 'Your Name' : 'Seu Nome'}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUserCircle className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                        formErrors.name 
                          ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20' 
                          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200`}
                      placeholder={locale === 'en' ? 'Enter your name' : 'Digite seu nome'}
                    />
                  </div>
                  {formErrors.name && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.name}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {locale === 'en' ? 'Company' : 'Empresa'}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaBuilding className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                        formErrors.company 
                          ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20' 
                          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200`}
                      placeholder={locale === 'en' ? 'Enter your company' : 'Digite sua empresa'}
                    />
                  </div>
                  {formErrors.company && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.company}</p>
                  )}
                </div>
              </div>
              
              <div>
                <label htmlFor="position" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {locale === 'en' ? 'Your Position' : 'Seu Cargo'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaBriefcase className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                      formErrors.position 
                        ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20' 
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200`}
                    placeholder={locale === 'en' ? 'Enter your position' : 'Digite seu cargo'}
                  />
                </div>
                {formErrors.position && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.position}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="testimonial" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {locale === 'en' ? 'Your Testimonial' : 'Seu Depoimento'}
                </label>
                <textarea
                  id="testimonial"
                  name="testimonial"
                  value={formData.testimonial}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    formErrors.testimonial 
                      ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20' 
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200`}
                  placeholder={locale === 'en' ? 'Share your experience working with me...' : 'Compartilhe sua experiência trabalhando comigo...'}
                />
                {formErrors.testimonial && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.testimonial}</p>
                )}
              </div>
              
              <div className="flex justify-center pt-4">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full md:w-auto px-8 py-3 rounded-lg font-medium text-white ${
                    isSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg transition-shadow duration-300'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {locale === 'en' ? 'Submitting...' : 'Enviando...'}
                    </span>
                  ) : (
                    <span>
                      {locale === 'en' ? 'Submit Testimonial' : 'Enviar Depoimento'}
                    </span>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </main>
  );
} 