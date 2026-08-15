import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  employee: Employee = {
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    jobTitle: ''
  };

  isEditMode = false;
  employeeId?: number;
  loading = false;
  error = '';

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.employeeId = +id;
      this.loading = true;
      this.employeeService.getById(this.employeeId).subscribe({
        next: (data) => {
          this.employee = data;
          this.loading = false;
        },
        error: () => {
          this.error = 'Failed to load employee.';
          this.loading = false;
        }
      });
    }
  }

  onSubmit(): void {
    this.loading = true;
    this.error = '';

    const request$ = this.isEditMode && this.employeeId
      ? this.employeeService.update(this.employeeId, this.employee)
      : this.employeeService.create(this.employee);

    request$.subscribe({
      next: () => this.router.navigate(['/employees']),
      error: (err) => {
        this.error = err.error?.message || 'Something went wrong.';
        this.loading = false;
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/employees']);
  }
}
