import { NgModule, Component, ViewChild } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { DxDataGridModule, DxDataGridComponent } from "devextreme-angular";
import { Service, Employee, State } from "./app.service";

@Component({
  selector: "demo-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [Service]
})
export class AppComponent {
  dataSource: Employee[];
  states: State[];
  @ViewChild("gridContainer", { static: false }) dataGrid: DxDataGridComponent;
  public defaultVirtualConnectorMac = "02-00-00-00-00-00";

  constructor(service: Service) {
    this.dataSource = service.getEmployees();
    this.states = service.getStates();
  }

  public getNewFiscalizationId = () => {
    let dataGridInstance = this.dataGrid.instance;

    let editingIndex = dataGridInstance.getRowIndexByKey(
      dataGridInstance.option("editing.editRowKey")
    );
    console.log(editingIndex);
    this.dataGrid.instance.cellValue(editingIndex, "ClientId", "foo");
  };

  setCellValue = (newData, value) => {
    if (value === true) newData.ConnectorId = this.defaultVirtualConnectorMac;
    else newData.ConnectorId = "";

    newData.IsVirtual = value;
  };

  public onEditorPreparing(e) {}
}

@NgModule({
  imports: [BrowserModule, DxDataGridModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
