'use client';

import { CaretDown, Eye } from "@boxicons/react";
import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from "framer-motion";
import { projectsData } from '../data/projects';
import styles from './page.module.css';
import Image from 'next/image';
import { TbPointFilled } from "react-icons/tb";

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  // Filter options
  const filterOptions = ['All', 'E-Commerce', 'Websites', 'Dashboards', 'Landing Pages'];

  // Filter projects based on search term and category
  const filteredProjects = projectsData.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'All' || project.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  // Function to open project link
  const openProjectLink = (liveLink) => {
    if (liveLink) {
      window.open(liveLink, "_blank");
    }
  };

  // Card variants for animation
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.95
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  // Container variants for stagger animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  return (
    <motion.div 
      className={styles.pageWrapper}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.container}>
        <motion.div 
          className={styles.pageHeader}
          ref={headerRef}
          initial={{ opacity: 0, y: -30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className={styles.headerTop}>
            <div>
              <span className={styles.sectionTag}><TbPointFilled className={styles.point} />WORK SHOWCASE</span>
              <motion.h1 
                className={styles.pageTitle}
                initial={{ opacity: 0, x: -30 }}
                animate={isHeaderInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                My Projects
              </motion.h1>

              <motion.p 
                className={styles.sectionDesc}
                initial={{ opacity: 0 }}
                animate={isHeaderInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                Here are some of the projects I've worked on. Each one was built with passion, precision, and clean code.
              </motion.p>
            </div>

            <motion.div 
              className={styles.searchWrapper}
              initial={{ opacity: 0, x: 30 }}
              animate={isHeaderInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <input
                type="text"
                placeholder="Search by project name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
              <AnimatePresence>
                {searchTerm && (
                  <motion.button 
                    onClick={() => setSearchTerm('')}
                    className={styles.clearButton}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    ✕
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Filter Buttons */}
          <motion.div 
            className={styles.filterContainer}
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {filterOptions.map((filter) => (
              <motion.button
                key={filter}
                className={`${styles.filterBtn} ${activeFilter === filter ? styles.activeFilter : ''}`}
                onClick={() => setActiveFilter(filter)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {filter}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        <AnimatePresence mode="wait">
          {filteredProjects.length === 0 ? (
            <motion.p 
              className={styles.noResults}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              No projects found! Try searching for something else.
            </motion.p>
          ) : (
            <motion.div 
              className={styles.grid}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className={styles.card}
                  variants={cardVariants}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true, amount: 0.2 }}
                  onClick={() => openProjectLink(project.liveLink)}
                  style={{ cursor: project.liveLink ? 'pointer' : 'default' }}
                >
                  <motion.div 
                    className={styles.imageContainer}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={400}
                      height={200}
                      className={styles.projectImage}
                    />
                    <motion.div 
                      className={styles.imageOverlay}
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Eye className={styles.eyeIcon} />
                      <span>View Project</span>
                    </motion.div>
                  </motion.div>

                  <motion.div className={styles.cardContent}>
                    <motion.h3 
                      className={styles.projectCategory}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                    >
                      {project.category || "E-Commerce"}
                    </motion.h3>
                    <motion.h2 
                      className={styles.projectTitle}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      {project.title}
                    </motion.h2>
                    
                    <motion.p 
                      className={styles.projectDescription}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.4 }}
                    >
                      {project.description}
                    </motion.p>

                    <motion.div 
                      className={styles.techStack}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                    >
                      {project.tech.slice(0, 6).map((tech, techIndex) => (
                        <motion.span 
                          key={techIndex} 
                          className={styles.techBadge}
                          whileHover={{ scale: 1.05, y: -2 }}
                          transition={{ duration: 0.2 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </motion.div>

                    <motion.button 
                      className={styles.viewButton}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        openProjectLink(project.liveLink);
                      }}
                    >
                      View Project Live <Eye />
                    </motion.button>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}