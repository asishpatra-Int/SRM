export type UserType = "free" | "premium" | "sk";

export interface UserModel {
  mobileNumber: string;
  userType: UserType;
}
