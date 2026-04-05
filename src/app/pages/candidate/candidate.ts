import { Component, inject, OnDestroy, OnInit, signal, computed } from '@angular/core';
import { CandidateService } from '../../core/services/candidate-service';
import { faBan, faCalendar, faCheck, faCheckCircle, faCog, faEdit, faEnvelope, faEye, faHashtag, faPhone, faPlus, faSearch, faTag, faTimesCircle, faToggleOn, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { StatusPipe } from "../../shared/pipe/status-pipe";
import { IUser } from '../../core/models/Candidate';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Addeditcandidate } from '../addeditcandidate/addeditcandidate';
import { Deletecandidate } from '../deletecandidate/deletecandidate';
import { PaginationComponent } from "../../shared/components/pagination/pagination";
import { Authuser } from '../../core/services/authuser';

@Component({
    selector: 'app-candidate',
    imports: [FontAwesomeModule, StatusPipe, CommonModule, PaginationComponent],
    templateUrl: './candidate.html',
    styleUrl: './candidate.css',
})
export class Candidate implements OnInit {

    faHashtag = faHashtag;
    faUser = faUser;
    faEnvelope = faEnvelope;
    faToggleOn = faToggleOn;
    faCog = faCog;
    faCheckCircle = faCheckCircle;
    faBan = faBan;
    faEye = faEye;
    faEdit = faEdit;
    faTrash = faTrash;
    faPhone = faPhone;
    faTimesCircle = faTimesCircle;
    faSearch = faSearch;
    faPlus = faPlus;
    faTag = faTag;
    faCalendar = faCalendar;
    candidateService = inject(CandidateService);

    authUser = inject(Authuser);

    ngOnInit() {
        this.candidateService.getCandidates();
    }
    constructor(private dialog: MatDialog) { }

    addEditCandidate(candidate: IUser | undefined) {
        const dialogRef = this.dialog.open(Addeditcandidate, {
            data: candidate ? candidate : undefined,
            width: '80%',
            minHeight: '80%',
            enterAnimationDuration: '100ms',
            exitAnimationDuration: '100ms'
        });
        dialogRef.afterClosed().subscribe((result) => {
            result ? this.candidateService.getCandidates() : null;
        });
    }

    deleteCandidate(candidate: IUser) {
        const dialogRef = this.dialog.open(Deletecandidate, {
            data: candidate,
            width: '80%',
            minHeight: '80%',
            enterAnimationDuration: '100ms',
            exitAnimationDuration: '100ms'
        });

        dialogRef.afterClosed().subscribe((result) => {
            result ? this.candidateService.getCandidates() : null;
        });
    }

    currentPage = signal(1);
    pageSize = signal(5);

    paginatedCandidateList = computed(() => {
        const startIndex = (this.currentPage() - 1) * this.pageSize();
        const endIndex = startIndex + this.pageSize();
        return this.candidateService.candidatesList().slice(startIndex, endIndex);
    });

    onPageChange(page: number) {
        this.currentPage.set(page);
    }

}
