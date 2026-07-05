import type { components } from "./staff-api";

export type StaffProfileResponseDto =
  components["schemas"]["StaffProfileResponseDto"];
export type TokenResponseDto = components["schemas"]["TokenResponseDto"];
export type ApiErrorResponseDto = components["schemas"]["ApiErrorResponseDto"];

export type { components, paths, operations } from "./staff-api";
