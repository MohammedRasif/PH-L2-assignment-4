import app from "./app"
import config from "./config";
import { prisma } from "./lib/prisma";
import os from "os";

function getLocalIp() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        const ifaces = interfaces[name];
        if (ifaces) {
            for (const iface of ifaces) {
                if (iface.family === 'IPv4' && !iface.internal) {
                    return iface.address;
                }
            }
        }
    }
    return '127.0.0.1';
}

const PORT = config.port || 5000;

async function main() {
    try {
        await prisma.$connect();
        console.log("✅ Database connected successfully")
        app.listen(PORT as number, "0.0.0.0", () =>  {
            const localIp = getLocalIp();
            console.log(`🚀 Server is running on:`);
            console.log(`   Local:   http://localhost:${PORT}`);
            console.log(`   Network: http://${localIp}:${PORT}`);
        })
    } catch (error) {
        console.error("Error starting the server:", error);
        await prisma.$disconnect();
        process.exit(1);
    }
    
}
main();