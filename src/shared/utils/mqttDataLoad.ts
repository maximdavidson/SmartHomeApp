import mqtt from 'mqtt';
import { useEffect, useState } from 'react';
import { MqttTopic } from '@/shared/mocks/ControlsData'; // Ваша структура данных

const MQTT_BROKER_URL = 'wss://your-mqtt-broker-url:port'; // Замените на ваш URL
const MQTT_CLIENT_ID = 'web-client-id'; // Уникальный идентификатор клиента

export const useMqtt = (topics: MqttTopic[]) => {
  const [messages, setMessages] = useState<{ [key: string]: string }>({});
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    const client = mqtt.connect(MQTT_BROKER_URL, {
      clientId: MQTT_CLIENT_ID,
      clean: true,
    });

    client.on('connect', () => {
      console.log('Connected to MQTT Broker');
      setIsConnected(true);

      // Подписка на топики
      topics.forEach(topic => {
        topic.topics.forEach(subTopic => {
          client.subscribe(subTopic, { qos: 1 }, (err) => {
            if (err) {
              console.error(`Failed to subscribe to ${subTopic}`, err);
            } else {
              console.log(`Subscribed to ${subTopic}`);
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
      }
    });

    client.on('error', (err) => {
      console.error('MQTT connection error:', err);
      setIsConnected(false);
    });

    return () => {
      client.end(); // Закрытие подключения при размонтировании компонента
    };
  }, [topics]);

  return { messages, isConnected };
};
