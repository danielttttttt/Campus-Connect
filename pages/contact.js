import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Contact() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Contact Us - Campus Connect</title>
        <meta name="description" content="Get in touch with Campus Connect" />
      </Head>

      <main className={styles.main}>
        <div style={{ marginBottom: '2rem', width: '100%' }}>
          <Link href="/" className={styles.backButton}>
            ← Back to Home
          </Link>
        </div>
        <h1 className={styles.title}>
          Contact Us
        </h1>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>Get in Touch</h2>
            <p>Have questions or feedback? We'd love to hear from you!</p>
            
            <div className={styles.contactInfo}>
              <p><strong>Email:</strong> contact@campusconnect.edu</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
              <p><strong>Address:</strong> 123 University Ave, Campus Town, 10001</p>
            </div>

            <form className={styles.contactForm}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="5" required></textarea>
              </div>
              <button type="submit" className={styles.button}>Send Message</button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
