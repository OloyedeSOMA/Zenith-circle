export interface StudentProfileRequest{
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    role: string;
}
export interface StudentProfileResponse{
    [key: string] : unknown;
}
export interface RecruiterProfileRequest{
  organisation: string,
  description: string,
  website: string,
  location: string,
  logo: string;

}
export interface RecruiterProfileResponse{
    [key: string] : unknown;
}
