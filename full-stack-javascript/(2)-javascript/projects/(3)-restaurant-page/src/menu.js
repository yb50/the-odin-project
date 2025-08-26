export function loadMenu() {
  const content = document.querySelector("#content");

  const container = document.createElement("div");
  container.className = ("tab tab-menu");

  const title = document.createElement("h2");
  title.textContent = "Menu";

  const list = document.createElement("ul");
  list.className = "menu-list";

  const items = [
    {
      name: "Pide",
      price: "$10",
      imgSrc: "https://img.ccnull.de/1100000/preview/1100679_46b8510518055821919df62874105908.jpg",
    },
    {
      name: "Borek",
      price: "$8",
      imgSrc: "https://live.staticflickr.com/4050/4449090451_43cf1a5d34_b.jpg",
    },
    {
      name: "Lahmacun",
      price: "$6",
      imgSrc: "https://source.roboflow.com/Q6x9WgoWnlQCqQRzE2bGr0c3lR63/0mc50P85LJFzjZldrUW3/original.jpg",
    },
  ];

  items.forEach(({ name, price, imgSrc }) => {
    const li = document.createElement("li");
    li.className = "menu-item";
  
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
  
    li.appendChild(img);
    li.appendChild(info);
    list.appendChild(li);
  });

  container.appendChild(title);
  container.appendChild(list);
  content.appendChild(container);
}
