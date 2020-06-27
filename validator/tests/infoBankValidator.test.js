const chai = require('chai');
const { expect } = chai;
const asserttype = require('chai-asserttype');
chai.use(asserttype);
const { validate } = require('../infoBankValidator');

describe('Users Validator', () => {

    it('should pass the validation if I put username and nickname combination', () => {
        const data = ({ 
            username: 'yjyj', 
            nickname: 'nickname', 
            loggedInAt: '2020-06-19T20:00:00Z',
            feeds: [{
                postID : 1,
                title : 'some title',
                img: 'url img',
                postedAt: '2019-06-19T20:00:00Z',
                editedAt: '2019-07-19T20:00:00Z',
                tags: ['string1','string2','string3'],
                comments: [{
                    commentInfo: 'some comment',
                    commentImg :'comment img',
                    commentBy: 'Other User',
                    commentAt: '2019-07-19T20:00:00Z'
                    }]
                }]
            })
        const result = validate(data);
        expect(result).to.be.true;
    });

    it('should fail if i did not put a nickname', () => {
        try {
            const data = ({ 
                username: 'yjyj', 
                // nickname: 12345, 
                loggedInAt: '2020-06-19T20:00:00Z',
                feeds: [{
                    postID : 1,
                    title : 'some title',
                    img: 'url img',
                    postedAt: '2019-06-19T20:00:00Z',
                    // editedAt: '2019-07-19T20:00:00Z',
                    comments: [{
                        commentInfo: 'some comment',
                        commentImg :'comment img',
                        commentBy: 'Other User',
                        commentAt: '2019-07-19T20:00:00Z'
                        }]
                    }]
                })
            const result = validate(data)
            throw new Error('test should have fail')
        } catch(err) {
            expect(err).to.be.ok;
            expect(err.message).to.equal('Error validating logs')
        }
    })

    it('should coerce both username and nickname to string if it is not a string', () => {
        try{
            const data = ({ 
                username: 123, 
                nickname: 12345, 
                loggedInAt: '2020-06-19T20:00:00Z',
                feeds: [{
                    postID : 1,
                    title : 'some title',
                    img: 'url img',
                    postedAt: '2019-06-19T20:00:00Z',
                    editedAt: '2019-07-19T20:00:00Z',
                    comments: [{
                        commentInfo: 'some comment',
                        commentImg :'comment img',
                        commentBy: 'Other User',
                        commentAt: '2019-07-19T20:00:00Z'
                        }]
                    }]
                })
            const result = validate(data)
            expect(result).to.be.true;
            expect(data.username).to.equal('123')
            expect(data.nickname).to.equal('12345')
        } catch (err) {
            // expect(err).to.be.ok;
            expect(err.message).to.equal('Error validating logs')
        }
    })

    it('should fail if i did not put a nickname or commentedAt', () => {
        try {
            const data = ({ 
                username: 123, 
                // nickname: 12345, 
                feeds: [{
                    postID : 1,
                    title : 'some title',
                    img: 'url img',
                    postedAt: '2019-06-19T20:00:00Z',
                    editedAt: '2019-07-19T20:00:00Z',
                    comments: [{
                        commentInfo: 'some comment',
                        commentImg :'comment img',
                        commentBy: 'Other User',
                        // commentAt: '2019-07-19T20:00:00Z'
                        }]
                    }]
                })
            const result = validate(data)
            throw new Error('test should have fail')
        } catch(err) {
            expect(err).to.be.ok;
            expect(err.message).to.equal('Error validating logs')
        }
    })

    it('should have a default value of loggedInAt to current time if there is no value provided"', () => {
        const data = ({ 
            username: 123, 
            nickname: 12345, 
            feeds: [{
                postID : 1,
                title : 'some title',
                img: 'url img',
                postedAt: '2019-06-19T20:00:00Z',
                // editedAt: '2019-07-19T20:00:00Z',
                comments: [{
                    commentInfo: 'some comment',
                    commentImg :'comment img',
                    commentBy: 'Other User',
                    commentAt: '2019-07-19T20:00:00Z'
                    }]
                }]
            })
            const result = validate(data)
            expect (result).to.be.true;
            expect(data.loggedInAt).to.be.date();
    })

    it('should pass the validation if loggedinAt, commentAt, postedAt and editedAt follows ISO 8601 format', () => {
        const data = ({ 
            username: 123, 
            nickname: 12345, 
            loggedInAt: '2020-06-19T20:00:00Z',
            feeds: [{
                postID : 1,
                title : 'some title',
                img: 'url img',
                postedAt: '2019-06-19T20:00:00Z',
                // editedAt: '2019-07-19T20:00:00Z',
                comments: [{
                    commentInfo: 'some comment',
                    commentImg :'comment img',
                    commentBy: 'Other User',
                    commentAt: '2019-07-19T20:00:00Z'
                    }]
                }]
            })
        const result = validate(data)
        expect(result).to.be.true;
        expect(data.loggedInAt).to.be.date();
        console.log(data.feeds[0])
        expect(data.feeds[0].postedAt).to.be.date();
        expect(data.feeds[0].editedAt).to.be.date();
        expect(data.feeds[0].comments[0].commentAt).to.be.date();
    })

})