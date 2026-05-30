'use client';

import { motion } from 'framer-motion';
import { ArrowInDownStrokeCircleHalf } from '@boxicons/react';
import styles from './Navbar.module.css';
import { MdOutlineLightMode, MdDarkMode } from "react-icons/md";
import { HiMenu, HiX } from "react-icons/hi";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

export default function Navbar({ toggleTheme, currentTheme }) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Variants for stagger animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const logoVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const modeVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, delay: 0.6 },
    },
  };

  const cvVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, delay: 0.7, ease: "easeOut" },
    },
  };

  // Toggle menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when link is clicked
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <motion.nav 
      className={styles.navbar}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className={styles.container}>
        <motion.div 
          className={styles.logo}
          variants={logoVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <Link href="/">EYAD.</Link>
        </motion.div>
        
        <motion.ul 
          className={styles.navLinks}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.li variants={itemVariants}>
            <Link href="/" className={`${styles.link} ${pathname === '/' ? styles.active : ''}`}>Home</Link>
          </motion.li>
          <motion.li variants={itemVariants}>
            <Link href="/projects" className={`${styles.link} ${pathname === '/projects' ? styles.active : ''}`}>Projects</Link>
          </motion.li>
          <motion.li variants={itemVariants}>
            <Link href="/about" className={`${styles.link} ${pathname === '/about' ? styles.active : ''}`}>About</Link>
          </motion.li>
          <motion.li variants={itemVariants}>
            <Link href="/admin1" className={`${styles.link} ${pathname === '/admin1' ? styles.active : ''}`}>Admin</Link>
          </motion.li>
          <motion.li variants={itemVariants}>
            <Link href="/contact" className={`${styles.link} ${pathname === '/contact' ? styles.active : ''}`}>Contact</Link>
          </motion.li>
        </motion.ul>

        <div className={styles.rightGroup}>
          <motion.div 
            className={styles.mode}
            variants={modeVariants}
            initial="hidden"
            animate="visible"
            onClick={toggleTheme}
            whileHover={{ rotate: 180, scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            {currentTheme === "dark" ? (
              <MdOutlineLightMode size={30} />
            ) : (
              <MdDarkMode size={30} />
            )}
          </motion.div>
        
          <motion.button 
            className={styles.cv}
            variants={cvVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            Download CV  
            <ArrowInDownStrokeCircleHalf
              pack="filled"
              fill="#ffffff"
              opacity={0.8}
              size="sm"
              className="my-icon"
            />
          </motion.button>

          <div className={styles.hamburger} onClick={toggleMenu}>
            {isMenuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div 
        ref={menuRef}
        className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ''}`}
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: isMenuOpen ? 1 : 0,
          height: isMenuOpen ? 'auto' : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <ul className={styles.mobileNavLinks}>
          <li onClick={closeMenu}><Link href="/" className={styles.mobileLink}>Home</Link></li>
          <li onClick={closeMenu}><Link href="/projects" className={styles.mobileLink}>Projects</Link></li>
          <li onClick={closeMenu}><Link href="/about" className={styles.mobileLink}>About</Link></li>
          <li onClick={closeMenu}><Link href="/admin1" className={styles.mobileLink}>Admin</Link></li>
          <li onClick={closeMenu}><Link href="/contact" className={styles.mobileLink}>Contact</Link></li>
        </ul>
      </motion.div>
    </motion.nav>
  );
}