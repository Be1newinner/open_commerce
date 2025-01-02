# This file is for Constants regarding to Database Interactions.

from enum import Enum

class COLLECTIONS(str, Enum):
    PRODUCTS = "products"
    USERS = "users"
    ORDERS = "orders"
    VENDORS = "vendors"
    CATEGORIES = "categories"


