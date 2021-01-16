import { WebhookClient, Payload } from 'dialogflow-fulfillment';
import { userDB } from '../Firebase';
import * as imageCarousels from './imageCarousels'

export default ((request, response) => {
    //Create an instance
    const agent = new WebhookClient({ request, response });
    const { source: { userId } } = request.body.originalDetectIntentRequest.payload.data;

    function checkConnect(agent) {
        agent.add('Success');
    }

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

    const checkUserDrinking = async () => {
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
                                label: 'เคย',
                                text: 'เคย'
                            }
                        },
                        {
                            type: "action",
                            action: {
                                type: "message",
                                label: 'ไม่เคย',
                                text: 'ไม่เคย'
                            }
                        },
                    ]
                }
            },
            { sendAsMessage: true }
        ))
    }

    const checkUserDrinkingIn3Month = async () =>{
        return agent.add(createQuickReply(
            'ลองทบทวนดูนะคะว่า ในช่วง 3 เดือนที่ผ่านมานี้ คุณดื่มเครื่องดื่มแอลกอฮอล์บ้างไหม',
            ['ดื่ม', 'ไม่ได้ดื่ม']
        ));
    }

    const riskAssessment_DrinkIn3Month = async () =>{
        let {second, third, fourth, fifth, sixth, seventh } = agent.parameters;
        if(!second){
            return agent.add(createQuickReply(
                'ลองทบทวนดูนะคะว่า ในช่วง 3 เดือนที่ผ่านมานี้ คุณดื่มเครื่องดื่มแอลกอฮอล์ เช่น เบียร์ สุรา ไวน์ บ่อยแค่ไหน',
                ['ครั้งสองครั้ง', 'ทุกเดือน', 'ทุกสัปดาห์', 'ทุกวันหรือเกือบทุกวัน']
            ));
        }
        else if (!third) {
            return agent.add(createQuickReply(
                'ในช่วง 3 เดือนที่ผ่านมานี้ คุณเคยรู้สึกอยากที่จะดื่มแอลกอฮอล์อย่างรุนแรงบ่อยแค่ไหน',
                ['ไม่เลย', 'ครั้งสองครั้ง', 'ทุกเดือน', 'ทุกสัปดาห์', 'ทุกวันหรือเกือบทุกวัน']
            ));
        }

        else if (!fourth) {
            return agent.add(createQuickReply(
                'ในช่วง 3 เดือนที่ผ่านมา การใช้เครื่องดื่มแอลกอฮอล์ทำให้เกิดปัญหาสุขภาพ ครอบครัว สังคม กฎหมายหรือการเงินกับคุณบ่อยแค่ไหน',
                ['ไม่เลย', 'ครั้งสองครั้ง', 'ทุกเดือน', 'ทุกสัปดาห์', 'ทุกวันหรือเกือบทุกวัน']
            ));
        }

        else if (!fifth) {
            return agent.add(createQuickReply(
                'ในช่วง 3 เดือนที่ผ่านมา คุณไม่สามารถทำกิจกรรมที่คุณควรจะทำได้ตามปรกติ เนื่องจากการดื่มเครื่องดื่มแอลกอฮอล์บ่อยแค่ไหน',
                ['ไม่เลย', 'ครั้งสองครั้ง', 'ทุกเดือน', 'ทุกสัปดาห์', 'ทุกวันหรือเกือบทุกวัน']
            ));
        }

        else if (!sixth) {
            return agent.add(createQuickReply(
                'เพื่อนฝูง ญาติ หรือคนอื่น เคยแสดงความกังวลหรือตักเตือนคุณเกี่ยวกับการดื่มเครื่องดื่มแอลกอฮอล์ของคุณบ้างไหม',
                ['ไม่เคยเลย', 'เคยในช่วง 3 เดือน', 'เคยแต่ก่อนหน้า 3 เดือนนี้']
            ));
        }

        else if (!seventh) {
            return agent.add(createQuickReply(
                'คุณเคยพยายามหยุดหรือดื่มเครื่องดื่มแอลกอฮอล์ให้น้อยลง แต่ทำไม่สำเร็จบ้างหรือไม่',
                ['ไม่เคยเลย', 'เคยในช่วง 3 เดือน', 'เคยแต่ก่อนหน้า 3 เดือนนี้']
            ));
        }

        if (fourth !== 0) {
            fourth++;
        }
        var points =parseInt(second) + parseInt(third) + parseInt(fourth) + parseInt(fifth) + parseInt(sixth) +parseInt(seventh);
        await userDB.setAssistPoint(userId, points);
        agent.add('เพื่อให้น้องตั้งใจให้คำแนะนำปริมาณการดื่มที่เหมาะสมแก่คุณได้');
            agent.add('น้องตั้งใจอยากให้คุณนึกทบทวนการดื่มในช่วง 7 วันที่ผ่านมา');
            agent.add('ทั้งรายละเอียดชนิดเครื่องดื่ม และปริมาณที่ดื่ม เพื่อนำมาหาค่าดื่มมาตรฐาน และให้คำแนะนำต่อไปค่ะ');
            agent.add('แต่การให้คำแนะนำอาจมีความคลาดเคลื่อนได้ เนื่องจากปริมาณของแอลกอฮอล์ที่มีอยู่จริงในเครื่องดื่มแต่ละยี่ห้อนั้น อาจแตกต่างไปบ้างจากข้อมูลที่น้องตั้งใจมีอยู่นะคะ');
            return agent.add(new Payload(
                `LINE`,
                {
                    "type": "text",
                    "text": "ก่อนอื่น คุณอยากรู้รายละเอียดเกี่ยวกับเพิ่มเติมเกี่ยวกับคำว่า “ดื่มมาตรฐาน” ไหมคะ",
                    "quickReply": {
                        "items": [
                            {
                                "type": "action",
                                "action": {
                                    "type": "message",
                                    "text": `ข้อมูลเกี่ยวกับดื่มมาตรฐาน`,
                                    "label": `อยากรู้`
                                }
                            },
                            {
                                "type": "action",
                                "action": {
                                    "type": "message",
                                    "label": "ไม่ และกรอกข้อมูลการดื่ม",
                                    "text": `กรอกข้อมูลของวันนี้`
                                }
                            }
                        ]
                    },
                },
                { sendAsMessage: true }
            ))
    }

    const riskAssessment_DontDrinkIn3Month = async () =>{
        let {sixth, seventh } = agent.parameters;
        if (!sixth) {
            return agent.add(createQuickReply(
                'เพื่อนฝูง ญาติ หรือคนอื่น เคยแสดงความกังวลหรือตักเตือนคุณเกี่ยวกับการดื่มเครื่องดื่มแอลกอฮอล์ของคุณบ้างไหม',
                ['ไม่เคยเลย', 'เคยในช่วง 3 เดือน', 'เคยแต่ก่อนหน้า 3 เดือนนี้']
            ));
        }

        else if (!seventh) {
            return agent.add(createQuickReply(
                'คุณเคยพยายามหยุดหรือดื่มเครื่องดื่มแอลกอฮอล์ให้น้อยลง แต่ทำไม่สำเร็จบ้างหรือไม่',
                ['ไม่เคยเลย', 'เคยในช่วง 3 เดือน', 'เคยแต่ก่อนหน้า 3 เดือนนี้']
            ));
        }

        var points = parseInt(sixth) +parseInt(seventh);
        await userDB.setAssistPoint(userId, points);
        agent.add('เพื่อให้น้องตั้งใจให้คำแนะนำปริมาณการดื่มที่เหมาะสมแก่คุณได้');
            agent.add('น้องตั้งใจอยากให้คุณนึกทบทวนการดื่มในช่วง 7 วันที่ผ่านมา');
            agent.add('ทั้งรายละเอียดชนิดเครื่องดื่ม และปริมาณที่ดื่ม เพื่อนำมาหาค่าดื่มมาตรฐาน และให้คำแนะนำต่อไปค่ะ');
            agent.add('แต่การให้คำแนะนำอาจมีความคลาดเคลื่อนได้ เนื่องจากปริมาณของแอลกอฮอล์ที่มีอยู่จริงในเครื่องดื่มแต่ละยี่ห้อนั้น อาจแตกต่างไปบ้างจากข้อมูลที่น้องตั้งใจมีอยู่นะคะ');
            return agent.add(new Payload(
                `LINE`,
                {
                    "type": "text",
                    "text": "ก่อนอื่น คุณอยากรู้รายละเอียดเกี่ยวกับเพิ่มเติมเกี่ยวกับคำว่า “ดื่มมาตรฐาน” ไหมคะ",
                    "quickReply": {
                        "items": [
                            {
                                "type": "action",
                                "action": {
                                    "type": "message",
                                    "text": `ข้อมูลเกี่ยวกับดื่มมาตรฐาน`,
                                    "label": `อยากรู้`
                                }
                            },
                            {
                                "type": "action",
                                "action": {
                                    "type": "message",
                                    "label": "ไม่ และกรอกข้อมูลการดื่ม",
                                    "text": `กรอกข้อมูลของวันนี้`
                                }
                            }
                        ]
                    },
                },
                { sendAsMessage: true }
            ))
    }

    const setDrinkingInWeekInputType = async () => {
        let { thisDay } = agent.parameters;
        const user = await userDB.get(userId);
        thisDay = parseInt(thisDay);
        const dayInWeek = ['วันนี้', 'เมื่อวาน', 'เมื่อวานซืน', 'เมื่อ 4 วันที่แล้ว', 'เมื่อ 5 วันที่แล้ว', 'เมื่อ 6 วันที่แล้ว', 'เมื่อ 7 วันที่แล้ว'];

        if (dayInWeek[thisDay] === 'วันนี้') {
            agent.add('หากคุณรู้ปริมาณความเข้มข้นของแอลกอฮอล์ของเครื่องดื่มที่คุณดื่มในแต่ละวันแล้ว คุณสามารถเลือกกำหนดเองได้เลยค่ะ เพื่อความถูกต้องแม่นยำมากที่สุด');
            agent.add('การระบุความเข้มข้นนั้นให้พิมพ์เฉพาะตัวเลข และจุดทศนิยม ถ้ามีนะคะ เช่น หากฉลากระบุว่า “ALC 8.0% VOL” ให้พิมพ์ว่า “8.0” ค่ะ');
            agent.add('หากคุณไม่สามารถระบุความเข้มข้นได้ น้องตั้งใจก็มีรายชื่อเครื่องดื่มชนิดต่างๆ ให้คุณเลือกได้ค่ะ');
        }

        if (thisDay !== 0 && !user.drinkingInWeek[dayInWeek[thisDay - 1]]) {
            return agent.add(createQuickReply(`คุณยังไม่ได้ให้ข้อมูลของ${dayInWeek[thisDay - 1]}เลยนะคะ`, [
                `กรอกข้อมูลของ${dayInWeek[thisDay - 1]}`
            ]))
        }

        return agent.add(createQuickReply(
            `${dayInWeek[thisDay]}คุณดื่มอะไรคะ หากว่าดื่มหลายชนิด ให้เลือกเครื่องดื่มที่ดื่มปริมาณมากที่สุดมาเพียงชนิดเดียวค่ะ`,
            ['ขอระบุเอง', "ขอเลือกจากเมนู"]
        ));
    }

    const setDrinkingInWeek_fill = async () => {
        let { thisDay ,type, percent, container, volume, numberOfDrinks } = agent.parameters;
        thisDay = parseInt(thisDay);
        const dayInWeek = ['วันนี้', 'เมื่อวาน', 'เมื่อวานซืน', 'เมื่อ 4 วันที่แล้ว', 'เมื่อ 5 วันที่แล้ว', 'เมื่อ 6 วันที่แล้ว', 'เมื่อ 7 วันที่แล้ว'];
        var standardDrink;

        console.log('this day:',thisDay);
        console.log('type:' , type);
        console.log('percent:' , percent);
        console.log('container:' , container);
        console.log('volume:' , volume);
        console.log('number of drink:' , numberOfDrinks);
        console.log('-------------------');

        if (!type) {
            return agent.add(`กรุณาระบุเครื่องดื่มด้วยค่ะ`);
        } else if (!percent) {
            return agent.add(`${type}คุณดื่มมีแอลกอฮอล์กี่เปอร์เซ็นค่ะ`);
        } else if (!container) {
            agent.add(`น้องตั้งใจขอแนะนำให้คุณเลือกภาชนะที่มีขนาดใกล้เคียงที่สุดเพื่อกะปริมาณการดื่มในแต่ละวันได้ดีที่สุดนะคะ`);
            return agent.add(new Payload('LINE', imageCarousels.alcohol().containerSize.all, { sendAsMessage: true }));
        } else if (!numberOfDrinks) {
            return agent.add(`ดื่มประมาณกี่${container}คะ`);
        }
        standardDrink = calculateStandardDrink(percent, volume, numberOfDrinks);
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
        } else {
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

    const setDrinkingInWeek_pick = async () => {
        let { thisDay ,type, percent,container, volume, numberOfDrinks } = agent.parameters;
        thisDay = parseInt(thisDay);
        const dayInWeek = ['วันนี้', 'เมื่อวาน', 'เมื่อวานซืน', 'เมื่อ 4 วันที่แล้ว', 'เมื่อ 5 วันที่แล้ว', 'เมื่อ 6 วันที่แล้ว', 'เมื่อ 7 วันที่แล้ว'];
        var standardDrink;

        console.log('this day:',thisDay);
        console.log('type:' , type);
        console.log('percent:' , percent);
        console.log('container:' , container);
        console.log('volume:' , volume);
        console.log('number of drink:' , numberOfDrinks);
        console.log('-------------------');

        if (!type) {
            agent.add(`กรุณาเลือกเครื่องดื่มด้วยค่ะ`);
            return agent.add(new Payload('LINE', imageCarousels.alcohol().types.all, { sendAsMessage: true }));
        }else{
            if(type === 'สุราสี' || type === 'สุราขาว'){
                if(!percent){
                    return agent.add(new Payload(
                        `LINE`,
                        {
                            type: "text",
                            text: `คุณรู้ปริมาณความเข้มข้นของแอลกอฮอล์ของ${type}ที่คุณดื่มไหมค่ะ ว่าเป็นแบบ 35 ดีกรี หรือ 40 ดีกรี`,
                            quickReply: {
                                items: [
                                    {
                                        type: "action",
                                        action: {
                                            type: "message",
                                            label: '35 ดีกรี',
                                            text: '35 ดีกรี'
                                        }
                                    },
                                    {
                                        type: "action",
                                        action: {
                                            type: "message",
                                            label: '40 ดีกรี',
                                            text: '40 ดีกรี'
                                        }
                                    },
                                    {
                                        type: "action",
                                        action: {
                                            type: "message",
                                            label: 'ไม่ทราบ ขอใช้ค่าเฉลี่ย',
                                            text: 'ค่าเฉลี่ย 37 ดีกรี'
                                        }
                                    }
                                ]
                            }
                        },
                        { sendAsMessage: true }
                    ))
                }
            }else{
                if(!percent){
                    var aclPercent;
                    if(type ==='ไวน์คูลเลอร์' || type ==='เบียร์'){
                        aclPercent = 5;
                    }else if(type ==='ไวน์' || type ==='สุราพื้นเมือง'){
                        aclPercent = 13;
                    }else if(type ==='เครื่องดื่มอื่นๆ'){
                        aclPercent = 40;
                    }
                    return agent.add(createQuickReply(
                        `ค่าความเข้มข้นของ${type}ที่คุณดื่ม`,
                        [`${aclPercent}%`]
                    ));
                }
            }
        }
        
       if (!container) {
            agent.add(`น้องตั้งใจขอแนะนำให้คุณเลือกภาชนะที่มีขนาดใกล้เคียงที่สุดเพื่อกะปริมาณการดื่มในแต่ละวันได้ดีที่สุดนะคะ`);
            return agent.add(new Payload('LINE', imageCarousels.alcohol().containerSize[type], { sendAsMessage: true }));
        } else if (!numberOfDrinks) {
            return agent.add(`ดื่มประมาณกี่${container}คะ`);
        }
        
        standardDrink = calculateStandardDrink(percent, volume, numberOfDrinks);
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
        } else {
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

    const riskAssessmentResultWeek = async () => {
        const { assistPoint } = await userDB.get(userId);
        const { profile: { gender, age } } = await userDB.get(userId);
        var result;

        const day = ['วันนี้', 'เมื่อวาน', 'เมื่อวานซืน', 'เมื่อ 4 วันที่แล้ว', 'เมื่อ 5 วันที่แล้ว', 'เมื่อ 6 วันที่แล้ว', 'เมื่อ 7 วันที่แล้ว'];
        var { drinkingInWeek } = await userDB.get(userId);
        var sdPoint = [parseFloat(drinkingInWeek[day[0]].standardDrink), parseFloat(drinkingInWeek[day[1]].standardDrink), parseFloat(drinkingInWeek[day[2]].standardDrink)
            , parseFloat(drinkingInWeek[day[3]].standardDrink), parseFloat(drinkingInWeek[day[4]].standardDrink), parseFloat(drinkingInWeek[day[5]].standardDrink)
            , parseFloat(drinkingInWeek[day[6]].standardDrink)];
        var sumSdPoint = (sdPoint[0] + sdPoint[1] + sdPoint[2] + sdPoint[2] + sdPoint[3] + sdPoint[4] + sdPoint[5] + sdPoint[6]).toFixed(1);

        agent.add('ขอบคุณค่ะ จากข้อมูลที่ได้ น้องตั้งใจขอสรุปความเสี่ยงและปริมาณการดื่มของคุณในช่วงสัปดาห์ที่ผ่านมาตามนี้นะคะ');

        if (gender === 'หญิง' || age >= 66) {
            if (sumSdPoint > 7) {
                result = 'เกิน';
            } else {
                result = 'ไม่เกิน';
            }
        } else if (gender === 'ชาย') {
            if (sumSdPoint > 14) {
                result = 'เกิน';
            } else {
                result = 'ไม่เกิน';
            }
        }

        agent.add(`ในสัปดาห์นี้ คุณดื่มเป็นจำนวน ${sumSdPoint} ดื่มมาตรฐาน ซึ่ง${result}ตามเกณฑ์แนะนำการดื่มปลอดภัยใน 7 วัน`);
        return agent.add(new Payload(
            `LINE`,
            {
                "type": "text",
                "text": "คุณอยากรู้รายละเอียดของระดับการการดื่มที่ปลอดภัยใน 7 วันไหมคะ",
                "quickReply": {
                    "items": [
                        {
                            "type": "action",
                            "action": {
                                "type": "message",
                                "text": `ข้อมูลของการดื่มที่ปลอดภัย`,
                                "label": `อยากรู้`
                            }
                        },
                        {
                            "type": "action",
                            "action": {
                                "type": "message",
                                "label": "ไว้ก่อน",
                                "text": `ไว้ก่อน`
                            }
                        }
                    ]
                },
            },
            { sendAsMessage: true }
        ))
    }

    const riskAssessmentResultDay = async () => {
        const day = ['วันนี้', 'เมื่อวาน', 'เมื่อวานซืน', 'เมื่อ 4 วันที่แล้ว', 'เมื่อ 5 วันที่แล้ว', 'เมื่อ 6 วันที่แล้ว', 'เมื่อ 7 วันที่แล้ว'];
        var maxDay = '';
        var result;
        const { profile: { gender, age } } = await userDB.get(userId);
        var { drinkingInWeek } = await userDB.get(userId);
        var sdPoint = [parseFloat(drinkingInWeek[day[0]].standardDrink), parseFloat(drinkingInWeek[day[1]].standardDrink), parseFloat(drinkingInWeek[day[2]].standardDrink)
            , parseFloat(drinkingInWeek[day[3]].standardDrink), parseFloat(drinkingInWeek[day[4]].standardDrink), parseFloat(drinkingInWeek[day[5]].standardDrink)
            , parseFloat(drinkingInWeek[day[6]].standardDrink)];

        var maxSdPoint = Math.max(...sdPoint);
        for (var i = 0; i <= 6; i++) {
            if (maxSdPoint = sdPoint[i]) {
                maxDay = day[i];
                break;
            }
        }

        if (gender === 'หญิง' || age >= 66) {
            if (maxSdPoint > 3) {
                result = 'เกิน';
            } else {
                result = 'ไม่เกิน';
            }
        } else if (gender === 'ชาย') {
            if (maxSdPoint > 4) {
                result = 'เกิน';
            } else {
                result = 'ไม่เกิน';
            }
        }

        agent.add(`ในสัปดาห์นี้ วันที่คุณดื่มหนักที่สุดคือ${maxDay} ซึ่ง${result}ตามเกณฑ์แนะนำการดื่มปลอดภัยต่อวัน`)
        return agent.add(new Payload(
            `LINE`,
            {
                "type": "text",
                "text": "คุณอยากรู้รายละเอียดของระดับการการดื่มที่ปลอดภัยภายในหนึ่งวันไหมคะ",
                "quickReply": {
                    "items": [
                        {
                            "type": "action",
                            "action": {
                                "type": "message",
                                "text": `ข้อมูลของการดื่มที่ปลอดภัย`,
                                "label": `อยากรู้`
                            }
                        },
                        {
                            "type": "action",
                            "action": {
                                "type": "message",
                                "label": "ไว้ก่อน",
                                "text": `ไว้ก่อน`
                            }
                        }
                    ]
                },
            },
            { sendAsMessage: true }
        ))
    }

    const riskAssessmentResultRisk = async () =>{
        const { assistPoint } = await userDB.get(userId);
        const { profile: { gender, age } } = await userDB.get(userId);
        var resultWeek;
        var resultDay;
        var resultRisk;
        var result;

        const day = ['วันนี้', 'เมื่อวาน', 'เมื่อวานซืน', 'เมื่อ 4 วันที่แล้ว', 'เมื่อ 5 วันที่แล้ว', 'เมื่อ 6 วันที่แล้ว', 'เมื่อ 7 วันที่แล้ว'];
        var { drinkingInWeek } = await userDB.get(userId);
        var sdPoint = [parseFloat(drinkingInWeek[day[0]].standardDrink), parseFloat(drinkingInWeek[day[1]].standardDrink), parseFloat(drinkingInWeek[day[2]].standardDrink)
            , parseFloat(drinkingInWeek[day[3]].standardDrink), parseFloat(drinkingInWeek[day[4]].standardDrink), parseFloat(drinkingInWeek[day[5]].standardDrink)
            , parseFloat(drinkingInWeek[day[6]].standardDrink)];

        var sumSdPoint = (sdPoint[0] + sdPoint[1] + sdPoint[2] + sdPoint[2] + sdPoint[3] + sdPoint[4] + sdPoint[5] + sdPoint[6]).toFixed(1);
        var maxSdPoint = Math.max(...sdPoint);

        if (gender === 'หญิง' || age >= 66) {
            if (sumSdPoint > 7) {
                resultWeek = 'เกิน';
            } else {
                resultWeek = 'ไม่เกิน';
            }
        } else if (gender === 'ชาย') {
            if (sumSdPoint > 14) {
                resultWeek = 'เกิน';
            } else {
                resultWeek = 'ไม่เกิน';
            }
        }

        if (gender === 'หญิง' || age >= 66) {
            if (maxSdPoint > 3) {
                resultDay = 'เกิน';
            } else {
                resultDay = 'ไม่เกิน';
            }
        } else if (gender === 'ชาย') {
            if (maxSdPoint > 4) {
                resultDay = 'เกิน';
            } else {
                resultDay = 'ไม่เกิน';
            }
        }

        if(assistPoint <=10 ){
            resultRisk = 'ต่ำ';
        }else if(10 < assistPoint <= 26){
            resultRisk = 'สูง';
        }else if(assistPoint >= 27){
            resultRisk = 'สูงมาก';
        }

        if(resultWeek === 'ไม่เกิน' && resultDay ==='ไม่เกิน' && resultRisk ==='ต่ำ'){
            result = 'และ';
        }else if(((resultWeek === 'เกิน' && resultDay ==='ไม่เกิน') || (resultWeek === 'ไม่เกิน' && resultDay ==='เกิน')) && resultRisk !=='ต่ำ'){
            result = 'และ';
        }else{
            result = 'แต่';
        }

        agent.add(`${result}จากข้อมูลที่ได้ น้องตั้งใจพบว่าลักษณะการดื่มของคุณจัดอยู่ในกลุ่มที่มีความเสี่ยง${resultRisk}ค่ะ`);
        return agent.add(new Payload(
            `LINE`,
            {
                "type": "text",
                "text": "คุณอยากรู้รายละเอียดของการดื่มที่เสี่ยงต่ำ เสี่ยงปานกลาง และเสี่ยงสูง ไหมคะว่าคืออะไร และแตกต่างกันอย่างไร",
                "quickReply": {
                    "items": [
                        {
                            "type": "action",
                            "action": {
                                "type": "message",
                                "text": `ข้อมูลของการดื่มที่ปลอดภัย`,
                                "label": `อยากรู้`
                            }
                        },
                        {
                            "type": "action",
                            "action": {
                                "type": "message",
                                "label": "ไว้ก่อน",
                                "text": `ประเมินแรงจูงใจ`
                            }
                        }
                    ]
                },
            },
            { sendAsMessage: true }
        ))
    }

    const assessMotivation = async () => {
        agent.add(`น้องตั้งใจอยากให้คุณอ่านและคิดเกี่ยวกับข้อความ 5 ข้อความต่อไปนี้นะคะ ว่าประโยคไหนที่ตรงกับใจของคุณมากที่สุด`);
        return agent.add(new Payload('LINE', imageCarousels.motivation(), { sendAsMessage: true }));
    }

    const assessMotivationResult = async () => {
        let motivation = agent.parameters;
        if(motivation == 1){
            agent.add('ตอนนี้ คุณยังไม่เห็นว่าการดื่มเช่นนี้จะก่อให้เกิดปัญหาใดๆ');
        }else if(motivation == 2){
            agent.add('เหมือนว่าคุณเริ่มรู้สึกลังเลเกี่ยวกับการดื่ม คุณอาจกังวลถึงผลเสียที่อาจจะเกิดขึ้น หากคุณยังคงดื่มเช่นนี้ต่อไป หรือคุณอาจกำลังคิดว่า อะไรๆน่าจะดีขึ้นถ้าคุณหยุดดื่มได้')
        }else if(motivation == 3){
            agent.add('เหมือนคุณตัดสินใจแล้วว่าคุณอยากที่จะปรับเปลี่ยนตัวเองเกี่ยวกับเรื่องการดื่ม')
        }else if(motivation == 4){
            agent.add('เยี่ยมมากค่ะ” “คุณกำลังจะลงมือทำอย่างจริงจังแล้ว')
        }else if(motivation == 5){
            agent.add('เยี่ยมมากค่ะ” “คุณลงมือเปลี่ยนแปลงตัวเองมาช่วงหนึ่งแล้ว')
        }

        return agent.add(new Payload(
            `LINE`,
            {
                "type": "text",
                "text": "ถ้าน้องตั้งใจพูดถึงสิ่งต่อไปนี้ คุณคิดว่าเรื่องไหนที่จะเป็นเป้าหมายของคุณในการปรับเปลี่ยนพฤติกรรมการดื่มคะ",
                "quickReply": {
                    "items": [
                        {
                            "type": "action",
                            "action": {
                                "type": "message",
                                "text": `สุขภาพดีขึ้น`,
                                "label": `สุขภาพดีขึ้น`
                            }
                        },
                        {
                            "type": "action",
                            "action": {
                                "type": "message",
                                "label": "การเรียน การงานดีขึ้น",
                                "text": `การเรียน การงานดีขึ้น`
                            }
                        },
                        {
                            "type": "action",
                            "action": {
                                "type": "message",
                                "label": "การเงินดีขึ้น",
                                "text": `การเงินดีขึ้น`
                            }
                        },
                        {
                            "type": "action",
                            "action": {
                                "type": "message",
                                "label": "ความสัมพันธ์ดีขึ้น",
                                "text": `ความสัมพันธ์กับคนรอบข้างดีขึ้น`
                            }
                        },
                        {
                            "type": "action",
                            "action": {
                                "type": "message",
                                "label": "ปัญหาทางกฎหมายลดลง",
                                "text": `ปัญหาทางกฎหมายลดลง`
                            }
                        },
                        {
                            "type": "action",
                            "action": {
                                "type": "message",
                                "label": "อยากรู้สึกดีต่อตัวเอง",
                                "text": `อยากรู้สึกดีต่อตัวเอง`
                            }
                        },
                        {
                            "type": "action",
                            "action": {
                                "type": "message",
                                "label": "เพื่อจิตใจที่สงบ",
                                "text": `เพื่อจิตใจที่สงบ`
                            }
                        },
                    ]
                },
            },
            { sendAsMessage: true }
        ))
    }

    // Run the proper function handler based on the matched Dialogflow intent name
    let intentMap = new Map();
    intentMap.set('check connect', checkConnect);
    intentMap.set('SET_USER_PROFILE', setUserProfile);
    intentMap.set('EDIT_USER_PROFILE', setUserProfile);
    intentMap.set('RISK_ASSESSMENT', checkUserDrinking); //ถามคำถาม assit ข้อ 1
    intentMap.set('RISK_ASSESSMENT - yes', checkUserDrinkingIn3Month); //รับคำตอบข้อ 1 กรณีตอบว่าเคยดื่ม จะถามคำถามข้อ 2 ของ assist 
    intentMap.set('RISK_ASSESSMENT - drink in 3 month', riskAssessment_DrinkIn3Month);
    intentMap.set('RISK_ASSESSMENT - dont drink in 3 month', riskAssessment_DontDrinkIn3Month); 
    intentMap.set('SET_DRINKING_IN_WEEK', setDrinkingInWeekInputType);
    intentMap.set('SET_DRINKING_IN_WEEK -  fill alcohol', setDrinkingInWeek_fill);
    intentMap.set('SET_DRINKING_IN_WEEK - pick alcohol', setDrinkingInWeek_pick);
    intentMap.set('SET_DRINKING_IN_WEEK - edit', setDrinkingInWeekInputType);
    intentMap.set('RISK_ASSESSMENT_RESULT', setDrinkingInWeekInputType);
    intentMap.set('RISK_ASSESSMENT_RESULT - week', riskAssessmentResultWeek);
    intentMap.set('RISK_ASSESSMENT_RESULT - day', riskAssessmentResultDay);
    intentMap.set('RISK_ASSESSMENT_RESULT - risk', riskAssessmentResultRisk);
    intentMap.set('ASSESS_MOTIVATION', assessMotivation);
    intentMap.set('ASSESS_MOTIVATION - result', assessMotivationResult);
    agent.handleRequest(intentMap);
});
