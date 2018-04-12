import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { CalendarModule } from "primeng/calendar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/components/button/button";
import { DialogModule } from "primeng/components/dialog/dialog";
import { TableModule } from "primeng/components/table/table";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  imports: [CommonModule],
  declarations: [],
  exports: [
    TableModule,
    DialogModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CalendarModule,
    ConfirmDialogModule,
    HttpClientModule,

  ]
})
export class SharedModule {}
