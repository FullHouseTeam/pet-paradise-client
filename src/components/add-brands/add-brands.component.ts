import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from "@angular/material/input";
import { OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-add-brands',
  standalone: true,
  imports: [CommonModule, MatInputModule],
  templateUrl: './add-brands.component.html',
  styleUrls: ['./add-brands.component.scss']
})

export class AddBrandsComponent implements OnInit {
  files: any = [];
  imagePreview: string = '';

  constructor(
      private sanitizer: DomSanitizer,
      ) {
  }

  ngOnInit() {
  }

  catchFile(event: any) {
    const caughtFile = event.target.files[0];

    if (this.isValidImageFile(caughtFile)) {
      this.extractBase64(caughtFile).then((image: any) => {
        this.imagePreview = image.base;
      })
      this.files.push(caughtFile);
    }
  }

  extractBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const image = this.sanitizer.bypassSecurityTrustUrl($event);
      const reader = new FileReader();

      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };

      reader.onerror = error => {
        reject(error);
      };

      reader.readAsDataURL($event);
    } catch (e) {
      reject(e);
    }
  });


  isValidImageFile(file: File): boolean {
    const allowedExtensions = ['.jpg', '.jpeg'];
    const fileName = file.name.toLowerCase();
    return allowedExtensions.some(ext => fileName.endsWith(ext));
  }

  uploadImage() {
  }
}
