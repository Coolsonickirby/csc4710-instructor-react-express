import random
from datetime import timedelta, datetime

def random_date(start, end):
    """
    This function will return a random datetime between two datetime 
    objects.
    """
    delta = end - start
    int_delta = (delta.days * 24 * 60 * 60) + delta.seconds
    random_second = random.randrange(int_delta)
    return start + timedelta(seconds=random_second)

d1 = datetime.strptime('1/1/2000 1:30 PM', '%m/%d/%Y %I:%M %p')
d2 = datetime.strptime('1/1/2025 4:50 AM', '%m/%d/%Y %I:%M %p')

query_template = "INSERT INTO `order` (`OrderID`, `OrderDate`, `TotalAmount`, `CustomerID`) VALUE (%d, '%s', %.2f, %d);"

for x in range(6000):
    date = str(random_date(d1, d2)).split(' ')[0]
    totalAmnt = random.uniform(5.00, 9530.99)
    customerID = random.randrange(1, 6)
    print(query_template % (x + 1, date, totalAmnt, customerID))
