export class AddOn {
  private allowedTags: [string] = [
    'milk',
    'cream',
    'sugar',
    'sweetener',
    'ice',
    'bag in'
  ];
  private allowedTypes: [string] = [
    'number',
    'boolean'
  ];

  name: string;
  type: string;

  static milk(): AddOn {
    return new AddOn('milk', 'number');
  }

  static cream(): AddOn {
    return new AddOn('cream', 'number');
  }

  static sugar(): AddOn {
    return new AddOn('sugar', 'number');
  }

  static sweetener(): AddOn {
    return new AddOn('sweetener', 'number');
  }

  static ice(): AddOn {
    return new AddOn('ice', 'boolean');
  }

  static bagIn(): AddOn {
    return new AddOn('bag in', 'boolean');
  }

  constructor(name: string, type: string) {
    this.name = this.allowedTags.includes(name) ? name : null;
    this.type = this.allowedTypes.includes(type) ? type : null;
  }

}
