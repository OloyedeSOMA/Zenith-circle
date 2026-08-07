export interface StudentProfileRequest{
    profile_photo: File,
    display_name: string;
    email: string,
    institution: string,
    course_of_study: string,
    current_level: string,
    expected_graduation: string,
    skills: string[],
    interests: string[]
}
export interface StudentProfileResponse{
    [key: string] : unknown;
}
export interface RecruiterProfileRequest{
  organisation: string,
  description: string,
  website: string,
  location: string,
  logo: File,

}
export interface RecruiterProfileResponse{
    [key: string] : unknown;
}
