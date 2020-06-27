const chai = require('chai');
const { expect } = chai;
const asserttype = require('chai-asserttype');
chai.use(asserttype);
const { validate } = require('../usersValidator');

describe('Users Validator', () => {

    it('should pass the validation if I put username, password and nickname', () => {
        const result = validate({ username: 'yjyj', password: '111', nickname: 'nickname'});
        expect(result).to.be.true;
    })

    it('should return as an array type if there is only one string in user following' , () => {
        const result = validate({
            username: 'yjyj',
            password:'111',
            nickname:'nickname',
            userFollowing: ['1string']
        })
        expect(result).to.be.true;
    })

    it('should return as an array type for userFollowing if there is two string in user following' , () => {
        const data = {
            username: 'yjyj',
            password:'111',
            nickname:'nickname',
            userFollowing: ['1string', '2string']
        }
        const result = validate(data)
        expect(data.userFollowing).to.be.an('array');
        expect(result).to.be.true;
    })

    it('should fail if i missed my password', () => {
        try {
            const result = validate({
                username: 'yjyj',
                nickname:'nickname',
                userFollowing: ['1string', '2string']
            })
        } catch(err) {
            expect(err.message).to.equal('Error validating logs')
        }
    })

    it ('should coerce username, password and nickname to a string if number is entered', () => {
        const data = {username: 111, password: 123, nickname: 456}
        const result = validate(data)
        expect(result).to.be.true;
        expect(data.username).to.equal('111')
        expect(data.password).to.equal('123')
        expect(data.nickname).to.equal('456')
    })

    it('should fail if date is does not follow ISO8601 standard', () => {
        const data = {username: 111, password: 123, nickname: 456, createdAt: '20200619-201000'}
        try {
            validate(data)
        }catch(err) {
            expect(err).to.be.ok;
            expect(err.message).to.equal('Error validating logs')
        }
    })

    it('should pass if date is follow ISO8601 standard', () => {
        const data = {username: 111, password: 123, nickname: 456, createdAt: '2020-06-19T20:00:00Z'}
        try {
            const result = (validate(data))
            expect(result).to.be.true;
        }catch(err) {
            expect(err).to.be.ok;
            expect(err.message).to.equal('Error validating logs')
        }
    })

})