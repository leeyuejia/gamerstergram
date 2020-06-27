module.exports = {
    type: 'object',
    required: ['username','nickname','password'],
    properties : {
        username: {
            type: 'string'
        },
        nickname: {
            type: 'string'
        },
        password: {
            type: 'string'
        },
        createdAt: {
            type:'string',
            format: "date-time"
        },
        updatedAt: {
            type: 'string',
            format: "date-time"
        },
        lastLoggedInAt : {
            type: 'string',
            format: "date-time"
        },
        proimg: {
            type: 'string'
        },
        biography: {
            type: 'string'
        },
        userFollowing :{
            type: 'array',
            uniqueItems : true,
            items: {
                type: 'string',
                description: 'string of username whom this user are following'
            }
        },
        userfollowedBy :{
            type: 'array',
            uniqueItems : true,
            items: {
                type: 'string',
                description: 'string of username who follows this user'
            }
        },
    }
}