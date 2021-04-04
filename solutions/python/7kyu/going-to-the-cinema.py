# https://www.codewars.com/kata/562f91ff6a8b77dfe900006e/train/python

def movie(card_cost, ticket_price, discounted_percentage):
    with_discount = card_cost
    without_discount = 0
    movies_seen = 0
    last_discounted_price = ticket_price
    while (without_discount < with_discount):
        last_discounted_price *= discounted_percentage
        with_discount += last_discounted_price
        without_discount += ticket_price
        movies_seen += 1
    return movies_seen
