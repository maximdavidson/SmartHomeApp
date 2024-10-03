import { Controls } from '@/features/ui/Controls';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <Controls />
    </div>
  );
}
