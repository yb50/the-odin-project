export function loadMenu() {
  const content = document.querySelector("#content");

  const container = document.createElement("div");
  container.className("tab tab-menu");

  const title = document.createElement("h2");
  title.textContent = "Menu";

  const list = document.createElement("ul");
  list.className = "menu-items";

  const items = [
    {
      name: "Pide",
      price: "$10",
      imgSrc: "https://ccnull.de/foto/frisch-gebackenes-veganes-pide-schiffchen-mit-gemuese/1100679",
    },
    {
      name: "Borek",
      price: "$8",
      imgSrc: "https://www.needpix.com/photo/629330/turkish-food-boerek-food-food-from-turkey",
    },
    {
      name: "Lahmacun",
      price: "$6",
      imgSrc: "https://universe.roboflow.com/scgool/yemekler",
    },
  ];

  items.forEach(({ name, price, imgSrc }) => {
    const li = document.createElement("li");
    li.className = "menu";
  
    const img = document.createElement("img");
    img.src = imgSrc;
    img.alt = name;
  
    const info = document.createElement("div");
    info.className = "menu-info";
  
    const dish = document.createElement("span");
    dish.className = "menu-name";
    dish.textContent = name;
  
    const cost = document.createElement("strong");
    cost.className = "menu-price";
    cost.textContent = price;
  
    info.appendChild(dish);
    info.appendChild(cost);
  
    li.appendChild(info);
    li.appendChild(img);
    list.appendChild(li);
  });

  container.appendChild(title);
  container.appendChild(list);
  content.appendChild(container);
}
