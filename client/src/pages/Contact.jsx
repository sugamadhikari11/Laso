import React from 'react';
import { Instagram, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
      <motion.section
      id='Contact' 
      className="scroll-smooth">
      
    <div className="max-w-4xl mx-auto px-6 py-20">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Contact Us
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          We'd love to hear from you. Reach out via Instagram or phone.
        </p>
      </div>

      {/* Contact Cards */}
      <div className="grid sm:grid-cols-2 gap-8">
        {/* Instagram Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4 mb-4">
            <Instagram className="text-pink-500 w-6 h-6" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Instagram
            </h2>
          </div>
          <p className="text-gray-700 dark:text-gray-300">
            Follow us and message: <br />
            <a
              href="https://instagram.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              @yourusername
            </a>
          </p>
        </div>

        {/* Phone Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4 mb-4">
            <Phone className="text-green-500 w-6 h-6" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Call Us
            </h2>
          </div>
          <p className="text-gray-700 dark:text-gray-300">
            Available 9am – 6pm<br />
            <span className="text-blue-500 font-medium">+1 (555) 123-4567</span>
          </p>
        </div>
      </div>
    </div>
      </motion.section>
  );
};

export default Contact;
