GRANT ALL PRIVILEGES ON *.* TO shorten IDENTIFIED BY '' WITH GRANT OPTION;

CREATE TABLE shorten_urls
(id             BIGINT PRIMARY KEY AUTO_INCREMENT,
 long_url       VARCHAR(100) UNIQUE NOT NULL COLLATE utf8_bin);

INSERT INTO shorten_urls (long_url) VALUES 'http://okamuuu.hatenablog.com/';

