import { Component, Inject, inject, OnInit, Optional } from '@angular/core';
import { IBatchEnrollment } from '../../core/models/BatchEnrollment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faCalendarAlt, faCheckCircle, faLayerGroup, faPlus, faTimes, faUser } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BatchService } from '../../core/services/batches';
import { CandidateService } from '../../core/services/candidate-service';
import { BatchEnrollmentService } from '../../core/services/batch-enrollment-service';
import { formatDate } from '../../shared/utils/utilityFunctions';

@Component({
  selector: 'app-add-edit-batch-enrollment',
  imports: [ReactiveFormsModule,FontAwesomeModule],
  templateUrl: './add-edit-batch-enrollment.html',
  styleUrl: './add-edit-batch-enrollment.css',
})
export class AddEditBatchEnrollment implements OnInit{

  faPlus =faPlus;
  faTimes = faTimes;
  faCheckCircle = faCheckCircle;
  faCalendarAlt = faCalendarAlt;
  faLayerGroup = faLayerGroup;
  faUser = faUser;

  
  enrollForm!: FormGroup;
  fb = inject(FormBuilder);
  batchService = inject(BatchService);
  candidateService = inject(CandidateService);
  batchEnrollService = inject(BatchEnrollmentService);

  isEdit: boolean = false;
  
  constructor(@Optional() public dialogRef: MatDialogRef<IBatchEnrollment>, @Inject(MAT_DIALOG_DATA) public dialogData: number) {
    this.initalizeForm();
    if (dialogData) {
      this.isEdit = true;
      this.batchEnrollService.getEnrollmentById(dialogData, (data) => {
        this.enrollForm.patchValue({...data, enrollmentDate: formatDate(data.enrollmentDate)});
      });
    }
   }

   initalizeForm(){
    this.enrollForm = this.fb.group({
      _id: undefined,
      batchId: [''],
      candidateId: [''],
      enrollmentDate: [''],
      isActive: [true],
    })
   }

  ngOnInit() {
    this.batchService.getBatches();
    this.candidateService.getCandidates();
  }

   submitForm(){
    this.batchEnrollService.addEditEnrollForm(this.enrollForm.value, () => {
      this.dialogRef?.close(true);
    });
   }
}
