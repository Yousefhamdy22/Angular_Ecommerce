import { Component , OnInit } from '@angular/core';
import { trigger, transition, style, animate, query, stagger } from "@angular/animations"
@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
  animations: [
    trigger("fadeIn", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateY(20px)" }),
        animate("600ms ease-out", style({ opacity: 1, transform: "translateY(0)" })),
      ]),
    ]),
    trigger("staggerFadeIn", [
      transition("* => *", [
        query(
          ":enter",
          [
            style({ opacity: 0, transform: "translateY(30px)" }),
            stagger("150ms", [animate("600ms ease-out", style({ opacity: 1, transform: "translateY(0)" }))]),
          ],
          { optional: true },
        ),
      ]),
    ]),
  ],
})
export class AboutComponent implements OnInit {
  teamMembers = [
    {
      name: "Sarah Johnson",
      position: "Founder & CEO",
      bio: "With over 15 years in the beauty industry, Sarah founded our company with a vision to create natural, effective skincare accessible to everyone.",
      image: "assets/images/team/sarah.jpg",
      social: {
        linkedin: "#",
        twitter: "#",
        instagram: "#",
      },
    },
    {
      name: "Michael Chen",
      position: "Chief Product Officer",
      bio: "Michael leads our product development team, bringing his background in biochemistry and passion for sustainable formulations to every product we create.",
      image: "assets/images/team/michael.jpg",
      social: {
        linkedin: "#",
        twitter: "#",
        instagram: "#",
      },
    },
    {
      name: "Amara Patel",
      position: "Creative Director",
      bio: "Amara oversees our brand identity and creative vision, ensuring that our aesthetic reflects our commitment to natural beauty and sustainability.",
      image: "assets/images/team/amara.jpg",
      social: {
        linkedin: "#",
        twitter: "#",
        instagram: "#",
      },
    },
    {
      name: "David Rodriguez",
      position: "Head of Research",
      bio: "With a PhD in Dermatology, David leads our research initiatives, constantly exploring new ingredients and technologies for effective skincare.",
      image: "assets/images/team/david.jpg",
      social: {
        linkedin: "#",
        twitter: "#",
        instagram: "#",
      },
    },
  ]

  // Company values
  companyValues = [
    {
      title: "Natural Ingredients",
      description:
        "We source the highest quality natural ingredients, carefully selected for their effectiveness and sustainability.",
      icon: "pi pi-leaf",
    },
    {
      title: "Cruelty-Free",
      description:
        "We never test on animals and are proudly certified cruelty-free by leading international organizations.",
      icon: "pi pi-heart",
    },
    {
      title: "Eco-Friendly",
      description:
        "Our packaging is made from recycled or biodegradable materials, minimizing our environmental footprint.",
      icon: "pi pi-globe",
    },
    {
      title: "Transparency",
      description:
        "We believe in complete transparency about our ingredients, sourcing practices, and manufacturing processes.",
      icon: "pi pi-check-circle",
    },
  ]

  // Testimonials
  testimonials = [
    {
      quote:
        "I've tried countless skincare brands, but nothing compares to the results I've seen with these products. My skin has never looked better!",
      author: "Emma S.",
      location: "New York, NY",
      image: "assets/images/testimonials/emma.jpg",
    },
    {
      quote:
        "What I love most is knowing exactly what I'm putting on my skin. The transparency about ingredients gives me such peace of mind.",
      author: "James T.",
      location: "Portland, OR",
      image: "assets/images/testimonials/james.jpg",
    },
    {
      quote:
        "As someone with sensitive skin, finding products that don't cause irritation is challenging. This line has been a game-changer for me.",
      author: "Sophia L.",
      location: "Chicago, IL",
      image: "assets/images/testimonials/sophia.jpg",
    },
  ]

  // Milestones
  milestones = [
    {
      year: "2015",
      title: "Company Founded",
      description: "Started in a small lab with just three signature products",
    },
    {
      year: "2017",
      title: "Eco Certification",
      description: "Received our first eco-friendly and sustainable certifications",
    },
    {
      year: "2019",
      title: "International Expansion",
      description: "Expanded to European and Asian markets",
    },
    {
      year: "2021",
      title: "Innovation Award",
      description: "Recognized for our breakthrough natural preservation system",
    },
    {
      year: "2023",
      title: "Carbon Neutral",
      description: "Achieved carbon neutrality across all operations",
    },
  ]

  // Stats
  stats = [
    { value: "1M+", label: "Happy Customers" },
    { value: "50+", label: "Countries" },
    { value: "100%", label: "Natural Ingredients" },
    { value: "0", label: "Animal Testing" },
  ]

  responsiveOptions = [
    {
      breakpoint: "1024px",
      numVisible: 3,
    },
    {
      breakpoint: "768px",
      numVisible: 2,
    },
    {
      breakpoint: "560px",
      numVisible: 1,
    },
  ]

  constructor() {}

  ngOnInit(): void {
    // Initialize any needed data
  }
}
