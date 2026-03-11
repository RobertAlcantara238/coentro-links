const LINKS = [
  {
    name: "Instagram",
    icon: "images/Instagram.png",
    url: "https://instagram.com/coentro"
  },
  {
    name: "WhatsApp",
    icon: "images/whatsapp.png",
    url: "https://wa.me/5511911637577"
  },
  {
    name: "iFood",
    icon: "images/iFood.png",
    url: ""
  },
  {
    name: "Keeta",
    icon: "images/keeta.png",
    url: ""
  },
  {
    name: "99 Food",
    icon: "images/99Food.png",
    url: ""
  },
  {
    name: "Card\u00e1pio",
    icon: "images/menu.png",
    url: ""
  }
];

const linkList = document.getElementById("link-list");

function createLinkButton(link) {
  const resolvedUrl = typeof link.url === "string" ? link.url.trim() : "";
  const hasUrl = Boolean(resolvedUrl);
  const element = document.createElement(hasUrl ? "a" : "button");
  element.className = "link-button";

  if (hasUrl) {
    element.href = resolvedUrl;
    element.target = "_blank";
    element.rel = "noopener noreferrer";
  } else {
    element.type = "button";
    element.classList.add("is-disabled");
    element.disabled = true;
  }

  const iconWrap = document.createElement("span");
  iconWrap.className = "icon-wrap";

  const image = document.createElement("img");
  image.className = "brand-icon";
  image.src = link.icon;
  image.alt = "";
  image.loading = "lazy";
  image.decoding = "async";
  image.setAttribute("aria-hidden", "true");
  iconWrap.append(image);

  const content = document.createElement("span");
  content.className = "link-content";

  const name = document.createElement("span");
  name.className = "link-name";
  name.textContent = link.name;

  const status = document.createElement("span");
  status.className = "link-status";
  status.textContent = hasUrl ? "Abrir" : "Em breve";

  content.append(name, status);
  element.append(iconWrap, content);

  return element;
}

function renderLinks() {
  if (!linkList) {
    return;
  }

  linkList.innerHTML = "";

  for (const link of LINKS) {
    linkList.append(createLinkButton(link));
  }
}

renderLinks();


