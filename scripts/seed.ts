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
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-bluetitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692846360609",
    mrp: 134900,
    basePrice: 127400,
    variants: [
      {
        name: "Storage",
        options: [
          { value: "256GB", extraPrice: 0 },
          { value: "512GB", extraPrice: 20000 },
          { value: "1TB", extraPrice: 40000 }
        ]
      },
      {
        name: "Color",
        options: [
          { value: "Silver", extraPrice: 0 },
          { value: "Gold", extraPrice: 0 },
          { value: "Space Black", extraPrice: 0 }
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
          { value: "256GB", extraPrice: 0 },
          { value: "512GB", extraPrice: 10000 },
          { value: "1TB", extraPrice: 20000 }
        ]
      },
      {
        name: "Color",
        options: [
          { value: "Titanium Gray", extraPrice: 0 },
          { value: "Titanium Black", extraPrice: 0 },
          { value: "Titanium Violet", extraPrice: 0 }
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
          { value: "128GB", extraPrice: 0 },
          { value: "256GB", extraPrice: 7000 },
          { value: "512GB", extraPrice: 14000 }
        ]
      },
      {
        name: "Color",
        options: [
          { value: "Obsidian", extraPrice: 0 },
          { value: "Porcelain", extraPrice: 0 },
          { value: "Bay", extraPrice: 0 }
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
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp16-spaceblack-select-202310?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1697311054290",
    mrp: 349900,
    basePrice: 349900,
    variants: [
      {
        name: "Storage",
        options: [
          { value: "1TB", extraPrice: 0 },
          { value: "2TB", extraPrice: 40000 },
          { value: "4TB", extraPrice: 100000 }
        ]
      },
      {
        name: "Memory",
        options: [
          { value: "36GB", extraPrice: 0 },
          { value: "48GB", extraPrice: 20000 },
          { value: "64GB", extraPrice: 40000 }
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
          { value: "Intel i7", extraPrice: 0 },
          { value: "Intel i9", extraPrice: 30000 }
        ]
      },
      {
        name: "Storage",
        options: [
          { value: "512GB", extraPrice: 0 },
          { value: "1TB", extraPrice: 15000 }
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
    image: "https://www.sony.co.in/image/6145c1d32e6ac8e63a46c912dc33c5bb?fmt=pjpeg&wid=330&bgcolor=FFFFFF&bgc=FFFFFF",
    mrp: 34990,
    basePrice: 29990,
    variants: [
      {
        name: "Color",
        options: [
          { value: "Black", extraPrice: 0 },
          { value: "Platinum Silver", extraPrice: 0 },
          { value: "Midnight Blue", extraPrice: 0 }
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
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-s9-alum-midnight-nc-9s_VW_34FR+watch-45-alum-midnight-cell-9s_VW_34FR_WF_CO?wid=750&hei=712&trim=1%2C0&fmt=p-jpg&qlt=95&.v=1693206037703%2C1693207399432",
    mrp: 41900,
    basePrice: 39900,
    variants: [
      {
        name: "Size",
        options: [
          { value: "41mm", extraPrice: 0 },
          { value: "45mm", extraPrice: 3000 }
        ]
      },
      {
        name: "Connectivity",
        options: [
          { value: "GPS", extraPrice: 0 },
          { value: "GPS + Cellular", extraPrice: 10000 }
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
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-storage-select-202207-space-gray-wifi?wid=470&hei=556&fmt=png-alpha&.v=1655246755452",
    mrp: 59900,
    basePrice: 54900,
    variants: [
      {
        name: "Storage",
        options: [
          { value: "64GB", extraPrice: 0 },
          { value: "256GB", extraPrice: 15000 }
        ]
      },
      {
        name: "Connectivity",
        options: [
          { value: "Wi-Fi", extraPrice: 0 },
          { value: "Wi-Fi + Cellular", extraPrice: 15000 }
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
    name: "Samsung Galaxy Tab S9",
    slug: "samsung-tab-s9",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80",
    mrp: 72999,
    basePrice: 72999,
    variants: [
      {
        name: "Storage",
        options: [
          { value: "128GB", extraPrice: 0 },
          { value: "256GB", extraPrice: 11000 }
        ]
      },
      {
        name: "Color",
        options: [
          { value: "Graphite", extraPrice: 0 },
          { value: "Beige", extraPrice: 0 }
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
    name: "Nothing Phone (2)",
    slug: "nothing-phone-2",
    image: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=800&q=80",
    mrp: 44999,
    basePrice: 42999,
    variants: [
      {
        name: "Storage",
        options: [
          { value: "128GB", extraPrice: 0 },
          { value: "256GB", extraPrice: 5000 },
          { value: "512GB", extraPrice: 10000 }
        ]
      },
      {
        name: "Color",
        options: [
          { value: "White", extraPrice: 0 },
          { value: "Dark Gray", extraPrice: 0 }
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
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MTJV3?wid=572&hei=572&fmt=jpeg&qlt=95&.v=1694014871985",
    mrp: 24900,
    basePrice: 22900,
    variants: [
      {
        name: "Case",
        options: [
          { value: "MagSafe (USB-C)", extraPrice: 0 }
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
    image: "https://resource.logitech.com/w_386,ar_1.0,c_limit,f_auto,q_auto,dpr_2.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-3s/gallery/mx-master-3s-mouse-top-view-pale-grey.png?v=1",
    mrp: 10995,
    basePrice: 8995,
    variants: [
      {
        name: "Color",
        options: [
          { value: "Graphite", extraPrice: 0 },
          { value: "Pale Grey", extraPrice: 0 }
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
    image: "https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/images/products/primary/447098-01.png?$responsive$&fmt=png-alpha&cropPathE=desktop&fit=stretch,1&wid=400",
    mrp: 55900,
    basePrice: 51900,
    variants: [
      {
        name: "Variant",
        options: [
          { value: "Submarine", extraPrice: 0 },
          { value: "Absolute", extraPrice: 3000 }
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
          { value: "Digital Edition", extraPrice: 0 },
          { value: "Disc Edition", extraPrice: 5000 }
        ]
      }
    ],
    emiPlans: [
      { months: 6, interestRate: 0, cashback: 2500 },
      { months: 12, interestRate: 11.5, cashback: 0 },
    ]
  },
  {
    name: "LG C3 55-inch OLED TV",
    slug: "lg-c3-55-oled",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&q=80",
    mrp: 189990,
    basePrice: 129990,
    variants: [
      {
        name: "Size",
        options: [
          { value: "55-inch", extraPrice: 0 },
          { value: "65-inch", extraPrice: 70000 }
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
