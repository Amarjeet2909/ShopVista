> **Project's Title**:
 ## **ShopVista (An e-commerce Web App)** [View the project]()
 
> **Project Description**:

MERN stack is a popular choice for building web applications that require both the front-end and back-end to be developed using JavaScript. An e-commerce website is a great use case for a MERN stack application, as it requires seamless integration of different components such as a database, server, and client-side interface.

To build a robust e-commerce web application using the MERN stack, the following key features are essential.

* Authentication using JSON Web Tokens (JWT): User authentication is an important aspect of an e-commerce application, and JWTs provide a secure way of verifying user identity.

* CRUD (Create, Read, Update, Delete) functionality for all items in the store: This feature enables the admin to add, edit, view, and delete all items available in the store.

* Shopping cart functionality: Users should be able to add items to their cart, view the contents of their cart, and remove items from it.

In conclusion, a well-designed MERN stack e-commerce application should include essential features such as user authentication, CRUD functionality, and shopping cart functionality. By leveraging the power of MongoDB, Express.js, React.js, and Node.js, one can build a scalable and efficient web application that meets the requirements of an e-commerce store.


> **Build with**:

This section should list any major frameworks/libraries used to bootstrap your project.

* [MongoDB Atlas](https://www.mongodb.com/atlas/database)
  **Database**. Deploy a multi-cloud database.
  The most advanced cloud database service on the market, with unmatched data distribution and mobility across AWS, Azure, and Google Cloud, built-in automation for resource and workload optimization, and so much more.
* [MongoDB Compass](https://www.mongodb.com/products/compass)
  **Compass**. The GUI for MongoDB.
  Compass is an interactive tool for querying, optimizing, and analyzing your MongoDB data. Get key insights, drag and drop to build pipelines, and more.
* [Express.js](https://expressjs.com/)
  Express.js, or simply Express, is a back end web application framework for Node.js, released as free and open-source software under the MIT License. It is designed for building web applications and APIs. It has been called the de facto standard server framework for Node.js.
* [React.js](https://reactjs.org/)
  A JavaScript library for building user interfaces.
* [Node.js](https://nodejs.org/en/)
  Node.js is a free, open-sourced, cross-platform JavaScript run-time environment that lets developers write command line tools and server-side scripts outside of a browser.
* [Redux Toolkit](https://redux-toolkit.js.org/)
  The official, opinionated, batteries-included toolset for efficient Redux development.
* [Postman](https://www.postman.com/)
  Postman is an application used for API testing.

> **Folder Structure**:

```

Root
│
├── backend
│   ├── config
│   │   ├── config.env
│   │   └── database.js
│   │── controllers
│   │   ├── orderController.js
│   │   ├── paymentController.js
│   │   ├── productController.js
│   │   └── userController.js
│   ├── middleware
│   │   ├── auth.js
│   │   ├── catchAsyncErrors.js
│   │   └── errorMiddleware.js
│   ├── models
│   │   ├── orderModel.js
│   │   ├── productModel.js
│   │   └── userModel.js
│   ├── routes
│   │   ├── orderRoutes.js
│   │   ├── paymentRoutes.js
│   │   ├── productRoute.js
│   │   └── userRoutes.js
│   ├── utils
│   │   ├── ApiFeatures.js
│   │   ├── errorhandler.js
│   │   ├── jwtToken.js
│   │   └── sendEmail.js
│   ├── app.js
│   └── server.js
│
│
├── frontend
│   ├── README.md
│   ├── .gitignore
│   ├── node_modules
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   │   ├── index.html
│   │   ├── logo512.png
│   │   ├── logoShopie1.png
│   │   ├── profilePng.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   └── src
│       ├── actions
│       │   ├── cartAction.js
│       │   ├── orderAction.js
│       │   ├── productAction.js
│       │   └── userAction.js
│       ├── component
│       │   ├── admin
│       │   │   ├── dashboard.css
│       │   │   ├── Dashboard.js
│       │   │   ├── newProduct.css
│       │   │   ├── NewProduct.js
│       │   │   ├── OrderList.js
│       │   │   ├── processOrder.css
│       │   │   ├── ProcessOrder.js
│       │   │   ├── productList.css
│       │   │   ├── productList.js
│       │   │   ├── productreviews.css
│       │   │   ├── ProductReviews.js
│       │   │   ├── Sidebar.css
│       │   │   ├── Sidebar.js
│       │   │   ├── UpdateProduct.js
│       │   │   ├── UpdateUser.js
│       │   │   └── UserList.js
│       │   ├── Cart
│       │   │   ├── Cart.js
│       │   │   ├── Cart.css
│       │   │   ├── CartItemCard.js
│       │   │   ├── CartItemCard.css
│       │   │   ├── CheckOutSteps.js
│       │   │   ├── CheckOutSteps.css
│       │   │   ├── ConfirmOrder.js
│       │   │   ├── ConfirmOrder.css
│       │   │   ├── OrderSuccess.js
│       │   │   ├── OrderSuccess.css
│       │   │   ├── Payment.js
│       │   │   ├── Payment.css
│       │   │   ├── Shipping.js
│       │   │   └── Shipping.css
│       │   ├── Home
│       │   │   ├── Home.js
│       │   │   ├── Home.css
│       │   │   └── ProductCard.js
│       │   ├── Layout
│       │   │   ├── About
│       │   │   │   ├── About.js
│       │   │   │   └── about.css
│       │   │   ├── Contact
│       │   │   │   ├── Contact.js
│       │   │   │   └── Contact.css
│       │   │   ├── Footer
│       │   │   │   ├── Footer.js
│       │   │   │   └── Footer.css
│       │   │   ├── Header
│       │   │   │   ├── Header.js
│       │   │   │   ├── Header.css 
│       │   │   │   └── UseOptions.js
│       │   │   ├── Loader
│       │   │   │   ├── Loader.js
│       │   │   │   └── Loader.css
│       │   │   └── MetaData.js
│       │   ├── Order
│       │   │   ├── MyOrder.js
│       │   │   ├── myOrders.css
│       │   │   ├── OrderDetails.js
│       │   │   └── OrderDetails.css
│       │   ├── Product
│       │   │   ├── ProductDetails.js
│       │   │   ├── ProductDetails.css
│       │   │   ├── Products.js
│       │   │   ├── Products.css
│       │   │   ├── Search.js
│       │   │   ├── Search.css
│       │   │   └── ReviewCard.js
│       │   ├── Route 
│       │   │   └── ProtectedRoute.js
│       │   └── User
│       │       ├── forgotPassword.js
│       │       ├── forgotPassword.css
│       │       ├── LoginSignUp.js
│       │       ├── LoginSignUp.css
│       │       ├── Profile.js
│       │       ├── Profile.css
│       │       ├── ResetPassword.js
│       │       ├── ResetPassword.css
│       │       ├── UpdatePassword.js
│       │       ├── UpdatePassword.css
│       │       ├── UpdateProfile.js
│       │       └── UpdateProfile.css 
│       ├── constants
│       │   ├── cartConstants.js
│       │   ├── orderConstants.js
│       │   ├── productConstants.js
│       │   └── userConstants.js
│       ├── images
│       │   ├── image-1.jpg
│       │   ├── image-2.jpg
│       │   ├── image-3.jpg
│       │   └── image-n.jpg
│       ├── reducers
│       │   ├── cartReducer.js
│       │   ├── oerderReducer.js
│       │   ├── productReducer.js
│       │   └── userReducer.js
│       ├── App.css
│       ├── App.js
│       ├── Store.js
│       ├── index.js
│       └── setupProxy.js
│
├── .gitignore
├── node_modules
├── README.md
├── package-lock.json
└── package.json

```

> **Deployment**:

[Article-1](https://medium.com/@vmaineng/how-to-deploy-mern-full-stack-to-render-f7ab380660b6)  || 
[Article-2](https://dev.to/gregpetropoulos/render-deployment-free-tier-of-mern-app-52mk)   ||
[Article-3](https://community.render.com/t/how-to-deploy-frontend-and-backend-on-render/7449)   ||
[Article-4](https://create-react-app.dev/docs/deployment/)   ||
[Article-5](https://stackoverflow.com/questions/68878329/hosting-a-mern-application-with-vercel-in-2021-without-next-js)  

> **Working of MERN stack app**

<img align="center" alt="coding" widht="400" src="https://res.cloudinary.com/shopie/image/upload/v1679739217/mern2_pwg30h.jpg">

<img align="center" alt="coding" widht="400" src="https://res.cloudinary.com/shopie/image/upload/v1679739008/mern1_kaifse.jpg">

<img align="center" alt="coding" widht="400" src="https://res.cloudinary.com/shopie/image/upload/v1679739521/mern3_oxpdob.jpg">
