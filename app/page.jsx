"use client";
import { motion } from 'framer-motion';
import React, { useRef } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import ProjectsSection from '../components/ProjectsSection/ProjectsSection';
import SkillsSection from '../components/SkillsSection/SkillsSection';
import { CaretDown } from "@boxicons/react";
import { TbPointFilled } from "react-icons/tb";
export default function Home() {
  // References for smooth scrolling
  const homeRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);



  const scrollToSkills = () => {
    skillsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };


  return (
      <>
      {/* Hero Section - id="home" */}
      <motion.section
      initial={{ opacity: 0 , y: -200 }}
      animate={{ opacity: 1 , y: 0 }}
       
      transition={{ duration: 1, ease: "easeOut" }}
      
      ref={homeRef} id="home" className={styles.hero}>
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        
        className={styles.liftSide}>
           <div className={styles.title}><TbPointFilled className={styles.point} />Frontend Developer</div>
          <h2>Hello,</h2>
          <h1> <span>I'm</span> EYAD Mohamed</h1>
          <h3>Frontend Developer / UI/UX Designer </h3>
          <p>
            I'm a frontend developer based in Benisuef, Egypt. I have experience in
            React, Next.js. I'm a self-taught developer and I'm always learning
            new things.
          </p>
        <button onClick={scrollToSkills} className={styles.clickDownBtn1}>
  Let`s work together<CaretDown />
</button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .5, ease: "easeOut" }}
        
        className={styles.rightSide}>
          <div>
            <Image
              src="/imgs/profile33.png"
              alt="Profile"
              width={410}
              height={500}
              loading="eager"
              className={styles.image}
            />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}

            transition={{ duration: 1, delay: 1.5 , ease: "easeOut" }}
          
          className={styles.skills}>
            <Image
              src="/imgs/figma.svg"
              alt="Profile"
              
              width={20}
              height={20}
              loading="eager"
            />
            <Image
              src="/imgs/css.svg"
              alt="Profile"
              width={20}
              height={20}
              loading="eager"
            />
            <Image
              src="/imgs/react.svg"
              alt="Profile"
              width={20}
              height={20}
              loading="eager"
            />
            <Image
              src="/imgs/javascript.svg"
              alt="Profile"
              width={20}
              height={20}
              loading="eager"
            />
            <Image
              src="/imgs/photoshop.svg"
              alt="Profile"
              width={20}
              height={20}
              loading="eager"
            />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Skills Section - id="skills" */}
      <div ref={skillsRef} id="skills">
        <SkillsSection />
      </div>

      {/* Projects Section - id="projects" */}
      <div ref={projectsRef} id="projectsSection">
        <ProjectsSection />
      </div>
    </>
  );
}
