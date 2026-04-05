import { Component, Inject, inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { faCheckCircle, faEnvelope, faPhone, faPlus, faTimes, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IUser } from '../../core/models/Candidate';
import { CandidateService } from '../../core/services/candidate-service';

@Component({
    selector: 'app-addeditcandidate',
    imports: [ReactiveFormsModule, FontAwesomeModule],
    templateUrl: './addeditcandidate.html',
    styleUrl: './addeditcandidate.css',
})
export class Addeditcandidate {

    candidateForm: FormGroup;
    formBuilder = inject(FormBuilder);
    candidateService = inject(CandidateService);

    faPlus = faPlus;
    faTimes = faTimes;
    faUser = faUser;
    faEnvelope = faEnvelope;
    faPhone = faPhone;
    faCheckCircle = faCheckCircle;

    isEdit: boolean = false;

    constructor(@Optional() public dialogRef: MatDialogRef<Addeditcandidate>, @Inject(MAT_DIALOG_DATA) public dialogData: IUser) {
        this.candidateForm = this.formBuilder.group({
            _id: undefined,
            fullName: ['', [Validators.required]],
            email: ['', [Validators.required]],
            mobileNumber: ['', [Validators.required]],
            password: ['',],
            role: ['', [Validators.required]],
            isActive: [true, [Validators.required]],
            createdAt: [new Date()],
            updatedAt: [new Date()]
        });
        if (this.dialogData && this.dialogData._id !== undefined) {
            this.isEdit = true;
            this.candidateService.getCandidateById(this.dialogData._id, (data: IUser) => {
                this.candidateForm.patchValue({
                    ...data
                });
            });
        }
    }

    addeditcandidate() {
        const payload = this.candidateForm.value;
        if(!this.isEdit){
            delete payload._id;
        }
        this.candidateService.addEditCandidate(payload, () => {
            this.dialogRef.close(true);
        });
    }

}
