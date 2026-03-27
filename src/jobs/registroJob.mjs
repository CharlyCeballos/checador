import cron from "node-cron";
import { registrarSalida } from "../controllers/registroController.mjs";

export function initRegistroJob() {
  // Programar la tarea para las 18:35 todos los días
  cron.schedule("35 18 * * *", () => {
    registrarSalida();
  });

  console.log("Cronjob iniciado: Se ejecutará todos los días a las 18:35");
}
