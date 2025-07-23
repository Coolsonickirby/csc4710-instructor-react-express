
# CSC4710 Instructor Full Stack Project (Modified for BookNest)

A full stack web application designed for teaching and demonstration purposes in **CSC4710 (Database Systems)**. This project consists of a **React.js frontend** and an **Express.js + MySQL backend**. It showcases how to build and connect a dynamic user interface with a database-powered API.

GitHub Repo: [https://github.com/Coolsonickirby/csc4710-instructor-react-express](https://github.com/Coolsonickirby/csc4710-instructor-react-express)

---

## 📌 Project Description

This application serves as a **BookNest Customer System** and **BookNest Inventory System**, where customers can:
- Look at avaliable books
- Search for books by title and price
- Add books to cart
- Change Quantity of amount of books to order
- Place order
- Look at Order History


and where admins can:

- Create new book entries
- View all book records
- Fetch individual book details by ID
- Search for books by title
- Modify book record
- Delete book records

The backend provides **RESTful API endpoints** built with **Express**, which interacts with a **MySQL database**. The frontend, developed with **React** and powered by **Vite**, consumes these APIs and displays dynamic data.

---

Run the following SQL
```sql
-- Create the database
CREATE DATABASE throwaway;

-- Use the database
USE throwaway;

CREATE TABLE IF NOT EXISTS `admins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE IF NOT EXISTS `customers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(500) NOT NULL,
  `email` varchar(500) NOT NULL,
  `password` varchar(1024) NOT NULL,
  `shipping_address` varchar(500) NOT NULL,
  `phone` varchar(500) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `order` (
  `OrderID` int NOT NULL AUTO_INCREMENT,
  `OrderDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `TotalAmount` decimal(10,2) DEFAULT NULL,
  `CustomerID` int DEFAULT NULL,
  PRIMARY KEY (`OrderID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `orderdata` (
  `id` int NOT NULL AUTO_INCREMENT,
  `BookID` int NOT NULL,
  `BookPrice` double NOT NULL,
  `OrderID` int NOT NULL,
  `quantityOrdered` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Create the students table
CREATE TABLE `books` (
	`id` INT(10) NOT NULL AUTO_INCREMENT,
	`title` VARCHAR(500) NOT NULL COLLATE 'utf8mb3_general_ci',
	`isbn` VARCHAR(500) NOT NULL COLLATE 'utf8mb3_general_ci',
	`price` DOUBLE NOT NULL DEFAULT '0',
	`current_stock` INT(10) NOT NULL DEFAULT '0',
	`publication_year` INT(10) NOT NULL,
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='utf8mb3_general_ci'
ENGINE=InnoDB
AUTO_INCREMENT=1;

-- Password = password
INSERT INTO `admins` (`username`, `password`) VALUES ('admin', '$2b$08$ojphL3EjcG.Y.ZWG3n9Sv.jGj4Ctg4W9pnLDGWcO2MxbQEvWxxN3a');

-- Data sourced from https://www.topshelfcomix.com/catalog/isbn-list
-- Insert records into books
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Ashes', '978-1-60309-517-4', 19.99, 77, 2017);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Belzebubs', '978-1-60309-442-9', 14.99, 71, 1985);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Belzebubs (Vol 2): No Rest for the Wicked', '978-1-60309-542-6', 19.99, 78, 1994);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('But You Have Friends', '978-1-60309-527-3', 14.99, 53, 2000);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Chester 5000 (Book 1)', '978-1-60309-535-8', 19.99, 40, 1991);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Cosmic Cadets (Book One): Contact!', '978-1-60309-520-4', 14.99, 19, 2010);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Cosmoknights (Book One)', '978-1-60309-454-2', 19.99, 37, 2002);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Cosmoknights (Book Two)', '978-1-60309-511-2', 24.99, 39, 2002);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Deja Ross Speaks to Freaks', '978-1-60309-540-2', 19.99, 83, 2024);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('The Delicacy', '978-1-60309-492-4', 24.99, 52, 2024);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Doughnuts and Doom', '978-1-60309-513-6', 14.99, 83, 2001);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Dragon Puncher (Book 3): Dragon Puncher Punches Back', '978-1-60309-514-3', 9.99, 34, 2011);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Dreamover', '978-1-60309-546-4', 19.99, 31, 1988);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Edmund White''s A Boy''s Own Story: The Graphic Novel', '978-1-60309-508-2', 29.99, 4, 2017);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Essex County', '978-1-60309-038-4', 29.95, 74, 1994);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('F.A.R.M. System', '978-1-60309-515-0', 19.99, 77, 2004);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Free Pass', '978-1-60309-505-1', 19.99, 61, 2013);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('From Hell: Master Edition #03 (of 10)', 'UPC 827714016215 00311', 7.99, 84, 2015);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('From Hell: Master Edition #05 (of 10)', 'UPC 827714016215 00511', 7.99, 65, 2021);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('From Hell: Master Edition #07 (of 10)', 'UPC 827714016215 00711', 7.99, 80, 2012);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('From Hell: Master Edition #08 (of 10)', 'UPC 827714016215 00811', 7.99, 44, 1988);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('From Hell: Master Edition #09 (of 10)', 'UPC 827714016215 00911', 7.99, 21, 2008);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('From Hell: Master Edition #10 (of 10)', 'UPC 827714016215 01011', 7.99, 61, 1989);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('From Hell: Master Edition -- HARDCOVER ', '978-1-60309-469-6', 49.99, 0, 1985);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('The Fun Family', '978-1-60309-344-6', 24.99, 31, 1985);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Funny Things: A Comic Strip Biography of Charles M. Schulz ', '978-1-60309-526-6', 39.99, 17, 2005);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Glork Patrol (Book Two): Glork Patrol Takes a Bath', '978-1-60309-504-4', 9.99, 11, 2001);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Glork Patrol (Book Three): Glork Patrol and the Magic Robot', '978-1-60309-521-1', 9.99, 75, 2019);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Hey, Mister (Vol 1): After School Special by Sickman-Garner', '978-1-891830-02-0', 7.95, 77, 2016);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Hey, Mister (Vol 3): The Fall Collection by S-Garner', '978-1-891830-25-9', 12.95, 65, 2007);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Hey, Mister: Come Hell or Highwater Pants', '978-1-60309-030-8', 14.95, 38, 2001);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Home Time: Under the River', '978-1-60309-412-2', 24.99, 23, 2013);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('In Perpetuity', '978-1-60309-537-2', 19.99, 34, 2010);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('In Utero', '978-1-60309-534-1', 24.99, 21, 1994);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Incredible Change-Bots One', '978-1-891830-91-4', 14.95, 85, 1994);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Incredible Change-Bots Two', '978-1-60309-067-4', 14.95, 8, 1990);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('It Rhymes With Takei (HARDCOVER)', '978-1-60309-574-7', 29.99, 38, 1990);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('It Rhymes with Takei (SIGNED & NUMBERED HARDCOVER)', '978-1-60309-575-4', 99.99, 11, 2014);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Jimmy''s Elbow', '978-1-60309-541-9', 14.99, 43, 2008);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Johnny Boo (Book 2): Twinkle Power', '978-1-60309-015-5', 9.95, 40, 2014);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Johnny Boo (Book 3): Happy Apples', '978-1-60309-041-4', 9.95, 26, 1996);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Johnny Boo (Book 5): Does Something!', '978-1-60309-084-1', 9.95, 57, 1992);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Johnny Boo (Book 6): Zooms to the Moon!', '9781603093491', 9.99, 36, 2005);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Johnny Boo (Book 7): Goes Like This!', '978-1-60309-384-2', 9.99, 66, 1995);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Johnny Boo (Book 13): Johnny Boo Goes to School', '978-1-60309-503-7', 9.99, 70, 2004);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Johnny Boo (Book 14): Johnny Boo is Bored! Bored! Bored!', '978-1-60309-533-4', 11.99, 66, 1988);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Johnny Boo Meets Dragon Puncher!', '9781603093682', 9.99, 25, 2023);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Johnny Boo''s Big Boo Box (Slipcase Set of Books 1-5) All ages (4-8+)', '978-1-60309-385-9', 39.99, 16, 1994);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Junkwraith', '978-1-60309-500-6', 24.99, 36, 1993);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Kodi', '978-1-60309-467-2', 14.99, 63, 1990);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Korgi: The Complete Tale', '978-1-60309-538-9', 39.99, 73, 2019);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('The League of Extraordinary Gentlemen (Vol III): Century - HARDCOVER', '978-1-60309-329-3', 29.95, 1, 2019);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('The League of Extraordinary Gentlemen (Vol IV): The Tempest #2 (of 6)', 'UPC 827714014280 00211', 4.99, 75, 2018);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('The League of Extraordinary Gentlemen (Vol IV): The Tempest #3 (of 6)', 'UPC 827714014280 00311', 4.99, 82, 1985);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('The League of Extraordinary Gentlemen (Vol IV): The Tempest #4 (of 6)', 'UPC 827714014280 00411', 4.99, 35, 2000);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('The League of Extraordinary Gentlemen (Vol IV): The Tempest #5 (of 6)', 'UPC 827714014280 00511', 4.99, 79, 1983);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('The League of Extraordinary Gentlemen (Vol IV): The Tempest #6 (of 6)', 'UPC 827714014280 00611', 4.99, 3, 2024);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('The League of Extraordinary Gentlemen (Vol IV): The Tempest (TPB)', '978-1-60309-496-2', 19.99, 13, 2016);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('The League of Extraordinary Gentlemen (Vol IV): The Tempest -- HARDCOVER', '978-1-60309-456-6', 29.99, 36, 1984);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Lisa Cheese and Ghost Guitar (Book 1): Attack of the Snack', '978-1-60309-528-0', 19.99, 12, 1999);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Lost Girls (Expanded Edition)', '978-1-60309-436-8', 49.99, 9, 2024);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Love Languages', '978-1-60309-557-0', 19.99, 36, 1992);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Loved and Lost: A Relationship Trilogy', '978-1-60309-506-8', 29.99, 69, 1987);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Low Orbit', '978-1-60309-552-5', 24.99, 76, 2008);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('March (Trilogy Slipcase Set)', '978-1-60309-395-8', 49.99, 13, 2002);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('March: Book One', '978-1-60309-300-2', 14.95, 39, 2014);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('March: Book Three', '978-1-60309-402-3', 19.99, 10, 2002);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('March: Book Three -- HARDCOVER', '978-1-60309-396-5', 29.99, 31, 2011);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Mary Tyler MooreHawk', '978-1-60309-536-5', 29.99, 18, 2014);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Monster on the Hill (Expanded Edition)', '978-1-60309-491-7', 19.95, 31, 2012);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('The Moon and Serpent Bumper Book of Magic', '978-1-60309-550-1', 49.99, 30, 1985);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Nemo: Heart of Ice', '978-1-60309-274-6', 14.95, 61, 1995);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Nemo: River of Ghosts', '978-1-60309-355-2', 14.95, 39, 2012);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Nemo: The Roses of Berlin', '978-1-60309-320-0', 14.95, 75, 1997);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Onion Skin', '978-1-60309-489-4', 14.99, 17, 2000);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Order of the Night Jay (Book 1): The Forest Beckons', '978-1-60309-510-5', 14.99, 22, 2014);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Our Expanding Universe', '978-1-60309-377-4', 19.99, 25, 2008);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Parenthesis', '978-1-60309-481-8', 19.99, 72, 2023);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Pinocchio, Vampire Slayer (Vol. 2): The Great Puppet Theater', '9781603093255', TBD, 26, 2005);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Radical: My Year with a Socialist Senator', '978-1-60309-512-9', 24.99, 11, 2016);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Red Panda & Moon Bear (Book Two): The Curse of the Evil Eye', '978-1-60309-501-3', 14.99, 1, 1987);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Return of the Dapper Men (Deluxe Edition)', '978-1-60309-413-9', 34.99, 1, 2016);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Rivers', '978-1-60309-490-0', 19.99, 15, 2011);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Rose Wolves (Book 1)', '978-1-60309-531-0', 14.99, 77, 2004);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('The Second Fake Death of Eddie Campbell & The Fate of the Artist [FLIP HARDCOVER]', '978-1-60309-524-2', 29.99, 41, 1994);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Secret Passages', '978-1-60309-499-3', 19.99, 35, 2011);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Shadowplay (Book 1): Midnight School', '978-1-60309-548-8', 24.99, 12, 2004);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Shelley Frankenstein! (Book One): CowPiggy', '978-1-60309-522-8', 14.99, 15, 2005);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Shred or Dead', '978-1-60309-547-1', 19.99, 64, 1993);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Skull Cat (Book One): Skull Cat and the Curious Castle', '978-1-60309-519-8', 14.99, 81, 2016);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Space Junk', '978-1-60309-543-3', 19.99, 3, 2020);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Super Trash Clash', '978-1-60309-516-7', 14.99, 25, 2006);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Superf*ckers Forever', '9781684050895', 17.99, 28, 1992);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Surfside Girls (Book One): The Secret of Danger Point', '978-1-60309-411-5', 14.99, 25, 1983);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Surfside Girls (Book Two): The Mystery at the Old Rancho', '978-1-60309-447-4', 14.99, 57, 2020);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('The Science of Surfing: A Surfside Girls Guide to the Ocean ', '978-1-60309-494-8', 9.99, 44, 1986);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Surfside Girls (Book 4): The Clue in the Reef ', '978-1-60309-529-7', 19.99, 50, 1996);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('The Surrogates Owner''s Manual', '978-1-60309-045-2', 39.95, 51, 2008);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('The Surrogates: Case Files #1', '978-1-60309-258-6', TBD, 59, 2024);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('They Called Us Enemy', '978-1-60309-450-4', 19.99, 42, 2007);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('They Called Us Enemy: Expanded Hardcover Edition', '978-1-60309-470-2', 29.99, 64, 2018);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Tonoharu (Part Two)', '978-0-9801023-3-8', 19.95, 83, 1993);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Tonoharu (Part Three)', '978-0-9801023-1-4', 24.95, 19, 2012);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Undergrowth', '978-1-60309-544-0', 24.99, 39, 2019);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('The Underwater Welder - HARDCOVER', '978-1-60309-392-7', 29.99, 27, 1989);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('The Underwater Welder - SIGNED & NUMBERED HARDCOVER', '978-1-60309-398-9', 49.99, 71, 2024);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('The Underwater Welder', '978-1-60309-074-2', 19.95, 47, 1985);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('The Unpetables (Book 1)', '978-1-60309-523-5', 9.99, 9, 1993);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('The Unpetables (Book 2): Unpetable in the City', '978-1-60309-545-7', 9.99, 77, 2024);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Voice of the Fire by Alan Moore with JosΘ Villarrubia', '978-1-60309-035-3', 14.95, 41, 1993);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Voice of the Fire (25th Anniversary Edition)', '978-1-60309-507-5', 14.99, 64, 1984);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('The Well', '978-1-60309-549-5', 29.99, 81, 1989);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('What If We Wereà (Book 2)', '978-1-60309-530-3', 14.99, 2, 1998);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Wolfpitch', '978-1-60309-539-6', 19.99, 59, 2002);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('You Wish (Book 1)', '978-1-60309-532-7', 14.99, 54, 1986);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('You Wish (Book 2): Wishborn', '978-1-60309-553-2', 14.99, 84, 2018);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Cosmic Cadets (Book 2): Accused!', '978-1-60309-570-9', 14.99, 58, 1988);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('F.A.R.M. System (Book 2): Rage', '978-1-60309-568-6', 19.99, 45, 1996);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Home Time: Twelve Days', '978-1-60309-582-2', 39.99, 22, 2021);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Ionheart', '978-1-60309-558-7', 24.99, 65, 2014);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Karmopolis (Book 1): The Land of Cars', '978-1-60309-554-9', 14.99, 51, 2020);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('The Land of Unfinished Dreams', '978-1-60309-555-6', 19.99, 34, 2014);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Lisa Cheese and Ghost Guitar (Book 2): The Rock God Complex', '978-1-60309-584-6', 19.99, 11, 2019);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Luna Express', '978-1-60309-580-8', 19.99, 38, 2001);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('More Weight: A Salem Story', '978-1-60309-560-0', 39.99, 23, 2024);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Order of the Night Jay (Book 2): The River Rises', '978-1-60309-562-4', 14.99, 25, 2017);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Pig Wife', '978-1-60309-572-3', 34.99, 80, 1989);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Psychic Investigators|Evil Exterminators', '978-1-60309-564-8', 14.99, 16, 2021);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Pup Pup Is the Boss of the Stars', '978-1-60309-581-5', 24.99, 33, 2021);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Rose Wolves (Book 2): Out of the Blue', '978-1-60309-569-3', 14.99, 84, 1985);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Spoops: The Little Spirits of Halloween', '978-1-60309-561-7', 14.99, 37, 1996);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('The Shadower', '978-1-60309-585-3', 19.99, 37, 2014);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Token City Wondercade: Season One', '978-1-60309-579-2', 14.99, 80, 2015);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Transitions: A Mother''s Journey', '978-1-60309-518-1', 19.99, 73, 2016);
INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('Where There''s Smoke, There''s Dinner: Confessions of a Cartoonist Cook', '978-1-60309-567-9', 19.99, 60, 1998);
```
###  Install tools

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/atahabilder1/csc4710-instructor-react-express.git
cd csc4710-instructor-react-express
```

---

### 2️⃣ Backend Setup (`/Backend`)

```bash
cd Backend
npm install
```

🛠 This installs:
- Express
- MySQL
- Cors
- Nodemon

🔌 Then configure your `mysql.createConnection()` in `server.js` to match your local DB setup.

#### Run the Backend Server:

```bash
npm start
```

The server will run at: [http://localhost:8081](http://localhost:8081)

---

### 3️⃣ Frontend Setup (`/Frontend`)

```bash
cd ../Frontend
npm install
```

🛠 This installs:
- React
- Vite
- React DOM

#### Run the Frontend App:

```bash
npm run dev
```

The frontend will run at: [http://localhost:5173](http://localhost:5173)

---

## 🔗 API Endpoints

| Endpoint                    | Method | Description                |
|-----------------------------|--------|----------------------------|
| `/`                         | GET    | Welcome message            |
| `/books`                    | GET    | List all books             |
| `/books`                    | POST   | Create new book            |
| `/books/:id`                | GET    | Get a book by ID           |
| `/books/:id`                | PUT    | Update book by ID          |
| `/books/:id`                | DELETE | Delete book by ID          |
| `/books/search/:title`      | GET    | Search for books by title  |
| `/customers/login`          | POST   | Log in for Customer        |
| `/customer/register`        | POST   | Register Customer to DB    |
| `/customer/order`           | POST   | Place order for Customer   |
| `/customer/getOrderHistory` | POST   | Get Customer Order History |
| `/admin/login`              | POST   | Log in for Admin           |



---

## 📂 Folder Structure

```
csc4710-instructor-react-express/
│
├── Backend/
│   ├── admins.js
│   ├── books.js
│   ├── customers.js
│   ├── server.js
│   ├── package.json
│
├── Frontend/
│   ├── src/
│       ├── Admin/
│           ├── AdminLogin.jsx
│       ├── Customer/
│           ├── CustomerLogin.jsx
│           ├── CustomerRegistration.jsx
│           ├── CustomerShop.jsx
|       ├── BooksDatabase.jsx
|       ├── Logout.jsx
|       ├── main.jsx
│   ├── index.html
│   ├── package.json
│
└── README.md
```

---
### Specific file location guidance for implementing each CRUD endpoint and its frontend/backend/database responsibilities

## 📜 License

This project is open-source for educational use under the [MIT License](LICENSE).