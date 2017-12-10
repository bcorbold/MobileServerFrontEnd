import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Components } from './components';

@Component({
  selector: 'ms-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit {

  componentPaths = [];

  constructor(private router: Router) {}

  ngOnInit() {
    const components = new Components();
    components.components.forEach(component => {
      this.componentPaths.push(component.path);
    });
  }

  onSelectComponent(componentPath: string) {
    this.router.navigate(['component-catalogue/' + componentPath]);
  }
}
