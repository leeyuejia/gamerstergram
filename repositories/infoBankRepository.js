const db = require('../db')
const moment = require('moment')
const { showFeedPage, updateFeed } = require('../controllers/gamesterController')
const { ResumeToken, ObjectId } = require('mongodb')

/// ALL FUNCTION ////
const dateFormatter = (input) => {
    return moment(input).format('dddd, MMMM Do YYYY, kk:mm:ss')
}
module.exports = {
    async getAll () {
        try {
            const result = await db.infoBank.find().toArray()
            return result;
        } catch(err) {
            throw new Error(`something is wrong with retriving infobank database = ${err.message}`)
        }
    },
    async createNewUserDashBoard(item) { // need to rewrite test with just username and password and nickname
        const newUser = {
            username: item.username,
            nickname: item.nickname,
            feeds: [],
            loggedInAt: dateFormatter(new Date())
        }
        try {
            const result = await db.infoBank.insertOne(newUser);
            return result;
        } catch(err) {
            throw new Error(`You are not suppose to insert this item ${JSON.stringify(newUser)}`)
        }
    },
    async findUserPost(name) { // test passed //
        const result = await db.infoBank.findOne({
            username: {
                '$regex': `^${name}$`,
                '$options': 'i'
            }
        })
        if(!result) throw new Error(`Cannot find anything related to this user : ${JSON.stringify(name)}`)
        return result
    },
    async addFeed (username, feedToAdd) { // test passed//
        try {
            const result = await db.infoBank.updateOne({
                username: {
                    '$regex': `^${username}$`,
                    '$options': 'i'
                }
            }, { $push: { feeds : feedToAdd} 
            } 
            )
            if(!result.result.n) {
                throw new Error('something went wrong during inserting feed to array of feeds')
            }
            return result; 
        } catch (err) {
            throw new Error(`Due to this ${err.message}, I cannot push this ${JSON.stringify(feedToAdd)}`)
        }
    },
    async findUserPostByPostId(username,postId) {
        console.log('in the repo ' + username + " and" + postId)
        try {
        const findingOne = await db.infoBank.findOne({
            username: {
                '$regex': `^${username}$`,
                '$options': 'i'
            }
        })
        
        let result = {}
        await findingOne.feeds.forEach(el => {
            if(el.postID == postId) {
                result = el
            }
        })
        if(!result) throw new Error(`Cannot find anything related to this user : ${JSON.stringify(username)}`)
        return result
        } catch(err) {
            throw new Error(`Due to this ${err.message}, I cannot find this ${JSON.stringify(username)}`)
        }
    },
    // async addCommentImage(username ,postId, commentImageToUpdate) {
    //     let objectId = ObjectId(postId)
    //     try {
    //         const result = await db.infoBank.updateOne({
    //             username: {
    //                 '$regex': `^${username}$`,
    //                 '$options': 'i'
    //             }
    //         }, { $push: { "feeds.$[selector].comments.commentImg" : commentImageToUpdate}, //{`feeds.${feedID}`} does not get passed in. 
    //         }, { arrayFilters:[{"selector.postID" : objectId}]}
    //     )
    //         if(!result.result.n) {
    //             throw new Error('something went wrong during inserting comment image')
    //         }
    //         return result; 
    //     } catch (err) {
    //         throw new Error(`Due to this ${err.message}, I cannot push this ${commentImageToUpdate}`)
    //     }
    // },
    async addComment(username,postId, commentsToUpdate) {
        let objectId = ObjectId(postId)
        try {
            const result = await db.infoBank.updateOne({
                username: {
                    '$regex': `^${username}$`,
                    '$options': 'i'
                }
            }, { $push: { "feeds.$[selector].comments" : commentsToUpdate}, //{`feeds.${feedID}`} does not get passed in. 
            }, { arrayFilters:[{"selector.postID" : objectId}]}
        )
            if(!result.result.n) {
                throw new Error('something went wrong during inserting feed to array of feeds')
            }
            return result; 
        } catch (err) {
            throw new Error(`Due to this ${err.message}, I cannot push this ${JSON.stringify(commentsToUpdate)}`)
        }
    },
    async findAndUpdateUserPost(username, postId, feedToUpdate) {
        let objectid = ObjectId(postId)
        try {
            const result = await db.infoBank.updateOne({
                username: {
                    '$regex': `^${username}$`,
                    '$options': 'i'
                }
            }, { $set:{
                    "feeds.$[selector].title" : feedToUpdate.title,
                    "feeds.$[selector].img" : feedToUpdate.feedImg ,
                    "feeds.$[selector].description" : feedToUpdate.description,
                    "feeds.$[selector].tags" : feedToUpdate.tags,
                    "feeds.$[selector].editedAt" : feedToUpdate.editedAt,
                    }
            }, { arrayFilters:[{"selector.postID" : objectid}]}
        )
            if (!result.result.n) {
                throw new Error('something went wrong during updating feed')
            }
            return result; 
        } catch (err) {
            throw new Error(`Due to this ${err.message}, I cannot push this ${JSON.stringify(feedToUpdate)}`)
        }
    },
    async updateUsernameAndNickname (username,infoToUpdate) {
        try{
            const result = await db.infoBank.updateOne({
                username: username
            }, {$set: {
                username : infoToUpdate.username,
                nickname : infoToUpdate.nickname
            }
            })
            if(!result.result.n) {
                throw new Error('something wrong during updating')
            }
            return true
        } catch(err) {
            throw new Error(`Due to ${err.message}, you cannot update this profile ${JSON.stringify(infoToUpdate)}`);
        }
    },
    async deleteOnePostByPostId (username, postId) {
        let objectid = ObjectId(postId)
        try {
            const result = await db.infoBank.updateOne({
                username: {
                    '$regex': `^${username}$`,
                    '$options': 'i'
                }
            }, {$pull : { 
                    feeds: {"postID": objectid}
                }
            })
            const updatePostID = await db.infoBank.findOne({
                username: {
                    '$regex': `^${username}$`,
                    '$options': 'i'
                }
            })
            if(!updatePostID) throw new Error('Cannot find the entry')
            if(!result.result.n) {
                throw new Error ('Something went wrong while deleting')
            }
            return result;
        } catch (err) {
            throw new Error(`Due to this ${err.message}, I cannot delete this postId of ` + postId )
        }
    },
    async deleteOneCommentByPostId (username, postId, commentId) {
        let objectid = ObjectId(postId)
        let commentID = ObjectId(commentId)
        console.log(objectid + "objectID" + commentID + " commentID")
        try {
            const result = await db.infoBank.updateOne({
                username: {
                    '$regex': `^${username}$`,
                    '$options': 'i'
                }
            }, {$pull : { 
                    "feeds.$[selector].comments": {"commentID": commentID}
                }
            },{ arrayFilters:[{"selector.postID" : objectid}]
            })
            console.log(result.result.n)
            const updatePostID = await db.infoBank.findOne({
                username: {
                    '$regex': `^${username}$`,
                    '$options': 'i'
                }
            })
            if(!updatePostID) throw new Error('Cannot find the entry')
            if(!result.result.n) {
                throw new Error ('Something went wrong while deleting')
            }
            return result;
        } catch (err) {
            throw new Error(`Due to this ${err.message}, I cannot delete this postId of ` + postId )
        }
    },


}