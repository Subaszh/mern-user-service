import express from 'express';
import logger from 'morgan';
import mongoose from 'mongoose';
import indexRouter from './routes/index';
import usersRouter from './routes/users';
import companiesRouter from './routes/companies';
import errorHandler from './error-handler'

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
mongoose.connect('mongodb+srv://admin:subash-chandran@cluster0.mhy8m.mongodb.net/favorites-companies-db?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/companies', companiesRouter);
app.use(errorHandler)

export default app;
