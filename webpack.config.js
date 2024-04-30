const path = require('path')

module.exports = {
    mode: 'development',
    // entry: './src/index.js',

    entry: {
        firebase: './js/firebase.js',
        index: './js/index.js',
        signup: './js/signup.js',
        login: './js/login.js',
        admin: './js/admin.js',
        feedback: './js/feedback.js',
        services: './js/servicess.js',
        userIndex: './js/user.index.js',
        userFeedback: './js/user.feedback.js',
        userServices: './js/user.services.js'
    },

    output: {
        path: path.resolve(__dirname, 'WEBSITE'),
        // filename: 'bundle.js'
        filename: '[name].bundle.js'
    },
    watch: true
}