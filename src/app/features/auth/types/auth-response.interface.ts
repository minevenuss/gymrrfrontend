import { User } from "../../../core/interfaces/user.interface";

export interface AuthResponse {
    token: string;
    user: User;
}