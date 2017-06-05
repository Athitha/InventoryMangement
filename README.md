# GroceryInventoryManagementSystem

A simple Inventory Management Web Application for managing the grocery store stocks. The application has role-based views and functionalities - admin and user.

#Prerequsites 
1. Install Java environment 
2. Install Oracle MySQl 

#MySQL Setup
Run the following commands:

    ```
    Create database Inventory;
    
    create user 'admin'@'localhost' identified by 'admin';
    
    grant all on Inventory.* to 'admin'@'localhost';
    ```
#How to Run  
1. git clone the application.
2. when running for first time change the following line in `application.properties`
    
     spring.jpa.hibernate.ddl-auto=**create**
3. Run the application until the server is up.
4. After running the application for first time
    run the following statements in SQL
    ```
    revoke all on Inventory.* from 'admin'@'localhost';
    grant select, insert, delete, update on Inventory.* to 'admin'@'localhost';
    ```
5. Revert the modified line in application.properties
    spring.jpa.hibernate.ddl-auto=**none**

#Functionality Provided 
Login
Can be loggedin as Admin or User

<img width="1573" alt="login" src="https://cloud.githubusercontent.com/assets/14242897/26782513/d7895fbe-49a8-11e7-950e-26baba31df5b.png">

Background Image Source: http://www.stacksmag.net/wp-content/uploads/2012/09/grocery-store.jpg

Admin Functionalities 

1. Add item - Add new item(s) to the inventory with its associated details.

<img width="907" alt="additem" src="https://cloud.githubusercontent.com/assets/14242897/26781158/f36a7526-49a1-11e7-822e-3e10ce32aa76.png">

2. Upadte Item - Modify the details of an item.

<img width="902" alt="modify" src="https://cloud.githubusercontent.com/assets/14242897/26781176/09c8d0d8-49a2-11e7-8952-084ba43e8213.png">

3. Delete Item - Admin can delete single item by checking one single item when deleting.
4. Multiple Delete item - delete multiple items upon checking multiple items when deleting.

<img width="810" alt="delete" src="https://cloud.githubusercontent.com/assets/14242897/26781199/26346084-49a2-11e7-9a0e-fdbc2ac68c03.png">

5. View Items - View all the items in the inventory. checkout option is hidden for outof stock items.

<img width="1573" alt="adminpanel" src="https://cloud.githubusercontent.com/assets/14242897/26781218/3638e61c-49a2-11e7-9ed4-3cea7de0277f.png">

6. CheckOut Items - Decreases the quantity of an item upon checkout.

<img width="1207" alt="checkout" src="https://cloud.githubusercontent.com/assets/14242897/26781100/b90909e2-49a1-11e7-98ea-f9fca34d611f.png">


User Functionalities 
1. View Items - View all the items available in the inventory.

<img width="1580" alt="userpanel" src="https://cloud.githubusercontent.com/assets/14242897/26781132/dabaf92e-49a1-11e7-9f4e-c2216e7a769e.png">

2. Checkout Items - Decreases the quantity of an item upon checkout.

<img width="1207" alt="checkout" src="https://cloud.githubusercontent.com/assets/14242897/26781100/b90909e2-49a1-11e7-98ea-f9fca34d611f.png">


#Technologies Used 
1. Spring Application
    -Spring Data JPA - to access database.
2. Angular - UI rendering 
    - Designed using HTML, CSS, Bootstrap and Angular-UI-Bootstrap.
3. Hibernate - ORM tool for data manipulation for all the CRUD operations.
4. Database - MySQL 
