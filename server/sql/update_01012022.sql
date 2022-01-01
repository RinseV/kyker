-- Adds missing gate
INSERT INTO gate (name, location_lat, location_lon, created_at, updated_at)
VALUES
    ('Pafuri', -22.3998147, 31.0391006, NOW(), NOW());
-- Adds picnic sites
INSERT INTO camp (name, location_lat, location_lon, size, created_at, updated_at)
VALUES
    ('Afsaal', -25.286384, 31.529478, 1, NOW(), NOW()),
    ('Babalala', -22.9049518, 31.2488671, 1, NOW(), NOW()),
    ('Makhadzi', -23.6919695, 31.6175872, 1, NOW(), NOW()),
    ('Masorini', -23.922748, 31.2657204, 1, NOW(), NOW()),
    ('Mlondozi', -25.0356613, 31.9324255, 1, NOW(), NOW()),
    ('Mooiplaas', -23.5561422, 31.4392331, 1, NOW(), NOW()),
    ('Muzandzeni', -24.4824195, 31.6341531, 1, NOW(), NOW()),
    ('Nhlanguleni', -24.7098807, 31.6545518, 1, NOW(), NOW()),
    ('Nkuhlu', -24.9968176, 31.7668154, 1, NOW(), NOW()),
    ('N''wanetsi', -24.4579552, 31.9739321, 1, NOW(), NOW()),
    ('Pafuri', -22.422914, 31.2453096, 1, NOW(), NOW()),
    ('Timbavati', -24.2605305, 31.6432515, 1, NOW(), NOW()),
    ('Tshokwane', -24.7864321, 31.8568477, 1, NOW(), NOW());