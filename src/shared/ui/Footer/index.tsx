import { useThemeStore } from '@/shared/store/themeStore';
import styles from './style.module.css';

export const Footer = () => {
  const { theme } = useThemeStore();
  return (
    <div
      className={`${styles.container} ${theme === 'dark' ? styles.darkContainer : styles.lightContainer}`}
    ></div>
  );
};
