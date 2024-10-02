import Image from 'next/image';
import styles from './style.module.css';

export const Header = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>smart home</h1>
      <div className={styles.management}>
        <Image
          src="/assets/ThemeSwitch.png"
          width={35}
          height={23}
          alt="Theme switcher"
          className={styles.switch}
        />
        <button className={styles.btn}>connect</button>
      </div>
    </div>
  );
};
