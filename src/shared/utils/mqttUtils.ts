import mqtt, { MqttClient } from 'mqtt';
import { v4 as uuidv4 } from 'uuid';

export interface MQTTOptions {
  url: string;
  username: string;
  password: string;
  topic: string;
  onMessage: (topic: string, message: string) => void;
}

export const connectToMQTT = (
  options: MQTTOptions,
  onConnect: (client: MqttClient) => void,
  onError: (error: Error) => void
) => {
  const { url, username, password, topic, onMessage } = options;

  // Генерация уникального clientId
  const clientId = uuidv4();

  const client = mqtt.connect(url, {
    clientId,
    clean: true,
    connectTimeout: 4000,
    reconnectPeriod: 1000,
    username,
    password,
  });

  client.on('connect', () => {
    console.log(`Connected to MQTT broker via WebSocket as ${clientId}`);
    client.subscribe(topic, (err) => {
      if (err) {
        console.error('Subscription error:', err);
      } else {
        console.log(`Subscribed to topic: ${topic}`);
      }
    });

    onConnect(client);
  });

  client.on('message', (receivedTopic, message) => {
    if (receivedTopic === topic) {
      onMessage(receivedTopic, message.toString());
    }
  });

  client.on('error', (err) => {
    console.error('Connection error:', err);
    onError(err);
  });
};


export const disconnectFromMQTT = (
  client: MqttClient,
  onDisconnect: () => void
) => {
  client.end(() => {
    console.log('Disconnected from MQTT broker');
    onDisconnect();
  });
};
