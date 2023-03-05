# Petsy
Check out the live version here: [Petsy](https://petsy-tpgv.onrender.com)
Petsy is a clone of the popular e-commerce website Etsy, with a focus on pet-related products. The backend of this application was built using flask and SQLAlchemy with a PostgresSQL database.  The frontend is rendered using React with Redux to manage the data. Visit the project's wiki page [here](https://github.com/ajtravis/Petsy/wiki) to see a more information on the database design and the overall structure of the app.

## Current Features
_This is a list of features that currently exist on the live site_
### User Authentication
* Users can create an account by inputing an email address, name, and password.
* Users can securely log in and out of their account using email and passwords credentials.
### Product Listings
* The home page contains a list of products available on the site displaying a preview image, name of the product, and the product's price.

* Clicking on a product will bring users to the product's page where they can find more information on the specific product.

* Users that are logged in can create their own product listings via the "List a Product" button on the profile dropdown.

* Users can view a their product listings by clicking on the "My Listings" button on the profile dropdown.

* When on the "/my-products" page users can edit or delete products that they have listed.

### Shopping Cart
* Users can add a product to their cart by clicking the "Add to cart" button on the product details page.

* Users can view the items in their cart and the cart total by clicking the shopping cart icon next to the profile button.

* When viewing their cart, users can edit the quantity of each item in their cart or remove an item from their cart entirely.

* Users can checkout their shopping cart by clicking the checkout button.

## Feature Queue
*This is a list of features in the process of being implemented or planned for the future. Features will be implemented in order from the top down.*

### Improved Order Handling
* When checking out, users can enter their payment and shipping information.
* Users can view their past orders.

### Product Image Rework
* Users can upload multiple images for their listings.
* Users can upload photos from their computer via AWS services.

### Reviews
* Users can create/edit/delete reviews for products that they have purchased.
* Reviews and average rating will be displayed on the product page.

### Categories
* Products can be listed in different catagories.
* Product listings can be filtered by catagory for easier browsing.

### Favorites
* Users can select products to add to their list of favorites.
* Users can view their favorite list via the profile dropdown.

### Search Bar
* Users can search for a product either by name or category.
