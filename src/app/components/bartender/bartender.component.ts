import { Component } from '@angular/core';

@Component({
  selector: 'ms-bartender-component',
  styleUrls: ['bartender.component.scss'],
  templateUrl: './bartender.component.html'
})
export class BartenderComponent {

  batches = [
    {
      batchId: 1,
      deadline: 60,
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
      deadline: 60,
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
      batchId: 2,
      deadline: 60,
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
      batchId: 2,
      deadline: 60,
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
      batchId: 2,
      deadline: 60,
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
      batchId: 2,
      deadline: 60,
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
}
