import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "src/app/shared/employee.service";
import { NgForm } from "@angular/forms";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-employee",
  templateUrl: "./employee.component.html",
  styleUrls: ["./employee.component.css"],
})
export class EmployeeComponent implements OnInit {
  constructor(
    private service: EmployeeService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) form.resetForm();
    this.service.formData = {
      id: null,
      emp_ID: null,
      firstname: "",
      lastname: "",
    };
  }

  onSubmit(form: NgForm) {
    if (form.value.id == null) this.insertRecord(form);
    else this.updateRecord(form);
  }

  count = 0;

  insertRecord(form: NgForm) {
    this.service.postEmployee(form.value).subscribe((res) => {
      this.toastr.success("Inserted successfully", "EMP. Register");
      this.resetForm(form);
      this.service.refreshList();
    });

    for (var i = 0; i < 3; i++) {
      this.count++;
      console.log(this.count);
    }

    if (this.count > 0) location.reload();
  }

  updateRecord(form: NgForm) {
    this.service.putEmployee(form.value).subscribe((res) => {
      this.toastr.info("Updated successfully", "EMP. Register");
      this.resetForm(form);
      this.service.refreshList();
    });

    for (var i = 0; i < 3; i++) {
      this.count++;
      console.log(this.count);
    }

    if (this.count > 0) location.reload();
  }
}
