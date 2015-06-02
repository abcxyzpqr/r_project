exports.create = function(status, code, message, data) {
    var response = {
        status: status,
        message: message,
        code: code,
        data: data
    }
    return JSON.stringify(response);
}
