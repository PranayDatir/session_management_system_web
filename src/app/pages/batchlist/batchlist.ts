import { Component, computed, inject, signal } from '@angular/core';
import { BatchService } from '../../core/services/batches';
import { RouterLink } from '@angular/router';
import { Authuser } from '../../core/services/authuser';
import { BatchEnrollmentService } from '../../core/services/batch-enrollment-service';
import { Search } from '../../core/services/search';
import { PaginationComponent } from "../../shared/components/pagination/pagination";

@Component({
  selector: 'app-batchlist',
  imports: [RouterLink, PaginationComponent],
  templateUrl: './batchlist.html',
  styleUrl: './batchlist.css',
})
export class Batchlist {
  batchService = inject(BatchService);
  authUser = inject(Authuser);
  batchEnrollmentService = inject(BatchEnrollmentService);
  searchService = inject(Search);
  batcheService = inject(BatchService);
  currentPage = signal(1);
  pageSize = signal(8);
  currentCandidatePage = signal(1);
  candidatePageSize = signal(8);


  ngOnInit() {
    if (this.authUser.user.role === 'Super Admin') {
      this.batchService.getBatches();
    }
    else {
      this.batchEnrollmentService.getEnrollmentByCandidateId(this.authUser.user._id!);
    }
    this.searchService.search$.subscribe(searchTerm => {
      this.applySearch(searchTerm ?? '');
    });
  }

  applySearch(searchTerm: string) {
    const allBatches = this.batcheService.allBatchData();

    if (!searchTerm.trim()) {
      this.batcheService.batchData.set(allBatches);
      return;
    }

    const filtered = allBatches.filter(batch =>
      batch.batchName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      batch.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    this.batcheService.batchData.set(filtered);
    this.currentPage.set(1);
  }

  paginatedBatches = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.pageSize();
    const endIndex = startIndex + this.pageSize();
    return this.batchService.batchData().slice(startIndex, endIndex);
  });

  onPageChange(page: number) {
    this.currentPage.set(page);
  }

  paginatedCandidateBatches = computed(() => {
    const startIndex = (this.currentCandidatePage() - 1) * this.candidatePageSize();
    const endIndex = startIndex + this.candidatePageSize();
    return this.batchEnrollmentService.enrollmentListByCandidateID().slice(startIndex, endIndex);
  });

  onCandidatePageChange(page: number) {
    this.currentCandidatePage.set(page);
  }
}
