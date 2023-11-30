import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { Router } from "@angular/router";
import { CommonService } from "../../../services/shared/assets/common.service";

@Component({
  selector: "pet-paradise-client-footer",
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent {
  constructor(private router: Router, private commonService: CommonService) {}

  redirectTo(route: string) {
    this.router.navigate([`/${route}`]);
  }
  redirectToSocialMedia(url: string): void {
    window.open(url, "_blank");
  }

  getIconPath(iconName: string): string {
    return this.commonService.getIconPath(iconName);
  }
}
