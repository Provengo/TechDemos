print("enter")
import json
from requests import post, get, delete, put

# URL = "http://localhost/"
URL= "https://master-7rqtwti-c5v7sxvquxwl4.eu-4.magentosite.cloud/"
CREDENTIALS = [
    {'username': "roni_cost@example.com", 'password': "roni_cost3@example.com"},
    {'username': "david_lowcost@example.com", 'password': "david_lowcost3@example.com"},
]
print("Connecting to magento...")
# try:
for credentials in CREDENTIALS:
    print(f'Emptying cart for {credentials["username"]}...')
    r = post(f'{URL}/rest/default/V1/integration/customer/token', params=credentials)

    if r.status_code != 200:
        print(f'Error: {r.text}')
        continue

    token = r.text[1:-1]
    header = {'Authorization': f'Bearer {token}'}

    r = get(f'{URL}/rest/default/V1/carts/mine', headers=header)
    cart = json.loads(r.text)

    if "items" in cart:
        for item in cart["items"]:
            delete(f'{URL}/rest/default/V1/carts/mine/items/{item["item_id"]}', headers=header)

# # Add products
# CREDENTIALS = {'username': "user", 'password': "bitnami1"}
# # CREDENTIALS = {'username': "user", 'password': "user123"}

# r = post(f'{URL}/rest/V1/integration/admin/token', params=CREDENTIALS)
# token = r.text[1:-1]
# header = {'Authorization': f'Bearer {token}', 'Content-Type': 'application/json'}

# for prod in ["MH07-XL-Green", "MH07-L-Green", "MS11-S-Green", "MSH03-36-Green", "WS04-M-Green", "WT06-XS-Yellow",
#              "WJ07-XS-Orange", "WJ07-M-Orange"]:
#     data = {"product": {"sku": prod, "extension_attributes": {
#         "stock_item": {"qty": 100, "stock_status_changed_auto": 0, "backorders": "1", "use_config_backorders": False}}}}

#     r = put(f'{URL}/rest/default/V1/products/{prod}', headers=header, data=json.dumps(data))

# # Reset product to original price (39$)
# prod = "WT06-XS-Yellow"
# data = {"product": {"price": "39"}}
# r = put(f'{URL}/rest/default/V1/products/{prod}', headers=header, data=json.dumps(data))

# #remove new product named "test"
# prod = 'test-men-top-tee-XS-Yellow'
# delete(f'{URL}/rest/default/V1/products/{prod}', headers=header)

