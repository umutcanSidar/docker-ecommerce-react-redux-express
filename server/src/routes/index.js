import AuthRouter from './auth/auth.router'
import ProductRouter from './product/product.router'
import UserRouter from './user/users.router'
import OrderRouter from './orders/orders.router'
import { isAuth } from '../utils';

const AppRoutes = (app) => {
    // LOGIN - LOGOUT ROUTER
    app.use(AuthRouter.routePrefix,AuthRouter.route()),
    // PRODUCTS ROUTER
    app.use(ProductRouter.routePrefix,ProductRouter.route()),
    // USERS ROUTER
    app.use(UserRouter.routePrefix,isAuth,UserRouter.route()),
    // ORDERS ROUTER
    app.use(OrderRouter.routePrefix,isAuth,OrderRouter.route())

}

export default AppRoutes;