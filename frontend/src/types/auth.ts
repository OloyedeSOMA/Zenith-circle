export interface RegisterRequest{
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    role: string;
}
export interface RegisterResponse{
    [key: string] : unknown;
}