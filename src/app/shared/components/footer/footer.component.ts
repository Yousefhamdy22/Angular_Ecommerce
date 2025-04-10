import { Component } from '@angular/core';
import { trigger, transition, style, animate, stagger, query } from '@angular/animations';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('staggerIn', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger('100ms', [
            animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class FooterComponent {
  email = '';
  currentYear = new Date().getFullYear();
  
  // Company Information
  companyInfo = {
    name: 'GLAMGLOW Cosmetics',
    address: '123 Beauty Lane, Suite 500',
    city: 'New York, NY 10001',
    phone: '+1 (800) 555-1234',
    email: 'hello@glamglow.com'
  };
  
  // Footer Links
  shopLinks = [
    { name: 'Skincare', link: '/products/skincare' },
    { name: 'Makeup', link: '/products/makeup' },
    { name: 'Haircare', link: '/products/haircare' },
    { name: 'Fragrance', link: '/products/fragrance' },
    { name: 'Bath & Body', link: '/products/bath-body' },
    { name: 'Gift Sets', link: '/products/gift-sets' }
  ];
  
  aboutLinks = [
    { name: 'Our Story', link: '/about' },
    { name: 'Sustainability', link: '/sustainability' },
    { name: 'Ingredients', link: '/ingredients' },
    { name: 'Careers', link: '/careers' },
    { name: 'Press', link: '/press' }
  ];
  
  helpLinks = [
    { name: 'Contact Us', link: '/contact' },
    { name: 'FAQs', link: '/faqs' },
    { name: 'Shipping & Returns', link: '/shipping-returns' },
    { name: 'Track Order', link: '/track-order' },
    { name: 'Privacy Policy', link: '/privacy-policy' },
    { name: 'Terms of Service', link: '/terms-of-service' }
  ];
  
  // Social Media Links
  socialLinks = [
    { name: 'Instagram', icon: 'pi pi-instagram', link: 'https://instagram.com' },
    { name: 'Facebook', icon: 'pi pi-facebook', link: 'https://facebook.com' },
    { name: 'Twitter', icon: 'pi pi-twitter', link: 'https://twitter.com' },
    { name: 'Pinterest', icon: 'pi pi-pinterest', link: 'https://pinterest.com' },
    { name: 'YouTube', icon: 'pi pi-youtube', link: 'https://youtube.com' }
  ];
  
  // Payment Methods
  paymentMethods = [
    { name: 'Visa', image: 'assets/images/payment/visa.svg' },
    { name: 'Mastercard', image: 'assets/images/payment/mastercard.svg' },
    { name: 'American Express', image: 'assets/images/payment/amex.svg' },
    { name: 'PayPal', image: 'assets/images/payment/paypal.svg' },
    { name: 'Apple Pay', image: 'assets/images/payment/apple-pay.svg' }
  ];

  subscribeNewsletter() {
    if (this.email && this.validateEmail(this.email)) {
      // In a real app, you would call a service to subscribe the email
      console.log(`Subscribing email: ${this.email}`);
      this.email = '';
      // Show success message
    } else {
      // Show error message
    }
  }

  validateEmail(email: string): boolean {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  }




}

