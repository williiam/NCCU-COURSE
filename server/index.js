
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import userRouter from "./routes/user.js";
import postRoutes from './routes/post.js';
import courseRoutes from './routes/course.js';
import professorRoutes from './routes/professor.js';
import departmentRoutes from './routes/department.js';
import courseFeedBackRoutes from './routes/courseFeedBack.js';
import courseResourceRoutes from './routes/courseResource.js';

const app = express();

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/course', courseRoutes);
app.use("/user", userRouter);
app.use('/posts', postRoutes);
app.use('/feedback', courseFeedBackRoutes);
app.use('/resource', courseResourceRoutes);
app.use('/department', departmentRoutes);
app.use('/professor', professorRoutes);

const CONNECTION_URL = 'YOURSECRET';

const PORT = process.env.PORT|| 80;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true})
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));