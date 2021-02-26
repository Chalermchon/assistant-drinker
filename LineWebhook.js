import { post, get } from 'axios';
import crypto from 'crypto';
import { userDB } from './Firebase';

const { CHANNEL_ACCESS_TOKEN , CHANNEL_SECRET } = process.env;

const LINE_MESSAGING_API = "https://api.line.me/v2/bot/message";
const LINE_PROFILE_API = "https://api.line.me/v2/bot/profile";
const LINE_HEADERS = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${CHANNEL_ACCESS_TOKEN}`
};
const wait = async (timeInSec) => new Promise(resolve => setTimeout(resolve, timeInSec * 1000));

const verifyXLineSignature = (request, response) => {
    const signature = crypto.createHmac('SHA256', CHANNEL_SECRET).update(JSON.stringify(request.body)).digest('base64').toString();
    if (signature !== request.headers['x-line-signature']) {
        response.status(401).send("Unauthorized");
        return false;
    }
    return true;
};

const push = (userId, messages) => {
    return post(`${LINE_MESSAGING_API}/push`, { to: userId, messages }, { headers: LINE_HEADERS });
};
const reply = (replyToken, messages) => {
    return post(`${LINE_MESSAGING_API}/reply`, { replyToken, messages }, { headers: LINE_HEADERS });
};
const delayReply = async (userId, replyToken, messages) => {
    const delaytime = 2;
    const messagesMapped = messages.map(message => ({ type: 'text', text: message }));

    for (let index = 0; index < messagesMapped.length; index++) {
        if (index === 0)
            await reply(replyToken, [messagesMapped[index]]);
        else
            await push(userId, [messagesMapped[index]]);
        await wait(delaytime);
    }
};
const getUserDisplayName = (userId) => {
    return get(`${LINE_PROFILE_API}/${userId}`, { headers: LINE_HEADERS });
};

const follow = async (userId, replyToken) => {
    const { displayName: name } = (await getUserDisplayName(userId)).data;
    await userDB.create(userId);
    await delayReply(userId, replyToken, [
        `ยินดีที่ได้รู้จักค่ะคุณ ${name}`,
        'ฉันชื่อน้องตั้งใจ เป็นบอทที่จะช่วยเป็นผู้ช่วยวางแผนและจัดการปัญหาการดื่มของคุณนะคะ',
        'การสนทนาของเราจะถูกเก็บไว้เป็นความลับ และจะถูกใช้เพื่อการวิจัยและพัฒนาเท่านั้น ตัวตนของคุณจะไม่ถูกเปิดเผยแน่นอนค่ะ',
        'และเพื่อให้เราสามารถให้คำแนะนำคุณได้อย่างแม่นยำมากที่สุด',
    ]);
    await push(userId, [{
        type: 'text', 'text': 'ฉันจึงจะขอสอบถามข้อมูลส่วนตัวของคุณเล็กน้อยนะคะ',
        quickReply: {
            items: [
                {
                    type: 'action',
                    action: {
                        type: 'message',
                        label: 'บันทึกข้อมูลส่วนตัว',
                        text: 'บันทึกข้อมูลส่วนตัว'
                    }
                }
            ]
        }
    }]);
};
const unfollow = async (userId) => {
    return await userDB.delete(userId);
};

const sentToDialogflow = request => {
    request.headers.host = "bots.dialogflow.com";
    return post(
        "https://bots.dialogflow.com/line/9d637579-1f52-4fb8-bf32-9034b2f565ff/webhook",
        JSON.stringify(request.body),
        { headers: request.headers }
    );
};

export default (request, response) => {
    const event = request.body.events[0];
    const { type, source } = event;

    if (verifyXLineSignature(request, response)) {
        if (type === 'message' && event.message.type === 'text') {
            sentToDialogflow(request)
                .then(() => { response.status(200).send("Sent to dialogflow is ok.") })
                .catch((err) => console.error("Sent to dialogflow Error: ", err))
        }
        else if (type === 'follow') {
            follow(source.userId, event.replyToken)
                .then(() => { response.status(200).send("Follow is ok."); console.log('New User: ', source.userId) })
                .catch((err) => console.error("Follow Error: ", err))
        }else if (type === 'unfollow'){
            unfollow(source.userId)
        }
    }
};