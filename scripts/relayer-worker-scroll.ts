import { ethers } from "ethers";
import dotenv from "dotenv";
import { exec } from 'child_process';
dotenv.config();

const provider = new ethers.WebSocketProvider(process.env.SCROLL_WSS || "");

const contractAddress = process.env.MAILBOX_ADDRESS || "";
const privateKey = process.env.PRIVATE_KEY || "";

const iface = new ethers.Interface([
    "event DispatchId(bytes32 indexed id)"
]);

const contract = new ethers.Contract(contractAddress, iface, provider);

console.log("🏁 Worker started listening")
contract.on("DispatchId", (id) => {
    console.log("🤠 DispatchId:", id); // TODO: Add time

    const command = `hyperlane status --relay --id ${id} --origin scrollsepolia --destination fhenix --registry ./scripts/hyperlane-registry -k ${privateKey}`;
    exec(command, (error, stdout, stderr) => {
        console.log("🔫 Executing Hyperlane!");
        console.log(`Command output: ${stdout}`);
        console.error(`Command error (if any): ${stderr}`);
    });
});
