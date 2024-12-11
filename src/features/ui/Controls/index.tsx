'use client';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { controls as originalControls } from '@/shared/mocks/ControlsData';
import { useThemeStore } from '@/shared/store/themeStore';
import { Popup } from '../Popup';
import styles from './style.module.css';

export const Controls = () => {
  const { theme } = useThemeStore();
  const [selectedControl, setSelectedControl] = useState(null);

  const [controls, setControls] = useState(
    originalControls.map((control) => ({
      ...control,
      isAlarm: control.id === 'fire-and-smoke' ? false : undefined,
      tags:
        control.humidity && control.humidity > 50
          ? '/assets/EllipsRed.png'
          : '/assets/EllipsGreen.png',
    })),
  );

  const handleCardClick = (control: any) => {
    setSelectedControl(control);
  };

  const handleClosePopup = () => {
    setSelectedControl(null);
  };

  const toggleAlarm = (controlId: string) => {
    setControls((prevControls) =>
      prevControls.map((control) => {
        if (control.id === controlId && !control.isAlarm) {
          return {
            ...control,
            isAlarm: true,
            tags: '/assets/EllipsRed.png',
          };
        }
        return control;
      }),
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {controls.map((control) => (
          <div
            key={control.id}
            className={`${styles.card} ${theme === 'dark' ? styles.darkCard : styles.lightCard}`}
            onClick={() => handleCardClick(control)}
          >
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
      <AnimatePresence>
        {selectedControl && (
          <Popup
            control={selectedControl}
            onClose={handleClosePopup}
            toggleAlarm={toggleAlarm}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
