DELIMITER //
CREATE PROCEDURE update_articles()
BEGIN
    DECLARE counter INT DEFAULT 72;

    WHILE counter <= 150 DO
        update articles set created_at = title where id = counter; 
        SET counter = counter + 1;
    END WHILE;
END //
DELIMITER ;
