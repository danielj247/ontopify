import { BrowserWindow, shell } from "electron";
import { join } from "path";
import { LayoutHeight, LayoutWidth } from "@/enum/layout";

export default function AppWindow() {
  const mainWindow = new BrowserWindow({
    width: LayoutWidth.LARGE,
    minWidth: LayoutWidth.LARGE,
    maxWidth: LayoutWidth.LARGE,
    height: LayoutHeight.LARGE,
    maxHeight: LayoutHeight.LARGE,
    show: false,
    frame: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, "./preload.js"),
      nodeIntegration: false,
      sandbox: false,
    },
  });

  mainWindow.setAlwaysOnTop(true, "floating");
  mainWindow.setVisibleOnAllWorkspaces(true);
  mainWindow.setFullScreenable(false);

  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  mainWindow.webContents.openDevTools();
}
