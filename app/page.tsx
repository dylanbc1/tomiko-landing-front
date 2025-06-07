/* eslint-disable */
'use client'
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Code, 
  BarChart3, 
  MessageSquare, 
  LineChart, 
  ShoppingCart, 
  Award, 
  BookOpen, 
  Users, 
  Send,
  Menu,
  X,
  ArrowRight,
  CheckCircle,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

const AIChat = () => {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: '¡Hola! Soy el asistente virtual de TOMIKO. ¿En qué puedo ayudarte hoy?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API;

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { type: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage]
        }),
      });

      if (!response.ok) {
        throw new Error('Error en la comunicación con el servidor');
      }

      const data = await response.json();

      setMessages(prev => [...prev, {
        type: 'bot',
        content: data.response
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        type: 'bot',
        content: 'Lo siento, ha ocurrido un error. Por favor, intenta de nuevo.'
      }]);
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
      <div className="p-6 bg-gray-900 text-white">
        <h3 className="text-xl font-semibold flex items-center gap-3">
          <Brain className="w-6 h-6" />
          Asistente Virtual TOMIKO
        </h3>
        <p className="text-gray-300 text-sm mt-1">Powered by Gemini AI</p>
      </div>

      <div className="h-96 overflow-y-auto p-6 bg-gray-50">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${message.type === 'user' ? 'text-right' : ''}`}
          >
            <div
              className={`inline-block p-4 rounded-lg max-w-[80%] ${
                message.type === 'user'
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-800 shadow-md border border-gray-200'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex space-x-2 p-4 max-w-[80%]">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
          </div>
        )}
      </div>

      <div className="p-6 border-t border-gray-200">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Escribe tu mensaje..."
            className="flex-1 p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />
          <button
            onClick={handleSend}
            className="p-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

interface NavbarProps {
  activeSection: number;
  setActiveSection: (section: number) => void;
}

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'hero', label: 'Inicio' },
    { id: 'services', label: 'Servicios' },
    { id: 'innovation', label: 'Innovación' },
    { id: 'ai-demo', label: 'Demo IA' },
    { id: 'about', label: 'Nosotros' },
    { id: 'contact', label: 'Contacto' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-gray-900">TOMIKO</h1>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-gray-900 p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium w-full text-left"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const TomikoLanding = () => {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'services', 'innovation', 'ai-demo', 'about', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && scrollPosition >= element.offsetTop) {
          setActiveSection(i);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Desarrollo Web Integral",
      description: "Creamos aplicaciones web modernas, escalables y vanguardistas que impulsan tu presencia digital."
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Inteligencia Artificial",
      description: "Implementamos chatbots inteligentes y soluciones de IA que automatizan y optimizan tus procesos."
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Ciencia de Datos",
      description: "Transformamos tus datos en insights valiosos para la toma de decisiones estratégicas."
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Soluciones Tecnológicas",
      description: "Desarrollamos soluciones innovadoras personalizadas para potenciar tu negocio."
    }
  ];

  const features = [
    "Chatbots con IA avanzada",
    "Analytics en tiempo real",
    "E-commerce inteligente",
    "Automatización de procesos",
    "Análisis predictivo",
    "Integración de APIs"
  ];

  return (
    <div className="bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              TOMIKO
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Soluciones tecnológicas innovadoras que transforman y potencian tu negocio hacia el futuro digital
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
              >
                Comenzar ahora
                <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Ver servicios
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Nuestros Servicios
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ofrecemos soluciones tecnológicas integrales para impulsar tu negocio hacia el éxito digital
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-shadow"
              >
                <div className="text-gray-900 mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Innovation Section */}
      <section id="innovation" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Innovación que Transforma
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                En TOMIKO, combinamos las últimas tecnologías con estrategias innovadoras para crear 
                soluciones que no solo resuelven problemas actuales, sino que preparan tu negocio 
                para el futuro.
              </p>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <blockquote className="text-lg text-gray-700 mb-6">
                "TOMIKO ha revolucionado nuestra forma de hacer negocios. La implementación de IA 
                y analytics nos ha permitido un constante avance y renovación de nuestras finanzas, 
                mejorando significativamente nuestros resultados."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Cliente Satisfecho</p>
                  <p className="text-gray-600">Empresa Tecnológica</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI Demo Section */}
      <section id="ai-demo" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Experimenta el Poder de la IA
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              Prueba en tiempo real cómo nuestros asistentes virtuales pueden transformar 
              la interacción con tus usuarios y optimizar tus procesos de atención al cliente.
            </p>
          </motion.div>
          
          <div className="flex justify-center">
            <AIChat />
          </div>
          
          <p className="text-center text-gray-500 mt-8 max-w-2xl mx-auto">
            Este es solo un ejemplo de lo que podemos crear para tu negocio. 
            Nuestros chatbots se adaptan completamente a tus necesidades específicas.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Nuestra Experiencia
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Un equipo de profesionales comprometidos con la excelencia y la innovación tecnológica
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <Award className="w-16 h-16 mx-auto mb-6 text-gray-900" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Excelencia Académica</h3>
              <p className="text-gray-600">
                Nuestro equipo cuenta con miembros de las mejores universidades en tecnología 
                y ciencias de la computación del país.
              </p>
            </div>
            <div className="text-center">
              <BookOpen className="w-16 h-16 mx-auto mb-6 text-gray-900" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Certificaciones</h3>
              <p className="text-gray-600">
                Certificados en las últimas tecnologías por Google, Microsoft, Coursera 
                y otras empresas líderes en el sector.
              </p>
            </div>
            <div className="text-center">
              <Users className="w-16 h-16 mx-auto mb-6 text-gray-900" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Experiencia Comprobada</h3>
              <p className="text-gray-600">
                Años de experiencia creando soluciones tecnológicas innovadoras 
                y eficientes para diversos sectores.
              </p>
            </div>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg">
            <h3 className="text-3xl font-semibold text-gray-900 mb-6 text-center">Nuestro Compromiso</h3>
            <p className="text-gray-700 text-lg leading-relaxed max-w-4xl mx-auto text-center">
              En TOMIKO, nos dedicamos a la excelencia tecnológica y la innovación continua. 
              Nuestro equipo multidisciplinario combina conocimientos técnicos avanzados con 
              una profunda comprensión de las necesidades empresariales. Creemos en el poder 
              transformador de la tecnología y nos comprometemos a ser tu socio estratégico 
              en el camino hacia el éxito digital.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Comencemos Juntos
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transformemos tu visión en realidad. Agenda una consulta gratuita y descubre 
              cómo TOMIKO puede impulsar tu negocio hacia el futuro digital.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-8">Información de Contacto</h3>
              
              <div className="flex items-center gap-4">
                <MapPin className="w-6 h-6 text-gray-600" />
                <div>
                  <p className="font-semibold text-gray-900">Ubicación</p>
                  <p className="text-gray-600">Colombia</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Mail className="w-6 h-6 text-gray-600" />
                <div>
                  <p className="font-semibold text-gray-900">Email</p>
                  <p className="text-gray-600">tomiko@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Phone className="w-6 h-6 text-gray-600" />
                <div>
                  <p className="font-semibold text-gray-900">Teléfono</p>
                  <p className="text-gray-600">+57 3173503132</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">¿Listo para comenzar?</h3>
              <p className="text-gray-700 mb-8">
                Contáctanos hoy mismo y descubre cómo podemos ayudarte a transformar tu negocio 
                con soluciones tecnológicas innovadoras y personalizadas.
              </p>
              <button className="w-full bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                Agenda tu consulta gratuita
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">TOMIKO</h3>
              <p className="text-gray-400">
                Soluciones tecnológicas innovadoras para el éxito de tu negocio
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Servicios</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Desarrollo Web</li>
                <li>Inteligencia Artificial</li>
                <li>Ciencia de Datos</li>
                <li>Soluciones Tecnológicas</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Empresa</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Sobre Nosotros</li>
                <li>Nuestro Equipo</li>
                <li>Casos de Éxito</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Política de Privacidad</li>
                <li>Términos de Servicio</li>
                <li>Cookies</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>© 2025 TOMIKO. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TomikoLanding;