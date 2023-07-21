**Entities**:

-User
-Product
-Category
-Order
-OrderItem

**Attributes**:

-User

- user_id (Primary Key)
- username
- email
- password
- first_name
- last_name
- address
- phone

-Product

- product_id (Primary Key)
- name
- description
- price
- image_url
- stock_quantity

-Category

- category_id (Primary Key)
- name

-Order

- order_id (Primary Key)
- user_id (Foreign Key to User)
- order_date
- total_amount

-OrderItem

- order_item_id (Primary Key)
- order_id (Foreign Key to Order)
- product_id (Foreign Key to Product)
- quantity

**Relationships**:

- User to Order (One-to-Many): A user can have multiple orders, but an order belongs to only one user.
- Product to Category (Many-to-One): A product can belong to only one category, but a category can have multiple products.
- Order to OrderItem (One-to-Many): An order can have multiple order items, but an order item belongs to only one order.
- Product to OrderItem (One-to-Many): A product can be part of multiple order items, but an order item belongs to only one product.

**Constraints**:

- Primary Keys: Each entity will have a primary key that uniquely identifies each record in the table.
- Foreign Keys: Foreign keys will be used to establish relationships between different tables.
- Constraints on Quantity: The stock_quantity attribute in the Product table will have constraints to ensure it cannot be negative.
- Constraints on Price: The price attribute in the Product table will have constraints to ensure it cannot be negative.
