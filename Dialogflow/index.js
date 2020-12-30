import { WebhookClient, Payload } from 'dialogflow-fulfillment';
import { userDB } from '../Firebase';
import * as imageCarousels from './imageCarousels'

export default ((request, response) => {
    //Create an instance
    const agent = new WebhookClient({ request, response });
    const { source: { userId } } = request.body.originalDetectIntentRequest.payload.data;

    const createQuickReply = (text, options) => {
        if (options.length) {
            let items = options.map((option) => ({ type: "action", action: { type: "message", label: option, text: option } }))
            return new Payload(
                `LINE`,
                {
                    type: "text",
                    text: text,
                    quickReply: {
                        items: [...items]
                    }
                },
                { sendAsMessage: true }
            );
        }
    }
    const calculateStandardDrink = (percent, volume, numberOfDrinks) => ((((percent / 100) * 0.79 * volume) / 10) * numberOfDrinks).toFixed(1);
    const limitDrink = (gender, percent, volume, phase) => {
        var genderPoint;
        if (phase === 'day') {
            if (gender === 'ชาย') {
                genderPoint = 4;
            } else if (gender === 'หญิง') {
                genderPoint = 3;
            }
        } else if (phase === 'week') {
            if (gender === 'ชาย') {
                genderPoint = 14;
            } else if (gender === 'หญิง') {
                genderPoint = 7;
            }
        }
        return ((genderPoint / (((percent / 100) * 0.79 * volume) / 10))).toFixed(1);
    }

    const setUserProfile = async () => {
        let { age, gender, weight, workStatus, education, salary, useWith } = agent.parameters;

        if (!age) {
            return agent.add('ปีนี้คุณอายุเท่าไหร่แล้วคะ');
        } else if (!gender) {
            return agent.add(createQuickReply(
                'คุณเป็นผู้ชาย หรือผู้หญิงคะ',
                ["ชาย", "หญิง"]
            ));
        } else if (!weight) {
            return agent.add('น้ำหนักของคุณประมาณเท่าไหร่คะ');
        } else if (!workStatus) {
            return agent.add(createQuickReply(
                'สถานะการทำงานปัจจุบันของคุณคือ',
                ["ศึกษาอยู่", "ทำงาน", "ว่างงาน"]
            ));
        } else if (!education) {
            return agent.add(createQuickReply(
                workStatus === 'ศึกษาอยู่' ? 'ตอนนี้คุณกำลังศึกษาอยู่ระดับใดคะ' : 'การศึกษาสูงสุดของคุณอยู่ระดับใดคะ',
                ["สูงกว่าปริญญาตรี", "ปริญญาตรี", "ปวส", "ปวช", "มัธยมศึกษาตอนปลาย", "มัธยมศึกษาตอนต้น", "ประถมศึกษา"]
            ));
        } else if (!salary) {
            return agent.add('คุณมีรายได้เฉลี่ยต่อเดือนเท่าไหร่คะ');
        } else if (!useWith) {
            return agent.add(createQuickReply(
                'ในการปรึกษาครั้งนี้ คุณอยากทราบข้อมูลเพื่อนำไปใช้อย่างไรคะ',
                ["ใช้กับตนเอง", "ใช้กับคนรอบข้าง"]
            ));
        }

        await userDB.setProfile(userId, { age, gender, weight, workStatus, education, salary, useWith });
        return agent.add(createQuickReply(
            'ขอบคุณมากค่ะ คุณสามารถเลือกหัวข้อที่คุณสนใจปรึกษาจากเมนูด้านล่าง หรือต้องการพูดคุยกับฉันต่อก็ได้นะคะ',
            ["ขอเลือกเอง", "พูดคุยต่อ"]
        ));
    }

    function checkConnect(agent) {
        agent.add('Success');
    }

    //disable
    // const setUserAlcoholDrinking = async () => {
    //     let { type, percent, container, volume, numberOfDrinks } = agent.parameters;

    //     if (!type) {
    //         agent.add('โดยทั่วไปแล้ว คุณมักจะดื่มเครื่องดื่มแอลกอฮอล์ชนิดใดคะ');
    //         return agent.add(new Payload('LINE', imageCarousels.alcohol().types.all, { sendAsMessage: true }));
    //     } else if (!percent) {
    //         agent.add(`คุณมักจะดื่ม${type}ประเภทใดคะ`);
    //         return agent.add(new Payload('LINE', imageCarousels.alcohol().types[type], { sendAsMessage: true }));
    //     } else if (!container) {
    //         agent.add(`คุณมักจะใช้ภาชนะอะไร และปริมาตรเท่าไหร่ในการดื่ม${type}คะ`);
    //         return agent.add(new Payload(`LINE`, imageCarousels.alcohol().containerSize, { sendAsMessage: true }));
    //     } else if (!numberOfDrinks) {
    //         return agent.add(`ส่วนใหญ่ดื่มประมาณกี่${container}คะ`);
    //     }

    //     const standardDrink = calculateStandardDrink(percent, volume, numberOfDrinks);
    //     await userDB.setAlcoholDrinking(userId, { type, percent, container, volume, numberOfDrinks });
    //     agent.add(`จากข้อมูลที่ได้ พบว่าคุณมักจะดื่มเครื่องดื่มแอลกอฮอล์เป็นจำนวน ${standardDrink} ดื่มมาตรฐาน นะคะ`);
    //     return agent.add(createQuickReply(
    //         'คุณอยากให้ฉันประเมินความเสี่ยงให้มั้ยคะ',
    //         ['ประเมินความเสี่ยง', 'ไว้ก่อน']
    //     ));
    // }

    const checkUserDrink = async () => {
        agent.add(new Payload(
            `LINE`,
            {
                type: "text",
                text: 'ในชีวิตของคุณ คุณเคยดื่มเครื่องดื่มแอลกอฮอล์บ้างไหม',
                quickReply: {
                    items: [
                        {
                            type: "action",
                            action: {
                                type: "message",
                                label: 'ไม่เคย',
                                text: 'ไม่เคย'
                            }
                        },
                        {
                            type: "action",
                            action: {
                                type: "message",
                                label: 'เคย',
                                text: 'เคย'
                            }
                        },
                        {
                            type: "action",
                            action: {
                                type: "message",
                                label: '.',
                                text: 'เคย ไม่เลย ครั้งสองครั้ง ทุกเดือน ทุกสัปดาห์ เคยในช่วง 3 เดือน เคยแต่ก่อนหน้า 3 เดือนนี้'
                            }
                        }
                    ]
                }
            },
            { sendAsMessage: true }
        ))
    }

    const riskAssessment = async () => {
        let { first, second, third, fourth, fifth, sixth } = agent.parameters;

        if (!first) {
            return agent.add(createQuickReply(
                'ลองทบทวนดูนะคะว่า ในช่วง 3 เดือนที่ผ่านมานี้ คุณดื่มเครื่องดื่มแอลกอฮอล์ เช่น เบียร์ สุรา ไวน์ บ่อยแค่ไหน',
                ['ไม่เลย', 'ครั้งสองครั้ง', 'ทุกเดือน', 'ทุกสัปดาห์', 'ทุกวันหรือเกือบทุกวัน']
            ));
        }

        else if (!second) {
            return agent.add(createQuickReply(
                'ในช่วง 3 เดือนที่ผ่านมานี้ คุณเคยรู้สึกอยากที่จะดื่มแอลกอฮอล์อย่างรุนแรงบ่อยแค่ไหน',
                ['ไม่เลย', 'ครั้งสองครั้ง', 'ทุกเดือน', 'ทุกสัปดาห์', 'ทุกวันหรือเกือบทุกวัน']
            ));
        }

        else if (!third) {
            return agent.add(createQuickReply(
                'ในช่วง 3 เดือนที่ผ่านมา การใช้เครื่องดื่มแอลกอฮอล์ทำให้เกิดปัญหาสุขภาพ ครอบครัว สังคม กฎหมายหรือการเงินกับคุณบ่อยแค่ไหน',
                ['ไม่เลย', 'ครั้งสองครั้ง', 'ทุกเดือน', 'ทุกสัปดาห์', 'ทุกวันหรือเกือบทุกวัน']
            ));
        }

        else if (!fourth) {
            return agent.add(createQuickReply(
                'ในช่วง 3 เดือนที่ผ่านมา คุณไม่สามารถทำกิจกรรมที่คุณควรจะทำได้ตามปรกติ เนื่องจากการดื่มเครื่องดื่มแอลกอฮอล์บ่อยแค่ไหน',
                ['ไม่เลย', 'ครั้งสองครั้ง', 'ทุกเดือน', 'ทุกสัปดาห์', 'ทุกวันหรือเกือบทุกวัน']
            ));
        }

        else if (!fifth) {
            return agent.add(createQuickReply(
                'เพื่อนฝูง ญาติ หรือคนอื่น เคยแสดงความกังวลหรือตักเตือนคุณเกี่ยวกับการดื่มเครื่องดื่มแอลกอฮอล์ของคุณบ้างไหม',
                ['ไม่เคยเลย', 'เคยในช่วง 3 เดือน', 'เคยแต่ก่อนหน้า 3 เดือนนี้']
            ));
        }

        else if (!sixth) {
            return agent.add(createQuickReply(
                'คุณเคยพยายามหยุดหรือดื่มเครื่องดื่มแอลกอฮอล์ให้น้อยลง แต่ทำไม่สำเร็จบ้างหรือไม่',
                ['ไม่เคยเลย', 'เคยในช่วง 3 เดือน', 'เคยแต่ก่อนหน้า 3 เดือนนี้']
            ));
        }
        else {
            if (third !== 0){
                third ++;
            }
            var points = parseInt(first) + parseInt(second) + parseInt(third) + parseInt(fourth) +parseInt(fifth) + parseInt(sixth);
            console.log('points:' , points);
            await userDB.setAssistPoint(userId, points);
            agent.add('เพื่อให้ฉันสามารถให้คำแนะนำเกี่ยวกับปริมาณการดื่มที่เหมาะสมแก่คุณได้');
            return agent.add(createQuickReply(
                'คุณลองนึกทบทวนชนิดเครื่องดื่ม และปริมาณที่ดื่มในช่วง 7 วันที่ผ่านมานะคะ',
                ['กรอกข้อมูลของวันนี้']
            ));
        }
    }

    const riskAssessmentResult = async () => {
        const {assistPoint} = await userDB.get(userId);
        const day = ['วันนี้','เมื่อวาน','เมื่อวานซืน','เมื่อ 4 วันที่แล้ว','เมื่อ 5 วันที่แล้ว','เมื่อ 6 วันที่แล้ว','เมื่อ 7 วันที่แล้ว'];
        var {drinkingInWeek} = await userDB.get(userId);
        var sdPoint = [parseFloat(drinkingInWeek[day[0]].standardDrink), parseFloat(drinkingInWeek[day[1]].standardDrink), parseFloat(drinkingInWeek[day[2]].standardDrink)
                            , parseFloat(drinkingInWeek[day[3]].standardDrink), parseFloat(drinkingInWeek[day[4]].standardDrink), parseFloat(drinkingInWeek[day[5]].standardDrink)
                            , parseFloat(drinkingInWeek[day[6]].standardDrink)];
        var sumSdPoint = (sdPoint[0] + sdPoint[1] + sdPoint[2] + sdPoint[2] + sdPoint[3] + sdPoint[4] + sdPoint[5] + sdPoint[6]).toFixed(1);
        var maxSdPoint = Math.max(...sdPoint);
        var riskResult;
        agent.add('จากข้อมูลที่ได้ ฉันขอสรุปลักษณะความเสี่ยงและปริมาณการดื่มของคุณในช่วงสัปดาห์ที่ผ่านมานี้');
        agent.add(`ในสัปดาห์นี้ คุณดื่มเป็นจำนวน ${sumSdPoint} ดื่มมาตรฐาน`);
        agent.add(`ในสัปดาห์นี้ วันที่คุณดื่มหนักที่สุด ดื่มเป็นจำนวน ${maxSdPoint} ดื่มมาตรฐาน`);
        if (assistPoint < 11){
            riskResult = 'ต่ำ';
        }else if (11 <= assistPoint < 27){
            riskResult = 'สูง'
        }else if (assistPoint >= 27){
            riskResult = 'สูงมาก'
        }
        return agent.add(`และลักษณะการดื่มของคุณจัดอยู่ในกลุ่มที่มีความเสี่ยง${riskResult}ค่ะ`);
    }

    //disable
    // const AuditCAssessment = async () => {
    //     let { first, second, third } = agent.parameters;

    //     if (!first) {
    //         agent.add('ในการประเมินความเสี่ยงฉันอยากให้คุณนึกทบทวนว่าในช่วง 3 เดือนที่ผ่านมานั้น')
    //         return agent.add(createQuickReply(
    //             '1) คุณดื่มเครื่องดื่มที่มีแอลกฮอล์บ่อยแค่ไหน',
    //             ["ไม่ดื่มเลย", "ไม่เกินเดือนละครั้ง", "เดือนละ 2-4 ครั้ง", "สัปดาห์ละ 2-3 ครั้ง", "สัปดาห์ละ 4 ครั้งขึ้นไป"]
    //         ));
    //     } else if (!second && second !== 0) {
    //         const { alcoholDrinking: { type, percent, container, volume } } = await userDB.get(userId);
    //         return agent.add(`2) เมื่อคุณดื่ม คุณดื่ม${type}ที่มีแอลกอฮอล์ ${percent}% กี่${container}ที่ปริมาตร ${volume} มิลลิลิตรคะ`);
    //     } else if (!third) {
    //         const { alcoholDrinking: { type, container, percent, volume } } = await userDB.get(userId);
    //         const numOfOverdose = Math.ceil((10 / ((percent / 100) * 0.79 * volume)) * 5);
    //         return agent.add(createQuickReply(
    //             `3) บ่อยแค่ไหนที่คุณดื่ม${type}มากกว่า ${numOfOverdose} ${container}ที่มีปริมาตร ${volume} มิลลิลิตร ในการดื่มครั้งเดียว`,
    //             ["ไม่ดื่มเลย", "ไม่เกินเดือนละครั้ง", "เดือนละครั้ง", "สัปดาห์ละครั้ง", "เกือบทุกวัน"]
    //         ));
    //     }
    //     const { alcoholDrinking: { percent, volume, container, numberOfDrinks, type }, profile: { gender } } = await userDB.get(userId);
    //     const standardDrink = calculateStandardDrink(percent, volume, second);
    //     const limitPerDay = limitDrink(gender, percent, volume, 'day');
    //     const limitPerWeek = limitDrink(gender, percent, volume, 'week');
    //     if (standardDrink >= 10) { second = 4 }
    //     else if (standardDrink >= 7) { second = 3 }
    //     else if (standardDrink >= 5) { second = 2 }
    //     else if (standardDrink >= 3) { second = 1 }
    //     else { second = 0 }

    //     const point = parseInt(first) + second + parseInt(third);
    //     await userDB.setAuditCPoint(userId, point);
    //     if (point >= 7) {
    //         agent.add('จากข้อมูลที่ได้ พบว่าคุณมีพฤติกรรมการดื่มที่มีความเสี่ยง "สูง" จะส่งผลเสียต่อสุขภาพ');
    //     } else if ((gender === 'ชาย' && point >= 4) || (gender === 'หญิง' && point >= 3)) {
    //         agent.add('จากข้อมูลที่ได้ พบว่าคุณมีพฤติกรรมการดื่มที่มีความเสี่ยง "ปานกลาง" จะส่งผลเสียต่อสุขภาพ');
    //     } else {
    //         agent.add('จากข้อมูลที่ได้ พบว่าคุณมีพฤติกรรมการดื่มที่มีความเสี่ยง "ต่ำ" ที่จะส่งผลเสียต่อสุขภาพ');
    //     }
    //     agent.add(`คุณสามารถดื่ม${type}ได้ไม่เกิน ${limitPerDay} ${container}ต่อวัน`);
    //     agent.add(`และสามารถดื่ม${type}ได้ไม่เกิน ${limitPerWeek} ${container}ต่อสัปดาห์ค่ะ`)
    // }

    const setDrinkingInWeek = async () => {
        let { type, percent, container, volume, numberOfDrinks, thisDay } = agent.parameters;
        thisDay = parseInt(thisDay);
        const dayInWeek = ['วันนี้','เมื่อวาน','เมื่อวานซืน','เมื่อ 4 วันที่แล้ว','เมื่อ 5 วันที่แล้ว','เมื่อ 6 วันที่แล้ว','เมื่อ 7 วันที่แล้ว'];
        const user = await userDB.get(userId)
        var standardDrink;

        if (thisDay !== 0 && !user.drinkingInWeek[dayInWeek[thisDay - 1]]) {
            return agent.add(createQuickReply(`คุณยังไม่ได้ให้ข้อมูลของ${dayInWeek[thisDay - 1]}เลยนะคะ`, [
                `กรอกข้อมูลของ${dayInWeek[thisDay - 1]}`
            ]))
        }
        if (!type) {
            agent.add(`${dayInWeek[thisDay]}คุณดื่มเครื่องดื่มแอลกอฮอล์ชนิดใดคะ`);
            return agent.add(new Payload('LINE', imageCarousels.alcohol().types.all, { sendAsMessage: true }));
        } else if (!percent) {
            agent.add(`คุณดื่ม${type}ประเภทใดคะ`);
            return agent.add(new Payload('LINE', imageCarousels.alcohol().types[type], { sendAsMessage: true }));
        } else if (!container) {
            agent.add(`คุณใช้ภาชนะอะไร และปริมาตรเท่าไหร่ในการดื่ม${type}คะ`);
            return agent.add(new Payload('LINE', imageCarousels.alcohol().containerSize, { sendAsMessage: true }));
        } else if (!numberOfDrinks) {
            return agent.add(`ดื่มประมาณกี่${container}คะ`);
        }
        standardDrink = calculateStandardDrink(percent ,volume ,numberOfDrinks);
        await userDB.setDrinkingInWeek(userId, dayInWeek[thisDay], {
            type, percent, container, volume, numberOfDrinks, standardDrink
        })
        if (thisDay !== 6) {
            agent.add(`${dayInWeek[thisDay]} คุณดื่ม${type}ที่มีแอลกอฮอล์ ${percent}% จำนวน ${numberOfDrinks} ${container} ที่มีปริมาตร${container}ละ ${volume} มิลลิลิตร`);
            return agent.add(new Payload(
                `LINE`,
                {
                    "type": "text",
                    "text": "คุณต้องการแก้ไขข้อมูลมั้ยคะ",
                    "quickReply": {
                        "items": [
                            {
                                "type": "action",
                                "action": {
                                    "type": "message",
                                    "text": `แก้ไขข้อมูลของ${dayInWeek[thisDay]}`,
                                    "label": `แก้ไขข้อมูล`
                                }
                            },
                            {
                                "type": "action",
                                "action": {
                                    "type": "message",
                                    "label": "ไม่ ไปวันถัดไป",
                                    "text": `กรอกข้อมูลของ${dayInWeek[thisDay + 1]}`
                                }
                            }
                        ]
                    },
                },
                { sendAsMessage: true }
            ))
        }else{
            agent.add(`${dayInWeek[thisDay]} คุณดื่ม${type}ที่มีแอลกอฮอล์ ${percent} จำนวน ${numberOfDrinks} ${container} ที่มีปริมาตร${container}ละ ${volume} มิลลิลิตร`);
            return agent.add(new Payload(
                `LINE`,
                {
                    "type": "text",
                    "text": "คุณต้องการแก้ไขข้อมูลมั้ยคะ",
                    "quickReply": {
                        "items": [
                            {
                                "type": "action",
                                "action": {
                                    "type": "message",
                                    "text": `แก้ไขข้อมูลของ${dayInWeek[thisDay]}`,
                                    "label": `แก้ไขข้อมูล`
                                }
                            },
                            {
                                "type": "action",
                                "action": {
                                    "type": "message",
                                    "label": "ไม่",
                                    "text": `สรุปผลประเมินความเสี่ยง`
                                }
                            }
                        ]
                    },
                },
                { sendAsMessage: true }
            ))
        }
    }

    // Run the proper function handler based on the matched Dialogflow intent name
    let intentMap = new Map();
    intentMap.set('check connect', checkConnect);
    intentMap.set('SET_USER_PROFILE', setUserProfile);
    // intentMap.set('SET_USER_ALCOHOL_DRINKING', setUserAlcoholDrinking);
    intentMap.set('RISK_ASSESSMENT', checkUserDrink);
    intentMap.set('RISK_ASSESSMENT - yes', riskAssessment);
    intentMap.set('SET_DRINKING_IN_WEEK', setDrinkingInWeek);
    intentMap.set('SET_DRINKING_IN_WEEK - edit', setDrinkingInWeek);
    intentMap.set('RISK_ASSESSMENT_RESULT', riskAssessmentResult);
    agent.handleRequest(intentMap);
});
