import { Component, Inject, Input, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faTimes, faVideo } from '@fortawesome/free-solid-svg-icons';
import { IBatchSession } from '../../core/models/BatchSession';

@Component({
    selector: 'app-videoframe',
    imports: [FontAwesomeModule],
    templateUrl: './videoframe.html',
    styleUrl: './videoframe.css',
})
export class Videoframe {

    url: string;
    @Input() videoId!: string;
    safeUrl!: SafeResourceUrl;

    object: IBatchSession;

    faVideo = faVideo;
    faTimes = faTimes;

    constructor(@Optional() public dialogRef: MatDialogRef<Videoframe>, @Inject(MAT_DIALOG_DATA) data: IBatchSession, private sanitizer: DomSanitizer) {
        this.object = data;
        this.url = this.object.youtubeVideoId;
        this.videoId = this.getVideoId(this.url);
    }

    getVideoId(url: string): string {
        const regExp = /(?:youtube\.com\/(?:.*v=|.*\/)|youtu\.be\/)([^"&?\/\s]{11})/;
        const match = url.match(regExp);
        return match ? match[1] : '';
    }

    ngOnInit() {
        const url = `https://www.youtube.com/embed/${this.videoId}`;
        this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

}
