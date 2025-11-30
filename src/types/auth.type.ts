export type UserRoleType = "admin" | "manager" | "user" | "guest";

export interface UserStateType {
  // State
  isAuthenticated: boolean;
  role: UserRoleType;

  // Actions
  setAuthState: (isAuthenticated: boolean, role: UserRoleType) => void;
}
