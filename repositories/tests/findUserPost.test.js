const { expect } = require('chai')
const infoBankRepository = require('../infoBankRepository')
const db = require('../../db')

describe('infoBankRepository.findUserPost', () => {
    beforeAll(async () => {
        await db.connect()
    })
    afterAll(async () => {
        await db.disconnect();
    })

    it('should return an array of post filtered by the username',async () => {
        try {
            const result = await infoBankRepository.findUserPost({
                username: {
                    '$regex': `yjyj`,
                    '$options': 'i'
                }
            })
            expect(result.feeds).to.be.an('Array')
        } catch(err) {
            expect(err.message).to.equal('Cannot find anything related to this user')
        }
    })

    it('should return an array of post filtered by the username irregardless of case sensitiviy',async () => {
        try {
            const result = await infoBankRepository.findUserPost({
                username: {
                    '$regex': `^YJYJ$`,
                    '$options': 'i'
                }
            })
            expect(result.feeds).to.be.an('Array')
        } catch(err) {
            expect(err.message).to.equal('Cannot find anything related to this user')
        }
    })
})