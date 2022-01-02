-- Populates animal table with animals
INSERT INTO animal (name, color_light, color_dark, disabled, created_at, updated_at)
VALUES
    ('Leopard', '#000000', '#FFFFFF', false, NOW(), NOW()),
    ('Elephant', '#2F855A', '#68D391', false, NOW(), NOW()),
    ('Rhino', '#C05621', '#F6AD55', true, NOW(), NOW()),
    ('Lion', '#C53030', '#FC8181', false, NOW(), NOW()),
    ('Buffalo', '#B7791F', '#F6E05E', false, NOW(), NOW()),
    ('Cheetah', '#2b6cb0', '#63b3ed', false, NOW(), NOW()),
    ('Wild Dog', '#662D11', '#C18264', false, NOW(), NOW()),
    ('Hyena', '#6B46C1', '#B794F4', false, NOW(), NOW()),
    ('Hippo', '#B83280', '#F687B3', false, NOW(), NOW()),
    ('Giraffe', '#2C7A7B', '#4FD1C5', false, NOW(), NOW()),
    ('Zebra', '#00A3C4', '#76E4F7', false, NOW(), NOW());

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
    ('Tamboti', -24.4541312, 31.403506, 2, NOW(), NOW()),
    -- Picnic sites
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

-- Populates gate table with all gates
INSERT INTO gate (name, location_lat, location_lon, created_at, updated_at)
VALUES
    ('Malelane', -25.461588, 31.5310544, NOW(), NOW()),
    ('Crocodile Bridge', -25.3584331, 31.8913413, NOW(), NOW()),
    ('Numbi', -25.155402, 31.1959276, NOW(), NOW()),
    ('Paul Kruger', -24.9809791, 31.4826853, NOW(), NOW()),
    ('Phabeni', -25.0249714, 31.2387993, NOW(), NOW()),
    ('Orpen', -24.5419665, 31.3701233, NOW(), NOW()),
    ('Pafuri', -22.3998147, 31.0391006, NOW(), NOW()),
    ('Phalaborwa', -23.9456776, 31.1634931, NOW(), NOW()),
    ('Punda Maria', -22.737287, 31.0082647, NOW(), NOW());