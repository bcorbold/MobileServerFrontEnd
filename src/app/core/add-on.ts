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

  constructor(name: string, type: string) {
    this.name = this.allowedTags.includes(name) ? name : null;
    this.type = this.allowedTypes.includes(type) ? type : null;
  }
}
