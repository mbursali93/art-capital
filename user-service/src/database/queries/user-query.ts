const userQuery = {
    registerUser: "INSERT INTO users(id, username, email, password, social_media_links, iban) VALUES($1, $2, $3, $4, $5, $6) RETURNING id, username, email, social_media_links, role",
    getUserByEmail: "SELECT * FROM users WHERE email= $1",
    getUserIBAN: "SELECT iban FROM users WHERE id= $1",
    updateUserSells: "UPDATE TABLE users SET sold_products = sold_products + 1 WHERE id = $1",
    getUserById: "SELECT * FROM users WHERE id= $1",
    updateUserPassword: "UPDATE users SET password = $1 WHERE id= $2 RETURNING *",
    updateSocialMediaLinks: "UPDATE users SET social_media_links = $1 WHERE id = $2 RETURNING social_media_links",
}

export default userQuery