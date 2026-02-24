-- Enter the name of your database
SET @DATABASE_NAME = 'cs362_rurkan'


USE DATABASE_NAME;

-- =========================
-- USER TABLE
-- =========================
CREATE TABLE user (
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    username_user VARCHAR(50) NOT NULL UNIQUE,
    salt_user VARCHAR(255) NOT NULL,
    hashedpass_user VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- LOCATION TABLE
-- =========================
CREATE TABLE location (
    id_location INT AUTO_INCREMENT PRIMARY KEY,
    name_location VARCHAR(100) NOT NULL,
    description_location VARCHAR(256),
    hall_location VARCHAR(100),
    coordinates_location POINT,
    image_path_location VARCHAR(255),

    average_noise_location DECIMAL(3,2) DEFAULT 0,
    average_comfort_location DECIMAL(3,2) DEFAULT 0,
    average_crowded_location DECIMAL(3,2) DEFAULT 0,
    average_overall_location DECIMAL(3,2) DEFAULT 0,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- RATING TABLE
-- =========================
CREATE TABLE rating (
    id_rating INT AUTO_INCREMENT PRIMARY KEY,
    id_location INT NOT NULL,
    id_user INT NOT NULL,

    noise_rating INT CHECK (noise_rating BETWEEN 1 AND 5),
    comfort_rating INT CHECK (comfort_rating BETWEEN 1 AND 5),
    crowded_rating INT CHECK (crowded_rating BETWEEN 1 AND 5),

    written_rating TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE (id_user, id_location),

    FOREIGN KEY (id_location)
        REFERENCES location(id_location)
        ON DELETE CASCADE,

    FOREIGN KEY (id_user)
        REFERENCES user(id_user)
        ON DELETE CASCADE
);

-- =========================
-- TAG TABLE
-- =========================
CREATE TABLE tag (
    id_tag INT AUTO_INCREMENT PRIMARY KEY,
    name_tag VARCHAR(100) NOT NULL UNIQUE
);

-- =========================
-- LOCATION_TAGS (JUNCTION TABLE)
-- =========================
CREATE TABLE location_tags (
    location_id INT NOT NULL,
    tag_id INT NOT NULL,

    PRIMARY KEY (location_id, tag_id),

    FOREIGN KEY (location_id)
        REFERENCES location(id_location)
        ON DELETE CASCADE,

    FOREIGN KEY (tag_id)
        REFERENCES tag(id_tag)
        ON DELETE CASCADE
);
