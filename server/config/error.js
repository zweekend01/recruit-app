// 2xx
exports.ERROR_USER_EXISTED = {
  code: 'user:existed',
  data: null,
  msg: 'User existed'
};
exports.ERROR_USER_TOKEN_INVALID = {
  code: 'user:token_invalid',
  data: null,
  msg: 'User token invalid'
};
exports.ERROR_USER_NOT_EXISTED = {
  code: 'user:not_existed',
  data: null,
  msg: 'User not existed'
};
exports.ERROR_USER_PWD_INCORRECT = {
  code: 'user:pwd_incorrect',
  data: null,
  msg: 'User pwd incorrect'
};

// 4xx
exports.ERROR_400 = [400, 'BadRequest'];
exports.ERROR_401 = [401, 'Unauthorized'];
exports.ERROR_402 = [402, 'PaymentRequired'];
exports.ERROR_403 = [402, 'Forbidden'];
exports.ERROR_404 = [404, 'NOtFound'];
exports.ERROR_405 = [405, 'MethodNotAllowed'];
exports.ERROR_406 = [406, 'NotAcceptable'];
exports.ERROR_407 = [407, 'ProxyAuthenticationRequired'];
exports.ERROR_408 = [408, 'RequestTimeout'];
exports.ERROR_409 = [409, 'Conflict'];
exports.ERROR_410 = [410, 'Gone'];
exports.ERROR_411 = [411, 'LengthRequired'];
exports.ERROR_412 = [412, 'PreconditionFailed'];
exports.ERROR_413 = [413, 'PayloadTooLarge'];
exports.ERROR_414 = [414, 'URITooLong'];
exports.ERROR_415 = [415, 'UnsupportedMediaType'];
exports.ERROR_416 = [416, 'RangeNotSatisfiable'];
exports.ERROR_417 = [417, 'ExpectationFailed'];
exports.ERROR_418 = [418, 'ImATeapot'];
exports.ERROR_421 = [421, 'MisdirectedRequest'];
exports.ERROR_422 = [422, 'UnprocessableEntity'];
exports.ERROR_423 = [423, 'Locked'];
exports.ERROR_424 = [424, 'FailedDependency'];
exports.ERROR_425 = [425, 'UnorderedCollection'];
exports.ERROR_426 = [426, 'UpgradeRequired'];
exports.ERROR_428 = [428, 'PreconditionRequired'];
exports.ERROR_429 = [429, 'TooManyRequests'];
exports.ERROR_431 = [431, 'RequestHeaderFieldsTooLarge'];
exports.ERROR_451 = [451, 'UnavailableForLegalReasons'];

// 5xx
exports.ERROR_500 = [500, 'InternalServerError'];
exports.ERROR_501 = [501, 'NotImplemented'];
exports.ERROR_502 = [502, 'BadGateway'];
exports.ERROR_503 = [503, 'ServiceUnavailable'];
exports.ERROR_504 = [504, 'GatewayTimeout'];
exports.ERROR_505 = [505, 'HTTPVersionNotSupported'];
exports.ERROR_506 = [506, 'VariantAlsoNegotiates'];
exports.ERROR_507 = [507, 'InsufficientStorage'];
exports.ERROR_508 = [508, 'LoopDetected'];
exports.ERROR_509 = [509, 'BandwidthLimitExceeded'];
exports.ERROR_510 = [510, 'NotExtended'];
exports.ERROR_511 = [511, 'NetworkAuthenticationRequired'];
