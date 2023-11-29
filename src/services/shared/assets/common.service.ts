import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private readonly iconPath = 'assets/icons/';
  private readonly imagePath = 'assets/images/';

  getIconPath(iconName: string): string {
    return `${this.iconPath}${iconName}`;
  }

  getImagePath(imageName: string): string {
    return `${this.imagePath}${imageName}`;
  }
}
