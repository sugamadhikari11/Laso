import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Zap, Users, Award, ArrowRight, Shirt, Sparkles } from 'lucide-react';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  };

  const features = [
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Custom Design",
      description: "Create unique jerseys with our intuitive design tools and endless customization options."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Real-time preview and instant design changes make the creation process seamless and fun."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Team Friendly",
      description: "Perfect for teams, clubs, and organizations looking to create matching custom apparel."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Premium Quality",
      description: "High-quality materials and professional printing ensure your designs look amazing."
    }
  ];

  const stats = [
    { number: "10K+", label: "Happy Customers" },
    { number: "50K+", label: "Jerseys Created" },
    { number: "99%", label: "Satisfaction Rate" },
    { number: "24/7", label: "Support Available" }
  ];

  return (
    <motion.section 
      id='About'
      className="scroll-smooth  py-2 xl:px-20"
      variants={containerVariants}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-20"
          variants={itemVariants}
        >
          <motion.div 
            className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-medium mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4" />
            About LASO
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Crafting Your
            <span className="text-red-600 block">Perfect Jersey</span>
          </h2>
          
          <p className="text-xl text-gray max-w-3xl mx-auto leading-relaxed">
            We believe everyone deserves to wear something that represents their unique style and passion. 
            That's why we created LASO — to make custom jersey design accessible, fun, and professional.
          </p>
        </motion.div>

        {/* Story Section */}
        <motion.div 
          className="grid md:grid-cols-2 gap-16 items-center mb-20"
          variants={itemVariants}
        >
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h3>
            <div className="space-y-4 text-gray leading-relaxed">
              <p>
                Born from a passion for sports and design, LASO started as a simple idea: 
                what if anyone could create professional-quality jerseys without the hassle 
                of complex design software or minimum order quantities?
              </p>
              <p>
                Today, we're proud to serve thousands of athletes, teams, and creative individuals 
                who trust us to bring their visions to life. Every jersey tells a story, and we're 
                here to help you tell yours.
              </p>
            </div>
            
            <motion.button
              className="mt-8 inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
          
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-8 text-white">
              <Shirt className="w-16 h-16 mb-6 opacity-80" />
              <h4 className="text-2xl font-bold mb-4">Design Philosophy</h4>
              <p className="text-red-100">
                "Great design isn't just about how it looks — it's about how it makes you feel. 
                Every jersey should make you feel confident, unique, and ready to perform your best."
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="mb-20 bg-white"
          variants={itemVariants}
        >
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose LASO?
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center"
                variants={cardVariants}
                whileHover="hover"
              >
                <div className="text-red-600 flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="bg-gray-900 rounded-2xl p-12 text-center text-white"
          variants={itemVariants}
        >
          <h3 className="text-3xl font-bold mb-12">Trusted by Thousands</h3>
          
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl md:text-5xl font-bold text-red-400">
                  {stat.number}
                </div>
                <div className="text-gray-300 text-sm uppercase tracking-wide">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="text-center mt-20"
          variants={itemVariants}
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Create Something Amazing?
          </h3>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have brought their jersey designs to life with LASO.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="bg-red-600 text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-red-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Designing Now
            </motion.button>
            <motion.button
              className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-medium text-lg hover:border-gray-400 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Examples
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default About;