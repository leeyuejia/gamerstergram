# Project two scope

# App Title - Gamestergram

This application is a website that brings a community of common interest together to share and learn. It is a focus group community on the subject of games.  

## Application link "

- (link to application)

## Table of Contents
- [Introduction](#Introduction)
- [Project Approach](#project-approach)
- [Technology Used](#Technology-used)
- [Main Features](#Main-features)
- [User Journey Map](#User-Journey-Map)
- [Developer Journey](#Developer-Journey)
- [Future Development](#Future-Development)

# Project scope

## Introduction

The gaming industry in one of the most thriving business in the world. It is reported that since 2006, its has officially became a multi-billion dollar industry with the world as its market. Games are the spearhead in terms of pushing ICT to its next level at a consumer - based market. As games are part of the entertainment for people, it has global market at its feet. 

As digital technology and data transfer speed thrive, more gamers are virtually connected at a global level. The high amount of content of gaming infomation available on youtube is one such proof. With high visit traffics on websites like ign, eurogamers.net and gamespot.com, there is no doubt that there is a commmunity of gamers on the digital world who comes together to share and learn about the games they play. 

On youtube, there are gamers who published their recorded reviews, annoucements, gameplays and walkthroughs which garnered millions of views. These shows that there is alot of attention given to game contents. Based on the comments, there are generally a few reasons why users viewed such videos. 
 - It is entertaining to watch gameplays. In other words, its fun. 
 - User have no chance / time to play that game. Viewing posted walkthroughs can be a substitute to be able to experience the game. 
 - Gamers watched for tips and clues. 
 - For compeititive gamers who are doing research
 - For game reviews. 
 - To find gaming informations. 

 This application seeks to create a "facebook" for gamers where gamers can logged the games they have previously played or are currently playing. They can upload information such as their progress and achievements, sharing of their experiences, reviews and tips in the form of blogs, video and screenshots.

 As it is a personal account, each user can post their information as well as read / comment on other's information. 

 The aim of this application is to bring communities of gamers together to share / inform and be informed. 

 ### In view of this, the application developed aims to 
 1) Target at matured gamers
 2) Have a system of setting personal account and able to post their information and view other people's account. 

## Project Approach

The approach to this project is to set up a basic MVC structure with all CRUD routes created and MONGODB connected for a single user. User's homepage, contentpage, viewpage, editpage and postpage to be created for a single User.

Set up database and Schema validation in a way that when user sign in, it will retrieved database corresponding to its username. 

Secondly, built authentication for a single user to retrieve its own information.

Next, build main application page where all user's basic info and latest post is displayed. Upon entering the post, Users can view all post posted by that users. 

Other users can post comments other other user's viewpages. 

BONUS : include password authentication and adding a social list. 

## Technology used

1) CSS
2) MVC structure
3) JQuery
5) EJS view engine
6) MongoDB
7) Node.js
8) Express.js
9) Heroku (for deployment of application)
10) Mongo Atlas ( for storing databases on cloud platform)
11) External source
    - Multer (For uploading of image to server side)
    - Cloudinary (Media storage )

## Main Features

1) Sign in / Sign out. Authenticating user and start user's session
2) Search bar to filter out tags, username and game title
3) Dashboard that shows User's latest feeds
4) Create and Post feeds which have 
    - Required fields like ( Title, tags, game title, description) 
    - Non required fields are like [ 1 Main image, screenshots of images with description for each image upload (unlimited), a link to outside source]
5) Comment on other user's feed. (BONUS : user can upload images when they generate feed)
6) Delete post. Delete post when a certain game is completed, redundant or obselete
7) Edit post. Editing their post with updated information with regards to that spectific feed. 
8) (BONUS) Add followers to the list that they followed. Their HOMEPAGE would first feed and display users activity whom they have followed first before the rest. 

## User Journey Map

1) Main application page. **HOMEPAGE**

    DISPLAY
    - Every user's latest post in a flexbox display manner. 
    - A side Nav Hamburger menu button that can access an authenticated User's features.
        - user features include
            1) Dashboard - direct to **DASHBOARDPage** 
            2) sign out - sign the users out and redirect to **HOMEPAGE**
            3) Post - directs to **NEWPOSTpage**
    - if user is not signed in. display sign in option
    - A search bar header to filter post by game title, username and post dates. 
    - (BONUS) user can click follow to add to the list of favourite users that will appear in their latest feed the next time user sign in. 

    INTERACTION
    - User can enter into other user's **wall page** and view their posts 
    - User can enter into its own **dashboard** to edit, read, or post. 

2) Sign in page. **SIGNINpage**

    DISPLAY
    - User can sign in to their page with **EMAIL** and **PASSWORD**
    - New USER can sign up with **username** (of their choice), **EMAIL** and setup a **PASSWORD** 
    - (BONUS) sign in with google / facebook / instagram account. 

    INTERACTION
    - Signed in will direct to **HOMEPAGE** with username displayed
    - Upon successful signed up, will direct to **HOMEPAGE**

3) Dashboard **DASHBOARDPAGE**

    DISPLAY
    - User can see their own post
    - Side nav bar to direct to  
        1) Dashboard - direct to **DASHBOARDPage** 
        2) sign out - sign the users out and redirect to **HOMEPAGE**
        3) Post - directs to **NEWPOSTpage**
    - Search option bar to search within their own post. 
    - Sort option to sort by latest feed / Title Alphabetical order
    - (BONUS) A side nav that shows their recent activity ( up to 10 items)
    
    INTERACTION
    - For each post, user can EDIT / DELETE / SHOW on that particular post
        - for EDIT - **editPage** which add content onto the existing post or edit page
        - for DELETE - **delete** which deletes the entire post
        - for SHOW -- **showPage** which shows the post's entire detail


4) Posting New content **NEWPOSTpage**

    DISPLAY
    - a form div that user can input new content with fields such as
        - REQUIRED
            - Title
            - add main image (one url link)
            - Genre (select options) (Walkthrough / Reviews / Challenges / Tips & Tricks)
            - add tags (add on options) ("#game title", "#question", "#stucked", "#experiences" and etc)
            - Description (textarea)

        - NON-REQUIRED
            - sub images(can add as many images as user pleases)
            - sub description
            - external link
    - Submit button

    INTERACTION
        - User can key in information and click the submit button. 
        - Upon submission, it will redirect to user's dashboard page

5) Editing content on existing post **editPage** 

    DISPLAY
    - Information about current post to be display with the option to delete / edit / add-on
        - For required field
            - Able to edit
        - For Non-required field
            - able to delete / edit / add-on
    - Comments about the post are displayed and can be deleted but not edited.

    INTERACTION
    - User can input edit and delete information regarding the post
    - A save button to finalize and submit all updates.
    - A back button to cancel the session and return to user's Dashboard
    - A Home button to direct to homePage
    
6) Showing a Post **showPage**

    Display
    - A div block that display all information about the post
    - An input (textarea) bar to post comment on the post
    - A add button to add an image 
    - A delete button to delete post
    - A edit button to edit post (redirects to editPage)
    
    INTERACTION
    - User can see the most recent comment. 
    - User can post his own comment in response to that comment made by other users.

7) 

## Data Structure

DATABASE NAME : ``` gameMeetup ```

Datas will be structured into two collections.
- 'user' collections which will store user's information such as name, email, password, date created and date that infomation is updated.
- 'infoBank' collections which will store every user's data which include arrays of feeds, and each feed would have elements such as title, images, descriptions and comments.  


1) User's schema structure as :
    ```
    {
        $jsonSchema: {
            type: 'object',
            required:['username','nickname','email','password'],
            properties: {
                username: {
                    bsonType: 'string'
                },
                nickname: {
                    bsonType: 'string'
                },
                email: {
                    bsonType: 'string'
                },
                password: {
                    bsonType: 'string'
                },
                createdAt: {
                    bsonType: 'date'
                },
                updatedAt: {
                    bsonType: 'date'
                }
            }
        }
    }
    ```

2) 'infoBank's schema structure as :
    ```
    {
        $jsonSchema: {
            type: 'object',
            required:['username','nickname'],
            properties: {
                username: {
                    bsonType: 'string'
                },
                nickname: {
                    bsonType: 'string'
                },
                loggedInAt: {
                    bsonType: 'date'
                },
                feeds: {
                    bsonType: 'array',
                    uniqueItems: true,
                    items: {
                        bsonType: 'object',
                        properties: {
                            postID: {
                                bsonType: 'number',
                                description: 'index of post'
                            },
                            title: {
                                bsonType: 'string',
                                description: 'the title of the feed'
                            },
                            img: {
                                bsonType: 'string',
                                description: 'the main image url'
                            },
                            description: {
                                bsonType: 'string',
                                description: 'description of your feed'
                            },
                            tags: {
                                bsonType: 'array',
                                uniqueItems:true,
                                items: {
                                    bsonType: 'string',
                                    description: 'tags of your post for search filters'
                                }
                            },
                            postedAt:{
                                bsonType: 'date',
                                description: 'date of new post created'
                            },
                            editedAt: {
                                bsonType: 'date',
                                description : 'date of updated post'
                            },
                            comments: {
                                bsonType: 'array',
                                uniqueItems: true,
                                items: {
                                    bsonType: 'object',
                                    required:['commentBy','commentAt',commentInfo],
                                    properties: {
                                        commentBy : {
                                            bsontype: 'string',
                                            description: 'the person who commented'
                                        },
                                        commentAt : {
                                            bsontype: 'date'
                                            description: 'date posted'
                                        },
                                        commentInfo : {
                                            bsontype: 'string',
                                            description: 'desciption of the post'
                                        },
                                        commentImg: {
                                            bsontype: 'string',
                                            description: 'uploading images related to post'
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    ```
    




// comment stucture
// post stucture

name: user A
post:{details of post with the comment nested in.}
a userid that tags to the comment


documents which are user
documents which are post. 

name: user A
post ['id1, id2]

post data
id1: {
    details of the post
}

// authentication is lower priority. use dropdown list of created users. 


