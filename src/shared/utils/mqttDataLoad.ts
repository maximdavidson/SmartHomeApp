import mqtt from 'mqtt';
import { useEffect, useState } from 'react';
import { MqttTopic } from '@/shared/mocks/ControlsData';

const MQTT_BROKER_URL = 'ws://192.168.43.189:1883'; 
const MQTT_CLIENT_ID = `web-client`;

export const useMqtt = (topics: MqttTopic[]) => {
  const [messages, setMessages] = useState<{ [key: string]: string }>({});
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    const client = mqtt.connect(MQTT_BROKER_URL, {
      clientId: MQTT_CLIENT_ID,
      clean: true,
      username: 'admin',  // Указываем логин
      password: 'admin',  // Указываем пароль
      reconnectPeriod: 1000, // Период повторного подключения в миллисекундах
    protocol: 'mqtt',
    });

    client.on('connect', () => {
      console.log('Подключено к MQTT брокеру');
      setIsConnected(true);

      topics.forEach((topic) => {
        topic.topics.forEach((subTopic) => {
          client.subscribe(subTopic, { qos: 1 }, (err) => {
            if (err) {
              console.error(`Не удалось подписаться на ${subTopic}:`, err);
            } else {
              console.log(`Подписано на ${subTopic}`);
            }
          });
        });
      });
    });

    client.on('message', (topic, message) => {
      const topicName = topics.find((t) => t.topics.includes(topic))?.sensorName;
      if (topicName) {
        setMessages((prevMessages) => ({
          ...prevMessages,
          [topicName]: message.toString(),
        }));
        console.log(`Сообщение получено на тему ${topic}: ${message.toString()}`);
      }
    });

    client.on('error', (err) => {
      console.error('Ошибка подключения MQTT:', err);
      setIsConnected(false);
    });

    client.on('close', () => {
      console.log('MQTT соединение закрыто');
      setIsConnected(false);
    });

    client.on('offline', () => {
      console.warn('MQTT клиент оффлайн');
      setIsConnected(false);
    });

    return () => {
      client.end(true, () => {
        console.log('MQTT клиент отключен');
      });
    };
  }, [topics]);

  return { messages, isConnected };
};
