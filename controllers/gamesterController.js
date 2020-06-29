const infoBankRepository = require('../repositories/infoBankRepository')
const moment = require('moment');
const { ObjectId } = require('mongodb');
const usersRepository = require('../repositories/usersRepository');
const session = require('express-session')
const cloudinary = require('cloudinary').v2

///////////////////     ALL FUNCTIONS       ////////////////////////////
const convertToArray = (input) => {
    let arr = [];
    arr.push(input);
    return arr;
}
const dateFormatter = (input) => {
    return moment(input).format('dddd, MMMM Do YYYY, kk:mm:ss')
}

cloudinary.config({
    cloud_name: 'gamestergram',
    api_key: 663843891388912,
    api_secret: 'r1Nos8ynCgtd-TTLGcMRP-hhlQE',
    secure : true,
})
uploadImg = async (filePath) => {
    const result = await cloudinary.uploader.upload(filePath, {
        use_filename: true
    }, (err, result) => {
        if (!err) {
            return result
        }
        else { console.log(err) }
    })
    console.log(result.secure_url)
    return result.secure_url
}

module.exports = {
    async allUsersFeeds(req, res) {
        try {
            const currentUser = req.session.currentUser ? await usersRepository.findUserByUsername(req.session.currentUser.username) : req.session.currentUser 
            const allUserFeeds = await infoBankRepository.getAll()
            res.render('index', { currentUser, allUserFeeds })
        } catch (err) {
            return res.render(`errors/404`, { err })
        }
    },
    async dashboardPage(req, res) {
        try {
            const username = req.params.name
            const currentUser = await usersRepository.findUserByUsername(req.session.currentUser.username)
            const userDashboardProfile = await usersRepository.findUserByUsername(username)
            const userDashboard = await infoBankRepository.findUserPost(username);
            const userFeeds = userDashboard.feeds
            console.log('userDashboard is ' + userDashboard.username)
            console.log('currentUser is ' + currentUser.username)
            res.render('dashboard', { userDashboard, userFeeds, currentUser, userDashboardProfile })
        } catch (err) {
            return res.render('errors/404', { err })
        }
    },
    async createFeedPage(req, res) {
        const username = req.params.name
        const currentUser = await usersRepository.findUserByUsername(req.session.currentUser.username)
        const userDashboard = await infoBankRepository.findUserPost(username);
        const userDashboardProfile = await usersRepository.findUserByUsername(username)
        res.render('createFeed', { username, currentUser, userDashboardProfile, userDashboard })
    },
    async postFeed(req, res) {
        console.log(req.file.path)
        const username = req.params.name
        const userDashboard = await infoBankRepository.findUserPost(username);
        const userFeeds = userDashboard.feeds
        req.body.tag = (typeof req.body.tag === 'object') ? req.body.tag : convertToArray(req.body.tag)
        const feedToAdd = {
            postID: ObjectId(),
            title: req.body.title,
            description: req.body.description,
            img: await uploadImg(req.file.path),
            postedAt: dateFormatter(new Date()),
            editedAt: dateFormatter(new Date()),
            tags: req.body.tag,
        }
        const result = await infoBankRepository.addFeed(username, feedToAdd)
        res.redirect(`/app/${req.params.name}/dashboard`)
    },
    async showFeedPage(req, res) {
        const username = req.params.name
        const postId = req.params.id
        const currentUser = await usersRepository.findUserByUsername(req.session.currentUser.username)
        const userDashboardProfile = await usersRepository.findUserByUsername(username)
        const oneFeed = await infoBankRepository.findUserPostByPostId(username, postId)
        const userDashboard = await infoBankRepository.findUserPost(username);
        res.render('showFeed', { oneFeed, username, postId, currentUser, userDashboardProfile, userDashboard })
    },
    // async postCommentImage (req,res) {
    //     const username = req.params.name
    //     const postId = req.params.id
    //     console.log(req.file.path)
    //     const commentimageToUpload = await uploadImg(req.file.path)
    //     const result= await infoBankRepository.addCommentImage(username, postId, commentimageToUpload)
    //     res.redirect(`/app/${username}/dashboard/${req.params.id}`)
    // },
    async postComment(req, res) {
        const username = req.params.name
        const postId = req.params.id
        console.log('username is ' + username + ' and feedid is ' + postId)
        const commentsToUpdate = {
            commentInfo: req.body.commentInfo,
            commentBy: req.session.currentUser.nickname,
            commentAt: dateFormatter(new Date()),
            // commentImg: await uploadImg(req.file.path)
        };
        const result = await infoBankRepository.addComment(username, postId, commentsToUpdate)
        res.redirect(`/app/${username}/dashboard/${req.params.id}`)
    },
    async editFeedPage(req, res) {
        const username = req.params.name
        const postId = req.params.id
        const currentUser = await usersRepository.findUserByUsername(req.session.currentUser.username)
        const userDashboardProfile = await usersRepository.findUserByUsername(username)
        const userDashboard = await infoBankRepository.findUserPost(username);
        const oneFeed = await infoBankRepository.findUserPostByPostId(username, postId)
        res.render('editFeed', { oneFeed, username, postId, currentUser, userDashboardProfile, userDashboard })
    },
    async updateFeed(req, res) {
        const username = req.params.name
        const postId = req.params.id

        if (!Array.isArray(req.body.tags)) req.body.tags = convertToArray(req.body.tags)
        // req.body.img = await uploadImg(req.file.path)
        console.log(req.body.feedImg)
        req.body.editedAt = dateFormatter(new Date())
        const feedToUpdate = req.body
        await infoBankRepository.findAndUpdateUserPost(username, postId, feedToUpdate)
        res.redirect(`/app/${username}/dashboard/${postId}`)
    },
    async deletePost(req, res) {
        const username = req.params.name
        const postId = req.params.id
        console.log('for deletepost, username is ' + username + " and postId is " + postId)
        const result = await infoBankRepository.deleteOnePostByPostId(username, postId)
        res.redirect(`/app/${username}/dashboard`)
    },
    async followUser(req, res) {
        const usernameToFollow = req.params.name
        const currentUser = req.session.currentUser
        const result = await usersRepository.addToListOfFollow(usernameToFollow, currentUser)

        return res.redirect(`/app/${req.params.name}/dashboard`)
    },
    async unFollowUser(req, res) {
        const usernameToFollow = req.params.name
        const currentUser = req.session.currentUser
        await usersRepository.unFollow(usernameToFollow, currentUser)

        return res.redirect(`/app/${req.params.name}/dashboard`)

    },
    async filterByTags(req, res) {
        return res.redirect(`/app/login/filter/${req.body.filterByTags}`)
    },
    async filterByUsername(req, res) {
        return res.redirect(`/app/login/filter/username/${req.body.filterByTags}`)
    },
    async filteredTagIndexPage (req,res) {
        const filterByTag = req.params.filterByTag
        console.log(filterByTag + "by tags")
        try {
            const currentUser = await usersRepository.findUserByUsername(req.session.currentUser.username)
            const allUserFeeds = await infoBankRepository.getAll();
            res.render('filteredIndexByTag', { currentUser, allUserFeeds, filterByTag})
        } catch (err) {
            return res.render(`error/404`, { err })
        }
    },
    async filteredUsernameIndexPage (req,res) {
        const filterByUsername = req.params.filterByTag
        console.log(filterByUsername + 'by name')
        try {
            const currentUser = await usersRepository.findUserByUsername(req.session.currentUser.username)
            const allUserFeeds = await infoBankRepository.getAll();
            res.render('filteredIndexByUsername', { currentUser, allUserFeeds, filterByUsername})
        } catch (err) {
            return res.render(`error/404`, { err })
        }
    }

}