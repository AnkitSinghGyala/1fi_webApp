import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const products = [
  {
    name: "iPhone 17 Pro",
    slug: "iphone-17-pro",
    image: "/products/iphone-17-pro/iphone-17-pro.jpg",
    mrp: 134900,
    basePrice: 127400,
    variants: [
      {
        name: "Storage",
        options: [
          { value: "256GB", extraPrice: 0, image: null },
          { value: "512GB", extraPrice: 20000, image: null },
          { value: "1TB", extraPrice: 40000, image: null }
        ]
      },
      {
        name: "Color",
        options: [
          { value: "Silver", extraPrice: 0, image: "/products/iphone-17-pro/iphone-17-pro-silver.jpg" },
          { value: "Gold", extraPrice: 0, image: "/products/iphone-17-pro/iphone-17-pro-gold.jpg" },
          { value: "Space Black", extraPrice: 0, image: "/products/iphone-17-pro/iphone-17-pro-space-black.jpg" }
        ]
      }
    ],
    emiPlans: [
      { months: 3, interestRate: 0, cashback: 7500 },
      { months: 6, interestRate: 0, cashback: 7500 },
      { months: 12, interestRate: 0, cashback: 7500 },
      { months: 24, interestRate: 10.5, cashback: 0 },
    ]
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    slug: "samsung-s24-ultra",
    image: "https://images.unsplash.com/photo-1610945265064-3234dac85b70?w=800&q=80",
    mrp: 129999,
    basePrice: 129999,
    variants: [
      {
        name: "Storage",
        options: [
          { value: "256GB", extraPrice: 0, image: null },
          { value: "512GB", extraPrice: 10000, image: null },
          { value: "1TB", extraPrice: 20000, image: null }
        ]
      },
      {
        name: "Color",
        options: [
          { value: "Titanium Gray", extraPrice: 0, image: "https://images.unsplash.com/photo-1610945265064-3234dac85b70?w=800&q=80" },
          { value: "Titanium Black", extraPrice: 0, image: "https://images.unsplash.com/photo-1610945486795-3234dac85b70?w=800&q=80" },
          { value: "Titanium Violet", extraPrice: 0, image: "https://images.unsplash.com/photo-1610945486795-3234dac85b71?w=800&q=80" }
        ]
      }
    ],
    emiPlans: [
      { months: 3, interestRate: 0, cashback: 5000 },
      { months: 6, interestRate: 0, cashback: 5000 },
      { months: 12, interestRate: 0, cashback: 5000 },
      { months: 24, interestRate: 10.5, cashback: 0 },
    ]
  },
  {
    name: "Google Pixel 8 Pro",
    slug: "google-pixel-8-pro",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=80",
    mrp: 106999,
    basePrice: 106999,
    variants: [
      {
        name: "Storage",
        options: [
          { value: "128GB", extraPrice: 0, image: null },
          { value: "256GB", extraPrice: 7000, image: null },
          { value: "512GB", extraPrice: 14000, image: null }
        ]
      },
      {
        name: "Color",
        options: [
          { value: "Obsidian", extraPrice: 0, image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=80" },
          { value: "Porcelain", extraPrice: 0, image: "https://images.unsplash.com/photo-1598327105666-5b89351aff98?w=800&q=80" },
          { value: "Bay", extraPrice: 0, image: "https://images.unsplash.com/photo-1598327105666-5b89351aff99?w=800&q=80" }
        ]
      }
    ],
    emiPlans: [
      { months: 6, interestRate: 0, cashback: 4000 },
      { months: 12, interestRate: 0, cashback: 4000 },
      { months: 24, interestRate: 12.5, cashback: 0 },
    ]
  },
  {
    name: "MacBook Pro 16-inch (M3 Max)",
    slug: "macbook-pro-16-m3",
    image: "/products/macbook-pro-16-m3/macbook-pro.jpg",
    mrp: 349900,
    basePrice: 349900,
    variants: [
      {
        name: "Storage",
        options: [
          { value: "1TB", extraPrice: 0, image: null },
          { value: "2TB", extraPrice: 40000, image: null },
          { value: "4TB", extraPrice: 100000, image: null }
        ]
      },
      {
        name: "Memory",
        options: [
          { value: "36GB", extraPrice: 0, image: null },
          { value: "48GB", extraPrice: 20000, image: null },
          { value: "64GB", extraPrice: 40000, image: null }
        ]
      }
    ],
    emiPlans: [
      { months: 6, interestRate: 0, cashback: 10000 },
      { months: 12, interestRate: 10.5, cashback: 0 },
      { months: 24, interestRate: 10.5, cashback: 0 },
    ]
  },
  {
    name: "Dell XPS 15",
    slug: "dell-xps-15",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&q=80",
    mrp: 189999,
    basePrice: 175999,
    variants: [
      {
        name: "Processor",
        options: [
          { value: "Intel i7", extraPrice: 0, image: null },
          { value: "Intel i9", extraPrice: 30000, image: null }
        ]
      },
      {
        name: "Storage",
        options: [
          { value: "512GB", extraPrice: 0, image: null },
          { value: "1TB", extraPrice: 15000, image: null }
        ]
      }
    ],
    emiPlans: [
      { months: 6, interestRate: 0, cashback: 5000 },
      { months: 12, interestRate: 9.5, cashback: 0 },
    ]
  },
  {
    name: "Sony WH-1000XM5 Headphones",
    slug: "sony-wh-1000xm5",
    image: "/products/sony-wh-1000xm5/sony-wh1000xm5.jpg",
    mrp: 34990,
    basePrice: 29990,
    variants: [
      {
        name: "Color",
        options: [
          { value: "Black", extraPrice: 0, image: "/products/sony-wh-1000xm5/sony-wh1000xm5-black.jpg" },
          { value: "Platinum Silver", extraPrice: 0, image: "/products/sony-wh-1000xm5/sony-wh1000xm5-silver.jpg" },
          { value: "Midnight Blue", extraPrice: 0, image: "/products/sony-wh-1000xm5/sony-wh1000xm5-blue.jpg" }
        ]
      }
    ],
    emiPlans: [
      { months: 3, interestRate: 0, cashback: 2000 },
      { months: 6, interestRate: 0, cashback: 2000 },
      { months: 9, interestRate: 12, cashback: 0 },
    ]
  },
  {
    name: "Apple Watch Series 9",
    slug: "apple-watch-series-9",
    image: "/products/apple-watch-series-9/apple-watch-9.jpg",
    mrp: 41900,
    basePrice: 39900,
    variants: [
      {
        name: "Size",
        options: [
          { value: "41mm", extraPrice: 0, image: null },
          { value: "45mm", extraPrice: 3000, image: null }
        ]
      },
      {
        name: "Connectivity",
        options: [
          { value: "GPS", extraPrice: 0, image: null },
          { value: "GPS + Cellular", extraPrice: 10000, image: null }
        ]
      }
    ],
    emiPlans: [
      { months: 3, interestRate: 0, cashback: 1500 },
      { months: 6, interestRate: 0, cashback: 1500 },
    ]
  },
  {
    name: "iPad Air (5th Generation)",
    slug: "ipad-air-5",
    image: "/products/ipad-air-5/ipad-air-5.jpg",
    mrp: 59900,
    basePrice: 54900,
    variants: [
      {
        name: "Storage",
        options: [
          { value: "64GB", extraPrice: 0, image: null },
          { value: "256GB", extraPrice: 15000, image: null }
        ]
      },
      {
        name: "Connectivity",
        options: [
          { value: "Wi-Fi", extraPrice: 0, image: null },
          { value: "Wi-Fi + Cellular", extraPrice: 15000, image: null }
        ]
      }
    ],
    emiPlans: [
      { months: 3, interestRate: 0, cashback: 3000 },
      { months: 6, interestRate: 0, cashback: 3000 },
      { months: 12, interestRate: 11, cashback: 0 },
    ]
  },
  {
    name: "Samsung Galaxy Tab S10 Lite",
    slug: "samsung-tab-s10-lite",
    image: "/products/Samsung Galaxy Tab S10 Lite/ Samsung Galaxy Tab S10 Lite Black.jpg",
    mrp: 72999,
    basePrice: 72999,
    variants: [
      {
        name: "Storage",
        options: [
          { value: "128GB", extraPrice: 0, image: null },
          { value: "256GB", extraPrice: 11000, image: null }
        ]
      },
      {
        name: "Color",
        options: [
          { value: "Black", extraPrice: 0, image: "/products/Samsung Galaxy Tab S10 Lite/ Samsung Galaxy Tab S10 Lite Black.jpg" },
          { value: "Silver", extraPrice: 0, image: "/products/Samsung Galaxy Tab S10 Lite/ Samsung Galaxy Tab S10 Lite Silver.jpg" }
        ]
      }
    ],
    emiPlans: [
      { months: 6, interestRate: 0, cashback: 4000 },
      { months: 12, interestRate: 0, cashback: 4000 },
      { months: 18, interestRate: 12.5, cashback: 0 },
    ]
  },
  {
    name: "Nothing Phone 4(b)",
    slug: "nothing-phone-4b",
    image: "/products/Nothing Phone 4(b)/Nothing Phone 4(b) white.jpg",
    mrp: 44999,
    basePrice: 42999,
    variants: [
      {
        name: "Storage",
        options: [
          { value: "128GB", extraPrice: 0, image: null },
          { value: "256GB", extraPrice: 5000, image: null },
          { value: "512GB", extraPrice: 10000, image: null }
        ]
      },
      {
        name: "Color",
        options: [
          { value: "White", extraPrice: 0, image: "/products/Nothing Phone 4(b)/Nothing Phone 4(b) white.jpg" },
          { value: "Black", extraPrice: 0, image: "/products/Nothing Phone 4(b)/Nothing Phone 4(b) black.jpg" }
        ]
      }
    ],
    emiPlans: [
      { months: 3, interestRate: 0, cashback: 2000 },
      { months: 6, interestRate: 14, cashback: 0 },
    ]
  },
  {
    name: "AirPods Pro (2nd Generation)",
    slug: "airpods-pro-2",
    image: "/products/airpods-pro-2/airpods-pro-2.jpg",
    mrp: 24900,
    basePrice: 22900,
    variants: [
      {
        name: "Case",
        options: [
          { value: "MagSafe (USB-C)", extraPrice: 0, image: null }
        ]
      }
    ],
    emiPlans: [
      { months: 3, interestRate: 0, cashback: 1000 },
      { months: 6, interestRate: 12, cashback: 0 },
    ]
  },
  {
    name: "Logitech MX Master 3S",
    slug: "logitech-mx-master-3s",
    image: "/products/logitech-mx-master-3s/mx-master-3s.jpg",
    mrp: 10995,
    basePrice: 8995,
    variants: [
      {
        name: "Color",
        options: [
          { value: "Graphite", extraPrice: 0, image: "/products/logitech-mx-master-3s/mx-master-3s-graphite.jpg" },
          { value: "Pale Grey", extraPrice: 0, image: "/products/logitech-mx-master-3s/mx-master-3s.jpg" }
        ]
      }
    ],
    emiPlans: [
      { months: 3, interestRate: 0, cashback: 0 }
    ]
  },
  {
    name: "Dyson V12 Detect Slim",
    slug: "dyson-v12",
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&q=80",
    mrp: 55900,
    basePrice: 51900,
    variants: [
      {
        name: "Variant",
        options: [
          { value: "Submarine", extraPrice: 0, image: null },
          { value: "Absolute", extraPrice: 3000, image: null }
        ]
      }
    ],
    emiPlans: [
      { months: 6, interestRate: 0, cashback: 5000 },
      { months: 12, interestRate: 0, cashback: 5000 },
      { months: 24, interestRate: 15, cashback: 0 },
    ]
  },
  {
    name: "PlayStation 5 Console",
    slug: "ps5-console",
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&q=80",
    mrp: 54990,
    basePrice: 49990,
    variants: [
      {
        name: "Edition",
        options: [
          { value: "Digital Edition", extraPrice: 0, image: null },
          { value: "Disc Edition", extraPrice: 5000, image: null }
        ]
      }
    ],
    emiPlans: [
      { months: 6, interestRate: 0, cashback: 2500 },
      { months: 12, interestRate: 11.5, cashback: 0 },
    ]
  },
  {
    name: "Sony BRAVIA 3 Series 139 cm (55 inches)",
    slug: "sony-bravia-3-series-55",
    image: "/products/Sony BRAVIA 3 Series 139 cm (55 inches)/Sony BRAVIA 3 Series 139 cm (55 inches).jpg",
    mrp: 189990,
    basePrice: 129990,
    variants: [
      {
        name: "Size",
        options: [
          { value: "55-inch", extraPrice: 0, image: null },
          { value: "65-inch", extraPrice: 70000, image: null }
        ]
      }
    ],
    emiPlans: [
      { months: 6, interestRate: 0, cashback: 8000 },
      { months: 12, interestRate: 0, cashback: 8000 },
      { months: 24, interestRate: 12, cashback: 0 },
    ]
  }
];

async function seed() {
  try {
    console.log("Connected to PostgreSQL via Prisma");

    // Clear existing data
    await prisma.emiPlan.deleteMany({});
    await prisma.option.deleteMany({});
    await prisma.variant.deleteMany({});
    await prisma.product.deleteMany({});
    console.log("Cleared existing products");

    // Insert new data
    for (const p of products) {
      await prisma.product.create({
        data: {
          name: p.name,
          slug: p.slug,
          image: p.image,
          mrp: p.mrp,
          basePrice: p.basePrice,
          variants: {
            create: p.variants.map((v) => ({
              name: v.name,
              options: {
                create: v.options.map((o) => ({
                  value: o.value,
                  extraPrice: o.extraPrice,
                  image: o.image,
                })),
              },
            })),
          },
          emiPlans: {
            create: p.emiPlans.map((e) => ({
              months: e.months,
              interestRate: e.interestRate,
              cashback: e.cashback,
            })),
          },
        },
      });
    }

    console.log(`Successfully seeded ${products.length} products`);

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
