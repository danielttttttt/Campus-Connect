import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function About() {
  return (
    <div className={styles.container}>
      <Head>
        <title>About Us - Campus Connect</title>
        <meta name="description" content="Learn more about Campus Connect" />
      </Head>

      <main className={styles.main}>
        <div style={{ marginBottom: '2rem', width: '100%' }}>
          <Link href="/" className={styles.backButton}>
            ← Back to Home
          </Link>
        </div>
        <h1 className={styles.title}>
          About Campus Connect
        </h1>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>Our Mission</h2>
            <p>
              Campus Connect is dedicated to creating a seamless digital experience for students, 
              faculty, and staff to connect, collaborate, and access campus resources.
            </p>
            
            <h2>Our Story</h2>
            <p>
              Founded in 2023, Campus Connect was born out of a need for a more integrated 
              campus experience. We saw the challenges students and faculty faced in staying 
              connected and accessing important resources, and we set out to create a solution.
            </p>

            <h2>Our Team</h2>
            <p>
              Our diverse team of developers, designers, and educators work together to create 
              an inclusive platform that serves the entire campus community.
            </p>

            <h2>Our Values</h2>
            <ul className={styles.valuesList}>
              <li>Innovation in education technology</li>
              <li>Accessibility for all users</li>
              <li>Community building</li>
              <li>Continuous improvement</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
