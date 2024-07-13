import { ethers } from "ethers";
import dotenv from "dotenv";
import { exec } from 'child_process';
dotenv.config();

const provider = new ethers.JsonRpcProvider("https://rpc.ankr.com/scroll_sepolia_testnet");

const contractAddress = process.env.MAILBOX_ADDRESS || "";
const privateKey = process.env.PRIVATE_KEY || "";

const filter = {
    address: contractAddress,
    topics: [ethers.id("DispatchId(bytes32)")]
};

async function fetchLogs() {
    try {
        const logs = await provider.getLogs(filter);
        if (logs.length === 0) {
            console.log("No logs found.");
        }
        logs.forEach(log => {
            console.log("DispatchId:", log.topics[1]);

            const command = `hyperlane status --relay --id ${log.topics[1]} --origin scrollsepolia --destination fhenix --registry ./scripts/hyperlane-registry -k ${privateKey}`;
            exec(command, (error, stdout, stderr) => {
                // if (error) {
                //     console.error(`Command failed: ${error.message}`);
                //     return;
                // }
                console.log(`Command output: ${stdout}`);
                console.error(`Command error (if any): ${stderr}`);
            });
        });
    } catch (error) {
        console.error("Error fetching logs:", error);
    }
}

async function listenForEvents() {
    console.log("Listening to RadioFM 🎸");

    while (true) {
        try {
            await fetchLogs();
        } catch (error) {
            console.error("Error in fetchLogs:", error);
        }

        // Introduce a delay between each fetch to avoid overwhelming the node
        await new Promise(resolve => setTimeout(resolve, 5000));
    }
}

listenForEvents().catch(error => console.error("Error in listenForEvents:", error));
