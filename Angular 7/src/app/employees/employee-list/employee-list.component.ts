import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "src/app/shared/employee.service";
import { Employee } from "src/app/shared/employee.model";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.css"],
})
export class EmployeeListComponent implements OnInit {
  constructor(
    private service: EmployeeService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.service.refreshList().subscribe((m) => {
      this.service.list = m;
    });
  }

  populateForm(emp: Employee) {
    this.service.formData = Object.assign({}, emp);
  }

  count = 0;

  onDelete(id: number) {
    this.service.deleteEmployee(id).subscribe((res) => {
      this.service.refreshList();
      this.toastr.warning("Deleted successfully", "EMP. Register");
    });
    for (var i = 0; i < 3; i++) {
      this.count++;
      console.log(this.count);
    }

    if (this.count > 0) location.reload();
  }
}
