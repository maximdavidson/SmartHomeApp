import { useState } from 'react';
import { MqttClient } from 'mqtt';
import styles from './style.module.css';
import { connectToMQTT, disconnectFromMQTT } from '@/shared/utils/mqttUtils';

export const Header = () => {
  const [client, setClient] = useState<MqttClient | null>(null);
  const [sensorData, setSensorData] = useState<Record<string, string>>({});
  const [connected, setConnected] = useState(false);

  const handleConnect = () => {
    connectToMQTT(
      {
        url: 'wss://soldier.cloudmqtt.com:11237',
        username: 'root',
        password: 'root',
        topic: 'rootTopic/currentTopic',
        onMessage: (topic, message) => {
          console.log(`Message received on ${topic}: ${message}`);
          setSensorData((prev) => ({
            ...prev,
            [topic]: message,
          }));
        },
      },
      (mqttClient) => {
        setClient(mqttClient);
        setConnected(true);
      },
      (error) => {
        console.error('MQTT Connection Error:', error);
      }
    );
  };

  const handleDisconnect = () => {
    if (client) {
      disconnectFromMQTT(client, () => {
        setClient(null);
        setConnected(false);
      });
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Smart Home</h1>
      <div className={styles.management}>
        {!connected ? (
          <button
            className={`${styles.btn} ${styles.connectBtn}`}
            onClick={handleConnect}
          >
            Connect
          </button>
        ) : (
          <button
            className={`${styles.btn} ${styles.disconnectBtn}`}
            onClick={handleDisconnect}
          >
            Disconnect
          </button>
        )}
        <div className={styles.sensorData}>
          {Object.entries(sensorData).map(([key, value]) => (
            <p key={key}>
              {key}: {value}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};
