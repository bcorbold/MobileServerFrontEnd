import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'ms-incoming-batches',
  styleUrls: ['incoming-batches.component.scss'],
  templateUrl: './incoming-batches.component.html'
})
export class IncomingBatchesComponent implements OnInit, OnDestroy {

  batches = [
    {
      batchId: 1,
      deadline: (new Date().getTime() + 60 * 1000),
      timeRemaining: '00:00:00',
      textColour: 'white',
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
            productName: 'Coke'
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
            productName: 'Coffee'
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
            productName: 'Tea'
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
            productName: 'Water'
          },
          markedDone: false
        }
      ]
    },
    {
      batchId: 2,
      deadline: (new Date().getTime() + 60 * 1000),
      timeRemaining: '00:00:00',
      textColour: 'white',
      markDone: false,
      orders: [
        {
          orderId: 1,
          orderInfo: {
            addons: [
              {
                addonId: 1,
                addonName: 'addon 1',
                quantity: 2
              }
            ],
            productId: 1,
            productName: 'Coffee'
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
            productName: 'Coffee'
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
            productName: 'Sprite'
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
            productName: 'Tea'
          },
          markedDone: false
        }
      ]
    },
    {
      batchId: 3,
      deadline: (new Date().getTime() + 60 * 1000),
      timeRemaining: '00:00:00',
      textColour: 'white',
      markDone: false,
      orders: [
        {
          orderId: 1,
          orderInfo: {
            addons: [
              {
                addonId: 1,
                addonName: 'addon 1',
                quantity: 2
              }
            ],
            productId: 1,
            productName: 'Coffee'
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
            productName: 'Coffee'
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
            productName: 'Sprite'
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
            productName: 'Tea'
          },
          markedDone: false
        }
      ]
    },
    {
      batchId: 4,
      deadline: (new Date().getTime() + 60 * 1000),
      timeRemaining: '00:00:00',
      textColour: 'white',
      markDone: false,
      orders: [
        {
          orderId: 1,
          orderInfo: {
            addons: [
              {
                addonId: 1,
                addonName: 'addon 1',
                quantity: 2
              }
            ],
            productId: 1,
            productName: 'Coffee'
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
            productName: 'Coffee'
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
            productName: 'Sprite'
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
            productName: 'Tea'
          },
          markedDone: false
        }
      ]
    },
    {
      batchId: 5,
      deadline: (new Date().getTime() + 60 * 1000),
      timeRemaining: '00:00:00',
      textColour: 'white',
      markDone: false,
      orders: [
        {
          orderId: 1,
          orderInfo: {
            addons: [
              {
                addonId: 1,
                addonName: 'addon 1',
                quantity: 2
              }
            ],
            productId: 1,
            productName: 'Coffee'
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
            productName: 'Coffee'
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
            productName: 'Sprite'
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
            productName: 'Tea'
          },
          markedDone: false
        }
      ]
    },
    {
      batchId: 6,
      deadline: (new Date().getTime() + 60 * 1000),
      timeRemaining: '00:00:00',
      textColour: 'white',
      markDone: false,
      orders: [
        {
          orderId: 1,
          orderInfo: {
            addons: [
              {
                addonId: 1,
                addonName: 'addon 1',
                quantity: 2
              }
            ],
            productId: 1,
            productName: 'Coffee'
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
            productName: 'Coffee'
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
            productName: 'Sprite'
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
            productName: 'Tea'
          },
          markedDone: false
        }
      ]
    },
    {
      batchId: 7,
      deadline: (new Date().getTime() + 60 * 1000),
      timeRemaining: '00:00:00',
      textColour: 'white',
      markDone: false,
      orders: [
        {
          orderId: 1,
          orderInfo: {
            addons: [
              {
                addonId: 1,
                addonName: 'addon 1',
                quantity: 2
              }
            ],
            productId: 1,
            productName: 'Coffee'
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
            productName: 'Coffee'
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
            productName: 'Sprite'
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
            productName: 'Tea'
          },
          markedDone: false
        }
      ]
    },
    {
      batchId: 8,
      deadline: (new Date().getTime() + 60 * 1000),
      timeRemaining: '00:00:00',
      textColour: 'white',
      markDone: false,
      orders: [
        {
          orderId: 1,
          orderInfo: {
            addons: [
              {
                addonId: 1,
                addonName: 'addon 1',
                quantity: 2
              }
            ],
            productId: 1,
            productName: 'Coffee'
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
            productName: 'Coffee'
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
            productName: 'Sprite'
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
            productName: 'Tea'
          },
          markedDone: false
        }
      ]
    },
    {
      batchId: 9,
      deadline: (new Date().getTime() + 60 * 1000),
      timeRemaining: '00:00:00',
      textColour: 'white',
      markDone: false,
      orders: [
        {
          orderId: 1,
          orderInfo: {
            addons: [
              {
                addonId: 1,
                addonName: 'addon 1',
                quantity: 2
              }
            ],
            productId: 1,
            productName: 'Coffee'
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
            productName: 'Coffee'
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
            productName: 'Sprite'
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
            productName: 'Tea'
          },
          markedDone: false
        }
      ]
    },
    {
      batchId: 10,
      deadline: (new Date().getTime() + 60 * 1000),
      timeRemaining: '00:00:00',
      textColour: 'white',
      markDone: false,
      orders: [
        {
          orderId: 1,
          orderInfo: {
            addons: [
              {
                addonId: 1,
                addonName: 'addon 1',
                quantity: 2
              }
            ],
            productId: 1,
            productName: 'Coffee'
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
            productName: 'Coffee'
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
            productName: 'Sprite'
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
            productName: 'Tea'
          },
          markedDone: false
        }
      ]
    },
    {
      batchId: 11,
      deadline: (new Date().getTime() + 60 * 1000),
      timeRemaining: '00:00:00',
      textColour: 'white',
      markDone: false,
      orders: [
        {
          orderId: 1,
          orderInfo: {
            addons: [
              {
                addonId: 1,
                addonName: 'addon 1',
                quantity: 2
              }
            ],
            productId: 1,
            productName: 'Coffee'
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
            productName: 'Coffee'
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
            productName: 'Sprite'
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
            productName: 'Tea'
          },
          markedDone: false
        }
      ]
    },
    {
      batchId: 12,
      deadline: (new Date().getTime() + 60 * 1000),
      timeRemaining: '00:00:00',
      textColour: 'white',
      markDone: false,
      orders: [
        {
          orderId: 1,
          orderInfo: {
            addons: [
              {
                addonId: 1,
                addonName: 'addon 1',
                quantity: 2
              }
            ],
            productId: 1,
            productName: 'Coffee'
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
            productName: 'Coffee'
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
            productName: 'Sprite'
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
            productName: 'Tea'
          },
          markedDone: false
        }
      ]
    },
    {
      batchId: 13,
      deadline: (new Date().getTime() + 60 * 1000),
      timeRemaining: '00:00:00',
      textColour: 'white',
      markDone: false,
      orders: [
        {
          orderId: 1,
          orderInfo: {
            addons: [
              {
                addonId: 1,
                addonName: 'addon 1',
                quantity: 2
              }
            ],
            productId: 1,
            productName: 'Coffee'
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
            productName: 'Coffee'
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
            productName: 'Sprite'
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
            productName: 'Tea'
          },
          markedDone: false
        }
      ]
    },
    {
      batchId: 14,
      deadline: (new Date().getTime() + 60 * 1000),
      timeRemaining: '00:00:00',
      textColour: 'white',
      markDone: false,
      orders: [
        {
          orderId: 1,
          orderInfo: {
            addons: [
              {
                addonId: 1,
                addonName: 'addon 1',
                quantity: 2
              }
            ],
            productId: 1,
            productName: 'Coffee'
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
            productName: 'Coffee'
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
            productName: 'Sprite'
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
            productName: 'Tea'
          },
          markedDone: false
        }
      ]
    },
    {
      batchId: 15,
      deadline: (new Date().getTime() + 60 * 1000),
      timeRemaining: '00:00:00',
      textColour: 'white',
      markDone: false,
      orders: [
        {
          orderId: 1,
          orderInfo: {
            addons: [
              {
                addonId: 1,
                addonName: 'addon 1',
                quantity: 2
              }
            ],
            productId: 1,
            productName: 'Coffee'
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
            productName: 'Coffee'
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
            productName: 'Sprite'
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
            productName: 'Tea'
          },
          markedDone: false
        }
      ]
    },
    {
      batchId: 16,
      deadline: (new Date().getTime() + 60 * 1000),
      timeRemaining: '00:00:00',
      textColour: 'white',
      markDone: false,
      orders: [
        {
          orderId: 1,
          orderInfo: {
            addons: [
              {
                addonId: 1,
                addonName: 'addon 1',
                quantity: 2
              }
            ],
            productId: 1,
            productName: 'Coffee'
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
            productName: 'Coffee'
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
            productName: 'Sprite'
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
            productName: 'Tea'
          },
          markedDone: false
        }
      ]
    },
    {
      batchId: 17,
      deadline: (new Date().getTime() + 60 * 1000),
      timeRemaining: '00:00:00',
      textColour: 'white',
      markDone: false,
      orders: [
        {
          orderId: 1,
          orderInfo: {
            addons: [
              {
                addonId: 1,
                addonName: 'addon 1',
                quantity: 2
              }
            ],
            productId: 1,
            productName: 'Coffee'
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
            productName: 'Coffee'
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
            productName: 'Sprite'
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
            productName: 'Tea'
          },
          markedDone: false
        }
      ]
    },
    {
      batchId: 18,
      deadline: (new Date().getTime() + 60 * 1000),
      timeRemaining: '00:00:00',
      textColour: 'white',
      markDone: false,
      orders: [
        {
          orderId: 1,
          orderInfo: {
            addons: [
              {
                addonId: 1,
                addonName: 'addon 1',
                quantity: 2
              }
            ],
            productId: 1,
            productName: 'Coffee'
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
            productName: 'Coffee'
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
            productName: 'Sprite'
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
            productName: 'Tea'
          },
          markedDone: false
        }
      ]
    },
    {
      batchId: 19,
      deadline: (new Date().getTime() + 60 * 1000),
      timeRemaining: '00:00:00',
      textColour: 'white',
      markDone: false,
      orders: [
        {
          orderId: 1,
          orderInfo: {
            addons: [
              {
                addonId: 1,
                addonName: 'addon 1',
                quantity: 2
              }
            ],
            productId: 1,
            productName: 'Coffee'
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
            productName: 'Coffee'
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
            productName: 'Sprite'
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
            productName: 'Tea'
          },
          markedDone: false
        }
      ]
    },
    {
      batchId: 20,
      deadline: (new Date().getTime() + 60 * 1000),
      timeRemaining: '00:00:00',
      textColour: 'white',
      markDone: false,
      orders: [
        {
          orderId: 1,
          orderInfo: {
            addons: [
              {
                addonId: 1,
                addonName: 'addon 1',
                quantity: 2
              }
            ],
            productId: 1,
            productName: 'Coffee'
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
            productName: 'Coffee'
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
            productName: 'Sprite'
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
            productName: 'Tea'
          },
          markedDone: false
        }
      ]
    }
  ];
  numberOfBatches = 20;

  currentPage = 1;

  deadlineInterval;
  scrollDebounce;

  ngOnInit() {
    this.deadlineInterval = setInterval(() => {
      this.batches.forEach(batch => {
        const currentDate = new Date();
        const batchDeadline = new Date();
        const displayTime = new Date();

        batchDeadline.setTime(batch.deadline);

        let timeRemaining = batchDeadline.getTime() - currentDate.getTime();

        if (timeRemaining < 0) {
          batch.textColour = 'red';
        } else if (timeRemaining <= 5000) {
          batch.textColour = 'green';
        }

        timeRemaining = Math.abs(timeRemaining);

        displayTime.setTime(timeRemaining);

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
    this.currentPage = batchId;
    const DivElmnt = document.getElementsByClassName('batches-container')[0];
    const divs = this.getDivHeights();
    let value = 0;
    for (let i = 0; i < batchId - 1; i++) {
      value = value + divs[i].divHeight;
    }
    DivElmnt.scrollTop = value;
  }

  getDivHeights(): any {
    const divs = [];
    // const DivElmnt = document.getElementById('someComponent');
    const DivElmnt = document.getElementsByClassName('batches-container')[0];
    for (let i = 0; i < DivElmnt.children.length; i++) {
      const DivElmnt2 = (<HTMLElement>DivElmnt.children[0]);
      divs.push({
        batchId: i + 1,
        divHeight: DivElmnt2.offsetHeight
      });
    }
    return divs;
  }

  checkBatchStatus() {
    this.batches.forEach(batch => {
      let batchDoneStatus = true;
      batch.orders.forEach(order => {
        if (!order.markedDone) {
          batchDoneStatus = false;
        }
      });
      batch.markDone = batchDoneStatus;
    });
  }

  onScroll() {
    clearTimeout(this.scrollDebounce);
    this.scrollDebounce = setTimeout(() => {
      const DivElmnt2 = document.getElementsByClassName('batches-container')[0];
      this.currentPage = 1;
      const divs = this.getDivHeights();
      let adder = 0;
      for (let i = 0; i < divs.length; i++) {
        if (adder >= DivElmnt2.scrollTop) {
          this.currentPage = i + 1;
          break;
        }
        adder = adder + divs[i].divHeight;
      }
    }, 100);
  }
}
