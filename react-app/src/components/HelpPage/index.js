export default function HelpPage(){
    return(
        <div>
        <h3>About</h3>
        <p>Welcome to Petsy! Note: this project is purely for educational purposes.
            I worked on this project in order to practice my skills as a web developer. It functions
            similar to etsy and other e-commerce sites with a focus on pet-related products.
            Please read below for a brief description on how to navigate through the site. Please note that this
            site is not yet finished, and more features will be added in the near future. I hope that you
            have as much fun exploring this site as I had working on it!
        </p>
        <h3>User signup/login</h3>
        <p>When you arrive at the site, you can click on the profile icon to see a dropdown
            of options. Many features require you to be logged in as a user in order to use them.
            As a first time user you can either click the sign up option to create an account, or the
            demo user button in order to log-in to an account created for demonstration/testing purposes.
            If you have an account, you can sign in by clicking the log in button and inputting your
            username and password.
        </p>
        <h3>Home Page/Product details</h3>
        <p>When you first arrive on the site, the home page contains a list of all the products available.
            Visitors can return to the home page at any time by clicking the icon on the left side of the nav bar.
            Visitors can click on a product image in order to go to a page showing more details about the
            selected product. Users that are signed in can click the "add to cart" button on this page to add it to their cart.
        </p>
        <h3>Listing A Product</h3>
        <p>Users who are logged in can list their own products by clicking the "list a product"
            option under the profile dropdown. Under the profile dropdown menu, users can also
            view the items that they have listed by clicking the "My Products" option.
            From this page users can edit or delete products that they have listed.
        </p>
        <h3>Shopping Cart</h3>
        <p>Users can click the shopping cart icon to view the items that are in their cart, as well as the total price of items in the cart.
            On this page the user has the option of changing the quantity of an item in there cart
            by selecting the desired quantity from the dropdown menu then clicking the update button.
            Users can remove an item from their cart by clicking the remove button.
            Clicking the "checkout" button allows users to checkout the items that are in the cart, closing out the order and redirecting users to the home page.
        </p>
        </div>
    )
}
