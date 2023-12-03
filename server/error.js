// eslint-disable-next-line import/prefer-default-export
module.exports.createError = (status, message) => {
    const err = new Error();
    err.status = status;
    err.message = message;
    return err;
  };
  