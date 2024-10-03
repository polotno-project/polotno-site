import { Component } from "@angular/core";
import * as ReactDOM from "react-dom/client";
import * as React from "react";
import { App, store } from "./polotno/editor";
import { MobxAngularModule } from 'mobx-angular';


// inside the module you have access to "store" object.
//You can use any of its API to control the canvas from angular app
// for more methods take a look here:   https://polotno.com/docs/store-overview
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  standalone: true,
  imports: [MobxAngularModule],
})
export class AppComponent {
  title = "polotno-js";
  root: ReactDOM.Root | undefined;
  store = store;
  ngOnInit(): void {}

  public ngOnChanges() {
    this.renderComponent();
  }

  public ngAfterViewInit() {
    this.root = ReactDOM.createRoot(document.getElementById("editor"));
    this.renderComponent();
  }

  private renderComponent() {
    this.root.render(React.createElement(App));
  }

  public ngOnDestroy() {
    if (this.root) {
      this.root.unmount();
    }
  }
}
