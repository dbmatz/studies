import { app } from "./app.ts";
import { router } from "./routes.ts";

app.listen(3333);
app.use(router);
