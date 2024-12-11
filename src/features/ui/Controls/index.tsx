'use client';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useThemeStore } from '@/shared/store/themeStore';
import { Popup } from '../Popup';
import styles from './style.module.css';
import { MqttTopic, mqttTopics } from '@/shared/mocks/ControlsData';
import { useMqtt } from '@/shared/utils/mqttDataLoad';

export const Controls = () => {
  const { theme } = useThemeStore();
  const [selectedTopic, setSelectedTopic] = useState<MqttTopic | null>(null);

  const { messages, isConnected } = useMqtt(mqttTopics); // Получаем данные MQTT

  const handleCardClick = (topic: MqttTopic) => {
    setSelectedTopic(topic);
  };

  const handleClosePopup = () => {
    setSelectedTopic(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {mqttTopics.map((topic) => (
          <div
            key={topic.sensorId}
            className={`${styles.card} ${theme === 'dark' ? styles.darkCard : styles.lightCard}`}
            onClick={() => handleCardClick(topic)}
          >
            <Image
              width={33}
              height={33}
              src={`/assets/${topic.sensorName}.png`}
              alt={topic.sensorName}
              className={styles.controlImage}
            />
            <h3>{topic.sensorName}</h3>
            {/* Отображаем данные, полученные через MQTT */}
            {messages[topic.sensorName] && (
              <p>{`Data: ${messages[topic.sensorName]}`}</p>
            )}
            {!isConnected && <p>Connecting...</p>}
          </div>
        ))}
      </div>
      <AnimatePresence>
        {selectedTopic && (
          <Popup
            control={selectedTopic}
            onClose={handleClosePopup}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
