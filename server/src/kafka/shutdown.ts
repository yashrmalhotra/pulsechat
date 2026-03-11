import { Consumer, Producer } from "kafkajs";
import { consumer } from "./consumer";
import { Server } from "http";

const setUpShutDown = async (producer:Producer,consumer:Consumer,server:Server)=>{
    const shutDown = async ()=>{
        try {
            await producer.disconnect()
            await consumer.disconnect()
            console.log("producer consumer disconnected")
            server.close(()=>{
                console.log("server closed")
                process.exit(0)
            })
        } catch (error) {
            console.log(error)
        }
    }
    process.on("SIGINT",shutDown)
    process.on("SIGTERM",shutDown)
}
export default setUpShutDown