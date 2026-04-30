import { app } from "./app.ts";
import { router } from "./routes.ts";

app.use(router);
app.listen(3333);
