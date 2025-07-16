import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const Footer = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationIdRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1f2937); // Dark gray background
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      60,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2, 8);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x60a5fa, 0.8);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xef4444, 0.6, 10);
    pointLight.position.set(-3, 3, 2);
    scene.add(pointLight);

    // Create floating social media icons (simplified 3D representations)
    const socialIcons = [];
    
    // Facebook-like cube
    const facebookGeometry = new THREE.BoxGeometry(0.6, 0.6, 0.6);
    const facebookMaterial = new THREE.MeshPhongMaterial({ color: 0x1877f2 });
    const facebook = new THREE.Mesh(facebookGeometry, facebookMaterial);
    facebook.position.set(-4, 1, 0);
    facebook.castShadow = true;
    socialIcons.push(facebook);
    scene.add(facebook);

    // Twitter-like sphere
    const twitterGeometry = new THREE.SphereGeometry(0.35, 16, 16);
    const twitterMaterial = new THREE.MeshPhongMaterial({ color: 0x1da1f2 });
    const twitter = new THREE.Mesh(twitterGeometry, twitterMaterial);
    twitter.position.set(-2, 0.5, 1);
    twitter.castShadow = true;
    socialIcons.push(twitter);
    scene.add(twitter);

    // LinkedIn-like rounded cube
    const linkedinGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const linkedinMaterial = new THREE.MeshPhongMaterial({ color: 0x0077b5 });
    const linkedin = new THREE.Mesh(linkedinGeometry, linkedinMaterial);
    linkedin.position.set(0, 1.2, -0.5);
    linkedin.castShadow = true;
    socialIcons.push(linkedin);
    scene.add(linkedin);

    // Instagram-like octahedron
    const instagramGeometry = new THREE.OctahedronGeometry(0.4);
    const instagramMaterial = new THREE.MeshPhongMaterial({ color: 0xe4405f });
    const instagram = new THREE.Mesh(instagramGeometry, instagramMaterial);
    instagram.position.set(2, 0.8, 0.5);
    instagram.castShadow = true;
    socialIcons.push(instagram);
    scene.add(instagram);

    // YouTube-like cylinder
    const youtubeGeometry = new THREE.CylinderGeometry(0.35, 0.35, 0.2, 8);
    const youtubeMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    const youtube = new THREE.Mesh(youtubeGeometry, youtubeMaterial);
    youtube.position.set(4, 0.3, -1);
    youtube.rotation.z = Math.PI / 2;
    youtube.castShadow = true;
    socialIcons.push(youtube);
    scene.add(youtube);

    // Create floating connection lines
    const connections = [];
    for (let i = 0; i < 20; i++) {
      const points = [];
      points.push(new THREE.Vector3(
        Math.random() * 10 - 5,
        Math.random() * 3,
        Math.random() * 4 - 2
      ));
      points.push(new THREE.Vector3(
        Math.random() * 10 - 5,
        Math.random() * 3,
        Math.random() * 4 - 2
      ));

      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({ 
        color: 0x60a5fa,
        transparent: true,
        opacity: 0.3
      });
      const line = new THREE.Line(geometry, material);
      connections.push(line);
      scene.add(line);
    }

    // Create floating particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 100;
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 20;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x60a5fa,
      size: 0.02,
      transparent: true,
      opacity: 0.6
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      // Animate social icons
      socialIcons.forEach((icon, index) => {
        icon.rotation.x += 0.01;
        icon.rotation.y += 0.015;
        icon.position.y += Math.sin(time + index) * 0.002;
      });

      // Animate particles
      particles.rotation.y += 0.001;
      
      // Animate connection lines
      connections.forEach((line, index) => {
        line.rotation.z += 0.001 + index * 0.0001;
        line.material.opacity = 0.1 + Math.sin(time + index) * 0.1;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current || !camera || !renderer) return;
      
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const socialLinks = [
    { name: 'LinkedIn', url: '#', color: 'hover:text-blue-500' },
    { name: 'Instagram', url: '#', color: 'hover:text-pink-400' },
  ];

  const quickLinks = [
    { name: 'Home', url: '#' },
    { name: 'About', url: '#' },
    { name: 'Contact', url: '#' }
  ];

  const services = [
    { name: 'Development', url: '#' },
    { name: 'Support', url: '#' },
  ];

  return (
    <footer className="relative bg-gray-800 text-white overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-20 md:opacity-30">
        <div ref={mountRef} className="w-full h-full" />
      </div>
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-gray-800/60 md:bg-gray-800/40" />
      
      {/* Content Overlay */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-6 py-9 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4 sm:col-span-2 lg:col-span-1"
          >
            <h3 className="text-xl md:text-2xl font-bold text-red-400">LASO</h3>
            <p className="text-gray-200 md:text-gray-300 leading-relaxed text-sm md:text-base">
              Creating amazing digital experiences with cutting-edge technology and innovative design solutions.
            </p>
            <div className="flex flex-wrap gap-3 md:gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  className={`text-gray-200 md:text-gray-400 transition-colors duration-200 ${social.color} text-sm md:text-base`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  {social.name}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-3 md:space-y-4"
          >
            <h4 className="text-base md:text-lg font-semibold text-blue-400">Quick Links</h4>
            <ul className="space-y-1 md:space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <a
                    href={link.url}
                    className="text-gray-200 md:text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block text-sm md:text-base"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-3 md:space-y-4"
          >
            <h4 className="text-base md:text-lg font-semibold text-green-400">Services</h4>
            <ul className="space-y-1 md:space-y-2">
              {services.map((service, index) => (
                <motion.li
                  key={service.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <a
                    href={service.url}
                    className="text-gray-200 md:text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block text-sm md:text-base"
                  >
                    {service.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="space-y-3 md:space-y-4"
          >
            <h4 className="text-base md:text-lg font-semibold text-purple-400">Get In Touch</h4>
            <div className="space-y-2 md:space-y-3">
              <motion.div
                className="flex items-center space-x-2"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-gray-300">📧</span>
                <span className="text-gray-200 md:text-gray-300 text-sm md:text-base">hello@yourbrand.com</span>
              </motion.div>
              <motion.div
                className="flex items-center space-x-2"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-gray-300">📱</span>
                <span className="text-gray-200 md:text-gray-300 text-sm md:text-base">+1 (555) 123-4567</span>
              </motion.div>
              <motion.div
                className="flex items-center space-x-2"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-gray-300">📍</span>
                <span className="text-gray-200 md:text-gray-300 text-sm md:text-base">123 Web Street, Digital City</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-600 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <div className="text-gray-200 md:text-gray-400 text-sm md:text-base text-center md:text-left">
            © 2025 Laso. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6 text-xs md:text-sm">
            <a href="#" className="text-gray-200 md:text-gray-400 hover:text-white transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-200 md:text-gray-400 hover:text-white transition-colors duration-200">
              Terms of Service
            </a>
            <a href="#" className="text-gray-200 md:text-gray-400 hover:text-white transition-colors duration-200">
              Cookie Policy
            </a>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Gradient Overlay for mobile */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-800/50 to-transparent pointer-events-none" />
    </footer>
  );
};

export default Footer;