# SBA 320: React Web Application

## Project: GadgetShack (Frontend Layer)

**Brief Description:**
I decided to continue with my "GadgetShack" theme (from my previous sba 307, 316, 318, and 319 projects); my plan is to have it as my final capstone project. in the previous sba 319, i created the backend with a real mongodb database. now, i am building the frontend layer using **React**. my goal was to create a fully reactive single page application (SPA) where users can browse products, filter them, add them to a shopping cart, and simulate a checkout. right now i am using the same api i used in previous sbas (dummyjson.com) to fetch products and kind of simulate the database, but i will connect this exact react frontend to my sba 319 mongodb backend for a complete mern stack app for my capstone project.

# Technology Used

* **React** 
* **React Router DOM** 
* **Context API and useReducer:**  for global state management. 
* **Axios:** i used this to handle my ajax network requests.
* **React-Cookie:** i used this to create a fake authentication logic. when a user logs in, it drops a fake jwt token in their browser so the app remembers who they are and lets them into the admin dashboard.
* **CSS:** i reused my styling theme from **SBA 319** (dark blue and orange) to keep the look consistent across all my projects.

# Features and Requirement List

I checked the requirement list one by one and implemented them in my code. here is the logic i used for each feature:

1. **Modularization using componenets:**
    * in my previous sbas, i had these massive html files. in this project, i focused on modularization and created multiple reusable components. for example, i built a `NavBar.jsx` and a `ProductCard.jsx`. instead of copying and pasting product html 30 times, i just pass the data as a prop into `<ProductCard product={item} />` and react generates them dynamically.

2. **Routing and Protection:**
    * **react-router-dom:** i used `<BrowserRouter>`, `<Routes>`, and `<Route>` from react-router-dom to set up all my page navigation. 
    * **useParams:** i built dynamic routing using the `useParams` hook. so when a user clicks on a product, they go to `/shop/:id`, and my component takes that specific id from the url to fetch the right product details.
    * **Protected Routes:** i didn't want just anyone accessing the admin dashboard. so i built a `<ProtectedRoutes>` wrapper component. it checks my `AuthContext` to see if a user is logged in. if they are, it returns `<Outlet />` (which renders the dashboard). if they arent, it uses `<Navigate>` to instantly put them back to the login page.
    * **404 page:** i also added a 404 page route `<Route path="*" element={<NotFoundPage />} />` using * wildcard so if a user types a bad url, they get a nice 404 error page instead of a blank white screen.

3. **Global State (Context and useReducer):**
    * this was the hardest part to build, at least conceptually. i needed the cart to be accessible everywhere (in the navbar, the shop, and the checkout page). 
    * i built a `CartContext` and used `useReducer` instead of `useState` bcuz the cart logic is complex. i referred that usereducer warmup excercise we did in class. my `cartReducer` uses a `switch` statement with actions like 'ADD_TO_CART', 'REMOVE_FROM_CART', and 'CLEAR_CART'. 
    * a really important piece of logic here is that the reducer returns a *new state array immutably* using the javascript spread operator `[...state.cart, action.payload]`. if you just push to the existing array, react wont trigger a re-render.
    * i also wrapped the context provider values in the `useMemo` hook. i used the logic we created in that jwt frontend warmup excercise we did in class. this stops the entire app tree from doing unnecessary re-renders every time something small changes, saving memory.

4. **Data Fetching (AJAX):**
    * i used `axios.get` to get the list of products from `dummyjson.com`. 
    * i put this fetch call inside a `useEffect` hook. the logic here is that i gave the `useEffect` an empty dependency array `[]`. this tells react to only make the api call exactly *one time* when the component mounts. without the empty array, it would fetch, update the state, and fetch again in an infinite loop.

5. **Dynamic Filtering:**
    * i built a dynamic category dropdown. instead of hardcoding categories like "laptops" and "smartphones" in html, i mapped over the api data and extracted the categories. i then wrapped that array in a javascript `Set` like this: `[...new Set(fetchedProducts.map(item => item.category))]`. this automatically strips out all the duplicate strings so my dropdown is perfectly clean.
    * i also built a search bar that filters the products in real-time. i chained `.toLowerCase().includes()` to my filter method so that if a user types "LAPTOP", it will match "laptop" perfectly without causing any issue.

# View and Client Interaction

My goal for the view was to make it feel like a real store while doing the DOM/BOM interactions. 

* **Forms and BOM Usage:** i built controlled react forms using `useState` for the inputs. when the user fills out the checkout page or the admin "Add Product" page, hitting submit creates an `axios.post` to kind of simulate database insertion. to give the user immediate feedback, i utilized the BOM by adding a `window.alert()` with their success message and the generated id.
* **CSS Animations:** i referred my css code from previous sbas. i added multiple animations in my project. similar to previous sbas, the buttons change color on hover, and the item cards have a smooth hover lift effect and a shadow effect so it feels interactive.
* **Loading States:** bcuz network requests can take time, i built a pulsing loading text animation (`.loading-text`) using css keyframes. i did the same in sba 308A where i added an artificial delay (1.5 seconds) using setTimeout, i didnt do it this time to simulate real time loading.  when `loading` state is true, it adds "fetching latest products..." on the screen until the axios promise resolves.

# How to Use the Application

Here is a guide on how to use the different pages and features:

1. **Installation:**
    * run `npm create vite@latest .` to set up the react project.
    * run `npm install react-router-dom axios react-cookie` to get all the required third party dependencies i used for routing, api calls, and auth.
    * run `npm run dev` and click the localhost link in your terminal to view the app in your browser.

2. **Home Page (`/`):**
    * this is the main page. 
    * **Hero Carousel:** i have the auto-playing hero carousel here which cycle through tech images every few seconds.

3. **Shop Page (`/shop`):**
    * **Browse Products:** scroll to see all the products fetched directly from the dummyjson api.
    * **Filter and Search:** type in the search bar to find a specific product instantly, or use the dynamic dropdown menu to filter the product by categories.
    * **Interact:** click the "Add to Cart" button to put an item in your cart, or click anywhere else on the actual card to go to its specific details page.

4. **Product Details (`/shop/:id`):**
    * **Dynamic Info:** this page uses the url parameter to fetch specific product info, a longer description, and reviews.
    * **Navigation:** there is a "Go Back" button that uses the navigate hook to return you to the shop without losing your place.

5. **Cart Page (`/cart`):**
    * **View Items:** view your added items and their individual prices.
    * **Manage Cart:** you can remove items completely or use the + and - buttons to change quantities.
    * **Total Cost:** my reduce function dynamically calculates the total cost based on the quantities you select.

6. **Checkout Page (`/checkout`):**
    * **Secure Form:** fill out the basic form with a name, address, and credit card (any number for the time being). i will add more validation in capstone. 
    * **Submit Order:** clicking "Place Order" will create a `window.alert()` confirmation. it then completely empties the global cart state and redirects you back to the home page.

7. **Login and Admin Dashboard:**
    * **Authentication:** click login in the nav. enter any username and a password (min 4 chars for now, again i will add more validation in capstone.). it drops a fake jwt cookie in your browser and redirects you to the dashboard.
    * **Protected Route:** if you try to go to `/dashboard` without logging in first, the app will put you back to login page.
    * **Add New Gadget:** inside the dashboard, you can use the form to POST a new gadget to the dummyjson api. hitting submit will create a success alert showing the new product id generated by the api (we are kind of simulating the database here).

# Bonus Objectives

* **Complex UI Module (Hero Carousel):** for this bonus, i built an auto-playing `HeroCarousel` component on the home page. the idea is that i use a `useEffect` hook paired with a `setInterval` timer to automatically cycle through my images every 4 seconds. i also made sure to return a `clearInterval` cleanup function so it doesnt cause memory leaks if the user goes to the shop page. 
* **LocalStorage Persistence:** normally, if you refresh a react app, all your state resets to zero and you can lose your cart. to fix this, i created a function in my `CartContext` to check the browser's `localStorage` first. so instead of starting with an empty array, it grabs the saved cart string, uses `JSON.parse()` to turn it back into an object and loads it.
* **Sticky Navbar:** for this, i added specific css styling to my navbar component. the idea is that i used `position: sticky` and gave it a high `z-index` of 1000. so when the user scrolls down the shop page to look at products, the navbar stays to the top of the screen and doesnt get hidden behind the product images.

# Testing

I have created (and used during code creation) test points (log statement) at multiple places in the code, I have not removed them. They are commented at the time of submission and can be uncommented for future debugging and code check. These code checks looks something like:

////////////TESTING
//console.log('TESTING: cart action payload: ', action.payload);
////////////

# Reflection (Unsolved Problems)

**What could you have done differently during the planning stages?**

i think i should have drawn a component tree on paper before coding. i actually made this exact same mistake in my sba 316 project. planning the context api provider location was really confusing at first. i didnt know where to put it so all pages and the navbar could see the cart array. i ended up figuring out i needed to wrap my `<BrowserRouter>` inside the `<CartProvider>` inside `main.jsx`, but sketching out the tree first would have saved me hours of debugging.

**Were there any requirements that were difficult to implement?**

wrapping my head around `useReducer` vs standard `useState` was very tricky. breaking down the cart logic into 'ADD_TO_CART' and 'REMOVE_FROM_CART' actions with a switch statement took some time to learn and i had to refer back to that usereducer warmup exercise we did in class to get the syntax right. also, figuring out how to return an *immutable* array using the spread operator instead of just doing `array.push()` was confusing, bcuz react wont trigger a re-render if you mutate the original memory address.

**What would you add to or change about your application if given more time?**

right now i am using the dummyjson api to fetch some fake data. i used the dummujson api bcuz i used it in my sba 308A, if i had more time i would probably search for a specific tech/gadget related api. also, i would have loved connect this react frontend to the real mongodb backend api that i built in sba 319. that would make this a true, full-stack mern application. thats something i m gonna do for my capstone, so thats okay. i would also change the basic `window.alert()` messages into some nicer ui notification.

**Use this space to make notes for your future self:**

* remember to always use `e.preventDefault()` on forms! else the browser refreshes on submit and completely wipes out all the react state.
* remember that `localStorage` only stores strings. you always have to use `JSON.stringify()` when saving your arrays and `JSON.parse()` when getting data out, otherwise you just get `[object Object]` errors like i did back in sba 308a.
* always put `await` before axios calls

# References

I referred to some examples on stackoverflow and official documentation to help me with the architecture and logic. Here are the links:

https://github.com/piyush-eon/React-shopping-cart-context-with-reducer

https://www.youtube.com/watch?v=HptuMAUaNGk

https://overreacted.io/making-setinterval-declarative-with-react-hooks/

https://stackoverflow.com/questions/53981593/react-hooks-and-setinterval

https://kentcdodds.com/blog/use-state-lazy-initialization-and-function-updates

https://stackoverflow.com/questions/64547044/persist-localstorage-with-usereducer

https://stackoverflow.com/questions/77808914/how-extract-id-from-react-router-with-useparams

https://stackoverflow.com/questions/65948671/how-to-go-back-to-previous-route-in-react-router-dom-v6

https://kentcdodds.com/blog/how-to-optimize-your-context-value

https://react.dev/reference/react/useEffect

https://stackoverflow.com/questions/58579426/in-useeffect-whats-the-difference-between-providing-no-dependency-array-and-an

https://stackoverflow.com/questions/73272927/in-react-js-i-want-to-be-able-to-search-username-without-distinguishing-between




