import dotenv from "dotenv";
import { initRegistroJob } from "./src/jobs/registroJob.mjs";
dotenv.config({ quiet: true });

initRegistroJob();
