"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { skillsData } from './skills';
import styles from './SkillsSection.module.css';
import Image from 'next/image';

export default function SkillsSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  // Variants for stats numbers
  const statVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }
    })
  };

  // Variants for progress bars
  const progressVariants = {
    hidden: { width: "0%" },
    visible: (percentage) => ({
      width: `${percentage}%`,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.3
      }
    })
  };

  // Variants for cards stagger
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.4,
        ease: "easeOut"
      }
    })
  };

  return (
    <section id="skills" className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        <motion.h2 
          className={styles.title}
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Tech Stack
        </motion.h2>
        
        <div className={styles.twoColumns}>
          {/* قسم الأحصائيات - الشمال */}
          <motion.div 
            className={styles.statsSection}
            initial={{ opacity: 0, x: 0 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div 
              className={styles.statCard}
              custom={0}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={statVariants}
            >
              <motion.div 
                className={styles.statNumber9}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
              >
                03+
              </motion.div>
              <div className={`${styles.statLabel} ${styles.yaers}`}>Years of Experience</div>
            </motion.div>
            
            <motion.div 
              className={styles.statCard}
              custom={1}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={statVariants}
            >
              <motion.div 
                className={styles.statNumber}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
              >
                90%
              </motion.div>
              <div className={styles.statLabel}>Clients Satisfaction</div>
            </motion.div>
            
            <motion.div 
              className={styles.statCard}
              custom={2}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={statVariants}
            >
              <motion.div 
                className={styles.statNumber}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.7, duration: 0.5, type: "spring" }}
              >
                20+
              </motion.div>
              <div className={styles.statLabel}>Projects Completed</div>
            </motion.div>
          </motion.div>

          {/* قسم المهارات - اليمين */}
          <div className={styles.grid}>
            {skillsData.map((skill, index) => (
              <motion.div 
                key={skill.id} 
                className={styles.card}
                custom={index}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={cardVariants}
              >
                <motion.div
                  initial={{ opacity: 0, rotate: -30 , scale: 0.4 }}
                  animate={isInView ? { opacity: 1, rotate: 0 , scale: 1 } : {}}
                  transition={{ delay: index * 0.08 + 0.2, duration: 0.4 }}
                >
                  <Image src={skill.icon} alt={skill.name} width={50} height={50} />
                </motion.div>
                <p className={styles.skillName}>{skill.name}</p>
                
                <div className={styles.progressContainer}>
                  <motion.div 
                    className={styles.progressBar}
                    custom={skill.percentage}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={progressVariants}
                  />
                </div>
                <motion.span 
                  className={styles.percentage}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: index * 0.08 + 0.5 }}
                >
                  {skill.percentage}%
                </motion.span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}