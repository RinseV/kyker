-- Populates camp table with all camps
INSERT INTO camp (name, location_lat, location_lon, size, created_at, updated_at)
VALUES
    -- Rest camps
    ('Berg-en-Dal', -25.4267996, 31.4458671, 6, NOW(), NOW()),
    ('Crocodile Bridge', -25.3584331, 31.4468, 6, NOW(), NOW()),
    ('Letaba', -23.8542275, 31.5722433, 6, NOW(), NOW()),
    ('Lower Sabie', -25.1198551, 31.9131903, 6, NOW(), NOW()),
    ('Mopani', -23.5216391, 31.394838, 6, NOW(), NOW()),
    ('Olifants', -24.0060509, 31.7380819, 6, NOW(), NOW()),
    ('Orpen', -24.4756611, 31.3885488, 6, NOW(), NOW()),
    ('Pretoriuskop', -25.1702045, 31.2655137, 6, NOW(), NOW()),
    ('Punda Maria', -22.6927128, 31.0151511, 6, NOW(), NOW()),
    ('Satara', -24.3930075, 31.7776198, 6, NOW(), NOW()),
    ('Shingwedzi', -23.1088991, 31.4333653, 6, NOW(), NOW()),
    ('Skukuza', -24.9964431, 31.5896973, 6, NOW(), NOW()),
    -- Bush camps
    ('Bateleur', -23.2342095, 31.1998014, 4, NOW(), NOW()),
    ('Biyamiti', -25.3069235, 31.7089072, 4, NOW(), NOW()),
    ('Shimuwini', -23.7146211, 31.2638319, 4, NOW(), NOW()),
    ('Sirheni', -22.946967, 31.2192383, 4, NOW(), NOW()),
    ('Talamati', -24.5560097, 31.5533045, 4, NOW(), NOW()),
    ('Boulders', -23.6077431, 31.3732333, 4, NOW(), NOW()),
    ('Roodewal', -24.1461244, 31.6299829, 4, NOW(), NOW()),
    -- Sattelite camps
    ('Balule', -24.05349, 31.7311217, 2, NOW(), NOW()),
    ('Malelane', -25.476639, 31.5093777, 2, NOW(), NOW()),
    ('Tamboti', -24.4541312, 31.403506, 2, NOW(), NOW());
