"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import styles from "./page.module.css";
import { 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaClock,
  FaTelegramPlane,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram
} from "react-icons/fa";
import { MdSend } from "react-icons/md";

export default function ContactPage() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.2 });
  const formRef = useRef(null);
  const isFormInView = useInView(formRef, { once: true, amount: 0.2 });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  // Contact info data
  const contactInfo = [
    { id: 1, icon: <FaEnvelope />, title: "Email Me", value: "eyad09876a@gmail.com", link: "mailto:eyad@example.com" },
    { id: 2, icon: <FaPhone />, title: "Call Me", value: "+20 1155654697", link: "https://wa.me/201155654697" },
    { id: 3, icon: <FaMapMarkerAlt />, title: "Location", value: "Benisuef, Egypt", link: null },
    { id: 4, icon: <FaClock />, title: "Working Hours", value: "Mon-Fri: 9AM - 6PM", link: null },
  ];

  // Social links
  const socialLinks = [
    { id: 1, icon: <FaGithub />, url: "https://github.com/eyad", label: "GitHub" },
    { id: 2, icon: <FaLinkedin />, url: "https://linkedin.com/in/eyad", label: "LinkedIn" },
    { id: 3, icon: <FaTwitter />, url: "https://twitter.com/eyad", label: "Twitter" },
    { id: 4, icon: <FaInstagram />, url: "https://instagram.com/eyad", label: "Instagram" },
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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
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
          <span className={styles.sectionTag}>GET IN TOUCH</span>
          <h1 className={styles.pageTitle}>Contact Me</h1>
          <p className={styles.heroDesc}>
            Have a project in mind or want to collaborate? I'd love to hear from you!
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          className={styles.mainContent}
          ref={formRef}
          variants={containerVariants}
          initial="hidden"
          animate={isFormInView ? "visible" : "hidden"}
        >
          {/* Contact Info Cards */}
          <motion.div className={styles.contactCards} variants={itemVariants}>
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.id}
                className={styles.contactCard}
                custom={index}
                initial="hidden"
                animate={isFormInView ? "visible" : "hidden"}
                variants={cardVariants}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className={styles.cardIcon}>{info.icon}</div>
                <h3 className={styles.cardTitle}>{info.title}</h3>
                {info.link ? (
                  <a href={info.link} className={styles.cardValue}>{info.value}</a>
                ) : (
                  <p className={styles.cardValue}>{info.value}</p>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Form & Social Section */}
          <div className={styles.formSocial}>
            {/* Contact Form */}
            <motion.div className={styles.formContainer} variants={itemVariants}>
              <h3 className={styles.formTitle}>Send Me a Message</h3>
              <form onSubmit={handleSubmit} className={styles.contactForm}>
                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={styles.input}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={styles.input}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className={styles.input}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className={styles.textarea}
                  ></textarea>
                </div>
                <motion.button
                  type="submit"
                  className={styles.submitBtn}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message <MdSend />
                </motion.button>
                {isSubmitted && (
                  <motion.div
                    className={styles.successMsg}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    ✅ Message sent successfully! I'll get back to you soon.
                  </motion.div>
                )}
              </form>
            </motion.div>

            {/* Social Section */}
            <motion.div className={styles.socialContainer} variants={itemVariants}>
              <h3 className={styles.socialTitle}>Connect With Me</h3>
              <p className={styles.socialDesc}>
                Follow me on social media to see my latest work and updates.
              </p>
              <div className={styles.socialGrid}>
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialCard}
                    custom={index}
                    initial="hidden"
                    animate={isFormInView ? "visible" : "hidden"}
                    variants={cardVariants}
                    whileHover={{ y: -5, scale: 1.05 }}
                  >
                    <div className={styles.socialIcon}>{social.icon}</div>
                    <span className={styles.socialLabel}>{social.label}</span>
                  </motion.a>
                ))}
              </div>
              <div className={styles.availability}>
                <div className={styles.availabilityBadge}>
                  <span className={styles.dot}></span>
                  Available for freelance
                </div>
              </div>
            </motion.div>
          </div>

          {/* Map Section (Optional) */}
          <motion.div className={styles.mapSection} variants={itemVariants}>
            <iframe
             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55805.67127044235!2d31.143184151170022!3d29.050885762078092!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145a25e1064f72af%3A0xbacfa92a1eed60ea!2z2KjZhtmKINiz2YjZitmB2Iwg2YLYs9mFINio2YbZiiDYs9mI2YrZgdiMINmF2LHZg9iyINio2YbZiSDYs9mI2YrZgdiMINmF2K3Yp9mB2LjYqSDYqNmG2Yog2LPZiNmK2YE!5e0!3m2!1sar!2seg!4v1779721370216!5m2!1sar!2seg"
              width="100%"
              height="300"
              style={{ border: 0, borderRadius: "1rem" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Location Map"
            ></iframe>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}