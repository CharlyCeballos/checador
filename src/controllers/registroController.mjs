import { chromium } from "playwright";

// Función de fecha corregida para ser compatible con nombres de archivos
function timestamp() {
  const d = new Date();
  const f = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${f(d.getMonth() + 1)}-${f(d.getDate())}_${f(d.getHours())}-${f(d.getMinutes())}-${f(d.getSeconds())}`;
}

export async function registrarSalida() {
  console.log(`Iniciando proceso de salida: ${timestamp()}`);
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto("https://gsi-connect.gsi.com.mx/registro.html");

    const username = process.env.GSI_USERNAME || "YOUR_USERNAME";
    const password = process.env.GSI_PASSWORD || "YOUR_PASSWORD";

    await page.fill("#user", username);
    await page.fill("#psw", password);

    await page.click("#bttLogIn");
    await page.waitForLoadState("networkidle", { timeout: 20000 });

    await page
      .locator("text=Salida")
      .first()
      .waitFor({ state: "visible", timeout: 20000 });

    console.log("Logged in successfully:", page.url());

    // Click en el enlace de Salida
    const salidaLink = page.locator('a[onclick="registrarsalida()"]');
    await salidaLink.waitFor({ state: "visible", timeout: 20000 });
    await salidaLink.click();

    await page.waitForTimeout(2000); // Un poco más de tiempo para que procese la acción

    // Zoom para la captura
    await page.evaluate(() => {
      document.documentElement.style.zoom = "85%";
    });

    const salidaScreenshot = `salida_${timestamp()}.png`;
    await page.screenshot({ path: salidaScreenshot });
    console.log("Captura guardada correctamente:", salidaScreenshot);
  } catch (error) {
    console.error("Error durante la ejecución:", error);
  } finally {
    await browser.close();
  }
}
