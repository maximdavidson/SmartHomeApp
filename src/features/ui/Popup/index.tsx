import { motion } from 'framer-motion';
import Image from 'next/image';
import { useThemeStore } from '@/shared/store/themeStore';
import styles from './style.module.css';

interface PopupProps {
  control: any;
  onClose: () => void;
}

export const Popup = ({ control, onClose}: PopupProps) => {
  const { theme } = useThemeStore();

  if (!control) return null;

  return (
    <div className={styles.popupOverlay} onClick={onClose}>
      <motion.div
        className={`${styles.popupContent} ${
          theme === 'dark' ? styles.darkPopup : styles.lightPopup
        }`}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        <h2>{control.title}</h2>
        <Image
          width={33}
          height={33}
          src={control.imageUrl}
          alt={control.title}
          className={styles.popupImage}
        />

        {control.humidity !== undefined && (
          <p className={styles.humidity}>
            Humidity: <strong>{control.humidity}%</strong>
          </p>
        )}

        <button onClick={onClose} className={styles.closeButton}>
          X
        </button>
      </motion.div>
    </div>
  );
};
