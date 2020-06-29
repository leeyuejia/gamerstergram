const usersRepository = require('../repositories/usersRepository')
const infoBankRepository = require('../repositories/infoBankRepository')
const moment = require('moment');
const cloudinary = require('cloudinary').v2
const { ObjectId } = require('mongodb');
const { validate } = require('../validator/usersValidator');
const { createUserDashBoard } = require('../repositories/infoBankRepository');

cloudinary.config({
    cloud_name: 'gamestergram',
    api_key: 663843891388912,
    api_secret: 'r1Nos8ynCgtd-TTLGcMRP-hhlQE',
    secure:true,
})
uploadImg = async (filePath) => {
    const result = await cloudinary.uploader.upload(filePath,{
        use_filename: true},(err,result) => {
            if(!err) {
               return result 
            }
            else {console.log(err)}
        })
    console.log(result.url)
    return result.url
}
const dateFormatter = (input) => {
    return moment(input).format('dddd, MMMM Do YYYY, kk:mm:ss')
}


module.exports = {
    async create(req, res) {
        try {
            const data = req.body
            validate(data)
            console.log('multer is : ' , req.file)
            req.body.proImg = await uploadImg(req.file.path)
            await usersRepository.create(data); // create a user data
            await infoBankRepository.createNewUserDashBoard(data) // create a dashboard
            // create a infoBank data for the new user
            res.redirect('/')
        } catch (err) {
            res.render('errors/404', { err });
        }
    },
    newForm(req, res) { // render sign up page
        res.render('users/new');
    },
    async editProfilePage(req, res) {
        try {
            const currentUser = await usersRepository.findUserByUsername(req.session.currentUser.username)
            const userDashboardProfile = await usersRepository.findUserByUsername(currentUser.username)
            const userDashboard = await infoBankRepository.findUserPost(currentUser.username);
            return res.render('users/editProfilePage', {currentUser,userDashboard,userDashboardProfile})
        } catch (err) {
            res.render('errors/404', { err });
        }
    },
    async updateProfile(req, res) {
        const username = req.session.currentUser.username
        console.log(req.body)
        const currentUser = await usersRepository.findUserByUsername(req.session.currentUser.username)
        infoToUpdate = {
            username : req.body.username,
            nickname : req.body.nickname,
            biography : req.body.biography,
            updatedAt : dateFormatter(new Date())
        }
        await infoBankRepository.updateUsernameAndNickname(username,infoToUpdate)
        await usersRepository.updateProfile(username,infoToUpdate)
        return res.redirect(`/app/${currentUser.username}/dashboard`)
    },
    async updateProfileImage(req,res) {
        const imageToUpdate = await uploadImg(req.file.path)
        const currentUser = await usersRepository.findUserByUsername(req.session.currentUser.username)
        console.log(imageToUpdate)
        await usersRepository.updateProfileImage(currentUser.username, imageToUpdate) 
        return res.redirect(`/app/${currentUser.username}/dashboard`)
    }
}