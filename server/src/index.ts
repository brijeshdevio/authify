import { app } from "./app";
import { env } from "./config/env";

const isDevelopment = env.NODE_ENV === "development";
if (isDevelopment) {
  const PORT = parseInt(env.PORT, 10) || 3000;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;
