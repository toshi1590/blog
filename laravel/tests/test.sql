DELIMITER //
CREATE PROCEDURE Insert100Records()
BEGIN
    DECLARE counter INT DEFAULT 1;

    WHILE counter <= 100 DO
        INSERT INTO categories (name)
        VALUES (counter); -- ここに実際の値を指定

        SET counter = counter + 1;
    END WHILE;
END //
DELIMITER ;
