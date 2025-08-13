import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Help() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Help Center - Campus Connect</title>
        <meta name="description" content="Get help with Campus Connect" />
      </Head>

      <main className={styles.main}>
        <div style={{ marginBottom: '2rem', width: '100%' }}>
          <Link href="/" className={styles.backButton}>
            ← Back to Home
          </Link>
        </div>
        <h1 className={styles.title}>
          Help Center
        </h1>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>Frequently Asked Questions</h2>
            
            <div className={styles.faqSection}>
              <h3>Getting Started</h3>
              <div className={styles.faqItem}>
                <h4>How do I create an account?</h4>
                <p>Click on the "Sign Up" button in the top right corner and follow the registration process.</p>
              </div>
              
              <div className={styles.faqItem}>
                <h4>I forgot my password. What should I do?</h4>
                <p>Click on "Forgot Password" on the login page and follow the instructions to reset your password.</p>
              </div>
            </div>

            <div className={styles.faqSection}>
              <h3>Using the Platform</h3>
              <div className={styles.faqItem}>
                <h4>How do I join a class or group?</h4>
                <p>Navigate to the "Classes" or "Groups" section and click "Join" on the group you're interested in.</p>
              </div>
              
              <div className={styles.faqItem}>
                <h4>How do I upload files?</h4>
                <p>In any post or assignment, click the attachment icon and select the file you want to upload.</p>
              </div>
            </div>

            <div className={styles.contactSupport}>
              <h3>Still need help?</h3>
              <p>Our support team is available 24/7 to assist you.</p>
              <a href="/contact" className={styles.button}>Contact Support</a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
