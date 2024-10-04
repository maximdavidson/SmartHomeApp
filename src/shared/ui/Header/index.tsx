'use client';

import Image from 'next/image';
import { useThemeStore } from '@/shared/store/themeStore';
import styles from './style.module.css';

export const Header = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>smart home</h1>
      <div className={styles.management}>
        <Image
          src={
            theme === 'dark'
              ? '/assets/ThemeSwitchOff.png'
              : '/assets/ThemeSwitchOn.png'
          }
          width={40}
          height={38}
          alt="Theme switcher"
          className={styles.switch}
          onClick={toggleTheme}
        />
        <button
          className={`${styles.btn} ${theme === 'dark' ? styles.darkBtn : styles.lightBtn}`}
        >
          connect
        </button>
      </div>
    </div>
  );
};
