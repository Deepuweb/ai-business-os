import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Ye Vite ka config hai - React plugin use karega taaki .jsx files
// samajh aaye aur fast refresh (jaldi reload) ho sake.
export default defineConfig({
  plugins: [react()],
});
