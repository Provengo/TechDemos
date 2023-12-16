import requests

# Base URL of the Magento site
URL = "https://master-7rqtwti-c5v7sxvquxwl4.eu-4.magentosite.cloud/"

# User credentials
CREDENTIALS = [
    {'username': "roni_cost@example.com", 'password': "roni_cost3@example.com"},
    {'username': "david_lowcost@example.com", 'password': "david_lowcost3@example.com"},
]

def empty_cart(session, credentials):
    """Empty the cart for a given user."""

    print(f'Emptying cart for {credentials["username"]}...')
    
    # Authenticate the user and get a token
    r = session.post(f'{URL}/rest/default/V1/integration/customer/token', params=credentials)

    # If authentication fails, print an error message and return
    if r.status_code != 200:
        print(f'Error: {r.text}')
        return

    # Extract the token from the response
    token = r.text[1:-1]
    # Update the session headers with the token
    session.headers.update({'Authorization': f'Bearer {token}'})

    # Get the current user's shopping cart
    r = session.get(f'{URL}/rest/default/V1/carts/mine')
    cart = r.json()

    # If the cart has items, remove each item
    if "items" in cart:
        for item in cart["items"]:
            session.delete(f'{URL}/rest/default/V1/carts/mine/items/{item["item_id"]}')

# Create a new session
with requests.Session() as session:
    # Empty the cart for each user
    for credentials in CREDENTIALS:
        empty_cart(session, credentials)