import axios from "axios";
import * as cheerio from "cheerio";

// https://github.com/cheeriojs/cheerio
// https://webscraping.ai/faq/cheerio/how-do-you-use-cheerio-with-asynchronous-javascript-code
// https://stackoverflow.com/questions/23608325/each-and-callbacks

const baseUrl =
  "https://webscraper.io/test-sites/e-commerce/static/computers/laptops";
let savedLaptops = [];

const getLaptops = async (page = 1) => {
  try {
    const { data } = await axios.get(`${baseUrl}?page=${page}`);
    const $ = cheerio.load(data);

    const laptops = [];

    $(".thumbnail").each((_i, elem) => {
      const title = $(elem).find(".title").attr("title");
      const price = $(elem).find(".caption h4.price").text();
      const titleLink = $(elem).find(".title").attr("href");
      const description = $(elem).find(".description").text();
      const reviews = $(elem).find(".ratings p.review-count").text().trim();
      const rating = $(elem)
        .find(".ratings p[data-rating]")
        .attr("data-rating");
      const img = $(elem).find("img").attr("src");

      laptops.push({
        title,
        titleLink,
        price,
        description,
        rating,
        reviews,
        img,
      });
    });

    return laptops;
  } catch (error) {
    console.error(`Error fetching data from page ${page}:`, error);
  }
}

const getAllLaptops = async () => {
  let allLaptops = [];
  let page = 1;
  let hasMorePages = true;

  while (hasMorePages) {
    const laptops = await getLaptops(page);
    if (laptops.length > 0) {
      allLaptops = allLaptops.concat(laptops);
      page += 1;
    } else {
      hasMorePages = false;
    }
  }

  const filterLenovo = allLaptops.filter((laptop) =>
    laptop.title.toLowerCase().includes("lenovo")
  );

  filterLenovo.sort(
    (a, b) =>
      parseFloat(a.price.replace("$", "")) -
      parseFloat(b.price.replace("$", ""))
  );
  savedLaptops = filterLenovo;
  return filterLenovo;
}

//função feita para otimizar o funcionamento do bot, fazendo com que sempre que o frontend requisitar os laptops, o backend retorne os dados já salvos.
const getSavedLaptops = () => {
  return savedLaptops;
}

getAllLaptops();

setInterval(getAllLaptops, 10800000);

export { getAllLaptops, getSavedLaptops };
