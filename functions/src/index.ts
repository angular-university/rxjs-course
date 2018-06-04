
import * as angularUniversal from 'angular-universal-express-firebase';


export let ssrApp = angularUniversal.trigger({
    index: __dirname + '/index-server.html',
    main: __dirname + '/main.bundle',
    enableProdMode: true,
    cdnCacheExpiry: 600,
    browserCacheExpiry: 300,
    staleWhileRevalidate: 120
});

