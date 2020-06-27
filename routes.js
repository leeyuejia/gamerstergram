const gamesterController = require('./controllers/gamesterController')
const usersController = require('./controllers/usersController')
const sessionsController = require('./controllers/sessionsController')
const multer = require('multer');
const upload = multer({dest: 'uploads/'})

module.exports = (app) => {
    app.get('/', (req,res) => res.redirect('/app/login'))
    app.get('/app/login', gamesterController.allUsersFeeds)
    app.get('/app/login/filter/:filterByTag', gamesterController.filteredTagIndexPage)
    app.put('/app/login/filterByTag', gamesterController.filterByTags)
    // user start a session
    app.get('/app/sessions/new', sessionsController.newForm)
    app.post('/app/sessions', sessionsController.create)
    app.delete('/app/sessions', sessionsController.destroy)

    app.get('/app/users/new', usersController.newForm) // sign up page
    app.get('/app/:name/dashboard/editProfile',usersController.editProfilePage)
    app.put('/app/:name/dashboard/editProfileImage',upload.single('proImg'), usersController.updateProfileImage)
    app.put('/app/:name/dashboard/updateProfile', usersController.updateProfile)
    app.post('/app/users/new/create', upload.single('proImg'), usersController.create)

    app.get('/app/:name/dashboard', gamesterController.dashboardPage)
    app.get('/app/:name/dashboard/create/newfeed', gamesterController.createFeedPage)

    app.get('/app/:name/dashboard/:id', gamesterController.showFeedPage)
    app.get('/app/:name/dashboard/:id/edit',gamesterController.editFeedPage)

    app.post('/app/:name/dashboard', upload.single('feedImg'), gamesterController.postFeed)
    app.post('/app/:name/dashboard/follow',gamesterController.followUser)
    app.post('/app/:name/dashboard/unfollow',gamesterController.unFollowUser)

    // app.post('/app/:name/dashboard/:id/postCommentImg', upload.single('proImg'), gamesterController.postCommentImage)
    app.put('/app/:name/dashboard/:id', gamesterController.postComment)
    app.put('/app/:name/dashboard/:id/edit', /*upload.single('feedImg'),*/ gamesterController.updateFeed)
    
    app.delete('/app/:name/dashboard/:id/delete', gamesterController.deletePost)
}

