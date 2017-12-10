import { AccountInfoComponent } from '../account-info/account-info.component';
import { IncomingBatchesComponent } from '../incoming-batches/incoming-batches.component';

export class Components {
  components = [
    { path: 'incoming-batches', component: IncomingBatchesComponent },
    { path: 'account-info', component: AccountInfoComponent }
  ];
}
