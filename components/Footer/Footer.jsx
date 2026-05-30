"use client";
import { Location} from "@boxicons/react";
import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './Footer.module.css';
import { 
  FaEnvelope, 
  FaWhatsapp, 
  FaFacebook, 
  FaLinkedin, 
  FaTwitter, 
  FaBehance,
  FaArrowUp 
} from 'react-icons/fa';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Top Section - Let's Work Together */}
        <motion.div 
          className={styles.topSection}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >

          <h2 className={styles.workTitle}>LET'S WORK TOGETHER</h2>
   
          <div className={styles.contactButtons}>
            <motion.a 
              href="mailto:eyad09876a@gmail.com" 
              className={styles.contactBtn}
              whileHover={{ scale: 1.05, gap: '12px' }}
            >
              <FaEnvelope /> Email Me
            </motion.a>
            <motion.a 
              href="https://wa.me/201155654697" 
              target="_blank"
              className={styles.contactBtn}
              whileHover={{ scale: 1.05, gap: '12px' }}
            >
              <FaWhatsapp /> WhatsApp
            </motion.a>
          </div>
        </motion.div>

        {/* Middle Section - What I Do */}
        <motion.div 
          className={styles.middleSection}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className={styles.servicesBox}>
            <h3 className={styles.sectionTitle}>What I Do?</h3>
            <ul className={styles.servicesList}>
              <li>Web Development</li>
              <li>Mobile App Design</li>
              <li>UI/UX Design</li>
              <li>Frontend Development</li>
              <li>Next.js & React Expert</li>
              <li>Graphic Design , Photoshop</li>
            </ul>
          </div>

          <div className={styles.infoBox}>
            <h3 className={styles.sectionTitle}>Contact Info</h3>
            <p className={styles.address}>
              Beni Suef, Egypt <Location />
            </p>
            <div className={styles.socialLinks}>
              <h4>Connect with me</h4>
              <div className={styles.socialIcons}>
                <motion.a href="#" whileHover={{ y: -3 }}><FaFacebook /></motion.a>
                <motion.a href="#" whileHover={{ y: -3 }}><FaLinkedin /></motion.a>
                <motion.a href="#" whileHover={{ y: -3 }}><FaTwitter /></motion.a>
                <motion.a href="#" whileHover={{ y: -3 }}><FaBehance /></motion.a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div 
          className={styles.bottomSection}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className={styles.copyright}>
            Copyright © 2024 EYAD Mohamed. All Rights Reserved
          </p>
          <motion.button 
            onClick={scrollToTop}
            className={styles.backToTop}
            whileHover={{ y: -5, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            BACK TO TOP <FaArrowUp />
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
}