import { Component, EventEmitter, Output } from '@angular/core';
import { Task } from 'src/app/Task';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent {
  @Output() addTask: EventEmitter<Task> = new EventEmitter();

  emptyTask: Task = { text: '', day: '', reminder: false };
  task: Task = { ...this.emptyTask };
  showAddTask!: boolean;
  subscription: Subscription;
  constructor(private uiService: UiService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddTask = value));
  }
  onSubmit() {
    if (!this.task.text) {
      alert('Please add a Task!');
      return;
    }
    this.addTask.emit(this.task);
    this.task = { ...this.emptyTask };
  }
}
