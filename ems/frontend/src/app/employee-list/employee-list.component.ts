import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[] = [];
  searchQuery = '';
  loading = false;
  error = '';

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.loading = true;
    this.employeeService.getAll(this.searchQuery || undefined).subscribe({
      next: (data) => {
        this.employees = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load employees.';
        this.loading = false;
      }
    });
  }

  onSearch(): void {
    this.loadEmployees();
  }

  onEdit(id: number | undefined): void {
    if (id) this.router.navigate(['/employees/edit', id]);
  }

  onDelete(id: number | undefined): void {
    if (!id) return;
    if (confirm('Delete this employee?')) {
      this.employeeService.delete(id).subscribe({
        next: () => this.loadEmployees(),
        error: () => this.error = 'Failed to delete employee.'
      });
    }
  }

  onAdd(): void {
    this.router.navigate(['/employees/new']);
  }
}
