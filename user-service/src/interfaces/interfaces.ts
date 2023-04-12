interface IUserInputs {
    id: string,
    username: string,
    email: string,
    password: string,
    avatar?: string,
    role?:string,
    social_media_links?: string[],
    iban: string
}

export default IUserInputs