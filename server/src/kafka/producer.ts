import { Kafka, Producer } from "kafkajs";
const kafka = new Kafka({
    clientId:"chat-app",
    brokers:[process.env.KAFKA_URL!]
})
export let producer:Producer
export const connectProducer = async ()=>{
     if(producer) return producer
    
    try {
       const _producer =  kafka.producer()
        await _producer.connect()
        producer = _producer
        
        console.log("producer connected succesfully")
        return producer
    } catch (error) {
        console.log(error)
    }
}
