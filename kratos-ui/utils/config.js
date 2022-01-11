

const ENV = {
    KRATOS_HOST: process.env.NEXT_PUBLIC_KRATOS_HOST ?? "http://localhost"
}

const Status = {
    Gone : {
        status: 410,
        message: "Your flowId has been expired !"
    },
    BadRequest: {
        status: 400,
        message: "Bad Request !"
    }
}

module.exports = {ENV, Status}