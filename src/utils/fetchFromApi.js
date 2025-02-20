const AppID = "3912183453726646";
const ClientSecret = "s0SOkfYiYZqPDGB3LFf1GUATy3Gkzt3V"

let baseUrl = "https://fakestoreapi.com";

async function fetchFromApi(path) {
  const res = await fetch(`${baseUrl}/${path}`);
  const data = await res.json();
  return data;
}

console.log("https://api.mercadolibre.com/sites/MLA/search?seller_id=116088")
export default fetchFromApi;