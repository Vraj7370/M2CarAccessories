// ============================================================
// M2 CAR ACCESSORIES — ALL BUSINESS DATA
// ============================================================

export const SITE_CONFIG = {
  name: "M2 Car Accessories",
  ownerName: "Mann Patel",
  tagline: "ELEVATE YOUR RIDE",
  city: "Himmatnagar",
  state: "Gujarat",
  yearEstablished: "2024",
  phone1: "+91 81559 35351",
  phonePlain: "918155935351",   // for WhatsApp — country code + number, no spaces/+
  email: "mannpatel@m2caraccessories.com", // REPLACE with actual email
  address: "Shop No. 07, 08, Motipura, Near Avishkar Hospital, Himmatnagar, Gujarat - 383001",
  googleMapsUrl: "https://maps.app.goo.gl/KsfpZYXQucxQYkLY6?g_st=ic",
  instagram: "m2_car_accessories_",
  facebook: "https://facebook.com/m2caraccessories",
  youtube: "#",
  hours: {
    weekdays: "Monday – Saturday: 10:00 AM – 8:00 PM",
    sunday: "Sunday: Holiday",
  },
  // EmailJS config — create free account at emailjs.com
  // REPLACE these 3 values after setting up EmailJS
  emailjs: {
    serviceId: "service_m2cars",
    appointmentTemplateId: "template_appointment",
    contactTemplateId: "template_contact",
    publicKey: "YOUR_EMAILJS_PUBLIC_KEY",
  },
  stats: [
    { num: "500+", label: "Products" },
    { num: "200+", label: "Happy Clients" },
    { num: "16+", label: "Premium Brands" },
    { num: "4+", label: "Years Experience" },
  ],
};

export const CATEGORIES = [
  {
    id: "interior",
    name: "Interior Accessories",
    icon: "🪑",
    count: 13,
    image: "https://i1-e.pinimg.com/736x/1c/ef/f6/1ceff602b48c0dadede11a13decba303.jpg",

    items: ["Seat Covers","Steering Covers","Car Mats","Neck Pillows","Arm Rest","Dashboard Covers","Ambient Lighting","Car Perfumes","Mobile Holders","Sun Shades","Gear Knobs","Seat Cushions","Foot Lights"],
    desc: "Transform your cabin with premium grade interior accessories crafted for comfort and style.",
  },
  {
    id: "exterior",
    name: "Exterior Accessories",
    icon: "🚗",
    count: 12,
    image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&q=90",
    items: ["Body Kits","Chrome Garnish","Spoilers","Door Visors","Mud Flaps","Roof Rails","Side Beading","Grill Modifications","Car Wraps","Stickers & Decals","Door Guards","Shark Fin Antenna"],
    desc: "Bold exterior upgrades that command attention — from subtle accents to full body transformations.",
  },
  {
    id: "lighting",
    name: "Lighting Accessories",
    icon: "💡",
    count: 8,
        image: "https://images.unsplash.com/photo-1564890379370-2cf3df59dfb9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fExFRCUyMGxpZ2h0aW5nJTIwY2FyJTIwd2l0aCUyMGJsYWNrJTIwYmd8ZW58MHx8MHx8fDA%3D",
    items: ["LED Headlights","Fog Lamps","DRLs","Tail Lights","Interior LED Lights","Ambient Lights","Underbody Lights","Projector Lamps"],
    desc: "High-performance lighting systems for superior visibility and a premium look day or night.",
  },
  {
    id: "electronics",
    name: "Electronics & Smart",
    icon: "📱",
    count: 10,
        image: "https://images.unsplash.com/photo-1735429934563-ba161723361f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWxlY3RpYyUyMGludHJpb3IlMjBhbmRyb2lkJTIwc3lzdGVtJTIwY2FyJTIwd2l0aCUyMGJsYWNrJTIwYmd8ZW58MHx8MHx8fDA%3D",
    items: ["Android System","Touch Screen Display","Reverse Camera","360 Camera","Dash Camera","Parking Sensors","GPS Navigation","TPMS","Car GPS Tracker","Music System","Amplifiers","Subwoofers"],
    desc: "Smart connected systems that bring your vehicle into the future with advanced technology.",
  },
  {
    id: "window",
    name: "Window & Glass",
    icon: "🪟",
    count: 5,
    image: "https://images.unsplash.com/photo-1773423022750-5ea755622f50?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHdpbmRvdyUyMGZpbGFtcyUyMHN5c3RlbSUyMGNhciUyMHdpdGglMjBibGFjayUyMGJnfGVufDB8fDB8fHww",
    items: ["Window Films","Sun Control Films","Rain Visor","Glass Cleaner","Windshield Protection"],
    desc: "Premium window films for heat rejection, UV protection and privacy.",
  },
  {
    id: "audio",
    name: "Audio Systems",
    icon: "🔊",
    count: 8,
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=90",
    items: ["Music System","Amplifiers","Subwoofers","Component Speakers","Tweeters","Speaker Grills","Sound Deadening","AUX & Bluetooth"],
    desc: "Concert-quality audio systems from JBL, Alpine, Sony and Pioneer.",
  },
];

export const PRODUCTS = [
  { id:1, name:"TOP GEAR Custom Seat Covers", brand:"TOP GEAR /AUTOFIT", category:"Interior", badge:"Best Seller",
    desc:"Premium leatherette custom-fit seat covers with multi-layer foam padding and precision stitching for all car models.",
    image: "https://i1-e.pinimg.com/736x/1c/ef/f6/1ceff602b48c0dadede11a13decba303.jpg",features:["OEM Fit","Waterproof","Warranty"] },
  { id:2, name:"LED Projector Headlights", brand:"NIGHTWALKER / AZOOME", category:"Lighting", badge:"Premium",
    desc:"High-performance LED headlights and DRL upgrades with projector beam for superior night visibility.",
    image: "https://i.pinimg.com/736x/ab/c9/d0/abc9d0af3a591d5f79325db3e8318cd9.jpg", features:["6000K White","Plug & Play","IP67"] },
  { id:3, name:"Android 10\" Touch Screen", brand:"SONY / PIONEER", category:"Electronics", badge:"New",
    desc:"10-inch Android multimedia system with GPS, reverse camera, Apple CarPlay and HD display.",
    image: "https://i1-e.pinimg.com/1200x/0a/3c/f4/0a3cf42ff7414c84187b3b8743d9abab.jpg", features:["Android 13","4K Display","CarPlay"] },
  { id:4, name:"Premium Window Film", brand:"GARWARE", category:"Window", badge:"Top Pick",
    desc:"Premium sun-control and safety window films with 80% heat rejection and 99% UV block.",
    image: "https://i1-e.pinimg.com/1200x/63/d6/cd/63d6cd8e3c6309595240d4495839b42f.jpg",features:["80% Heat Reject","99% UV Block","Warranty"] },
  { id:5, name:"Body Kits & Spoilers", brand:"AUTO PEARL", category:"Exterior", badge:"Custom",
    desc:"Sport-grade ABS plastic body kits, rear spoilers and front lip upgrades for aggressive styling.",
    image: "https://media.istockphoto.com/id/1334268665/photo/modern-light-alloy-wheel-with-red-brake-cylinder-visible-behind-the-rim.webp?a=1&b=1&s=612x612&w=0&k=20&c=rAbPXTWrJ2jeAgakZAZJs8zm3rqNCyuCY9PNZbieMQA=",
 features:["ABS Plastic","OEM Finish","Custom Paint"] },
  { id:6, name:"JBL / Alpine Audio System", brand:"JBL / ALPINE / INFINITY", category:"Audio", badge:"Hi-Fi",
    desc:"Complete high-fidelity audio upgrade — amplifiers, component speakers, subwoofers for studio-quality audio.",
        image: "https://images.unsplash.com/photo-1630152836113-ccbf6d1e5fa5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8amJsJTIwc3BlYWtlcnxlbnwwfHwwfHx8MA%3D%3D",features:["2000W System","4-Way","DSP Tuned"] },
];

export const BRANDS = [
  {
    name: "GARWARE",
    category: "Sun Films",
    color: "#F05A22",
    desc: "India's #1 sun control film brand",
    image: null,
    bgImage: "data:image/png;base64,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",
    isLogoUrl: false,
  },
  {
    name: "SONY",
    category: "Car Audio & Electronics",
    color: "#000000",
    desc: "World-class car audio & entertainment",
    // Sony logo SVG from Wikipedia
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Sony_logo.svg/400px-Sony_logo.svg.png",
    bgImage: "https://i1-e.pinimg.com/736x/b5/33/6f/b5336f0645ee7d40c6547de48a92f608.jpg",
    isLogoUrl: true,
  },
  {
    name: "PIONEER",
    category: "Car Audio",
    color: "#E31837",
    desc: "Pioneering car entertainment systems",
    // Pioneer logo
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Pioneer_Corporation_logo.svg/400px-Pioneer_Corporation_logo.svg.png",
    bgImage: "data:image/png;base64,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",
    isLogoUrl: true,
  },
  {
    name: "JBL",
    category: "Car Audio",
    color: "#F05A22",
    desc: "Professional-grade car speakers & audio",
    // JBL logo
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/JBL_logo.svg/400px-JBL_logo.svg.png",
    bgImage: "data:image/png;base64,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",
    isLogoUrl: true,
  },
  {
    name: "ALPINE",
    category: "Car Audio",
    color: "#FFFFFF",
    desc: "Premium alpine audio systems",
    // Alpine logo
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Alpine_Electronics_logo.svg/400px-Alpine_Electronics_logo.svg.png",
    bgImage: "https://i1-e.pinimg.com/1200x/99/85/69/998569ed3f305ffc2a6e3166e9d35ea2.jpg",
    isLogoUrl: true,
  },
  {
    name: "BLAUPUNKT",
    category: "Electronics",
    color: "#005CA9",
    desc: "German precision audio engineering",
    // Blaupunkt logo
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Blaupunkt_logo.svg/400px-Blaupunkt_logo.svg.png",
    bgImage: "https://i1-e.pinimg.com/736x/30/53/db/3053dbb5ca875d828373846b7e23c250.jpg",
    isLogoUrl: true,
  },
  {
    name: "INFINITY",
    category: "Car Audio",
    color: "#C8102E",
    desc: "Infinity performance car speakers",
    // Infinity (Harman) logo
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Infinity_Systems_logo.svg/400px-Infinity_Systems_logo.svg.png",
    bgImage: "https://i1-e.pinimg.com/1200x/b2/e7/e4/b2e7e4db29a3733ec338d84f3d78e9dd.jpg",
    isLogoUrl: true,
  },
  {
    name: "AUTOFIT",
    category: "Interior Accessories",
    color: "#C9A84C",
    desc: "India's premier seat cover brand",
    image: null,
    bgImage: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAflBMVEUAAAD///+3t7f8/Pz39/cEBATW1tawsLCQkJBqamrt7e0aGhrw8PBERET29vZISEg/Pz8xMTGFhYUUFBQcHBxlZWV2dnalpaW7u7ssLCyMjIw0NDTKysohISG5ubl+fn5bW1udnZ3ExMTc3Nzl5eVQUFCgoKBwcHBfX186OjqXYliFAAAFgElEQVR4nO2YC3eiOhRGgyEIVkFBUXyBYmv9/3/wnpMECFTn0ek4vWt9u10I5LlJOIkKAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACKGeW1gNPv+4Cw9bGN64+/Er5X+/xcc3v1b16WSHQ3v+N1WK0XHksEmFGo9Gx9Imp3RvnQlxcDPtehVQ9rfmYkcXm8g5T0R57LUw3mmf5BRcppP6nB6MXrZ2+lBQpVQm0lV0HDel+ARzr89ZKEkfR5t8pvMpGe7cPDO3gpTvJPZixhehOU/4PBLjQQOcNRv5zeU01ZmXca/+udT1JIOyo88M9k32K9kIxa2PbfKGzicvZOhm6xkGnifb7DNfytaQi6zIsNeCT4aFLkNIPq614cRcSDrKm5j7xnDQufFnDNsxlLIxjPXTMpyt4UJ6XU87QyUSnxOm9pWacS1DQ1N900zCj41FLkEd65OcDaeOyLwxfG2blNbwEyyvURStWMQvV3T6+tjQ23AGYumUfzMPZ/vQMOESOde5X5nCEReIU5r7N3b1LvR4XqZthmuUNYYHvn7fcxM5pyTi0+h+2nHQs/Su4dudkhfzeOuHhposdkZgz1rm9VN6vpbWcNTWag0NNAtknNnOfdZwzYaFYzh8Dx8ZVtTZKb06stKtPzLUAmPTxQPNTe9iu3pl27Gdpd0kHBp6freyfJFhUKZMGbiG52tOVG7BEd0+Bfr9ZX5uSA+FR72RKXy6qq1hoOuPnmPoxp/W0HB2pkoxpVAx31Iv45s29H9umHtdvBVqYgbUiTSxeo6h5Chn3rEulkqvHS1DyU9e7GLKezKG3n3D2DV0ek/vMTWQWUMdzydPMexGTH5YLc5OOQoaHEaPlMgR8ZcMr1zJqalhQhfNGJoGeIPxhDGstyGzrc0jNrM00Dev3SxNKGj40W6xtRFxYEhDcsewcrcIh1jyLDCGplFeeD4Yxl9u2IuljeFpWOzEM9ePYy4h92R+87ts7zwmr0NDJRa+kdKsbNhZ/ni1eJbhcLXIaj2zeLGgg082Lxw49k3HKP4UQ0Nh9nnSDu6ei0fW8NjW/ATD5nE6hjS1lgWzsKsvD0C7GTPLGveYusbTOHeHqmeY8mO58NZPcbterZ5luHAM742h9A2e/XrEAca77DW0tZG8OdUruHc5b2odelO7C+kZ0iBybef16KJDNg/n0DD+G4b+zwxbriZtMZFtsKyk3YmZXbUd1aCJSa6hEvNLs9Hnp6BFnmLoFab9u/vS3R3D1IZ2TeCZOXnY2DWG/veLpv6la6jELPCa5a/5fsiGmzZK2++HX2i4rYMgaN5DOq2bsPlGCfuMv9J11JV9LJR20tOQ/kuuYcZn0flCr6Cc7PNuo7zcU7Gwa0+l+ynt1+J6fTOZdIYuVt+4meYbfchVv/yhoUPv55/f3Mrb7NmsqpLCqUsNMvF18VpVuybxF9r5n/8qBZ7LcLqo3olybtn5p5xsSjlZvuvEo2irf8bI+KxwBJTIXlihoIMqODToWLrgNJ3vwEU4+BYHYbL9M4kfokSYUtcPHPyv1601XM8pJUwPSqT8HbnMac+Sl7SRu6Z0WOW0n85OIelRhHxNKcdrGH3bQbxdeSDS8J0cUrOcieREa8HcJAgavjSnhzBnk1tJ+UJRFiJbn8iJClRb0l/m5Xc1VGIbUpgvM+rrKrPdzA8lfW7Dgq1J6VomlLqt+ECXs5CGLosqWv1olUz41nz7jQ2bo2rDhTm094T4eOa8rr0C35d+MFT6T4jOpJ9mUz7eBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPxj/gPTKU26tY7l4AAAAABJRU5ErkJggg==",
    isLogoUrl: false,
  },
  {
    name: "AUTO PEARL",
    category: "Car Accessories",
    color: "#C9A84C",
    desc: "Complete car accessories solutions",
    image: null,
    bgImage: "data:image/jpeg;base64,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",
    isLogoUrl: false,
  },
  {
    name: "TOP GEAR",
    category: "Car Accessories",
    color: "#FF6600",
    desc: "Top-grade automotive accessories",
    image: null,
    bgImage: "data:image/jpeg;base64,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",
    isLogoUrl: false,
  },
  {
    name: "NIGHTWALKER",
    category: "LED Lighting",
    color: "#7B2FBE",
    desc: "Premium LED automotive lighting",
    image: null,
    bgImage: "data:image/jpeg;base64,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",
    isLogoUrl: false,
  },
  {
    name: "AZOOME",
    category: "DRL & LED",
    color: "#00A8E0",
    desc: "Advanced DRL and LED systems",
    image: null,
    bgImage: "data:image/png;base64,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",
    isLogoUrl: false,
  },
  {
    name: "HIKVISION",
    category: "Security & Cameras",
    color: "#CE1126",
    desc: "World's leading security camera brand",
    // Hikvision logo
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Hikvision_logo.svg/400px-Hikvision_logo.svg.png",
    bgImage: "https://i1-e.pinimg.com/1200x/ff/51/97/ff519751d3369adab129280f000a37e0.jpg",
    isLogoUrl: true,
  },
];


export const TESTIMONIALS = [
  { id:1, name:"Rahul Kapoor", vehicle:"Hyundai Creta SX", city:"Himmatnagar", initials:"RK", rating:5, date:"2 weeks ago",
    text:"Got custom seat covers and Garware window film done from M2. Absolutely professional work — perfect fitment on my Creta. The team explained everything clearly. Best in Himmatnagar!", service:"Seat Covers + Window Film", verified:true },
  { id:2, name:"Amit Shah", vehicle:"Maruti Swift ZXi+", city:"Himmatnagar", initials:"AS", rating:4, date:"1 month ago",
    text:"Pioneer Android screen with 360 reverse camera installed brilliantly. Crystal-clear display and flawless voice navigation. M2 team is professional, just took a bit longer than expected.", service:"Android System + Camera", verified:true },
  { id:3, name:"Priyansh Desai", vehicle:"Tata Nexon EV Max", city:"Modasa", initials:"PD", rating:5, date:"3 weeks ago",
    text:"Garware window film done in under 3 hours. My car stays incredibly cool now. The team was professional and the results are outstanding. Very satisfied!", service:"Window Film", verified:true },
  { id:4, name:"Kiran Mehta", vehicle:"Toyota Fortuner Legender", city:"Idar", initials:"KM", rating:4, date:"1 month ago",
    text:"Complete JBL + Alpine audio upgrade done. Sound quality is mind-blowing. M2 team knows their craft inside out. Great work overall.", service:"Full Audio Upgrade", verified:true },
  { id:5, name:"Divyesh Patel", vehicle:"MG Hector Plus", city:"Himmatnagar", initials:"DP", rating:3, date:"2 months ago",
    text:"LED projector headlight upgrade and DRL installation — nighttime visibility improved. The installation was fine, but the waiting area could be better.", service:"LED Projector + DRL", verified:true },
  { id:6, name:"Riyansh Joshi", vehicle:"Honda City ZX", city:"Bayad", initials:"SJ", rating:5, date:"3 weeks ago",
    text:"Premium 360 camera and parking sensors installed in my City. Reversing in tight streets is now completely stress-free. Excellent service and quick turnaround!", service:"360 Camera + Sensors", verified:true },
  { id:7, name:"Nikhil Agarwal", vehicle:"Tata Safari XZA+", city:"Vijapur", initials:"NA", rating:4, date:"1 week ago",
    text:"Autofit custom mats and full ambient lighting kit for my Safari. Mats fit perfectly, ambient lighting transformed the interior. Good work M2!", service:"Custom Mats + Ambient Lighting", verified:true },
  { id:8, name:"Manish Modi", vehicle:"Mahindra XUV700 AX7", city:"Himmatnagar", initials:"RM", rating:5, date:"5 days ago",
    text:"Full window tinting with Garware premium film and dashcam installed. Team was on time, work is impeccable. They cleaned up the car perfectly after. 10/10!", service:"Garware Film + Dashcam", verified:true },
];

export const INSTAGRAM_POSTS = [
  { id:1, image:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=85", alt:"Custom seat covers", large:true, tag:"Interior" },
  { id:2, image:"https://images.unsplash.com/photo-1493238792000-8113da705763?w=400&q=85", alt:"LED DRL upgrade", tag:"Lighting" },
  { id:3, image:"https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&q=85", alt:"Window film", tag:"Films" },
  { id:5, image:"https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600&q=85", alt:"Exterior accessories", large:true, tag:"Exterior" },
  { id:6, image:"https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&q=85", alt:"Audio system", tag:"Audio" },
  { id:8, image:"https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=400&q=85", alt:"Body kit styling", tag:"Exterior" },
];
