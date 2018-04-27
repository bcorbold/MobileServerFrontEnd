# [1.2.](https://github.com/bcorbold/MobileServerFrontEnd/tree/1.2.1) - Released (25-04-2018)
- (feat): Added more memes for final demo

# [1.2.0](https://github.com/bcorbold/MobileServerFrontEnd/tree/1.2.0) - Released (25-04-2018)
- (feat): `PathFindingDemoComponent` updated for pre-calculated paths
- (feat): Added `ConfirmationModalComponent` for added user validation
- (feat): `MessageService` now retries requests if failed the first time
- (style): App now has dark and light theme ready for use

# [1.1.0](https://github.com/bcorbold/MobileServerFrontEnd/tree/1.1.0) - Released (15-04-2018)
- (feat): `CacheService` now waits until a request has been completed before sending out another request
- (fix): `CacheService` now emits `Order[]` even if none of them need further updates
- (style): Scroll bars are now styled to be consistent across most platforms/browsers
- (style): Application now follows Material Design specification more closely
- (style): Switching views in mobile now uses a side nav

# [1.0.1](https://github.com/bcorbold/MobileServerFrontEnd/tree/1.0.1) - Released (10-03-2018)
- (fix): `index.html` href fixed for Github Pages deployment

# [1.0.0](https://github.com/bcorbold/MobileServerFrontEnd/tree/1.0.0) - Released (06-03-2018)
- (fix): `MessageService` now will only emit changes for batchUpdates and orderHistory if there is a change to the respective caches 
- (feat): `PlaceOrderComponent` now uses auto-complete forms for delivery locations and beverage type
- (fix): `PlaceOrderComponent` form now resets, and populates past order information correctly
- (fix): `AccountInfoComponent` toggle now displays the correct value for the associated view
- (feat): `CacheService` now handles all information that can be cached and used by various components
- (feat): Updated `getSystemDetails` API so that new information can easily be added
- (feat): Added mobile layout
- (build): Backend url is now stored in the `environment` files
- (build): Prod build now puts output in `docs` folder

# [0.3.1](https://github.com/bcorbold/MobileServerFrontEnd/tree/0.3.1) - Released (28-01-2018)
- (fix): Increased polling rate for order history and batch updates

# [0.3.0](https://github.com/bcorbold/MobileServerFrontEnd/tree/0.3.0) - Released (28-01-2018)
- (chore): Removed mock data from UI project. Connected backend API calls so that data is now returned from the backend
- (style): Restyle application for a more "flat" layout
