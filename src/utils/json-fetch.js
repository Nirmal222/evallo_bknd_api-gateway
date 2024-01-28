const axios = require("axios");
var uuid = require("uuid");
const constants = require("./constants");
var httpContext = require("express-http-context");


const jsonAxios = async (options) => {
    // make sure the JSON header is set
    if (options != null) {
      if (options.headers == null) {
        options.headers = {};
      }
      let corid = uuid.v4();
      let requid = uuid.v4();
      let requestId = httpContext.get(constants.REQUEST_ID);
      let authorization = httpContext.get(constants.AUTHORIZATION);
      let clientid = httpContext.get(constants.CLIENT_ID);
      let secret = httpContext.get(constants.SECRET);
      options.headers["Content-Type"] = "application/json";
      options.headers["X-Correlation-ID"] = corid;
      options.headers["RequestId"] = requestId ? requestId : requid;
      options.headers["authorization"] = authorization
        ? authorization
        : undefined;
      options.headers["clientid"] = clientid ? clientid : undefined;
      options.headers["secret"] = secret ? secret : undefined;
    }
    // fetch the response and handle response status codes and payload
    return axios(options)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        if (error.code == constants.ECONNREFUSED) {
          let err = {
            message: "unable to reach service",
          };
          throw Object.assign({ status: false, code: 404, error: err });
        } else {
          if (
            error &&
            error.response &&
            error.response.data &&
            error.response.data.status === false
          ) {
            throw error.response.data;
          } else {
            throw error;
          }
        }
      });
  };


  module.exports = { jsonAxios };