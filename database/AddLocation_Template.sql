-- Tip: you must remove the '<' and '>' when editing the template

-- =========================
-- STEP 1: Add the location
-- =========================
-- Tip: Right click a location in Google Maps and click the coordinates to copy them
INSERT INTO location (name_location, description_location, hall_location, coordinates_location, image_path_location)
VALUES (
  '<LOCATION NAME>',           
  '<DESCRIPTION>',             
  '<BUILDING NAME>',           
  ST_GeomFromText('POINT(<LAT> <LNG>)'),
  '/images/<FILE NAME>'
);

-- Save the location ID immediately
SET @location_id = LAST_INSERT_ID();

-- =========================
-- STEP 2: Add tags
-- =========================
-- Add or remove lines below depending on how many tags this location has
-- This accepts new and already used tags
INSERT IGNORE INTO tag (name_tag) VALUES ('<TAG 1>');
INSERT IGNORE INTO tag (name_tag) VALUES ('<TAG 2>');
INSERT IGNORE INTO tag (name_tag) VALUES ('<TAG 3>');

-- =========================
-- STEP 3: Link tags to location
-- =========================
-- Make sure the tag names here match exactly what you put in Step 2
INSERT INTO location_tags (location_id, tag_id)
SELECT @location_id, id_tag FROM tag WHERE name_tag IN (
  '<TAG 1>',
  '<TAG 2>',
  '<TAG 3>'
);
