const userQuery = {
    registerUser: "INSERT INTO users(id, username, email, password, social_media_links, iban) VALUES($1, $2, $3, $4, $5, $6) RETURNING id, username, email, social_media_links, role",
    getUserByEmail: "SELECT * FROM users WHERE email= $1",
    getUserIBAN: "SELECT iban FROM users WHERE id= $1",
}

export default userQuery