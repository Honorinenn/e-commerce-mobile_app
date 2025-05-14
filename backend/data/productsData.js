// filepath: /workspaces/e-commerce-mobile_app/backend/data/productsData.js
module.exports = [
    {
      "name": "Apple iPhone 16 Pro",
      "description": "The latest flagship smartphone from Apple with Pro camera system and A18 Bionic chip.",
      "price": 1099.99,
      "stock": 250,
      "images": ["/images/iphone16pro_1.jpg", "/images/iphone16pro_2.jpg"],
      "category": "Smartphones",
      "brand": "Apple",
      "dimensions": { "length": 14.7, "width": 7.1, "height": 0.8 },
      "weight": 0.190,
      "barcodes": ["195949012345"],
      "ratings": 4.9,
      "reviews": [],
      "isFeatured": true,
      "tags": ["smartphone", "apple", "iphone", "pro", "camera", "ios"],
      "createdAt": "2025-05-01T10:00:00Z",
      "updatedAt": "2025-05-05T02:00:00Z"
    },
    {
      "name": "Samsung Galaxy S25 Ultra",
      "description": "Samsung's top-tier smartphone with advanced AI features, S Pen integration, and powerful zoom camera.",
      "price": 1199.99,
      "stock": 180,
      "images": ["/images/s25ultra_1.jpg", "/images/s25ultra_2.jpg"],
      "category": "Smartphones",
      "brand": "Samsung",
      "dimensions": { "length": 16.2, "width": 7.9, "height": 0.88 },
      "weight": 0.233,
      "barcodes": ["8806094123456"],
      "ratings": 4.8,
      "reviews": [],
      "isFeatured": true,
      "tags": ["smartphone", "samsung", "galaxy", "ultra", "android", "camera", "stylus"],
      "createdAt": "2025-04-28T11:00:00Z",
      "updatedAt": "2025-05-04T18:30:00Z"
    },
    {
      "name": "Sony WH-1000XM6 Noise Cancelling Headphones",
      "description": "Industry-leading noise cancelling headphones with exceptional sound quality and long battery life.",
      "price": 399.99,
      "stock": 300,
      "images": ["/images/wh1000xm6_1.jpg", "/images/wh1000xm6_2.jpg"],
      "category": "Audio",
      "brand": "Sony",
      "weight": 0.255,
      "barcodes": ["027242923456"],
      "ratings": 4.7,
      "reviews": [
         {
           "comment": "Best noise cancelling I've ever experienced!",
           "rating": 5,
           "createdAt": "2025-05-03T14:20:11Z"
         }
      ],
      "isFeatured": true,
      "tags": ["headphones", "audio", "sony", "noise cancelling", "bluetooth", "wireless"],
      "createdAt": "2025-04-15T09:00:00Z",
      "updatedAt": "2025-05-03T14:20:11Z"
    },
    {
      "name": "Dell XPS 15 Laptop (Model 9540)",
      "description": "Premium 15-inch laptop with stunning OLED display, powerful Intel Core Ultra processor, and sleek design.",
      "price": 1899.00,
      "stock": 85,
      "images": ["/images/xps15_9540_1.jpg", "/images/xps15_9540_2.jpg"],
      "category": "Laptops",
      "brand": "Dell",
      "dimensions": { "length": 34.4, "width": 23.0, "height": 1.8 },
      "weight": 1.9,
      "barcodes": ["884116456789"],
      "ratings": 4.6,
      "reviews": [],
      "isFeatured": false,
      "tags": ["laptop", "dell", "xps", "windows", "developer", "productivity", "oled"],
      "createdAt": "2025-03-20T12:00:00Z",
      "updatedAt": "2025-05-02T09:15:00Z"
    },
    {
      "name": "LG C5 65-inch OLED evo TV",
      "description": "65-inch 4K Smart TV with self-lit OLED pixels, α10 AI Processor, and Dolby Vision/Atmos support.",
      "price": 2499.99,
      "stock": 50,
      "images": ["/images/lg_c5_65_1.jpg", "/images/lg_c5_65_2.jpg"],
      "category": "Televisions",
      "brand": "LG",
      "dimensions": { "length": 144.1, "width": 82.6, "height": 23.0 }, // Dimensions with stand
      "weight": 24.0, // Weight with stand
      "barcodes": ["719192654321"],
      "ratings": 4.9,
      "reviews": [],
      "isFeatured": true,
      "tags": ["tv", "television", "lg", "oled", "4k", "smart tv", "hdr", "dolby vision"],
      "createdAt": "2025-04-01T15:00:00Z",
      "updatedAt": "2025-05-04T12:00:00Z"
    },
    {
        "name": "Apple Watch Series 10 (GPS, 45mm)",
        "description": "The latest Apple Watch with advanced health sensors, faster processor, and new watchOS features.",
        "price": 429.00,
        "stock": 400,
        "images": ["/images/applewatch10_1.jpg", "/images/applewatch10_2.jpg"],
        "category": "Wearables",
        "brand": "Apple",
        "dimensions": { "length": 4.5, "width": 3.8, "height": 1.07 },
        "weight": 0.039,
        "barcodes": ["195949111222"],
        "ratings": 4.8,
        "reviews": [],
        "isFeatured": true,
        "tags": ["smartwatch", "apple watch", "wearable", "fitness", "health", "ios"],
        "createdAt": "2025-05-01T10:05:00Z",
        "updatedAt": "2025-05-05T01:00:00Z"
    },
    {
        "name": "PlayStation 5 Slim Console",
        "description": "Sony's slimmed-down PlayStation 5 console delivering lightning-fast loading and stunning visuals.",
        "price": 449.99, // Digital Edition price
        "stock": 120,
        "images": ["/images/ps5slim_1.jpg", "/images/ps5slim_2.jpg"],
        "category": "Gaming Consoles",
        "brand": "Sony",
        "dimensions": { "length": 35.8, "width": 21.6, "height": 8.0 },
        "weight": 2.6,
        "barcodes": ["711719567890"],
        "ratings": 4.9,
        "reviews": [],
        "isFeatured": false,
        "tags": ["gaming", "console", "sony", "playstation", "ps5", "4k"],
        "createdAt": "2024-11-10T00:00:00Z",
        "updatedAt": "2025-05-03T10:00:00Z"
    },
    {
        "name": "Google Pixel Buds Pro 2",
        "description": "Next-generation wireless earbuds from Google with improved Active Noise Cancellation and spatial audio.",
        "price": 199.99,
        "stock": 220,
        "images": ["/images/pixelbudspro2_1.jpg", "/images/pixelbudspro2_2.jpg"],
        "category": "Audio",
        "brand": "Google",
        "weight": 0.06, // Includes case weight
        "barcodes": ["810029933445"],
        "ratings": 4.5,
        "reviews": [],
        "isFeatured": false,
        "tags": ["earbuds", "audio", "google", "pixel", "wireless", "noise cancelling", "android"],
        "createdAt": "2025-05-02T14:00:00Z",
        "updatedAt": "2025-05-04T22:00:00Z"
    },
    {
        "name": "MacBook Air 13-inch (M3)",
        "description": "Thin and light laptop powered by the Apple M3 chip, perfect for everyday tasks and portability.",
        "price": 1099.00,
        "stock": 150,
        "images": ["/images/macbookair_m3_1.jpg", "/images/macbookair_m3_2.jpg"],
        "category": "Laptops",
        "brand": "Apple",
        "dimensions": { "length": 30.41, "width": 21.5, "height": 1.13 },
        "weight": 1.24,
        "barcodes": ["194253777888"],
        "ratings": 4.7,
        "reviews": [],
        "isFeatured": false,
        "tags": ["laptop", "apple", "macbook", "macbook air", "m3", "macos", "portable"],
        "createdAt": "2024-03-04T08:00:00Z",
        "updatedAt": "2025-05-01T16:45:00Z"
    },
    {
        "name": "Samsung The Frame TV (65-inch, 2025 Model)",
        "description": "A 4K QLED TV that transforms into a piece of art when you're not watching, featuring a matte display.",
        "price": 1999.99,
        "stock": 75,
        "images": ["/images/frametv_65_1.jpg", "/images/frametv_65_2.jpg"],
        "category": "Televisions",
        "brand": "Samsung",
        "dimensions": { "length": 145.6, "width": 83.1, "height": 2.49 }, // Without stand
        "weight": 22.4, // Without stand
        "barcodes": ["887276890123"],
        "ratings": 4.6,
        "reviews": [],
        "isFeatured": true,
        "tags": ["tv", "television", "samsung", "frame", "4k", "qled", "art mode", "lifestyle"],
        "createdAt": "2025-03-15T10:00:00Z",
        "updatedAt": "2025-05-04T11:30:00Z"
    },
    {
        "name": "Sonos Era 300 Smart Speaker",
        "description": "Spatial audio smart speaker with Dolby Atmos support, Wi-Fi, Bluetooth, and voice control.",
        "price": 449.00,
        "stock": 110,
        "images": ["/images/sonos_era300_1.jpg", "/images/sonos_era300_2.jpg"],
        "category": "Audio",
        "brand": "Sonos",
        "dimensions": { "length": 16.0, "width": 26.0, "height": 18.5 },
        "weight": 4.47,
        "barcodes": ["840136801234"],
        "ratings": 4.7,
        "reviews": [],
        "isFeatured": false,
        "tags": ["speaker", "audio", "sonos", "smart speaker", "spatial audio", "dolby atmos", "wifi", "bluetooth"],
        "createdAt": "2024-03-28T09:00:00Z",
        "updatedAt": "2025-05-02T19:00:00Z"
    },
    {
        "name": "GoPro HERO12 Black",
        "description": "Waterproof action camera with 5.3K video, HyperSmooth 6.0 stabilization, and extended battery life.",
        "price": 399.99,
        "stock": 190,
        "images": ["/images/gopro12_1.jpg", "/images/gopro12_2.jpg"],
        "category": "Cameras",
        "brand": "GoPro",
        "dimensions": { "length": 7.18, "width": 5.08, "height": 3.36 },
        "weight": 0.154,
        "barcodes": ["818279029123"],
        "ratings": 4.6,
        "reviews": [],
        "isFeatured": false,
        "tags": ["camera", "action camera", "gopro", "hero12", "waterproof", "video", "4k", "5k"],
        "createdAt": "2023-09-06T07:00:00Z",
        "updatedAt": "2025-04-30T12:10:00Z"
    },
    {
        "name": "Nintendo Switch - OLED Model",
        "description": "Versatile gaming console with a vibrant 7-inch OLED screen, playable in handheld, tabletop, or TV mode.",
        "price": 349.99,
        "stock": 210,
        "images": ["/images/switch_oled_1.jpg", "/images/switch_oled_2.jpg"],
        "category": "Gaming Consoles",
        "brand": "Nintendo",
        "dimensions": { "length": 10.2, "width": 24.2, "height": 1.39 }, // With Joy-Con attached
        "weight": 0.42, // With Joy-Con attached
        "barcodes": ["045496883397"],
        "ratings": 4.8,
        "reviews": [],
        "isFeatured": false,
        "tags": ["gaming", "console", "nintendo", "switch", "oled", "handheld", "portable"],
        "createdAt": "2021-10-08T00:00:00Z",
        "updatedAt": "2025-05-04T08:25:00Z"
    },
    {
        "name": "Amazon Echo Show 8 (3rd Gen)",
        "description": "Smart display with Alexa, featuring an 8-inch HD screen, spatial audio, and built-in smart home hub.",
        "price": 149.99,
        "stock": 350,
        "images": ["/images/echoshow8_3rd_1.jpg", "/images/echoshow8_3rd_2.jpg"],
        "category": "Smart Home",
        "brand": "Amazon",
        "dimensions": { "length": 20.0, "width": 13.0, "height": 10.6 },
        "weight": 1.03,
        "barcodes": ["840080512345"],
        "ratings": 4.5,
        "reviews": [],
        "isFeatured": false,
        "tags": ["smart display", "amazon", "echo", "alexa", "smart home", "speaker", "display"],
        "createdAt": "2023-10-25T00:00:00Z",
        "updatedAt": "2025-05-03T21:05:00Z"
    },
    {
        "name": "Logitech MX Master 3S Wireless Mouse",
        "description": "Advanced wireless performance mouse with quiet clicks, 8K DPI tracking, and MagSpeed scrolling.",
        "price": 99.99,
        "stock": 450,
        "images": ["/images/mxmaster3s_1.jpg", "/images/mxmaster3s_2.jpg"],
        "category": "Computer Peripherals",
        "brand": "Logitech",
        "dimensions": { "length": 12.49, "width": 8.43, "height": 5.1 },
        "weight": 0.141,
        "barcodes": ["097855171123"],
        "ratings": 4.8,
        "reviews": [],
        "isFeatured": false,
        "tags": ["mouse", "logitech", "wireless", "bluetooth", "ergonomic", "productivity", "computer"],
        "createdAt": "2022-05-24T00:00:00Z",
        "updatedAt": "2025-05-04T15:00:00Z"
    },
     {
      "name": "Apple iPad Air (M2, 11-inch)",
      "description": "Powerful and versatile iPad Air with the M2 chip, Liquid Retina display, and support for Apple Pencil Pro.",
      "price": 599.00,
      "stock": 200,
      "images": ["/images/ipadair_m2_11_1.jpg", "/images/ipadair_m2_11_2.jpg"],
      "category": "Tablets",
      "brand": "Apple",
      "dimensions": { "length": 24.76, "width": 17.85, "height": 0.61 },
      "weight": 0.462,
      "barcodes": ["195949345678"],
      "ratings": 4.7,
      "reviews": [],
      "isFeatured": false,
      "tags": ["tablet", "apple", "ipad", "ipad air", "m2", "ios", "productivity"],
      "createdAt": "2024-05-07T10:00:00Z",
      "updatedAt": "2025-05-03T09:30:00Z"
    },
    {
      "name": "Sony Alpha a7 IV Mirrorless Camera",
      "description": "Full-frame hybrid camera with 33MP sensor, advanced autofocus, and 4K 60p video recording.",
      "price": 2499.99, // Body only
      "stock": 60,
      "images": ["/images/a7iv_1.jpg", "/images/a7iv_2.jpg"],
      "category": "Cameras",
      "brand": "Sony",
      "dimensions": { "length": 13.13, "width": 9.64, "height": 7.98 }, // Body only
      "weight": 0.658, // Body only with battery and card
      "barcodes": ["027242923000"],
      "ratings": 4.8,
      "reviews": [],
      "isFeatured": false,
      "tags": ["camera", "mirrorless", "sony", "alpha", "a7iv", "full-frame", "photography", "video", "4k"],
      "createdAt": "2021-10-21T00:00:00Z",
      "updatedAt": "2025-04-29T14:00:00Z"
    },
    {
      "name": "Samsung 990 PRO SSD 2TB NVMe",
      "description": "High-performance NVMe M.2 SSD for gaming and creative workloads with read speeds up to 7,450 MB/s.",
      "price": 169.99,
      "stock": 320,
      "images": ["/images/990pro_1.jpg"],
      "category": "Computer Components",
      "brand": "Samsung",
      "dimensions": { "length": 8.0, "width": 2.2, "height": 0.23 }, // M.2 2280 form factor
      "weight": 0.009,
      "barcodes": ["887276678901"],
      "ratings": 4.9,
      "reviews": [],
      "isFeatured": false,
      "tags": ["ssd", "nvme", "samsung", "storage", "pc component", "gaming", "performance"],
      "createdAt": "2022-08-24T00:00:00Z",
      "updatedAt": "2025-05-04T10:15:00Z"
    },
    {
      "name": "Bose QuietComfort Ultra Headphones",
      "description": "Premium noise cancelling headphones with immersive audio, comfortable design, and Aware Mode.",
      "price": 429.00,
      "stock": 140,
      "images": ["/images/bose_qc_ultra_1.jpg", "/images/bose_qc_ultra_2.jpg"],
      "category": "Audio",
      "brand": "Bose",
      "weight": 0.253,
      "barcodes": ["017817847123"],
      "ratings": 4.6,
      "reviews": [],
      "isFeatured": false,
      "tags": ["headphones", "audio", "bose", "noise cancelling", "bluetooth", "wireless", "immersive audio"],
      "createdAt": "2023-09-14T00:00:00Z",
      "updatedAt": "2025-05-01T11:55:00Z"
    },
    {
      "name": "DJI Mini 4 Pro Drone",
      "description": "Lightweight and foldable mini camera drone with 4K HDR video, omnidirectional obstacle sensing, and extended flight time.",
      "price": 759.00, // Base model price
      "stock": 95,
      "images": ["/images/dji_mini4pro_1.jpg", "/images/dji_mini4pro_2.jpg"],
      "category": "Drones",
      "brand": "DJI",
      "dimensions": { "length": 14.8, "width": 9.4, "height": 6.4 }, // Folded, without propellers
      "weight": 0.249, // Standard battery
      "barcodes": ["190021081234"],
      "ratings": 4.8,
      "reviews": [],
      "isFeatured": true,
      "tags": ["drone", "dji", "mini 4 pro", "camera drone", "4k", "hdr", "aerial photography"],
      "createdAt": "2023-09-25T00:00:00Z",
      "updatedAt": "2025-05-04T19:20:00Z"
    },
    {
      name: "Samsung Galaxy S25 Ultra",
      description: "Flagship smartphone with 6.9-inch Dynamic AMOLED display, 200MP camera, and Snapdragon 8 Gen 4 processor",
      price: 1299.99,
      stock: 150,
      images: ["samsung_s25_ultra_front.jpg", "samsung_s25_ultra_back.jpg", "samsung_s25_ultra_side.jpg"],
      category: "Smartphones",
      brand: "Samsung",
      dimensions: {
        length: 16.3,
        width: 7.8,
        height: 0.83
      },
      weight: 0.228,
      barcodes: ["8806094236781", "0887276681238"],
      ratings: 4.8,
      reviews: [
        {
          user: "6077f578eb3dc82aec9c3f2a",
          comment: "Amazing camera quality and battery life!",
          rating: 5,
          createdAt: new Date("2025-03-15T08:24:00")
        },
        {
          user: "6077f578eb3dc82aec9c3f2b",
          comment: "Great phone but a bit expensive",
          rating: 4,
          createdAt: new Date("2025-03-18T14:32:00")
        }
      ],
      isFeatured: true,
      tags: ["smartphone", "5G", "high-end", "android"],
      createdAt: new Date("2025-02-01T00:00:00"),
      updatedAt: new Date("2025-02-01T00:00:00")
    },
    {
      name: "Apple MacBook Air M4",
      description: "Ultra-thin laptop with M4 chip, 15-inch Liquid Retina display, and 24-hour battery life",
      price: 1499.99,
      stock: 75,
      images: ["macbook_air_m4_silver.jpg", "macbook_air_m4_open.jpg"],
      category: "Laptops",
      brand: "Apple",
      dimensions: {
        length: 34.04,
        width: 23.76,
        height: 1.13
      },
      weight: 1.35,
      barcodes: ["194252058756", "0194252058756"],
      ratings: 4.9,
      reviews: [
        {
          user: "6077f578eb3dc82aec9c3f2c",
          comment: "Incredible performance and battery life for the size!",
          rating: 5,
          createdAt: new Date("2025-04-02T09:17:00")
        }
      ],
      isFeatured: true,
      tags: ["laptop", "macOS", "ultrabook", "M4"],
      createdAt: new Date("2025-03-08T00:00:00"),
      updatedAt: new Date("2025-03-08T00:00:00")
    },
    {
      name: "Sony WH-1200XM6",
      description: "Wireless noise-cancelling headphones with 50-hour battery life and adaptive sound control",
      price: 399.99,
      stock: 120,
      images: ["sony_wh1200xm6_black.jpg", "sony_wh1200xm6_case.jpg"],
      category: "Audio",
      brand: "Sony",
      dimensions: {
        length: 19.5,
        width: 16.2,
        height: 7.9
      },
      weight: 0.254,
      barcodes: ["027242922129", "4548736146167"],
      ratings: 4.7,
      reviews: [
        {
          user: "6077f578eb3dc82aec9c3f2d",
          comment: "Best noise cancellation I've ever experienced",
          rating: 5,
          createdAt: new Date("2025-01-12T16:43:00")
        },
        {
          user: "6077f578eb3dc82aec9c3f2e",
          comment: "Great sound but the app could be better",
          rating: 4,
          createdAt: new Date("2025-01-20T11:21:00")
        }
      ],
      isFeatured: true,
      tags: ["headphones", "wireless", "noise-cancelling", "bluetooth"],
      createdAt: new Date("2024-12-01T00:00:00"),
      updatedAt: new Date("2024-12-01T00:00:00")
    },
    {
      name: "LG OLED C4 65-inch TV",
      description: "4K Ultra HD Smart OLED TV with AI processor, Dolby Vision IQ, and 144Hz refresh rate",
      price: 2799.99,
      stock: 30,
      images: ["lg_oled_c4_front.jpg", "lg_oled_c4_angle.jpg"],
      category: "Televisions",
      brand: "LG",
      dimensions: {
        length: 144.9,
        width: 83.4,
        height: 5.1
      },
      weight: 22.8,
      barcodes: ["719192638547", "8806098236781"],
      ratings: 4.8,
      reviews: [
        {
          user: "6077f578eb3dc82aec9c3f2f",
          comment: "Picture quality is breathtaking, especially for movies",
          rating: 5,
          createdAt: new Date("2025-02-28T19:15:00")
        }
      ],
      isFeatured: true,
      tags: ["tv", "oled", "4k", "smart tv", "gaming"],
      createdAt: new Date("2025-01-15T00:00:00"),
      updatedAt: new Date("2025-01-15T00:00:00")
    },
    {
      name: "Dyson V16 Absolute",
      description: "Cordless vacuum cleaner with advanced filtration, 120-minute runtime, and laser dust detection",
      price: 749.99,
      stock: 45,
      images: ["dyson_v16_full.jpg", "dyson_v16_attachments.jpg"],
      category: "Home Appliances",
      brand: "Dyson",
      dimensions: {
        length: 126.1,
        width: 25.0,
        height: 28.7
      },
      weight: 2.8,
      barcodes: ["885609019857", "5025155065051"],
      ratings: 4.6,
      reviews: [
        {
          user: "6077f578eb3dc82aec9c3f30",
          comment: "Powerful suction and good battery life",
          rating: 5,
          createdAt: new Date("2025-04-05T08:12:00")
        },
        {
          user: "6077f578eb3dc82aec9c3f31",
          comment: "Works great but it's quite heavy for extended use",
          rating: 4,
          createdAt: new Date("2025-04-10T14:36:00")
        }
      ],
      isFeatured: false,
      tags: ["vacuum", "cordless", "home appliance", "cleaning"],
      createdAt: new Date("2025-03-01T00:00:00"),
      updatedAt: new Date("2025-03-01T00:00:00")
    },
    {
      name: "Dell XPS 15 (2024)",
      description: "Premium laptop with 13th Gen Intel Core i9, 32GB RAM, 1TB SSD, and NVIDIA RTX 4070 graphics",
      price: 2399.99,
      stock: 25,
      images: ["dell_xps15_front.jpg", "dell_xps15_open.jpg", "dell_xps15_side.jpg"],
      category: "Laptops",
      brand: "Dell",
      dimensions: {
        length: 34.4,
        width: 23,
        height: 1.8
      },
      weight: 1.92,
      barcodes: ["884116428640", "5397184579619"],
      ratings: 4.7,
      reviews: [
        {
          user: "6077f578eb3dc82aec9c3f32",
          comment: "Excellent build quality and performance",
          rating: 5,
          createdAt: new Date("2025-01-25T10:14:00")
        }
      ],
      isFeatured: false,
      tags: ["laptop", "windows", "gaming", "productivity"],
      createdAt: new Date("2024-12-10T00:00:00"),
      updatedAt: new Date("2024-12-10T00:00:00")
    },
    {
      name: "Canon EOS R6 Mark II",
      description: "Full-frame mirrorless camera with 24.2MP sensor, 4K60p video, and in-body stabilization",
      price: 2499.99,
      stock: 18,
      images: ["canon_r6mkii_front.jpg", "canon_r6mkii_top.jpg", "canon_r6mkii_back.jpg"],
      category: "Cameras",
      brand: "Canon",
      dimensions: {
        length: 14.2,
        width: 10.1,
        height: 8.8
      },
      weight: 0.67,
      barcodes: ["013803345438", "4549292176001"],
      ratings: 4.9,
      reviews: [
        {
          user: "6077f578eb3dc82aec9c3f33",
          comment: "Amazing autofocus system and low light performance",
          rating: 5,
          createdAt: new Date("2025-02-18T16:23:00")
        },
        {
          user: "6077f578eb3dc82aec9c3f34",
          comment: "Great camera but battery life could be better",
          rating: 4,
          createdAt: new Date("2025-03-01T09:41:00")
        }
      ],
      isFeatured: true,
      tags: ["camera", "mirrorless", "photography", "video"],
      createdAt: new Date("2024-11-20T00:00:00"),
      updatedAt: new Date("2024-11-20T00:00:00")
    },
    {
      name: "Bose QuietComfort Ultra Earbuds",
      description: "Wireless earbuds with advanced noise cancellation, spatial audio, and 8-hour battery life",
      price: 329.99,
      stock: 60,
      images: ["bose_qc_ultra_case.jpg", "bose_qc_ultra_earbuds.jpg"],
      category: "Audio",
      brand: "Bose",
      dimensions: {
        length: 3.05,
        width: 2.14,
        height: 1.7
      },
      weight: 0.0064,
      barcodes: ["017817832557", "4969929305602"],
      ratings: 4.6,
      reviews: [
        {
          user: "6077f578eb3dc82aec9c3f35",
          comment: "Best noise cancellation in earbuds I've tried",
          rating: 5,
          createdAt: new Date("2025-01-10T12:18:00")
        }
      ],
      isFeatured: false,
      tags: ["earbuds", "wireless", "noise-cancelling", "bluetooth"],
      createdAt: new Date("2024-10-05T00:00:00"),
      updatedAt: new Date("2024-10-05T00:00:00")
    },
    {
      name: "Apple iPad Pro 12.9-inch M3",
      description: "12.9-inch mini-LED display, M3 chip, Face ID, and Apple Pencil 3 support",
      price: 1299.99,
      stock: 50,
      images: ["ipad_pro_m3_front.jpg", "ipad_pro_m3_back.jpg"],
      category: "Tablets",
      brand: "Apple",
      dimensions: {
        length: 28.06,
        width: 21.49,
        height: 0.64
      },
      weight: 0.682,
      barcodes: ["194252842799", "0194252842799"],
      ratings: 4.8,
      reviews: [
        {
          user: "6077f578eb3dc82aec9c3f36",
          comment: "Incredible display and performance, almost replaced my laptop",
          rating: 5,
          createdAt: new Date("2025-03-22T15:09:00")
        },
        {
          user: "6077f578eb3dc82aec9c3f37",
          comment: "Great device but iPadOS still limits its potential",
          rating: 4,
          createdAt: new Date("2025-03-29T11:47:00")
        }
      ],
      isFeatured: true,
      tags: ["tablet", "ipad", "touchscreen", "apple pencil"],
      createdAt: new Date("2025-02-15T00:00:00"),
      updatedAt: new Date("2025-02-15T00:00:00")
    },
    {
      name: "Nintendo Switch 2",
      description: "Next-generation gaming console with 8-inch OLED display, enhanced graphics, and backward compatibility",
      price: 399.99,
      stock: 35,
      images: ["nintendo_switch2_console.jpg", "nintendo_switch2_dock.jpg", "nintendo_switch2_handheld.jpg"],
      category: "Gaming",
      brand: "Nintendo",
      dimensions: {
        length: 24.1,
        width: 10.2,
        height: 1.4
      },
      weight: 0.42,
      barcodes: ["045496883546", "4902370558456"],
      ratings: 4.9,
      reviews: [
        {
          user: "6077f578eb3dc82aec9c3f38",
          comment: "Graphics are way better than the original Switch!",
          rating: 5,
          createdAt: new Date("2025-04-12T18:25:00")
        }
      ],
      isFeatured: true,
      tags: ["gaming", "console", "portable", "nintendo"],
      createdAt: new Date("2025-03-20T00:00:00"),
      updatedAt: new Date("2025-03-20T00:00:00")
    },
    {
      name: "GoPro HERO12 Black",
      description: "5.3K action camera with HyperSmooth 6.0 stabilization, 10-bit color, and 40-meter waterproofing",
      price: 499.99,
      stock: 40,
      images: ["gopro_hero12_front.jpg", "gopro_hero12_side.jpg"],
      category: "Cameras",
      brand: "GoPro",
      dimensions: {
        length: 7.1,
        width: 5.0,
        height: 3.3
      },
      weight: 0.158,
      barcodes: ["818279027594", "0818279027594"],
      ratings: 4.7,
      reviews: [
        {
          user: "6077f578eb3dc82aec9c3f39",
          comment: "Incredible stabilization and battery life compared to previous models",
          rating: 5,
          createdAt: new Date("2024-12-19T14:56:00")
        },
        {
          user: "6077f578eb3dc82aec9c3f3a",
          comment: "Great camera but overheats during long recording sessions",
          rating: 4,
          createdAt: new Date("2025-01-03T08:32:00")
        }
      ],
      isFeatured: false,
      tags: ["action camera", "waterproof", "video", "outdoor"],
      createdAt: new Date("2024-09-15T00:00:00"),
      updatedAt: new Date("2024-09-15T00:00:00")
    },
    {
      name: "Samsung 49-inch Odyssey G9 OLED",
      description: "49-inch curved ultra-wide gaming monitor with 5120x1440 resolution, 240Hz refresh rate, and 0.03ms response time",
      price: 1699.99,
      stock: 15,
      images: ["samsung_odyssey_g9_front.jpg", "samsung_odyssey_g9_back.jpg"],
      category: "Monitors",
      brand: "Samsung",
      dimensions: {
        length: 120.7,
        width: 41.4,
        height: 36.7
      },
      weight: 16.7,
      barcodes: ["8806092991453", "0887276656458"],
      ratings: 4.8,
      reviews: [
        {
          user: "6077f578eb3dc82aec9c3f3b",
          comment: "This monitor changed my gaming and productivity experience completely",
          rating: 5,
          createdAt: new Date("2025-02-02T21:14:00")
        }
      ],
      isFeatured: true,
      tags: ["monitor", "ultrawide", "gaming", "oled"],
      createdAt: new Date("2024-12-20T00:00:00"),
      updatedAt: new Date("2024-12-20T00:00:00")
    },
    {
      name: "Sonos Arc Ultra",
      description: "Premium soundbar with Dolby Atmos, upgraded bass response, and improved voice assistant integration",
      price: 999.99,
      stock: 25,
      images: ["sonos_arc_ultra_front.jpg", "sonos_arc_ultra_angle.jpg"],
      category: "Audio",
      brand: "Sonos",
      dimensions: {
        length: 114,
        width: 12,
        height: 8.7
      },
      weight: 6.25,
      barcodes: ["840136802129", "0840136802129"],
      ratings: 4.7,
      reviews: [
        {
          user: "6077f578eb3dc82aec9c3f3c",
          comment: "Room-filling sound and easy setup with my existing Sonos system",
          rating: 5,
          createdAt: new Date("2025-01-28T19:37:00")
        },
        {
          user: "6077f578eb3dc82aec9c3f3d",
          comment: "Great sound but expensive for what it offers",
          rating: 4,
          createdAt: new Date("2025-02-10T16:22:00")
        }
      ],
      isFeatured: false,
      tags: ["soundbar", "dolby atmos", "home theater", "wireless"],
      createdAt: new Date("2024-12-05T00:00:00"),
      updatedAt: new Date("2024-12-05T00:00:00")
    },
    {
      name: "DJI Mini 4 Pro",
      description: "Ultralight sub-250g drone with 4K/60fps camera, 46-minute flight time, and obstacle avoidance",
      price: 799.99,
      stock: 22,
      images: ["dji_mini4pro_drone.jpg", "dji_mini4pro_controller.jpg", "dji_mini4pro_flying.jpg"],
      category: "Drones",
      brand: "DJI",
      dimensions: {
        length: 17.1,
        width: 18.4,
        height: 5.8
      },
      weight: 0.249,
      barcodes: ["190021012639", "6958265173721"],
      ratings: 4.8,
      reviews: [
        {
          user: "6077f578eb3dc82aec9c3f3e",
          comment: "Amazing footage quality and extremely portable",
          rating: 5,
          createdAt: new Date("2025-03-05T12:48:00")
        }
      ],
      isFeatured: true,
      tags: ["drone", "camera drone", "aerial", "photography"],
      createdAt: new Date("2025-01-10T00:00:00"),
      updatedAt: new Date("2025-01-10T00:00:00")
    },
    {
      name: "Garmin Fenix 9 Solar",
      description: "Premium multisport GPS smartwatch with solar charging, 32-day battery life, and advanced training metrics",
      price: 899.99,
      stock: 30,
      images: ["garmin_fenix9_front.jpg", "garmin_fenix9_side.jpg"],
      category: "Wearables",
      brand: "Garmin",
      dimensions: {
        length: 4.7,
        width: 4.7,
        height: 1.4
      },
      weight: 0.085,
      barcodes: ["753759296728", "0753759296728"],
      ratings: 4.9,
      reviews: [
        {
          user: "6077f578eb3dc82aec9c3f3f",
          comment: "Battery life is incredible with solar charging",
          rating: 5,
          createdAt: new Date("2025-02-15T08:19:00")
        },
        {
          user: "6077f578eb3dc82aec9c3f40",
          comment: "Perfect for ultra-marathons and hiking",
          rating: 5,
          createdAt: new Date("2025-03-02T14:27:00")
        }
      ],
      isFeatured: false,
      tags: ["smartwatch", "fitness", "gps", "solar"],
      createdAt: new Date("2024-11-15T00:00:00"),
      updatedAt: new Date("2024-11-15T00:00:00")
    },
    {
      name: "Microsoft Surface Studio 3",
      description: "All-in-one PC with 28-inch touchscreen, Intel Core i9, 64GB RAM, and NVIDIA RTX 4080 graphics",
      price: 4499.99,
      stock: 10,
      images: ["surface_studio3_front.jpg", "surface_studio3_side.jpg", "surface_studio3_drawing.jpg"],
      category: "Computers",
      brand: "Microsoft",
      dimensions: {
        length: 63.7,
        width: 43.9,
        height: 1.3
      },
      weight: 9.56,
      barcodes: ["889842918458", "0889842918458"],
      ratings: 4.7,
      reviews: [
        {
          user: "6077f578eb3dc82aec9c3f41",
          comment: "Amazing for design work and creative professionals",
          rating: 5,
          createdAt: new Date("2025-02-25T11:12:00")
        }
      ],
      isFeatured: true,
      tags: ["all-in-one", "desktop", "touchscreen", "creative"],
      createdAt: new Date("2025-01-20T00:00:00"),
      updatedAt: new Date("2025-01-20T00:00:00")
    },
    {
      name: "Philips Hue Smart Lighting Starter Kit",
      description: "Smart home lighting kit with bridge, 4 color bulbs, and motion sensor",
      price: 199.99,
      stock: 80,
      images: ["philips_hue_kit.jpg", "philips_hue_bulbs.jpg", "philips_hue_app.jpg"],
      category: "Smart Home",
      brand: "Philips",
      dimensions: {
        length: 20.5,
        width: 21.2,
        height: 12.8
      },
      weight: 1.2,
      barcodes: ["046677562748", "8718696174586"],
      ratings: 4.6,
      reviews: [
        {
          user: "6077f578eb3dc82aec9c3f42",
          comment: "Easy setup and great integration with HomeKit",
          rating: 5,
          createdAt: new Date("2025-03-12T20:05:00")
        },
        {
          user: "6077f578eb3dc82aec9c3f43",
          comment: "Love the app but occasionally bulbs lose connection",
          rating: 4,
          createdAt: new Date("2025-03-18T17:39:00")
        }
      ],
      isFeatured: false,
      tags: ["smart home", "lighting", "automation", "iot"],
      createdAt: new Date("2024-10-10T00:00:00"),
      updatedAt: new Date("2024-10-10T00:00:00")
    },
    {
      name: "Theragun Pro G5",
      description: "Professional-grade percussive therapy device with 5 speeds, 6 attachments, and OLED screen",
      price: 599.99,
      stock: 25,
      images: ["theragun_pro_g5.jpg", "theragun_pro_g5_case.jpg"],
      category: "Health & Fitness",
      brand: "Therabody",
      dimensions: {
        length: 25.4,
        width: 17.8,
        height: 7.6
      },
      weight: 1.3,
      barcodes: ["810016760218", "0810016760218"],
      ratings: 4.7,
      reviews: [
        {
          user: "6077f578eb3dc82aec9c3f44",
          comment: "Life-changing for recovery after intense workouts",
          rating: 5,
          createdAt: new Date("2025-04-08T09:21:00")
        }
      ],
      isFeatured: false,
      tags: ["massage", "recovery", "fitness", "wellness"],
      createdAt: new Date("2025-03-01T00:00:00"),
      updatedAt: new Date("2025-03-01T00:00:00")
    },
    {
      name: "Breville Oracle Touch Espresso Machine",
      description: "Automatic espresso machine with touch screen, built-in grinder, and automatic milk texturing",
      price: 2499.99,
      stock: 12,
      images: ["breville_oracle_front.jpg", "breville_oracle_side.jpg"],
      category: "Kitchen Appliances",
      brand: "Breville",
      dimensions: {
        length: 37.3,
        width: 41.4,
        height: 45.3
      },
      weight: 17.8,
      barcodes: ["689659278033", "0689659278033"],
      ratings: 4.8,
      reviews: [
        {
          user: "6077f578eb3dc82aec9c3f45",
          comment: "Barista-quality coffee at home, worth every penny",
          rating: 5,
          createdAt: new Date("2025-01-05T07:43:00")
        },
        {
          user: "6077f578eb3dc82aec9c3f46",
          comment: "Amazing machine but steep learning curve",
          rating: 4,
          createdAt: new Date("2025-01-18T16:11:00")
        }
      ],
      isFeatured: false,
      tags: ["coffee", "espresso", "kitchen", "premium"],
      createdAt: new Date("2024-11-01T00:00:00"),
      updatedAt: new Date("2024-11-01T00:00:00")
    },
    {
      name: "Logitech MX Master 4S",
      description: "Advanced wireless mouse with 8K DPI, gesture controls, and multi-device compatibility",
      price: 129.99,
      stock: 100,
      images: ["logitech_mx_master_4s.jpg", "logitech_mx_master_4s_side.jpg"],
      category: "Computer Accessories",
      brand: "Logitech",
      dimensions: {
        length: 12.6,
        width: 8.5,
        height: 4.8
      },
      weight: 0.145,
      barcodes: ["097855170132", "5099206094826"],
      ratings: 4.9,
      reviews: [
        {
          user: "6077f578eb3dc82aec9c3f47",
          comment: "Most comfortable and feature-rich mouse I've ever used",
          rating: 5,
          createdAt: new Date("2025-02-07T13:28:00")
        },
        {
          user: "6077f578eb3dc82aec9c3f48",
          comment: "Perfect for productivity across multiple devices",
          rating: 5,
          createdAt: new Date("2025-02-15T10:34:00")
        }
      ],
      isFeatured: false,
      tags: ["mouse", "wireless", "ergonomic", "productivity"],
      createdAt: new Date("2024-12-15T00:00:00"),
      updatedAt: new Date("2024-12-15T00:00:00")
    }
  ]