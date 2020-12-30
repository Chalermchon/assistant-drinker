import admin from 'firebase-admin';

const { SERVICE_ACCOUNT_JSON } = process.env;

const firebase = admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(SERVICE_ACCOUNT_JSON)),
    storageBucket: "assistant-drinker.appspot.com"
});
const firestore = firebase.firestore();
const bucket = admin.storage().bucket();

const userColl = firestore.collection('Users');

export const userDB = {
    async get(userId) {
        return (await userColl.doc(userId).get()).data();
    },
    async create (userId) {
        return await userColl.doc(userId).set({
            isActive: true,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });
    },
    async delete(userId) {
        return await userColl.doc(userId).delete();
    },
    async setProfile(userId, fields) {
        if (typeof fields === 'object'){
            const fieldsMap = Object.keys(fields).map(key => ({ name: key, value: fields[key] }));
            let profileObj = {};
            for (const field of fieldsMap) {
                profileObj[`profile.${field.name}`] = field.value;
            }
            return await userColl.doc(userId).update(profileObj);
        }
        throw new SyntaxError('Field should be object.');
    },
    async setAlcoholDrinking(userId, fields) {
        if (typeof fields === 'object'){
            const fieldsMap = Object.keys(fields).map(key => ({ name: key, value: fields[key] }));
            let alcoholDrinkingObj = {};
            for (const field of fieldsMap) {
                alcoholDrinkingObj[`alcoholDrinking.${field.name}`] = field.value;
            }
            return await userColl.doc(userId).update(alcoholDrinkingObj);
        }
        throw new SyntaxError('Field should be object.');
    },
    async setAuditCPoint(userId, point) {
        return await userColl.doc(userId).update({auditCPoint: point});
    },
    async setAssistPoint(userId, point) {
        return await userColl.doc(userId).update({assistPoint: point});
    },
    async setDrinkingInWeek (userId, day, drinkingInDay) {
        return await userColl.doc(userId).update({ [`drinkingInWeek.${day}`]: drinkingInDay })
    }
};

export const getImage = async (dirName, fileName) => {
    return await bucket.file(`${dirName}/${fileName}`).getMetadata();
}