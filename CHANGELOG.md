# [0.3.2](https://github.com/bcorbold/MobileServerFrontEnd/) (TBD)
- (fix): `MessageService` now will only emit changes for batchUpdates and orderHistory if there is a change to the respective caches 
- (feat): `PlaceOrderComponent` now uses auto-complete forms for delivery locations and beverage type
- (fix): `PlaceOrderComponent` form now resets, and populates past order information correctly
- (fix): `AccountInfoComponent` toggle now displays the correct value for the associated view

# [0.3.1](https://github.com/bcorbold/MobileServerFrontEnd/tree/0.3.1) (28-01-2018)
- (fix): Increased polling rate for order history and batch updates

# [0.3.0](https://github.com/bcorbold/MobileServerFrontEnd/tree/0.3.0) (28-01-2018)
- (chore): Removed mock data from UI project. Connected backend API calls so that data is now returned from the backend
- (style): Restyle application for a more "flat" layout
