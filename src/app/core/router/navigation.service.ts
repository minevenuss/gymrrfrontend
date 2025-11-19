import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})

export class NavigationService {
    constructor(private router: Router) {}

    goToAuthLogin() {
        this.router.navigate(["/auth/login"]);

    }

    goToDashboard() {
        this.router.navigate(["/dashboard"]);
    }

    goToUserProfile(userId: string) {
        this.router.navigate([`/users/${userId}/profile`]);
    }
    goTo(path: string) {
        this.router.navigate([path]);
    }
    back() {
        window.history.back();
    }
}