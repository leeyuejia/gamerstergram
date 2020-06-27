const { expect, use } = require('chai')
const usersRepository = require('../usersRepository')
const db = require('../../db')

describe('usersRepository.addToListOfFollow', () => {
    beforeAll(async () => {
        await db.connect()
    })
    afterAll(async () => {
        await db.disconnect();
    })

    it('update current user following array and targeted follow user followedBy array',async () => {
        try {
            const usernameToFollow = 'yjyj'
            const currentUser = {username: 'leeyuejia'}
            console.log(currentUser.username)
            const result = await usersRepository.addToListOfFollow( usernameToFollow, currentUser)
            expect(result).to.be.true;
        } catch(err) {
            expect(err.message).to.equal(`Due to ${err.message}, you are not allowed to add into array with this name`)
        }
    })
})