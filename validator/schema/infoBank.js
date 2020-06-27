module.exports = {
    type: 'object',
    required: ['username', 'nickname'],
    properties: {
        username: {
            type: 'string'
        },
        nickname: {
            type: 'string'
        },
        loggedInAt: {
            type: 'string',
            format: 'date-time'
        },
        feeds: {
            type: 'array',
            uniqueItems: true,
            items: {
                type: 'object',
                properties: {
                    postID: {
                        type: 'number',
                        description: 'index of post'
                    },
                    title: {
                        type: 'string',
                        description: 'the title of the feed'
                    },
                    img: {
                        type: 'string',
                        description: 'the main image url'
                    },
                    description: {
                        type: 'string',
                        description: 'description of your feed'
                    },
                    tags: {
                        type: 'array',
                        uniqueItems:true,
                        items: {
                            type: 'string',
                            description: 'tags of your post'
                        }
                    },
                    postedAt:{
                        type: 'string',
                        format: 'date-time',
                        description: 'date of new post created'
                    },
                    editedAt: {
                        type: 'string',
                        format: 'date-time',
                        description: ' date of updating post'
                    },
                    comments: {
                        type: 'array',
                        uniqueItems: true,
                        items: {
                            type: 'object',
                            required: ['commentBy', 'commentAt', 'commentInfo'],
                            properties: {
                                commentBy: {
                                    type: 'string',
                                    description: 'the person who commented'
                                },
                                commentAt: {
                                    type: 'string',
                                    format: 'date-time',
                                    description: 'date posted'
                                },
                                commentInfo: {
                                    type: 'string',
                                    description: 'desciption of the post'
                                },
                                commentImg: {
                                    type: 'string',
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