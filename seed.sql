SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE tour_packages;
TRUNCATE TABLE destinations;
SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO destinations (id, name, description, image_url, location, created_at, updated_at) VALUES
(1, 'Paris', 'The city of light and romance.', 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80', 'France', NOW(), NOW()),
(2, 'Kyoto', 'Explore ancient temples and beautiful gardens.', 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80', 'Japan', NOW(), NOW()),
(3, 'Santorini', 'Stunning white-washed buildings and sunsets.', 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&q=80', 'Greece', NOW(), NOW()),
(4, 'Rome', 'Ancient ruins and vibrant street life in the Eternal City.', 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80', 'Italy', NOW(), NOW()),
(5, 'Bali', 'Tropical paradise with beautiful beaches and rich culture.', 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80', 'Indonesia', NOW(), NOW()),
(6, 'New York City', 'The city that never sleeps, full of iconic landmarks.', 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80', 'USA', NOW(), NOW()),
(7, 'Cape Town', 'Breathtaking landscapes from Table Mountain to the coast.', 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&q=80', 'South Africa', NOW(), NOW()),
(8, 'Sydney', 'Famous opera house, beautiful harbor, and surf beaches.', 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80', 'Australia', NOW(), NOW()),
(9, 'Rio de Janeiro', 'Vibrant city famous for Copacabana and Christ the Redeemer.', 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&q=80', 'Brazil', NOW(), NOW()),
(10, 'Istanbul', 'Where East meets West with stunning mosques and bazaars.', 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&q=80', 'Turkey', NOW(), NOW()),
(11, 'Dubai', 'Futuristic skyline, luxury shopping, and desert safaris.', 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80', 'UAE', NOW(), NOW()),
(12, 'Machu Picchu', 'Lost city of the Incas set high in the Andes Mountains.', 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&q=80', 'Peru', NOW(), NOW()),
(13, 'Swiss Alps', 'Snow-capped mountains perfect for skiing and hiking.', 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80', 'Switzerland', NOW(), NOW());

INSERT INTO tour_packages (id, title, description, price, duration_days, image_url, available, destination_id, created_at, updated_at) VALUES
(1, 'Paris Weekend Getaway', 'A quick and romantic 3-day trip in Paris covering the Eiffel Tower and Louvre.', 999.00, 3, 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&q=80', true, 1, NOW(), NOW()),
(2, 'Parisian Art & Culture', 'Dive deep into Parisian culture over 5 days with guided museum tours.', 1499.00, 5, 'https://images.unsplash.com/photo-1580238053495-b9720ad961c9?auto=format&fit=crop&q=80', true, 1, NOW(), NOW()),
(3, 'Japan Golden Route', 'A comprehensive 10-day tour from Tokyo to Kyoto.', 2999.00, 10, 'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?auto=format&fit=crop&q=80', true, 2, NOW(), NOW()),
(4, 'Kyoto Temples Walk', '4-day serene walking tour focusing on Kyoto''s most famous temples.', 850.00, 4, 'https://images.unsplash.com/photo-1542931287-023b922fa89b?auto=format&fit=crop&q=80', true, 2, NOW(), NOW()),
(5, 'Santorini Island Hopper', '7 days exploring Santorini and nearby islands with yacht cruises.', 2100.00, 7, 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac542?auto=format&fit=crop&q=80', true, 3, NOW(), NOW()),
(6, 'Historic Rome Tour', '5 days exploring the Colosseum, Vatican, and Roman Forum.', 1250.00, 5, 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80', true, 4, NOW(), NOW()),
(7, 'Bali Spiritual Retreat', 'Relax with yoga, meditation, and beach time in Bali over 7 days.', 1100.00, 7, 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80', true, 5, NOW(), NOW()),
(8, 'New York Highlights', 'Action-packed 4-day trip covering Manhattan''s top spots.', 1500.00, 4, 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80', true, 6, NOW(), NOW()),
(9, 'Cape Town Safari & Surf', '8 days mixing ocean views and local wildlife reserves.', 2400.00, 8, 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&q=80', true, 7, NOW(), NOW()),
(10, 'Sydney Harbor Escape', '5 days around Sydney including harbor climbs and Bondi beach.', 1600.00, 5, 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80', true, 8, NOW(), NOW()),
(11, 'Rio Carnival Experience', 'Experience the magic of Rio during carnival season (6 days).', 1800.00, 6, 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&q=80', true, 9, NOW(), NOW()),
(12, 'Istanbul Cultural Delights', '5 days touring historical sites and tasting local bazaars.', 1050.00, 5, 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&q=80', true, 10, NOW(), NOW()),
(13, 'Dubai Luxury Gateway', 'Experience the peak of luxury with this 4-day trip.', 2200.00, 4, 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80', true, 11, NOW(), NOW()),
(14, 'Inca Trail Trek', 'A challenging 7-day trek to Machu Picchu with local guides.', 1750.00, 7, 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&q=80', true, 12, NOW(), NOW()),
(15, 'Swiss Alps Ski Adventure', 'Hit the slopes with a 6-day ski package in pristine snowy peaks.', 2800.00, 6, 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80', true, 13, NOW(), NOW());
