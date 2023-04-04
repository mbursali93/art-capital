const authQuery = {
    registerUser: "INSERT INTO users(id, username, email, password, social_media_links) VALUES($1, $2, $3, $4, $5) RETURNING id, username, email, social_media_links, role",
    getUserByEmail: "SELECT * FROM users WHERE email= $1",
}

export default authQuery