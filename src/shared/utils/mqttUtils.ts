import mqtt, { MqttClient } from 'mqtt';

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

  const client = mqtt.connect(url, {
    clean: true,
    connectTimeout: 4000,
    username,
    password,
  });

  client.on('connect', () => {
    console.log('Connected to MQTT broker');
    client.subscribe(topic, (err) => {
      if (err) {
        console.error('Subscription error:', err);
      } else {
        console.log(`Subscribed to topic: ${topic}`);
      }
    });
    onConnect(client);
  });

  client.on('message', (topic, message) => {
    onMessage(topic, message.toString());
  });

  client.on('error', onError);
};

export const disconnectFromMQTT = (client: MqttClient, onDisconnect: () => void) => {
  client.end(() => {
    console.log('Disconnected from MQTT broker');
    onDisconnect();
  });
};
