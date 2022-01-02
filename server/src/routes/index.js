import AuthRouter from './auth/auth.router'
import ProductRouter from './product/product.router'
import UserRouter from './user/users.router'
import OrderRouter from './orders/orders.router'
import AdminRouter from './admin/admin.router'
import { isAdmin, isAuth } from '../utils';

const AppRoutes = (app) => {
    // LOGIN - LOGOUT ROUTER
    app.use(AuthRouter.routePrefix,AuthRouter.route()),
    // PRODUCTS ROUTER
    app.use(ProductRouter.routePrefix,ProductRouter.route()),
    // USERS ROUTER
    app.use(UserRouter.routePrefix,isAuth,UserRouter.route()),
    // ORDERS ROUTER
    app.use(OrderRouter.routePrefix,isAuth,OrderRouter.route()),
    // ROLE
    app.use(AdminRouter.routePrefix,isAuth,isAdmin,AdminRouter.route())
}

export default AppRoutes;