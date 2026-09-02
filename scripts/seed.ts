import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

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
      { months: 24, interestRate: 0, cashback: 7500 },
      { months: 36, interestRate: 10.5, cashback: 7500 },
      { months: 48, interestRate: 10.5, cashback: 7500 },
      { months: 60, interestRate: 10.5, cashback: 7500 }
    ]
  },
  {
    name: "Samsung S24 Ultra",
    slug: "samsung-s24-ultra",
    image: "https://images.samsung.com/is/image/samsung/p6pim/in/2401/gallery/in-galaxy-s24-s928-sm-s928bztqins-539573338?$650_519_PNG$",
    mrp: 129999,
    basePrice: 129999,
    variants: [
      {
        name: "Storage",
        options: [
          { value: "256GB", extraPrice: 0 },
          { value: "512GB", extraPrice: 10000 },
        ]
      },
      {
        name: "Color",
        options: [
          { value: "Titanium Gray", extraPrice: 0 },
          { value: "Titanium Black", extraPrice: 0 },
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
    image: "https://lh3.googleusercontent.com/vH2P3iSOfYyPZkO2Nn0vVqH1hS_XzS_B94z_zJ_7-g_J1_zZ_N8h9q8J_N_E_F_5_H_D_q_P_h_M_H_G_F_w_N_3_C_K_p_o_O_P_t_q_L_Q=s0",
    mrp: 106999,
    basePrice: 106999,
    variants: [
      {
        name: "Storage",
        options: [
          { value: "128GB", extraPrice: 0 },
          { value: "256GB", extraPrice: 7000 },
        ]
      },
      {
        name: "Color",
        options: [
          { value: "Obsidian", extraPrice: 0 },
          { value: "Porcelain", extraPrice: 0 },
        ]
      }
    ],
    emiPlans: [
      { months: 6, interestRate: 0, cashback: 4000 },
      { months: 12, interestRate: 0, cashback: 4000 },
      { months: 24, interestRate: 12.5, cashback: 0 },
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

    console.log("Successfully seeded products");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
