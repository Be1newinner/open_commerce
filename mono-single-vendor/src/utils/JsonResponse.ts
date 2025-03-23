import { Response } from "express";

type JSONResponseType = {
  data?: unknown;
  meta?: Record<string, unknown>;
  status_code?: number;
  application_code?: number;
  message?: string;
};

function JSONResponse({
  data = null,
  meta = {},
  status_code = 200,
  application_code = 200,
  message = "Operation success!",
}: Partial<JSONResponseType>): JSONResponseType {
  return {
    data,
    meta,
    status_code,
    application_code: application_code || status_code,
    message,
  };
}

function SendResponse(
  resObject: Response,
  response: Partial<JSONResponseType>
): void {
  const res = JSONResponse(response);
  resObject.status(res.status_code!).json(res);
}

export { SendResponse };
