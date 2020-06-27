const ajv = require('ajv')
const Ajv = new ajv({
    useDefaults: true,
    coerceTypes: true,
    allErrors: true,
});
const infoBank = require('./schema/infoBank')
const validator = Ajv.compile(infoBank);
const ValidationError = require('../exceptions/ValidationError')

module.exports = {
    validate (data) {
        const isValid = validator(data);
        if(!isValid) {
            console.log(`Validator Errors: ${validator.errors}`);
            throw new ValidationError(validator.errors);
        }
        data.loggedInAt = data.loggedInAt ? new Date(data.loggedInAt) : new Date();
        data.feeds[0].postedAt= data.feeds[0].postedAt ? new Date(data.feeds[0].postedAt) :new Date();
        data.feeds[0].editedAt= data.feeds[0].editedAt ? new Date(data.feeds[0].editedAt) :new Date();
        let commentArray = data.feeds[0].comments
        commentArray[0].commentAt = commentArray[0].commentAt ? new Date(commentArray[0].commentAt) : new Date();
        
        return isValid;
    }
};

// data = {
//     username: 'yjyj',
//     nickname: 'lee',
//     loggedInAt: new Date(),
//     feeds : [{
//         postedID : 1,
//         title: 'RE3',
//         img: 'some url',
//         description: 'some description',
//         tags: ['horror','third-person','walkthrough'],
//         comments:[{
//             commentBy: 'other user',
//             commentInfo: 'great run'
//             },{
//             commentBy: 'third user',
//             commentInfo: 'agreed with other user'
//             }
//         ]
//     }]
// }
// data.feeds.forEach(el => {
//     console.log(el)
//     el.comments.forEach(el2 => {
//         console.log(el2.commentBy)
//     })
// })