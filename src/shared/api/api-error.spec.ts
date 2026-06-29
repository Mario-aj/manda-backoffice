import { describe, expect, it } from "vitest";
import { ApiError, normalizeApiMessage, toApiError } from "./api-error";

describe("ApiError", () => {
  it("carries status and body", () => {
    const err = new ApiError("credenciais inválidas", 401, {
      statusCode: 401,
      error: "Não Autorizado",
      message: "credenciais inválidas",
      timestamp: "2026-01-01T00:00:00.000Z",
      path: "/staff/auth/login",
    });
    expect(err.message).toBe("credenciais inválidas");
    expect(err.status).toBe(401);
  });
});

describe("normalizeApiMessage", () => {
  it("returns string message from body", () => {
    expect(
      normalizeApiMessage(
        {
          statusCode: 401,
          error: "Não Autorizado",
          message: "credenciais inválidas",
          timestamp: "",
          path: "",
        },
        "fallback"
      )
    ).toBe("credenciais inválidas");
  });

  it("returns first validation message from array", () => {
    expect(
      normalizeApiMessage(
        {
          statusCode: 400,
          error: "Pedido Inválido",
          message: ["email inválido", "password é obrigatória"],
          timestamp: "",
          path: "",
        },
        "fallback"
      )
    ).toBe("email inválido");
  });

  it("falls back when message missing", () => {
    expect(
      normalizeApiMessage(undefined, "Erro de rede. Tente novamente.")
    ).toBe("Erro de rede. Tente novamente.");
  });
});

describe("toApiError", () => {
  it("passes through ApiError", () => {
    const original = new ApiError("x", 500);
    expect(toApiError(original)).toBe(original);
  });

  it("wraps generic Error", () => {
    const err = toApiError(new Error("network"));
    expect(err).toBeInstanceOf(ApiError);
    expect(err.message).toBe("network");
  });
});
