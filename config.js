var env = process.env.NODE_ENV,
    CONFIG;


var dev = {

    APP: {
        port: 5000
    },

    TEST: {
        URI: "mongodb://localhost:27017/test",
        HOST: "",
        PORT: 27017,
        DB: ""
    },

}


var prod = {

    APP: {
        port: 5000
    },

    TEST: {
        URI: 'mongodb://54.169.138.96/Test',
        HOST: "",
        PORT: 27017,
        DB: ""
    }
}

console.log(env)

switch (env) {
    case 'production':
        CONFIG = prod;
        break;
    case 'development':
        CONFIG = dev;
        break;
    default:
        CONFIG = dev;
        break;
}

module.exports = CONFIG
