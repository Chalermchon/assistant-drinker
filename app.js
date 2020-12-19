import express from 'express';
import { urlencoded, json } from 'body-parser';

import LineWebhook from './LineWebhook';
import DialogflowWebhook from './Dialogflow'

const app = express();
const port = process.env.PORT || 4000;
app.use(urlencoded({ extended: false }));
app.use(json());

app.post('/line-webhook', LineWebhook);
app.post('/dialogflow-webhook', DialogflowWebhook);

app.listen(port, () => { console.log('🤖 Server is listening on port:', port) });