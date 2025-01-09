'use client'
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Code, BarChart3, MessageSquare, LineChart, ShoppingCart, ChevronDown, Award, BookOpen, Users, Send  } from 'lucide-react';

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
        console.log(response)
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
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Cambiado el color de la barra superior */}
      <div className="p-4 bg-green-700 text-white">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Brain className="w-5 h-5" />
          Chat con IA
        </h3>
      </div>

      <div className="h-96 overflow-y-auto p-4 bg-gray-50">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${message.type === 'user' ? 'text-right' : ''}`}
          >
            <div
              className={`inline-block p-3 rounded-lg max-w-[80%] ${
                message.type === 'user'
                  ? 'bg-green-700 text-white' // Cambiado el color de los mensajes del usuario
                  : 'bg-white text-gray-800 shadow'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex space-x-2 p-3 max-w-[80%]">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
          </div>
        )}
      </div>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Escribe tu mensaje..."
            className="flex-1 p-2 border rounded-lg text-gray-600 focus:outline-none focus:border-green-600"
          />
          <button
            onClick={handleSend}
            className="p-2 bg-green-700 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

const TomikoLanding = () => {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      const windowHeight = window.innerHeight;
      const section = Math.floor(position / windowHeight);
      setActiveSection(section);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sections = [
    {
      id: 'hero',
      backgroundColor: 'bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900',
      content: (
        <div className="text-white text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-7xl font-bold mb-6">TOMIKO</h1>
            <p className="text-2xl mb-8 text-blue-200">Donde la innovación encuentra el éxito</p>
            <div className="animate-bounce mt-20">
              <ChevronDown className="w-8 h-8 mx-auto text-blue-200" />
            </div>
          </motion.div>
        </div>
      )
    },
    {
      id: 'future',
      backgroundColor: 'bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900',
      content: (
        <div className="text-white max-w-4xl mx-auto text-center px-4 py-8 md:py-0">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="space-y-8 md:space-y-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold">El futuro es ahora</h2>
            <p className="text-lg md:text-xl text-purple-200">
              La tecnología está transformando los negocios. ¿Estás preparado para el cambio?
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div className="bg-white/10 p-6 rounded-lg backdrop-blur-lg">
                <Brain className="w-12 h-12 mb-4 mx-auto text-purple-300" />
                <h3 className="text-xl font-semibold mb-2">IA avanzada</h3>
                <p className="text-purple-200">Potencia tu negocio con inteligencia artificial</p>
              </div>
              <div className="bg-white/10 p-6 rounded-lg backdrop-blur-lg">
                <Code className="w-12 h-12 mb-4 mx-auto text-purple-300" />
                <h3 className="text-xl font-semibold mb-2">Desarrollo web</h3>
                <p className="text-purple-200">Soluciones web modernas y escalables</p>
              </div>
              <div className="bg-white/10 p-6 rounded-lg backdrop-blur-lg">
                <BarChart3 className="w-12 h-12 mb-4 mx-auto text-purple-300" />
                <h3 className="text-xl font-semibold mb-2">Análisis de datos</h3>
                <p className="text-purple-200">Decisiones basadas en datos reales</p>
              </div>
            </div>
          </motion.div>
        </div>
      )
    },
    {
      id: 'innovation',
      backgroundColor: 'bg-gradient-to-br from-pink-900 via-red-800 to-orange-900',
      content: (
        <div className="text-white max-w-5xl mx-auto px-4 py-8 md:py-0">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="space-y-8 md:space-y-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Innovación que transforma</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div>
                <h3 className="text-3xl font-semibold mb-6">Tecnologías de vanguardia</h3>
                <ul className="space-y-4 text-lg">
                  <li className="flex items-center gap-3">
                    <MessageSquare className="w-6 h-6 text-pink-300" />
                    Chatbots con IA avanzada
                  </li>
                  <li className="flex items-center gap-3">
                    <LineChart className="w-6 h-6 text-pink-300" />
                    Analytics en tiempo real
                  </li>
                  <li className="flex items-center gap-3">
                    <ShoppingCart className="w-6 h-6 text-pink-300" />
                    E-commerce inteligente
                  </li>
                </ul>
              </div>
              <div className="bg-white/10 p-8 rounded-lg backdrop-blur-lg">
                <p className="text-xl leading-relaxed text-pink-200">
                  TOMIKO puede revolucionar tu forma de hacer negocios. La implementación de IA 
                  y analytics permite el constante avance y renovación de las finanzas.
                </p>
                {/*<p className="mt-4 text-pink-300">- Cliente satisfecho</p>*/}
              </div>
            </div>
          </motion.div>
        </div>
      )
    },
    {
      id: 'ai-chat',
      backgroundColor: 'bg-gradient-to-br from-gray-900 via-green-900 to-green-800',
      content: (
        <div className="w-full max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="min-h-screen flex flex-col items-center justify-center py-16 md:py-24" // Añadido padding vertical significativo
          >
            <div className="text-center text-white mb-16"> {/* Aumentado el margen inferior */}
              <h2 className="text-4xl md:text-5xl font-bold mb-6"> {/* Aumentado el margen inferior */}
                Prueba de lo que la IA es capaz
              </h2>
              <p className="text-xl text-blue-200 max-w-2xl mx-auto">
                Experimenta el poder de la inteligencia artificial en tiempo real. 
                Habla con la simulación de un asistente virtual y descubre cómo podemos ayudarte.
              </p>
            </div>
            
            <div className="w-full max-w-2xl mx-auto relative">
              <div className="absolute inset-0 bg-green-600/20 blur-xl rounded-lg transform -rotate-3"></div>
              <div className="absolute inset-0 bg-green-600/20 blur-xl rounded-lg transform rotate-3"></div>
              <div className="relative"> {/* Wrapper para el chat con efecto de profundidad */}
                <AIChat />
              </div>
            </div>
    
            <p className="text-blue-200 mt-8 text-center text-sm max-w-md mx-auto">
              Powered by Gemini AI - Consultas ilimitadas y gratuitas para ayudarte a entender mejor nuestros servicios
            </p>
          </motion.div>
        </div>
      )
    },
    {
      id: 'contact',
      backgroundColor: 'bg-gradient-to-br from-orange-900 via-yellow-800 to-yellow-700',
      content: (
        <div className="text-white max-w-4xl mx-auto px-4 py-8 md:py-0">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="space-y-8 md:space-y-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold">Comencemos</h2>
            <p className="text-xl mb-12 text-yellow-200">
              Transformemos tu visión en realidad. Agenda una consulta gratuita y descubre 
              cómo TOMIKO puede impulsar tu negocio hacia el futuro.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left bg-white/10 p-8 rounded-lg backdrop-blur-lg">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Contáctanos</h3>
                <ul className="space-y-4">
                  <li>📍 Colombia</li>
                  <li>📧 tomiko@gmail.com</li>
                  <li>📱 +57 3173503132</li>
                </ul>
              </div>
              {/*
                <div>
                <h3 className="text-2xl font-semibold mb-4">Síguenos</h3>
                <div className="flex gap-6">
                  <a href="#" className="text-yellow-200 hover:text-white transition-colors">
                    LinkedIn
                  </a>
                  <a href="#" className="text-yellow-200 hover:text-white transition-colors">
                    Twitter
                  </a>
                  <a href="#" className="text-yellow-200 hover:text-white transition-colors">
                    Instagram
                  </a>
                </div>
              </div>
              */}
            </div>
            <button className="mt-12 bg-white text-orange-900 px-12 py-4 rounded-full text-lg font-semibold hover:bg-yellow-100 transition-colors">
              Agenda tu consulta
            </button>
          </motion.div>
        </div>
      )
    },
    {
      id: 'about',
      backgroundColor: 'bg-white',
      content: (
        <div className="text-gray-800 max-w-6xl mx-auto px-4 py-12 md:py-0">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="space-y-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900">Nuestra experiencia</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="text-center">
                <Award className="w-16 h-16 mx-auto mb-4 text-blue-600" />
                <h3 className="text-2xl font-semibold mb-4">Excelencia académica</h3>
                <p className="text-gray-600">
                  Nuestro equipo cuenta con miembros de las mejores universidades en tecnología y ciencias de la computación del país.
                </p>
              </div>
              <div className="text-center">
                <BookOpen className="w-16 h-16 mx-auto mb-4 text-blue-600" />
                <h3 className="text-2xl font-semibold mb-4">Certificaciones</h3>
                <p className="text-gray-600">
                  Certificados en las últimas tecnologías por Google, Microsoft, Coursera y otras empresas líderes en el sector.
                </p>
              </div>
              <div className="text-center">
                <Users className="w-16 h-16 mx-auto mb-4 text-blue-600" />
                <h3 className="text-2xl font-semibold mb-4">Experiencia comprobada</h3>
                <p className="text-gray-600">
                  Años de experiencia en el sector creando soluciones tecnológicas innovadoras y eficientes.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-3xl font-semibold mb-6 text-center">Nuestro compromiso</h3>
              <p className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto text-center">
                En TOMIKO, nos dedicamos a la excelencia tecnológica y la innovación continua. 
                Nuestro equipo multidisciplinario combina conocimientos técnicos avanzados con 
                una profunda comprensión de las necesidades empresariales. Creemos en el poder 
                transformador de la tecnología y nos comprometemos a ser tu socio en el camino 
                hacia el éxito digital.
              </p>
            </div>
          </motion.div>
        </div>
      )
    },
  ];

  return (
    <div>
      {sections.map((section, index) => (
        <section
          key={section.id}
          className={`min-h-screen ${section.backgroundColor} flex items-center justify-center relative`}
        >
          {section.content}
        </section>
      ))}
      
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">TOMIKO</h3>
            <p className="text-gray-400">Innovación tecnológica para tu éxito</p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Servicios</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Desarrollo Web</li>
              <li>Inteligencia Artificial</li>
              <li>Análisis de Datos</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Empresa</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Sobre Nosotros</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Privacidad</li>
              <li>Términos</li>
              <li>Cookies</li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© 2025 TOMIKO. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default TomikoLanding;