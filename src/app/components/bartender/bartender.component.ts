import { Component, OnDestroy, OnInit } from '@angular/core';
import {TimeInterval} from "rxjs/Rx";

@Component({
  selector: 'ms-bartender-component',
  styleUrls: ['bartender.component.scss'],
  templateUrl: './bartender.component.html'
})
export class BartenderComponent implements OnInit, OnDestroy {

  batches = [
    {
      batchId: 1,
      deadline: (new Date().getTime() + 60 * 1000),
      timeRemaining: '00:00:00',
      markDone: false,
      orders: [
        {
          orderId: 1,
          orderInfo: {
            addons: [
              {
                addonId: 1,
                addonName: 'milk',
                quantity: 2
              }
            ],
            productId: 1,
            productName: 'Product 1'
          },
          markedDone: false
        },
        {
          orderId: 2,
          orderInfo: {
            addons: [
              {
                addonId: 1,
                addonName: 'addon 1',
                quantity: 1
              }
            ],
            productId: 1,
            productName: 'Product 1'
          },
          markedDone: false
        },
        {
          orderId: 3,
          orderInfo: {
            addons: [
              {
                addonId: 1,
                addonName: 'addon 1',
                quantity: 3
              }
            ],
            productId: 1,
            productName: 'Product 1'
          },
          markedDone: false
        },
        {
          orderId: 4,
          orderInfo: {
            addons: [
              {
                addonId: 1,
                addonName: 'addon 1',
                quantity: 5
              }
            ],
            productId: 1,
            productName: 'Product 1'
          },
          markedDone: false
        }
      ]
    },
    {
      batchId: 2,
      deadline: (new Date().getTime() + 60 * 1000),
      timeRemaining: '00:00:00',
      markDone: false,
      orders: [
        {
          orderId: 5,
          orderInfo: {
            addons: [
              {
                addonId: 1,
                addonName: 'addon 1',
                quantity: 2
              }
            ],
            productId: 1,
            productName: 'Product 1'
          },
          markedDone: false
        },
        {
          orderId: 6,
          orderInfo: {
            addons: [
              {
                addonId: 1,
                addonName: 'addon 1',
                quantity: 1
              }
            ],
            productId: 1,
            productName: 'Product 1'
          },
          markedDone: false
        },
        {
          orderId: 7,
          orderInfo: {
            addons: [
              {
                addonId: 1,
                addonName: 'addon 1',
                quantity: 3
              }
            ],
            productId: 1,
            productName: 'Product 1'
          },
          markedDone: false
        },
        {
          orderId: 8,
          orderInfo: {
            addons: [
              {
                addonId: 1,
                addonName: 'addon 1',
                quantity: 5
              }
            ],
            productId: 1,
            productName: 'Product 1'
          },
          markedDone: false
        }
      ]
    },
    {
      batchId: 3,
      deadline: (new Date().getTime() + 60 * 1000),
      timeRemaining: '00:00:00',
      markDone: false,
      orders: [
        {
          orderId: 5,
          orderInfo: {
            addons: [
              {
                addonId: 1,
                addonName: 'addon 1',
                quantity: 2
              }
            ],
            productId: 1,
            productName: 'Product 1'
          },
          markedDone: false
        },
        {
          orderId: 6,
          orderInfo: {
            addons: [
              {
                addonId: 1,
                addonName: 'addon 1',
                quantity: 1
              }
            ],
            productId: 1,
            productName: 'Product 1'
          },
          markedDone: false
        },
        {
          orderId: 7,
          orderInfo: {
            addons: [
              {
                addonId: 1,
                addonName: 'addon 1',
                quantity: 3
              }
            ],
            productId: 1,
            productName: 'Product 1'
          },
          markedDone: false
        },
        {
          orderId: 8,
          orderInfo: {
            addons: [
              {
                addonId: 1,
                addonName: 'addon 1',
                quantity: 5
              }
            ],
            productId: 1,
            productName: 'Product 1'
          },
          markedDone: false
        }
      ]
    },
    {
      batchId: 4,
      deadline: (new Date().getTime() + 60 * 1000),
      timeRemaining: '00:00:00',
      markDone: false,
      orders: [
        {
          orderId: 5,
          orderInfo: {
            addons: [
              {
                addonId: 1,
                addonName: 'addon 1',
                quantity: 2
              }
            ],
            productId: 1,
            productName: 'Product 1'
          },
          markedDone: false
        },
        {
          orderId: 6,
          orderInfo: {
            addons: [
              {
                addonId: 1,
                addonName: 'addon 1',
                quantity: 1
              }
            ],
            productId: 1,
            productName: 'Product 1'
          },
          markedDone: false
        },
        {
          orderId: 7,
          orderInfo: {
            addons: [
              {
                addonId: 1,
                addonName: 'addon 1',
                quantity: 3
              }
            ],
            productId: 1,
            productName: 'Product 1'
          },
          markedDone: false
        },
        {
          orderId: 8,
          orderInfo: {
            addons: [
              {
                addonId: 1,
                addonName: 'addon 1',
                quantity: 5
              }
            ],
            productId: 1,
            productName: 'Product 1'
          },
          markedDone: false
        }
      ]
    },
    {
      batchId: 5,
      deadline: (new Date().getTime() + 60 * 1000),
      timeRemaining: '00:00:00',
      markDone: false,
      orders: [
        {
          orderId: 5,
          orderInfo: {
            addons: [
              {
                addonId: 1,
                addonName: 'addon 1',
                quantity: 2
              }
            ],
            productId: 1,
            productName: 'Product 1'
          },
          markedDone: false
        },
        {
          orderId: 6,
          orderInfo: {
            addons: [
              {
                addonId: 1,
                addonName: 'addon 1',
                quantity: 1
              }
            ],
            productId: 1,
            productName: 'Product 1'
          },
          markedDone: false
        },
        {
          orderId: 7,
          orderInfo: {
            addons: [
              {
                addonId: 1,
                addonName: 'addon 1',
                quantity: 3
              }
            ],
            productId: 1,
            productName: 'Product 1'
          },
          markedDone: false
        },
        {
          orderId: 8,
          orderInfo: {
            addons: [
              {
                addonId: 1,
                addonName: 'addon 1',
                quantity: 5
              }
            ],
            productId: 1,
            productName: 'Product 1'
          },
          markedDone: false
        }
      ]
    },
    {
      batchId: 6,
      deadline: (new Date().getTime() + 60 * 1000),
      timeRemaining: '00:00:00',
      markDone: false,
      orders: [
        {
          orderId: 5,
          orderInfo: {
            addons: [
              {
                addonId: 1,
                addonName: 'addon 1',
                quantity: 2
              }
            ],
            productId: 1,
            productName: 'Product 1'
          },
          markedDone: false
        },
        {
          orderId: 6,
          orderInfo: {
            addons: [
              {
                addonId: 1,
                addonName: 'addon 1',
                quantity: 1
              }
            ],
            productId: 1,
            productName: 'Product 1'
          },
          markedDone: false
        },
        {
          orderId: 7,
          orderInfo: {
            addons: [
              {
                addonId: 1,
                addonName: 'addon 1',
                quantity: 3
              }
            ],
            productId: 1,
            productName: 'Product 1'
          },
          markedDone: false
        },
        {
          orderId: 8,
          orderInfo: {
            addons: [
              {
                addonId: 1,
                addonName: 'addon 1',
                quantity: 5
              }
            ],
            productId: 1,
            productName: 'Product 1'
          },
          markedDone: false
        }
      ]
    }
  ];

  deadlineInterval;

  ngOnInit() {
    this.deadlineInterval = setInterval(() => {
      this.batches.forEach(batch => {
        const currentDate = new Date();
        const batchDeadline = new Date();
        const displayTime = new Date();

        batchDeadline.setTime(batch.deadline);

        displayTime.setTime(batchDeadline.getTime() - currentDate.getTime());

        batch.timeRemaining = ('00' + displayTime.getUTCHours()).slice(-2) + ':'
          + ('00' + displayTime.getUTCMinutes()).slice(-2) + ':'
          + ('00' + displayTime.getUTCSeconds()).slice(-2);
      });
    }, 100);
  }

  ngOnDestroy() {
    clearInterval(this.deadlineInterval);
  }

  onMyClick(batchId) {
    // document.getElementsByName('div').item(1).
    const DivElmnt = document.getElementById('someComponent');
    console.log(DivElmnt.scrollHeight);
    const DivElmnt2 = document.getElementById('someComponent4');
    console.log(DivElmnt2.offsetHeight);
    console.log(DivElmnt2.clientHeight);
    console.log(DivElmnt2.scrollHeight);
    const divs = this.getDivHeights();
    let value = 0;
    for (let i = 0; i < batchId - 1; i++) {
      value = value + divs[i].divHeight;
    }
    DivElmnt.scrollTop = value;
    // let num = 0;
    // setInterval(() => {
    //   // if (num < (DivElmnt.scrollHeight - DivElmnt2.offsetHeight)) {
    //   if (num < (DivElmnt2.offsetHeight * 3)) {
    //     DivElmnt.scrollTop = num;
    //     num = num + 1;
    //   }
    // }, 1);
  }

  getDivHeights(): any {
    const divs = [];
    this.batches.forEach( batch => {
      const DivElmnt = document.getElementById('someComponent' + batch.batchId);
      divs.push({
        batchId: batch.batchId,
        divHeight: DivElmnt.offsetHeight
      });
    });
    return divs;
  }

  // need a function to set the batch data

  // need a function to update the batch data?

  // need to set intervals for the timing information of respective batches
}
