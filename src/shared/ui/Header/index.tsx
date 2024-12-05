'use client';

import Image from 'next/image';
import { useThemeStore } from '@/shared/store/themeStore';
import styles from './style.module.css';

import { useState } from 'react';

export const Header = () => {
  const { theme, toggleTheme } = useThemeStore();
  const [sensorData, setSensorData] = useState(null);

  const connectToRaspberry = async () => {
    try {
      const response = await fetch('http://192.168.1.1git >:5000/sensors');
      if (!response.ok) {
        throw new Error('Failed to connect to Raspberry Pi');
      }
      const data = await response.json();
      setSensorData(data);
    } catch (error) {
      console.error('Error connecting to Raspberry Pi:', error);
    }
  };

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
          onClick={connectToRaspberry}
        >
          connect
        </button>
        {sensorData && (
          <div className={styles.sensorData}>
            {/* <p>Temperature: {sensorData.temperature}°C</p>
            <p>Humidity: {sensorData.humidity}%</p>
            <p>Motion Detected: {sensorData.motion_detected ? 'Yes' : 'No'}</p> */}
          </div>
        )}
      </div>
    </div>
  );
};

