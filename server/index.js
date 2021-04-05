import express from "express";
import bodyParser from "body-parser"; // Deprecated...?
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js";

const app = express();

app.use("/posts", postRoutes);

app.use(express.json({ limit: "30mb", extended: "true" }));
app.use(express.urlencoded({ limit: "30mb", extended: "true" }));

app.use(cors()); // For what?

const CONNECTION_URL =
  "mongodb+srv://Said:<password>.@cluster0.b2qam.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(PORT, () => console.log(`Server running on ${PORT}`)))
  .catch((error) => console.log(error.message));

mongoose.set("useFindAndModify", false);
