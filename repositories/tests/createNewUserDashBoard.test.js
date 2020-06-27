const {expect} = require('chai')
const infoBankRepository = require('../infoBankRepository')
const db = require('../../db')
const moment = require('moment')

describe('infoBankRepository.createUserDashBoard',() => {
    beforeAll(async () => {
        await db.connect()
    })
    afterAll (async () => {
        await db.disconnect();
    })
    it ('should return insertedCount as 1 and a default loggedInAt attritubes when insert a new obj into db collection "infoBank"', async () => {
        const data = ({ 
            username: 'yjyj', 
            nickname: 'nickname', 
            // loggedInAt: '2020-06-19T20:00:00Z',
            feeds: [{
                postID : 1,
                title : 'first title',
                description: 'First Game',
                img: 'url img',
                postedAt: Date.now(),
                editedAt: new Date(),
                tags: ['string1','string2','string3'],
                // comments: [{
                //     commentInfo: 'some comment',
                //     commentImg :'comment img',
                //     commentBy: 'Other User',
                //     commentAt: Date.now()
                //     }]
                }]
            })
        data.feeds[0].postID = data.feeds.length - 1
        const result = await infoBankRepository.createUserDashBoard(data)
        expect(result.insertedCount).to.equal(1)
    })
})