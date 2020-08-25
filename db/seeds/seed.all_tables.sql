TRUNCATE TABLE
        users,
        favorites RESTART IDENTITY;

INSERT INTO users (username, password, created_at, updated_at)
VALUES
        ('username1', '$2y$12$hkr.jqPPg1xSvTM/evga1u6rFP.rp0Uf8Ni.8xFwaVJhYyzhXtdcq', now(), now()),
        ('username2', '$2y$12$MISYeTy1U7UdUl7FtqQlouoIXQYfIMbetrD0fxgZ534kTNtHQMe/K', now(), now()),
        ('username3', '$2y$12$wLiigvNyKTAIxVvaU5MwO.v7z55id76R3uVoZD88Pfv4ovpUKCdhu', now(), now());

INSERT INTO favorites (user_id, hero, added_at)
VALUES
        (1, 5, now()),
        (1, 20, now()),
        (2, 10, now()),
        (2, 19, now()),
        (3, 51, now()),
        (3, 14, now());