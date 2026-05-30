"use client";

import Link from 'next/link';
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { FaUser, FaCode, FaBriefcase, FaGraduationCap, FaHeart, FaArrowRight } from "react-icons/fa";
import { SiNextdotjs, SiReact, SiTailwindcss, SiJavascript, SiHtml5, SiCss } from "react-icons/si";

export default function AboutPage() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.2 });
  const contentRef = useRef(null);
  const isContentInView = useInView(contentRef, { once: true, amount: 0.2 });

  // Stats data
  const statsData = [
    { id: 1, value: "03+", label: "Years of Experience" },
    { id: 2, value: "20+", label: "Projects Completed" },
    { id: 3, value: "15+", label: "Happy Clients" },
    { id: 4, value: "24/7", label: "Support" },
  ];

  // Services data
  const servicesData = [
    { id: 1, title: "Web Development", icon: <FaCode />, desc: "Building responsive and performant web applications with modern technologies." },
    { id: 2, title: "UI/UX Design", icon: <FaUser />, desc: "Creating beautiful and intuitive user interfaces with focus on user experience." },
    { id: 3, title: "Frontend Architecture", icon: <FaBriefcase />, desc: "Structuring scalable frontend applications with best practices." },
  ];

  // Variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },

    },
  };

  const statsVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.1, duration: 0.4, type: "spring", stiffness: 100 },
    }),
  };

  return (
    <motion.div
      className={styles.pageWrapper}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.container}>
        {/* Hero Section */}
        <motion.div
          className={styles.heroSection}
          ref={headerRef}
          initial={{ opacity: 0, y: -30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.sectionTag}>GET TO KNOW ME</span>
          <h1 className={styles.pageTitle}>About Me</h1>
          <p className={styles.heroDesc}>
            I'm a passionate Frontend Developer dedicated to crafting beautiful, functional, and user-centered digital experiences.
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          className={styles.mainContent}
          ref={contentRef}
          variants={containerVariants}
          initial="hidden"
          animate={isContentInView ? "visible" : "hidden"}
        
        >
          {/* Profile Section */}
          <motion.div className={styles.profileSection} 
          
          variants={itemVariants}>
            <div className={styles.imageWrapper}>
              <Image
                src="/imgs/profile33.png"
                alt="EYAD Mohamed"
                width={400}
                height={400}
                className={styles.profileImage}
              />
              <div className={styles.imageBorder}></div>
            </div>
            <div className={styles.profileInfo}>
              <h2 className={styles.name}>EYAD Mohamed</h2>
              <h3 className={styles.title}>Frontend Developer & UI/UX Designer</h3>
              <p className={styles.bio}>
                I'm a self-taught frontend developer based in Benisuef, Egypt. With a passion for creating beautiful and functional web experiences, I've worked on various projects ranging from e-commerce websites to interactive web applications.
              </p>
              <p className={styles.bio}>
                My journey in web development started with curiosity and turned into a career. I love learning new technologies and finding innovative solutions to complex problems.
              </p>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>📍 Location</span>
                  <span className={styles.infoValue}>Benisuef, Egypt</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>📧 Email</span>
                  <span className={styles.infoValue}>eyad09876a@gmail.com</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>💼 Freelance</span>
                  <span className={styles.infoValue}>Available</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>🌐 Languages</span>
                  <span className={styles.infoValue}>Arabic, English</span>
                </div>
              </div>
             < Link href="/contact#contact-form" passHref>
              <motion.button
                className={styles.contactBtn}
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Me <FaArrowRight />
              </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div className={styles.statsSection} variants={itemVariants}>
            <h3 className={styles.sectionTitle}>My Achievements</h3>
            <div className={styles.statsGrid}>
              {statsData.map((stat, index) => (
                <motion.div
                  key={stat.id}
                  className={styles.statCard}
                  custom={index}
                  initial="hidden"
                  animate={isContentInView ? "visible" : "hidden"}
                  variants={statsVariants}
                >
                  <div className={styles.statValue}>{stat.value}</div>
                  <div className={styles.statLabel}>{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Skills & Services Section */}
          <div className={styles.skillsServices}>
            {/* Tech Stack */}
            <motion.div className={styles.techStackSection} variants={itemVariants}>
              <h3 className={styles.sectionTitle}>Technologies I Work With</h3>
              <div className={styles.techGrid}>
                <div className={styles.techItem}> <img src="/imgs/html.svg" alt="html" width={27} height={27} /> HTML5</div>
                <div className={styles.techItem}><img src="/imgs/css.svg" alt="css" width={27} height={27} />  CSS3</div>
                <div className={styles.techItem}><img src="/imgs/javascript.svg" alt="javascript" width={27} height={27} />  JavaScript</div>
                <div className={styles.techItem}><img src="/imgs/react.svg" alt="react" width={27} height={27} />  React</div>
                <div className={styles.techItem}><img src="/imgs/nextjs.svg" alt="nextjs" width={27} height={27} /> Next.js</div>
                <div className={styles.techItem}><img src="/imgs/tailwind.svg" alt="tailwind" width={27} height={27} />  Tailwind CSS</div>
              </div>
            </motion.div>

            {/* Services */}
            <motion.div className={styles.servicesSection} variants={itemVariants}>
              <h3 className={styles.sectionTitle}>What I Do</h3>
              <div className={styles.servicesGrid}>
                {servicesData.map((service) => (
                  <div key={service.id} className={styles.serviceCard}>
                    <div className={styles.serviceIcon}>{service.icon}</div>
                    <h4 className={styles.serviceTitle}>{service.title}</h4>
                    <p className={styles.serviceDesc}>{service.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* CTA Section */}
          <motion.div className={styles.ctaSection} variants={itemVariants}>
            <h3 className={styles.ctaTitle}>Let's Work Together</h3>
            <p className={styles.ctaDesc}>Have a project in mind? I'd love to hear about it.</p>
<Link href="/contact#contact-form" passHref>
  <motion.button
    className={styles.ctaBtn}
    whileHover={{ scale: 1.05, y: -3 }}
    whileTap={{ scale: 0.95 }}
  >
    Start a Conversation <FaArrowRight />
  </motion.button>
</Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}