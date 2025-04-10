import { Component  , type OnInit} from '@angular/core';
import { FormBuilder, type FormGroup, Validators } from "@angular/forms"
import { MessageService } from "primeng/api"
@Component({
  selector: 'app-contact',
 standalone: false,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup
  submitted = false
  loading = false
  
  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
  // Contact information
  contactInfo = [
    {
      icon: "pi pi-map-marker",
      title: "Our Location",
      details: ["123 Beauty Boulevard", "San Francisco, CA 94103", "United States"],
      action: {
        label: "Get Directions",
        link: "https://maps.google.com",
      },
    },
    {
      icon: "pi pi-phone",
      title: "Phone Numbers",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
      action: {
        label: "Call Us",
        link: "tel:+15551234567",
      },
    },
    {
      icon: "pi pi-envelope",
      title: "Email Us",
      details: ["customer.care@yourbeautyshop.com", "support@yourbeautyshop.com"],
      action: {
        label: "Send Email",
        link: "mailto:customer.care@yourbeautyshop.com",
      },
    },
    {
      icon: "pi pi-clock",
      title: "Working Hours",
      details: ["Monday - Friday: 9AM - 6PM", "Saturday: 10AM - 4PM", "Sunday: Closed"],
      action: {
        label: "Book Appointment",
        link: "#appointment",
      },
    },
  ]

  // FAQ items
  faqItems = [
    {
      question: "How long does shipping take?",
      answer:
        "Standard shipping typically takes 3-5 business days within the continental US. International shipping can take 7-14 business days depending on the destination country.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day satisfaction guarantee. If you're not completely satisfied with your purchase, you can return it within 30 days for a full refund or exchange.",
    },
    {
      question: "Are your products suitable for sensitive skin?",
      answer:
        "Many of our products are formulated for sensitive skin, but we always recommend checking the specific product details or consulting with a dermatologist if you have specific concerns.",
    },
    {
      question: "Do you offer samples?",
      answer:
        "Yes! We offer sample sizes of most products. You can add samples to your order during checkout, or contact our customer service team to request specific samples.",
    },
    {
      question: "Are your products cruelty-free?",
      answer:
        "Absolutely. We are proudly certified cruelty-free by Leaping Bunny and PETA. We never test on animals and do not work with suppliers who conduct animal testing.",
    },
  ]

  // Social media links
  socialLinks = [
    { icon: "pi pi-facebook", name: "Facebook", url: "https://facebook.com" },
    { icon: "pi pi-instagram", name: "Instagram", url: "https://instagram.com" },
    { icon: "pi pi-twitter", name: "Twitter", url: "https://twitter.com" },
    { icon: "pi pi-youtube", name: "YouTube", url: "https://youtube.com" },
    { icon: "pi pi-pinterest", name: "Pinterest", url: "https://pinterest.com" },
  ]

  // Form dropdown options
  inquiryTypes = [
    { name: "Product Information", code: "product" },
    { name: "Order Status", code: "order" },
    { name: "Returns & Exchanges", code: "returns" },
    { name: "Website Issues", code: "website" },
    { name: "Partnership Opportunities", code: "partnership" },
    { name: "Other", code: "other" },
  ]

  selectedInquiryType: any = null

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
  ) {
    this.contactForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(2)]],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", Validators.pattern("^[0-9]{10,15}$")],
      inquiryType: [null, Validators.required],
      orderNumber: [""],
      message: ["", [Validators.required, Validators.minLength(10)]],
    })
  }

  ngOnInit(): void {}

  // Form submission
  onSubmit() {
    this.submitted = true

    if (this.contactForm.invalid) {
      return
    }

    this.loading = true

    // Simulate API call
    setTimeout(() => {
      this.loading = false
      this.messageService.add({
        severity: "success",
        summary: "Message Sent",
        detail: "Thank you for contacting us. We'll respond to your inquiry as soon as possible.",
      })
      this.resetForm()
    }, 1500)
  }

  resetForm() {
    this.submitted = false
    this.contactForm.reset()
    this.selectedInquiryType = null
  }

  // Helper methods for form validation
  get f() {
    return this.contactForm.controls
  }

  isFieldInvalid(field: string) {
    return this.submitted && this.f[field].errors
  }

  getErrorMessage(field: string, errorType: string) {
    switch (errorType) {
      case "required":
        return "This field is required"
      case "email":
        return "Please enter a valid email address"
      case "minlength":
        return `Minimum length is ${this.f[field].errors?.["minlength"].requiredLength} characters`
      case "pattern":
        return "Please enter a valid phone number"
      default:
        return "Invalid input"
    }
  }
}
