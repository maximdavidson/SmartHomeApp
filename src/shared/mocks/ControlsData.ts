export interface MqttTopic {
  sensorName: string;
  sensorId: number;
  topics: string[];
}

export const mqttTopics: MqttTopic[] = [
  {
    sensorName: 'fire-and-smoke',
    sensorId: 1,
    topics: ['sensor/fire', 'sensor/smoke'],
  },
  {
    sensorName: 'movements',
    sensorId: 2,
    topics: ['sensor/movement'],
  },
  {
    sensorName: 'home-protection',
    sensorId: 3,
    topics: ['sensor/security'],
  },
  {
    sensorName: 'fan',
    sensorId: 4,
    topics: ['sensor/fan'],
  },
  {
    sensorName: 'air-humidity',
    sensorId: 5,
    topics: ['sensor/humidity'],
  },
  {
    sensorName: 'shaking',
    sensorId: 6,
    topics: ['sensor/shaking'],
  },
  {
    sensorName: 'charge',
    sensorId: 7,
    topics: ['sensor/charge'],
  },
  {
    sensorName: 'slant',
    sensorId: 8,
    topics: ['sensor/slant'],
  },
  {
    sensorName: 'noise',
    sensorId: 9,
    topics: ['sensor/noise'],
  },
];
