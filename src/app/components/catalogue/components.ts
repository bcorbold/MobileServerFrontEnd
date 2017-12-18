import { IncomingBatchesComponent } from '../views/incoming-batches/incoming-batches.component';
import { AccountInfoComponent } from '../views/account-info/account-info.component';

export class Components {
  components = [
    { path: 'incoming-batches', component: IncomingBatchesComponent },
    { path: 'account-info', component: AccountInfoComponent }
  ];
}
