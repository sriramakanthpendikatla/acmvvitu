export const stats = [
  { value: 500, suffix: "+", label: "Members" },
  { value: 25, suffix: "+", label: "Events hosted" },
  { value: 8, suffix: " yrs", label: "Active since 2017", static: true },
];

export const featuredEvents = [
  { slug: "spardha", title: "Spardha", subtitle: "Technical fest", letter: "S", gradient: "from-brand to-navy" },
  { slug: "udgama", title: "Udgama", subtitle: "Hackathon", letter: "U", gradient: "from-brand to-navy" },
  { slug: "aavega", title: "Aavega", subtitle: "Speed event", letter: "A", gradient: "from-brand to-navy" },
  { slug: "tech-talk", title: "Tech Talk", subtitle: "Guest session", letter: "T", gradient: "from-brand to-navy" },
];

export const tickerItems = [
  "Udgama 1.0 — 200+ participants",
  "AUNSF 3.0 — 2nd place",
  "Hour of Code 2024",
  "VIVA VVIT 2024",
  "ACM global affiliation",
  "500+ members milestone",
];

export const coreTeam = [
  { initials: "CH", name: "Chairperson", role: "Leading the chapter", bio: "Oversees all chapter operations and sets the vision for the semester." },
  { initials: "VC", name: "Vice Chair", role: "Operations lead", bio: "Manages internal workflows across events and committees." },
  { initials: "SE", name: "Secretary", role: "Records & comms", bio: "Maintains meeting minutes and official correspondence." },
  { initials: "TR", name: "Treasurer", role: "Finance", bio: "Manages budgets, sponsorship funds, and financial reporting." },
  { initials: "WC", name: "Webmaster", role: "Digital presence", bio: "Builds and maintains the website and digital tools." },
  { initials: "PR", name: "PR Lead", role: "Outreach", bio: "Drives social media and campus partnerships." },
  { initials: "DS", name: "Design Lead", role: "Visual identity", bio: "Creates posters and brand assets for events." },
  { initials: "CO", name: "Content Lead", role: "Blog & media", bio: "Writes blog posts and manages the newsletter." },
];

export const timeline = [
  { year: 2017, text: "ACM VVIT chapter founded", past: true },
  { year: 2019, text: "First Udgama hackathon — 120 participants", past: true },
  { year: 2021, text: "ACM global recognition · Hour of Code", past: true },
  { year: 2022, text: "Spardha tech fest launched", past: true },
  { year: 2024, text: "AUNSF 3.0 — 2nd place nationwide", past: true },
  { year: 2025, text: "500+ members milestone · website v2", past: false },
];

export const upcomingEvents = [
  { day: 12, month: "Aug", title: "Webinar: Cloud 101", meta: "Online · 6:00 PM", countdown: "2025-08-12T18:00:00", soon: true },
  { day: 24, month: "Aug", title: "Udgama 2.0", meta: "Campus · All day", countdown: "2025-08-24T09:00:00", soon: false },
  { day: 5, month: "Sep", title: "Aavega Speed Event", meta: "Lab Block · 2:00 PM", countdown: "2025-09-05T14:00:00", soon: false },
];

export const blogPosts = [
  { tag: "AI/ML", title: "Getting started with neural networks", date: "Jun 10, 2025 · 5 min read", gradient: "from-[#1a3050] to-deep" },
  { tag: "Hackathon", title: "Udgama 1.0 — what we built", date: "May 28, 2025 · 4 min read", gradient: "from-[#2a1a40] to-deep" },
  { tag: "Career", title: "How to crack your first tech internship", date: "Apr 14, 2025 · 7 min read", gradient: "from-[#1a3540] to-deep" },
];

export const testimonials = [
  [
    { quote: "ACM VVIT opened doors I didn't know existed — from hackathons to real internships.", initials: "AK", name: "Aditya K.", role: "B.Tech CSE · 2024" },
    { quote: "Workshops here are miles ahead of classroom theory. Hands-on and industry-relevant.", initials: "PR", name: "Priya R.", role: "B.Tech AI&ML · 2025" },
    { quote: "Led a team at Udgama 2.0 and got placed at a startup right after. The network is real.", initials: "MS", name: "Manish S.", role: "Alumni · SDE at startup" },
  ],
  [
    { quote: "The mentorship from seniors during Spardha prep helped me land my first open-source contribution.", initials: "RK", name: "Rohit K.", role: "B.Tech CSE · 2025" },
    { quote: "Hour of Code volunteering showed me I love teaching — now I run workshops myself.", initials: "SN", name: "Sneha N.", role: "B.Tech IT · 2024" },
    { quote: "Being part of the core team taught me more about leadership than any course could.", initials: "VJ", name: "Vijay J.", role: "Former Secretary · 2023" },
  ],
];

export const faqs = [
  { q: "Who can join ACM VVIT?", a: "Any student enrolled at VVIT University — regardless of branch or year. No prior coding experience required." },
  { q: "How do I register for events?", a: "Visit the Events page, pick an event, and click Register. You'll receive a confirmation email within 24 hours." },
  { q: "Is there a membership fee?", a: "ACM VVIT membership is free for all VVIT students. Some flagship events may have a nominal registration fee." },
  { q: "Can I join mid-semester?", a: "Absolutely. We welcome new members throughout the year. Reach out via Contact or attend any upcoming event." },
];

export const alumni = [
  { initials: "NK", name: "Nikhil K.", role: "SDE II", company: "Amazon" },
  { initials: "DP", name: "Divya P.", role: "ML Engineer", company: "Google" },
  { initials: "SR", name: "Sai R.", role: "Backend Dev", company: "Zoho" },
  { initials: "TV", name: "Tejal V.", role: "Data Scientist", company: "Microsoft" },
  { initials: "RB", name: "Rahul B.", role: "Founder", company: "Startup" },
  { initials: "KM", name: "Kavya M.", role: "DevOps Eng.", company: "Infosys" },
  { initials: "PS", name: "Pranav S.", role: "Full-stack Dev", company: "TCS" },
  { initials: "AA", name: "Ananya A.", role: "Product Mgr", company: "Flipkart" },
];

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/members", label: "Members" },
  { href: "/events", label: "Events" },
  { href: "/calendar", label: "Calendar" },
  { href: "/contact", label: "Contact" },
];

export const allEvents = [
  { id: "udgama-2", title: "Udgama 2.0", date: "2025-08-24", venue: "Campus · All day", status: "upcoming", category: "hackathon", letter: "U", gradient: "from-[#2a1f4e] to-deep" },
  { id: "cloud-101", title: "Webinar: Cloud 101", date: "2025-08-12", venue: "Online · 6:00 PM", status: "upcoming", category: "workshop", letter: "C", gradient: "from-[#1a3a5c] to-deep" },
  { id: "aavega", title: "Aavega Speed Event", date: "2025-09-05", venue: "Lab Block · 2:00 PM", status: "upcoming", category: "competition", letter: "A", gradient: "from-[#1f3d3a] to-deep" },
  { id: "spardha-24", title: "Spardha 2024", date: "2024-10-12", venue: "Technical fest · 300+ attendees", status: "past", category: "hackathon", letter: "S", gradient: "from-[#3a2a1a] to-deep" },
  { id: "udgama-1", title: "Udgama 1.0", date: "2024-06-15", venue: "Hackathon · 200+ participants", status: "past", category: "hackathon", letter: "U", gradient: "from-[#2a2040] to-deep" },
  { id: "hoc-24", title: "Hour of Code 2024", date: "2024-12-10", venue: "Outreach · Campus-wide", status: "past", category: "workshop", letter: "H", gradient: "from-[#1a3540] to-deep" },
];

export const members = [
  ...coreTeam.map((m, i) => ({ ...m, category: "core", batch: "2025", id: `core-${i}` })),
  { id: "m1", initials: "AK", name: "Aditya K.", role: "CSE · 2025", category: "2025", batch: "2025", bio: "" },
  { id: "m2", initials: "PR", name: "Priya R.", role: "AI&ML · 2025", category: "2025", batch: "2025", bio: "" },
  { id: "m3", initials: "RK", name: "Rohit K.", role: "CSE · 2024", category: "2024", batch: "2024", bio: "" },
  { id: "m4", initials: "SN", name: "Sneha N.", role: "IT · 2024", category: "2024", batch: "2024", bio: "" },
];
