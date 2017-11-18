export class POCPostBody {
  led1State: boolean;
  led2State: boolean;
  userInfo: { id: string | number, name: string };

  constructor() {
    this.led1State = false;
    this.led2State = false;
    this.userInfo = {
      id: '4c31bbb5-2a66-48ca-9b5c-8c7d04c8fcf5',
      name: 'Bob'
    };
  }
}
