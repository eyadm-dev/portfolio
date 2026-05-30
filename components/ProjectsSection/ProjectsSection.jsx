"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { projectsData } from "./projects";
import styles from "./ProjectsSection.module.css";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight, FaEye } from "react-icons/fa";

export default function ProjectsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // الحصول على 4 مشاريع
  const prevIndex = (currentIndex - 1 + projectsData.length) % projectsData.length;
  const nextIndex = (currentIndex + 1) % projectsData.length;
  const secondNextIndex = (currentIndex + 2) % projectsData.length;

  const prevProject = projectsData[prevIndex];
  const currentProject = projectsData[currentIndex];
  const nextProject = projectsData[nextIndex];
  const secondNextProject = projectsData[secondNextIndex];

  // Function to open project link
  const openProjectLink = (liveLink) => {
    if (liveLink) {
      window.open(liveLink, "_blank");
    }
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % projectsData.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + projectsData.length) % projectsData.length);
  };

  // Auto-play
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 400 : -400,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: (direction) => ({
      x: direction > 0 ? -400 : 400,
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.4,
        ease: "easeIn",
      },
    }),
  };

  return (
    <section className={styles.projectsSection}>
      <div className={styles.container}>
        {/* Header */}
        <motion.div 
          className={styles.header}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.7 }}
        >
          <span className={styles.sectionTag}>MY WORK</span>
          <h2 className={styles.sectionTitle}>Featured Projects</h2>
          <p className={styles.sectionDesc}>
            Here are some of the projects I've worked on. Each one was built with passion, precision, and clean code.
          </p>
        </motion.div>

        {/* Slider Container - 4 Cards with buttons on sides */}
        <motion.div
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.6 }}
          className={styles.sliderWrapper}
        >
          {/* Prev Button - Left side of screen */}
          <motion.button 
            className={styles.sideNavBtn}
            onClick={prevSlide}
            whileHover={{ scale: 1.1, x: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaArrowLeft />
          </motion.button>

          {/* Cards Container */}
          <div className={styles.sliderContainer}>
            {/* Card 1: Far left */}
            <motion.div 
              className={`${styles.card} ${styles.sideCardFar}`}
              whileHover={{ scale: 1.02 }}
              onClick={() => openProjectLink(prevProject.liveLink)}
              style={{ cursor: prevProject.liveLink ? 'pointer' : 'default' }}
            >
              <div className={styles.cardImage}>
                <Image src={prevProject.image} alt={prevProject.title} width={180} height={130} />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardCategory}>{prevProject.category || "PROJECT"}</h3>
                <h3 className={styles.cardTitle}>{prevProject.title.substring(0, 18)}...</h3>
                <p className={styles.cardDesc}>{prevProject.description.substring(0, 50)}...</p>
                <div className={styles.techStack}>
                  {prevProject.tech.slice(0, 2).map((tech, idx) => (
                    <span key={idx} className={styles.techBadge}>{tech}</span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Card 2: Left side */}
            <motion.div 
              className={`${styles.card} ${styles.sideCardLeft}`}
              whileHover={{ scale: 1.02 }}
              onClick={() => openProjectLink(nextProject.liveLink)}
              style={{ cursor: nextProject.liveLink ? 'pointer' : 'default' }}
            >
              <div className={styles.cardImage}>
                <Image src={nextProject.image} alt={nextProject.title} width={200} height={150} />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardCategory}>{nextProject.category || "PROJECT"}</h3>
                <h3 className={styles.cardTitle}>{nextProject.title.substring(0, 20)}...</h3>
                <p className={styles.cardDesc}>{nextProject.description.substring(0, 60)}...</p>
                <div className={styles.techStack}>
                  {nextProject.tech.slice(0, 2).map((tech, idx) => (
                    <span key={idx} className={styles.techBadge}>{tech}</span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Card 3: Main Card */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className={`${styles.card} ${styles.mainCard}`}
                onClick={() => openProjectLink(currentProject.liveLink)}
                style={{ cursor: currentProject.liveLink ? 'pointer' : 'default' }}
              >
                <div className={styles.cardImage}>
                  <Image src={currentProject.image} alt={currentProject.title} width={350} height={220} />
                  <div className={styles.imageOverlay}>
                    <FaEye />
                    <span>View Project</span>
                  </div>
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardCategory}>{currentProject.category || "E-Commerce"}</h3>
                  <h2 className={styles.cardTitle}>{currentProject.title}</h2>
                  <p className={styles.cardDesc}>{currentProject.description}</p>
                  <div className={styles.techStack}>
                    {currentProject.tech.slice(0, 3).map((tech, idx) => (
                      <span key={idx} className={styles.techBadge}>{tech}</span>
                    ))}
                  </div>
                  <motion.button 
                    className={styles.viewBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      openProjectLink(currentProject.liveLink);
                    }}
                  >
                    View Project <FaArrowRight />
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Card 4: Right side */}
            <motion.div 
              className={`${styles.card} ${styles.sideCardRight}`}
              whileHover={{ scale: 1.02 }}
              onClick={() => openProjectLink(secondNextProject.liveLink)}
              style={{ cursor: secondNextProject.liveLink ? 'pointer' : 'default' }}
            >
              <div className={styles.cardImage}>
                <Image src={secondNextProject.image} alt={secondNextProject.title} width={200} height={150} />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardCategory}>{secondNextProject.category || "PROJECT"}</h3>
                <h3 className={styles.cardTitle}>{secondNextProject.title.substring(0, 20)}...</h3>
                <p className={styles.cardDesc}>{secondNextProject.description.substring(0, 60)}...</p>
                <div className={styles.techStack}>
                  {secondNextProject.tech.slice(0, 2).map((tech, idx) => (
                    <span key={idx} className={styles.techBadge}>{tech}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Next Button - Right side of screen */}
          <motion.button 
            className={styles.sideNavBtn}
            onClick={nextSlide}
            whileHover={{ scale: 1.1, x: 3 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaArrowRight />
          </motion.button>
        </motion.div>

        {/* Pagination Dots */}
        <div className={styles.pagination}>
          {projectsData.map((_, idx) => (
            <button
              key={idx}
              className={`${styles.dot} ${idx === currentIndex ? styles.activeDot : ""}`}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}