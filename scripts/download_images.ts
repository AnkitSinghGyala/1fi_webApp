import fs from 'fs';
import path from 'path';
import https from 'https';

const images = [
  // iPhone 17 Pro (Using iPhone 15 Pro images as proxy)
  { url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-bluetitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692846360609', filename: 'iphone-17-pro.jpg' },
  { url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-whitetitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692846367180', filename: 'iphone-17-pro-silver.jpg' },
  { url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-naturaltitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692846363993', filename: 'iphone-17-pro-gold.jpg' },
  { url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-blacktitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692846357018', filename: 'iphone-17-pro-space-black.jpg' },
  
  // S24 Ultra
  { url: 'https://m.media-amazon.com/images/I/71cxhjiPEuL._SX679_.jpg', filename: 'samsung-s24-ultra.jpg' },
  { url: 'https://m.media-amazon.com/images/I/71cxhjiPEuL._SX679_.jpg', filename: 'samsung-s24-ultra-gray.jpg' },
  { url: 'https://m.media-amazon.com/images/I/71RVuQsAQqL._SX679_.jpg', filename: 'samsung-s24-ultra-black.jpg' },
  { url: 'https://m.media-amazon.com/images/I/71WcJlX4MGL._SX679_.jpg', filename: 'samsung-s24-ultra-violet.jpg' },

  // Pixel 8 Pro
  { url: 'https://m.media-amazon.com/images/I/71N1A4eUXXL._SX679_.jpg', filename: 'pixel-8-pro.jpg' },
  { url: 'https://m.media-amazon.com/images/I/71N1A4eUXXL._SX679_.jpg', filename: 'pixel-8-pro-obsidian.jpg' },
  { url: 'https://m.media-amazon.com/images/I/71z1F+GjJcL._SX679_.jpg', filename: 'pixel-8-pro-porcelain.jpg' },
  { url: 'https://m.media-amazon.com/images/I/71X8kF4b15L._SX679_.jpg', filename: 'pixel-8-pro-bay.jpg' },

  // MacBook Pro
  { url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp16-spaceblack-select-202310?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1697311054290', filename: 'macbook-pro.jpg' },

  // Dell XPS
  { url: 'https://m.media-amazon.com/images/I/71B9gDk502L._SX679_.jpg', filename: 'dell-xps-15.jpg' },

  // Sony Headphones
  { url: 'https://m.media-amazon.com/images/I/51aXvjzcukL._SX522_.jpg', filename: 'sony-wh1000xm5.jpg' },
  { url: 'https://m.media-amazon.com/images/I/51aXvjzcukL._SX522_.jpg', filename: 'sony-wh1000xm5-black.jpg' },
  { url: 'https://m.media-amazon.com/images/I/51bJ3I1X-vL._SX522_.jpg', filename: 'sony-wh1000xm5-silver.jpg' },
  { url: 'https://m.media-amazon.com/images/I/51L3D3J-3IL._SX522_.jpg', filename: 'sony-wh1000xm5-blue.jpg' },

  // Apple Watch
  { url: 'https://m.media-amazon.com/images/I/71Iq9-FqK-L._SX679_.jpg', filename: 'apple-watch-9.jpg' },

  // iPad Air
  { url: 'https://m.media-amazon.com/images/I/61XZQXFQeVL._SX679_.jpg', filename: 'ipad-air-5.jpg' },

  // Tab S9
  { url: 'https://m.media-amazon.com/images/I/61Nl-Xj1B+L._SX679_.jpg', filename: 'samsung-tab-s9.jpg' },
  { url: 'https://m.media-amazon.com/images/I/61Nl-Xj1B+L._SX679_.jpg', filename: 'samsung-tab-s9-graphite.jpg' },
  { url: 'https://m.media-amazon.com/images/I/61dF2B-T5cL._SX679_.jpg', filename: 'samsung-tab-s9-beige.jpg' },

  // Nothing Phone
  { url: 'https://m.media-amazon.com/images/I/81xUheEw9eL._SX679_.jpg', filename: 'nothing-phone-2.jpg' },
  { url: 'https://m.media-amazon.com/images/I/81xUheEw9eL._SX679_.jpg', filename: 'nothing-phone-2-white.jpg' },
  { url: 'https://m.media-amazon.com/images/I/71R2o8FmNLL._SX679_.jpg', filename: 'nothing-phone-2-gray.jpg' },

  // AirPods Pro 2
  { url: 'https://m.media-amazon.com/images/I/61SUj2aKoEL._SX679_.jpg', filename: 'airpods-pro-2.jpg' },

  // Logitech MX Master 3S
  { url: 'https://m.media-amazon.com/images/I/61ni3t1ryQL._SX679_.jpg', filename: 'mx-master-3s.jpg' },
  { url: 'https://m.media-amazon.com/images/I/61ni3t1ryQL._SX679_.jpg', filename: 'mx-master-3s-graphite.jpg' },
  { url: 'https://m.media-amazon.com/images/I/61vJvR3yTFL._SX679_.jpg', filename: 'mx-master-3s-grey.jpg' },

  // Dyson
  { url: 'https://m.media-amazon.com/images/I/51wBmszZ+ZL._SX679_.jpg', filename: 'dyson-v12.jpg' },

  // PS5
  { url: 'https://m.media-amazon.com/images/I/51rRcbA4N2L._SX522_.jpg', filename: 'ps5-console.jpg' },

  // LG TV
  { url: 'https://m.media-amazon.com/images/I/91tK39FmS3L._SX679_.jpg', filename: 'lg-c3-oled.jpg' }
];

const downloadImage = (url: string, filepath: string) => {
  return new Promise<void>((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      }
    };

    https.get(url, options, (res) => {
      if (res.statusCode !== 200) {
        console.error(`Failed to download ${url}: ${res.statusCode}`);
        resolve(); // resolve anyway to not block others
        return;
      }

      const fileStream = fs.createWriteStream(filepath);
      res.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Downloaded ${filepath}`);
        resolve();
      });

      fileStream.on('error', (err) => {
        console.error(`Error saving ${filepath}: ${err.message}`);
        resolve();
      });
    }).on('error', (err) => {
      console.error(`Error requesting ${url}: ${err.message}`);
      resolve();
    });
  });
};

async function main() {
  const dir = path.join(process.cwd(), 'public', 'products');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  console.log(`Downloading ${images.length} images...`);
  
  for (const img of images) {
    const filepath = path.join(dir, img.filename);
    if (!fs.existsSync(filepath)) {
      await downloadImage(img.url, filepath);
      // Small delay to avoid rate limiting
      await new Promise(r => setTimeout(r, 500));
    } else {
      console.log(`${img.filename} already exists, skipping.`);
    }
  }
  
  console.log('Done downloading all images!');
}

main();
