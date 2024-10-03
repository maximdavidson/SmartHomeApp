import Image from 'next/image';
import { controls } from '@/shared/mocks/ControlsData';
import styles from './style.module.css';

export const Controls = () => {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {controls.map((control) => (
          <div key={control.id} className={styles.card}>
            <Image
              width={33}
              height={33}
              src={control.imageUrl}
              alt={control.title}
              className={styles.controlImage}
            />
            <h3>{control.title}</h3>
            {control.tags && (
              <Image
                width={11}
                height={11}
                src={control.tags}
                alt="tag"
                className={styles.controlTag}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
