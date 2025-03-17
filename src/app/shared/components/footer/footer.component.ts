import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone:false,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  email = ""
  languages = [
    { name: "English", code: "en" },
    { name: "Arabic", code: "ar" },
    { name: "French", code: "fr" },
    { name: "German", code: "de" },
    { name: "Spanish", code: "es" },
  ]

  currencies = [
    { name: "EGP - Egyptian Pound", code: "EGP" },
    { name: "USD - US Dollar", code: "USD" },
    { name: "EUR - Euro", code: "EUR" },
    { name: "GBP - British Pound", code: "GBP" },
  ]

  selectedLanguage = this.languages[0]
  selectedCurrency = this.currencies[0]

  currentYear = new Date().getFullYear()

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  subscribe() {
    if (this.email) {
      // Implement subscription logic
      console.log("Subscribing email:", this.email)
      this.email = ""
      // Show success message
    }
  }
}