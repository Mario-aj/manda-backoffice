export type ApiErrorBody = {
  statusCode: number;
  error: string;
  message: string | string[];
  timestamp: string;
  path: string;
};

export class ApiError extends Error {
  status: number;
  body?: ApiErrorBody;

  constructor(message: string, status: number, body?: ApiErrorBody) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

export function normalizeApiMessage(
  body: ApiErrorBody | undefined,
  fallback: string
): string {
  if (!body?.message) return fallback;
  if (typeof body.message === "string") return body.message;
  if (Array.isArray(body.message) && body.message.length > 0)
    return body.message[0];
  return fallback;
}

export function toApiError(err: unknown): ApiError {
  if (err instanceof ApiError) return err;
  if (err instanceof Error) return new ApiError(err.message, 0);
  return new ApiError("Erro desconhecido", 0);
}
