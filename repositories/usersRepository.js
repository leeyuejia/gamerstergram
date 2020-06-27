const db = require('../db')
const bcrypt = require('bcrypt');
const SALT_ROUND = process.env.SALT_ROUND || 10;
const moment = require('moment');

const convertToArray = (input) => {
    let arr = [];
    if(Array.isArray(input)) {
        input.forEach(el => arr.push(el))
    }else {
        arr.push(input);
    }
    return arr;
}
const dateFormatter = (input) => {
    return moment(input).format('dddd, MMMM Do YYYY, kk:mm:ss')
}

module.exports = {
    async create(user) {
        try {
            user.createdAt = user.createdAt ? dateFormatter(new Date(user.createdAt)) : dateFormatter(new Date());
            user.updatedAt = user.updatedAt ? dateFormatter(new Date(user.updatedAt)) : dateFormatter(new Date());
            user.lastLoggedInAt = dateFormatter(new Date())
            user.userFollowing = user.userFollowing ? convertToArray(user.userFollowing) : [];
            user.followedBy = user.followedBy ? convertToArray(user.followedBy): [];
            user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(SALT_ROUND));
            const result = await db.users.insertOne(user);
            if(!result.insertedCount) throw new Error('something went wrong during insertion')
            return true;
        }catch(err) {
            throw new Error(`Due to ${err.message}, you are not allowed to insert this item ${JSON.stringify(user)}`);
        }
    },
    async findUserByUsername (username) {
        const user = await db.users.findOne({username : username});
        if(!user) throw new Error(`The user ${username} is not in our DB`);
        return user;
    },
    async updateLastLoggedIn(username) { // when user sign in, it should update users db lastLoggedInAt field
        try {
            const result = await db.users.updateOne({
                username: username
                }, {$set: {
                    lastLoggedInAt : dateFormatter(new Date())
                        }
                    }
                )
            if(!result.result.n) throw new Error('unable to update the date')
            return true;
        } catch(err) {
            throw new Error(`Due to ${err.message}, you are not allowed to insert this item ${JSON.stringify(username)}`);
        }
    },
    async addToListOfFollow (usernameToFollow, currentUser) {
        try {
            const resultFollowing = await db.users.updateOne ({ // this is current user follow
                username: currentUser.username
            }, {$push: {
                    userFollowing : usernameToFollow
                    }
                }
            )
            const resultFollowed = await db.users.updateOne({
                username: usernameToFollow
            }, {$push : {
                    followedBy : currentUser.username
                    }
            })
            if(!resultFollowing.result.n) {
                throw new Error('something when wrong when adding following user')
            }
            if(!resultFollowed.result.n) {
                throw new Error('something when wrong when adding into followed user')
            }
            return resultFollowing + resultFollowed;
        } catch(err) {
            throw new Error(`Due to ${err.message}, you are not allowed to add into array with this name ${JSON.stringify(currentUser)}`);
        }
    },
    async unFollow (usernameToFollow, currentUser) {
        try {
            const resultUnFollowing = await db.users.updateOne ({ // this is current user follow
                username: currentUser.username
            }, {$pull: {
                    userFollowing : usernameToFollow
                    }
                }
            )
            const resultUnFollowed = await db.users.updateOne({
                username: usernameToFollow
            }, {$pull : {
                    followedBy : currentUser.username
                    }
            })
            if(!resultUnFollowing.result.n) {
                throw new Error('something when wrong when un following user')
            }
            if(!resultUnFollowed.result.n) {
                throw new Error('something when wrong when removing u from the  followed user')
            }
            return resultUnFollowing + resultUnFollowed;
        } catch(err) {
            throw new Error(`Due to ${err.message}, you are not allowed to remove the value from this array with this name ${JSON.stringify(currentUser)}`);
        }
    },
    async updateProfile (username, infoToUpdate) {
        try{
            const result = await db.users.updateOne({
                username: username
            }, {$set: infoToUpdate
            })
            if(!result.result.n) {
                throw new Error('something wrong during updating')
            }
            return true
        } catch(err) {
            throw new Error(`Due to ${err.message}, you cannot update this profile ${JSON.stringify(infoToUpdate)}`);
        }
    },
    async updateProfileImage (username, imageToUpdate) {
        try{
            const result = await db.users.updateOne({
                username: username
            }, {$set: {
                proImg : imageToUpdate
            }
            })
            if(!result.result.n) {
                throw new Error('something wrong during updating')
            }
            return true
        } catch(err) {
            throw new Error(`Due to ${err.message}, you cannot update this profile ${imageToUpdate}`);
        }
    }
}