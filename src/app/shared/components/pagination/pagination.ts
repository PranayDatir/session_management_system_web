import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'pagination',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './pagination.html',
    styleUrls: ['./pagination.css']
})
export class PaginationComponent implements OnChanges {
    @Input() totalItems: number = 0;
    @Input() pageSize: number = 10;
    @Input() currentPage: number = 1;
    @Output() pageChange = new EventEmitter<number>();

    totalPages: number = 0;
    visiblePages: (number | string)[] = [];

    ngOnChanges(changes: SimpleChanges) {
        if (changes['totalItems'] || changes['pageSize'] || changes['currentPage']) {
            this.totalPages = Math.ceil(this.totalItems / this.pageSize);
            console.log(this.totalPages, "total pages");
            // Ensure totalPages is at least 0
            if (this.totalPages < 0) this.totalPages = 0;
            this.updateVisiblePages();
        }
    }

    updateVisiblePages() {
        const total = this.totalPages;
        const current = this.currentPage;

        if (total <= 7) {
            this.visiblePages = Array.from({ length: total }, (_, i) => i + 1);
            return;
        }

        // Logic for ellipses
        if (current <= 4) {
            this.visiblePages = [1, 2, 3, 4, 5, '...', total];
        } else if (current >= total - 3) {
            this.visiblePages = [1, '...', total - 4, total - 3, total - 2, total - 1, total];
        } else {
            this.visiblePages = [1, '...', current - 1, current, current + 1, '...', total];
        }
    }

    onPageClick(page: number | string) {
        if (typeof page === 'number') {
            if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
                this.pageChange.emit(page);
            }
        }
    }

    onPrev() {
        if (this.currentPage > 1) {
            this.pageChange.emit(this.currentPage - 1);
        }
    }

    onNext() {
        if (this.currentPage < this.totalPages) {
            this.pageChange.emit(this.currentPage + 1);
        }
    }
}
