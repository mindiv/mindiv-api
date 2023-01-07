import express from 'express';

export enum ResponseCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  INTERNAL_SERVER_ERROR = 500,
}

export class ResponseBody {
  message!: string;
  payload!: any;
  status!: number;
}

export function respond(
  res: express.Response,
  data: any = {},
  message: string = '',
  code: ResponseCode = ResponseCode.OK
) {
  const statusCode = code;
  let responseBody = {
    message: message,
    payload: data,
    status: statusCode,
  } as ResponseBody;
  res.status(statusCode).send(responseBody);
}
