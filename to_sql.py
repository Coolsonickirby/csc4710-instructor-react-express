import random
# sourced from https://www.topshelfcomix.com/catalog/isbn-list
text = '''978-1-60309-517-4,Ashes|19.99
978-1-60309-442-9,Belzebubs|14.99
978-1-60309-542-6,Belzebubs (Vol 2): No Rest for the Wicked|19.99
978-1-60309-527-3,But You Have Friends|14.99
978-1-60309-535-8,Chester 5000 (Book 1)|19.99
978-1-60309-520-4,Cosmic Cadets (Book One): Contact!|14.99
978-1-60309-454-2,Cosmoknights (Book One)|19.99
978-1-60309-511-2,Cosmoknights (Book Two)|24.99
978-1-60309-540-2,Deja Ross Speaks to Freaks|19.99
978-1-60309-492-4,The Delicacy|24.99
978-1-60309-513-6,Doughnuts and Doom|14.99
978-1-60309-514-3,Dragon Puncher (Book 3): Dragon Puncher Punches Back|9.99
978-1-60309-546-4,Dreamover|19.99
978-1-60309-508-2,Edmund White's A Boy's Own Story: The Graphic Novel|29.99
978-1-60309-038-4,Essex County|29.95
978-1-60309-515-0,F.A.R.M. System|19.99
978-1-60309-505-1,Free Pass|19.99
UPC 827714016215 00311,From Hell: Master Edition #03 (of 10)|7.99
UPC 827714016215 00511,From Hell: Master Edition #05 (of 10)|7.99
UPC 827714016215 00711,From Hell: Master Edition #07 (of 10)|7.99
UPC 827714016215 00811,From Hell: Master Edition #08 (of 10)|7.99
UPC 827714016215 00911,From Hell: Master Edition #09 (of 10)|7.99
UPC 827714016215 01011,From Hell: Master Edition #10 (of 10)|7.99
978-1-60309-469-6,From Hell: Master Edition -- HARDCOVER |49.99
978-1-60309-344-6,The Fun Family|24.99
978-1-60309-526-6,Funny Things: A Comic Strip Biography of Charles M. Schulz |39.99
978-1-60309-504-4,Glork Patrol (Book Two): Glork Patrol Takes a Bath|9.99
978-1-60309-521-1,Glork Patrol (Book Three): Glork Patrol and the Magic Robot|9.99
978-1-891830-02-0,Hey, Mister (Vol 1): After School Special by Sickman-Garner|7.95
978-1-891830-25-9,Hey, Mister (Vol 3): The Fall Collection by S-Garner|12.95
978-1-60309-030-8,Hey, Mister: Come Hell or Highwater Pants|14.95
978-1-60309-412-2,Home Time: Under the River|24.99
978-1-60309-537-2,In Perpetuity|19.99
978-1-60309-534-1,In Utero|24.99
978-1-891830-91-4,Incredible Change-Bots One|14.95
978-1-60309-067-4,Incredible Change-Bots Two|14.95
978-1-60309-574-7,It Rhymes With Takei (HARDCOVER)|29.99
978-1-60309-575-4,It Rhymes with Takei (SIGNED & NUMBERED HARDCOVER)|99.99
978-1-60309-541-9,Jimmy's Elbow|14.99
978-1-60309-015-5,Johnny Boo (Book 2): Twinkle Power|9.95
978-1-60309-041-4,Johnny Boo (Book 3): Happy Apples|9.95
978-1-60309-084-1,Johnny Boo (Book 5): Does Something!|9.95
9781603093491,Johnny Boo (Book 6): Zooms to the Moon!|9.99
978-1-60309-384-2,Johnny Boo (Book 7): Goes Like This!|9.99
978-1-60309-503-7,Johnny Boo (Book 13): Johnny Boo Goes to School|9.99
978-1-60309-533-4,Johnny Boo (Book 14): Johnny Boo is Bored! Bored! Bored!|11.99
9781603093682,Johnny Boo Meets Dragon Puncher!|9.99
978-1-60309-385-9,Johnny Boo's Big Boo Box (Slipcase Set of Books 1-5) All ages (4-8+)|39.99
978-1-60309-500-6,Junkwraith|24.99
978-1-60309-467-2,Kodi|14.99
978-1-60309-538-9,Korgi: The Complete Tale|39.99
978-1-60309-329-3,The League of Extraordinary Gentlemen (Vol III): Century - HARDCOVER|29.95
UPC 827714014280 00211,The League of Extraordinary Gentlemen (Vol IV): The Tempest #2 (of 6)|4.99
UPC 827714014280 00311,The League of Extraordinary Gentlemen (Vol IV): The Tempest #3 (of 6)|4.99
UPC 827714014280 00411,The League of Extraordinary Gentlemen (Vol IV): The Tempest #4 (of 6)|4.99
UPC 827714014280 00511,The League of Extraordinary Gentlemen (Vol IV): The Tempest #5 (of 6)|4.99
UPC 827714014280 00611,The League of Extraordinary Gentlemen (Vol IV): The Tempest #6 (of 6)|4.99
978-1-60309-496-2,The League of Extraordinary Gentlemen (Vol IV): The Tempest (TPB)|19.99
978-1-60309-456-6,The League of Extraordinary Gentlemen (Vol IV): The Tempest -- HARDCOVER|29.99
978-1-60309-528-0,Lisa Cheese and Ghost Guitar (Book 1): Attack of the Snack|19.99
978-1-60309-436-8,Lost Girls (Expanded Edition)|49.99
978-1-60309-557-0,Love Languages|19.99
978-1-60309-506-8,Loved and Lost: A Relationship Trilogy|29.99
978-1-60309-552-5,Low Orbit|24.99
978-1-60309-395-8,March (Trilogy Slipcase Set)|49.99
978-1-60309-300-2,March: Book One|14.95
978-1-60309-402-3,March: Book Three|19.99
978-1-60309-396-5,March: Book Three -- HARDCOVER|29.99
978-1-60309-536-5,Mary Tyler MooreHawk|29.99
978-1-60309-491-7,Monster on the Hill (Expanded Edition)|19.95
978-1-60309-550-1,The Moon and Serpent Bumper Book of Magic|49.99
978-1-60309-274-6,Nemo: Heart of Ice|14.95
978-1-60309-355-2,Nemo: River of Ghosts|14.95
978-1-60309-320-0,Nemo: The Roses of Berlin|14.95
978-1-60309-489-4,Onion Skin|14.99
978-1-60309-510-5,Order of the Night Jay (Book 1): The Forest Beckons|14.99
978-1-60309-377-4,Our Expanding Universe|19.99
978-1-60309-481-8,Parenthesis|19.99
978-1-60309-512-9,Radical: My Year with a Socialist Senator|24.99
978-1-60309-501-3,Red Panda & Moon Bear (Book Two): The Curse of the Evil Eye|14.99
978-1-60309-413-9,Return of the Dapper Men (Deluxe Edition)|34.99
978-1-60309-490-0,Rivers|19.99
978-1-60309-531-0,Rose Wolves (Book 1)|14.99
978-1-60309-524-2,The Second Fake Death of Eddie Campbell & The Fate of the Artist [FLIP HARDCOVER]|29.99
978-1-60309-499-3,Secret Passages|19.99
978-1-60309-548-8,Shadowplay (Book 1): Midnight School|24.99
978-1-60309-522-8,Shelley Frankenstein! (Book One): CowPiggy|14.99
978-1-60309-547-1,Shred or Dead|19.99
978-1-60309-519-8,Skull Cat (Book One): Skull Cat and the Curious Castle|14.99
978-1-60309-543-3,Space Junk|19.99
978-1-60309-516-7,Super Trash Clash|14.99
9781684050895,Superf*ckers Forever|17.99
978-1-60309-411-5,Surfside Girls (Book One): The Secret of Danger Point|14.99
978-1-60309-447-4,Surfside Girls (Book Two): The Mystery at the Old Rancho|14.99
978-1-60309-494-8,The Science of Surfing: A Surfside Girls Guide to the Ocean |9.99
978-1-60309-529-7,Surfside Girls (Book 4): The Clue in the Reef |19.99
978-1-60309-045-2,The Surrogates Owner's Manual|39.95
978-1-60309-450-4,They Called Us Enemy|19.99
978-1-60309-470-2,They Called Us Enemy: Expanded Hardcover Edition|29.99
978-0-9801023-3-8,Tonoharu (Part Two)|19.95
978-0-9801023-1-4,Tonoharu (Part Three)|24.95
978-1-60309-544-0,Undergrowth|24.99
978-1-60309-392-7,The Underwater Welder - HARDCOVER|29.99
978-1-60309-398-9,The Underwater Welder - SIGNED & NUMBERED HARDCOVER|49.99
978-1-60309-074-2,The Underwater Welder|19.95
978-1-60309-523-5,The Unpetables (Book 1)|9.99
978-1-60309-545-7,The Unpetables (Book 2): Unpetable in the City|9.99
978-1-60309-035-3,Voice of the Fire by Alan Moore with José Villarrubia|14.95
978-1-60309-507-5,Voice of the Fire (25th Anniversary Edition)|14.99
978-1-60309-549-5,The Well|29.99
978-1-60309-530-3,What If We Were… (Book 2)|14.99
978-1-60309-539-6,Wolfpitch|19.99
978-1-60309-532-7,You Wish (Book 1)|14.99
978-1-60309-553-2,You Wish (Book 2): Wishborn|14.99
978-1-60309-570-9,Cosmic Cadets (Book 2): Accused!|14.99
978-1-60309-568-6,F.A.R.M. System (Book 2): Rage|19.99
978-1-60309-582-2,Home Time: Twelve Days|39.99
978-1-60309-558-7,Ionheart|24.99
978-1-60309-554-9,Karmopolis (Book 1): The Land of Cars|14.99
978-1-60309-555-6,The Land of Unfinished Dreams|19.99
978-1-60309-584-6,Lisa Cheese and Ghost Guitar (Book 2): The Rock God Complex|19.99
978-1-60309-580-8,Luna Express|19.99
978-1-60309-560-0,More Weight: A Salem Story|39.99
978-1-60309-562-4,Order of the Night Jay (Book 2): The River Rises|14.99
978-1-60309-572-3,Pig Wife|34.99
978-1-60309-564-8,Psychic Investigators|Evil Exterminators|14.99
978-1-60309-581-5,Pup Pup Is the Boss of the Stars|24.99
978-1-60309-569-3,Rose Wolves (Book 2): Out of the Blue|14.99
978-1-60309-561-7,Spoops: The Little Spirits of Halloween|14.99
978-1-60309-585-3,The Shadower|19.99
978-1-60309-579-2,Token City Wondercade: Season One|14.99
978-1-60309-518-1,Transitions: A Mother's Journey|19.99
978-1-60309-567-9,Where There's Smoke, There's Dinner: Confessions of a Cartoonist Cook|19.99'''.split('\n')

queries = []

query_template = "INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE ('%s', '%s', %s, %s, %s);"

for line in text:
    line = line.strip()
    data = line.split(',', 1)
    isbn = data[0]
    name = data[1][:data[1].rindex('|')].replace("'", "''")
    price = data[1][data[1].rindex('|') + 1:]
    
    queries.append(query_template % (name, isbn, price, random.randrange(0, 87), random.randrange(1983, 2025)))

print('\n'.join(queries))