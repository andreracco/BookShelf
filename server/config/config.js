const config = {

    production: {
        SECRET:     process.env.SECRET,
        DATABASE:   process.env.MONGODB_URI,
        PORT:       process.env.PORT
    },

    default: {
        SECRET:     '*SUPERSECRETPWD123',
        DATABASE:   'mongodb://localhost:27017/bookShelf',
        PORT:       3001
    }

}

exports.get = (env) => ( config[env] || config.default)