const {expect} = require('chai')
const infoBankRepository = require('../infoBankRepository')
const db = require('../../db')

describe('infoBankRepository.addFeed',() => {
    beforeAll(async () => {
        await db.connect()
    })
    afterAll (async () => {
        await db.disconnect();
    })
    it ('it should add feed into array of feeds from the username "yjyj"', async () => {
        const username = 'yjyj'
        const feedToAdd = {
            postID : 2,
            title : '2nd title',
            img: 'img url',
            postedAt : new Date(),
            editedAt : new Date(),
            tags : ['string1','string2','string3'],
            comments :[{
                commentInfo: 'this is good',
                commentImg: 'if there is any',
                commentBy: 'other user',
                commentAt: new Date()
            }]
        }
        const result = await infoBankRepository.addFeed(username,feedToAdd)
        expect(result.result.n).to.equal(1)
    })
})