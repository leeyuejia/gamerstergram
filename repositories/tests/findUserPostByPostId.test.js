const { expect } = require('chai')
const infoBankRepository = require('../infoBankRepository')
const db = require('../../db')

describe('infoBankRepository.findUserPostByPostId', () => {
    beforeAll(async () => {
        await db.connect()
    })
    afterAll(async () => {
        await db.disconnect();
    })

    it ('should return an object belonging to the username "yjyj" with the respective postID', async () => {
        try {
            const username = 'yjyj'
            const feedId = 1
            const result = await infoBankRepository.findUserPostByPostId(username, feedId)
            expect(result).to.be.an('object')
        } catch(err) {
            expect(err.message).to.equal('there is no such feed')
        }
    })

})