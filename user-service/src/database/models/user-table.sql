CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(24) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role VARCHAR(10) DEFAULT 'buyer',
    sold_products INT DEFAULT 0,
    social_media_links TEXT[],
    iban VARCHAR(31) NOT NULL,

    PRIMARY KEY (id)
);