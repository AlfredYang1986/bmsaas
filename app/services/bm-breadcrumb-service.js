import Service from '@ember/service';
import { A } from '@ember/array';

export default Service.extend({

    routes: A([]),

    changeRoutes(curRoute,title) {
        let tempRouteInfo = {
            route: curRoute,
            title: title
        }

        this.routes.pushObject(tempRouteInfo);
        console.log(this.routes)
    },
});
