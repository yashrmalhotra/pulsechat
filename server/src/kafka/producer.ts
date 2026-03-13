import { Kafka, Producer } from "kafkajs"
const ca = process.env.KAFKA_CA?.replace(/\\n/g,"\n")
const kafka = new Kafka({
  clientId: "chat-app",
  brokers: [process.env.KAFKA_URL!],
   ssl:{
    rejectUnauthorized:true,
    ca:[ca!]
  },
  sasl:{
    username:process.env.KAFKA_USERNAME!,
    password:process.env.KAFKA_PASSWORD!,
    mechanism:"plain"
  }
})
export let producer: Producer
export const connectProducer = async () => {
  if (producer) return producer

  try {
    const _producer = kafka.producer()
    await _producer.connect()
    producer = _producer

    console.log("producer connected succesfully")
    return producer
  } catch (error) {
    console.log(error)
  }
}
