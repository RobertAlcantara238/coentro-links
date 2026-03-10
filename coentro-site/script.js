const STORAGE_KEY = "coentro.links.v1";
const ADMIN_AUTH_KEY = "coentro.admin.auth.v1";
const ADMIN_PASSWORD_HASH = "14df63d173ec6e9eca1395efa31031d960f81da35410295aeca8e1652e4db510";

const PLATFORMS = [
  {
    id: "instagram",
    name: "Instagram",
    iconUrl: "/images/instagram.png",
    iconFallbackClass: "bi bi-instagram",
    defaultUrl:
      "https://www.instagram.com/coentrocomsabor?igsh=ZTVhdDRjZzl3dHoz",
    placeholder: "https://instagram.com/seuperfil"
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    iconUrl: "/images/whatsapp.png",
    iconFallbackClass: "bi bi-whatsapp",
    defaultUrl: "https://wa.me/5511911637577",
    placeholder: "https://wa.me/5511999999999"
  },
  {
    id: "ifood",
    name: "iFood",
    iconUrl: "/images/ifood.png",
    iconFallbackClass: "bi bi-bag-fill",
    defaultUrl: "",
    placeholder: "https://www.ifood.com.br/delivery/..."
  },
  {
    id: "keeta",
    name: "Keeta",
    iconUrl: "/images/keeta.png",
    iconFallbackClass: "bi bi-truck",
    defaultUrl: "",
    placeholder: "https://www.keeta.com/..."
  },
  {
    id: "99food",
    name: "99 Food",
    iconUrl: "/images/99food.png",
    iconFallbackUrl: "/images/99Food.jpg",
    iconFallbackClass: "bi bi-circle-fill",
    defaultUrl: "",
    placeholder: "https://99app.com/food/..."
  },
  {
    id: "cardapio",
    name: "Card\u00E1pio Virtual",
    iconUrl: "/images/menu.png",
    iconFallbackClass: "bi bi-journal-richtext",
    defaultUrl: "",
    placeholder: "https://seusite.com/cardapio"
  }
];

const publicView = document.getElementById("public-view");
const adminView = document.getElementById("admin-view");
const linkList = document.getElementById("link-list");
const adminFields = document.getElementById("admin-fields");
const adminForm = document.getElementById("admin-form");
const adminToggle = document.getElementById("admin-toggle");
const authModal = document.getElementById("auth-modal");
const authForm = document.getElementById("auth-form");
const authPasswordInput = document.getElementById("auth-password");
const authCancel = document.getElementById("auth-cancel");
const authError = document.getElementById("auth-error");
const toast = document.getElementById("toast");

const APP_BASE_PATH = getBasePath();
let toastTimerId = null;

function normalizePath(pathname) {
  const normalized = pathname.replace(/\/+$/, "");
  return normalized || "/";
}

function getBasePath() {
  const currentPath = normalizePath(window.location.pathname);
  if (currentPath.endsWith("/admin")) {
    return currentPath.slice(0, -6) || "/";
  }
  if (currentPath.endsWith("/index.html")) {
    return currentPath.slice(0, -11) || "/";
  }
  return currentPath;
}

function buildRoutePath(route) {
  if (route === "admin") {
    return APP_BASE_PATH === "/" ? "/admin" : `${APP_BASE_PATH}/admin`;
  }
  return APP_BASE_PATH;
}

function getRouteFromLocation() {
  if (window.location.hash === "#/admin") {
    return "admin";
  }

  const currentPath = normalizePath(window.location.pathname);
  return currentPath.endsWith("/admin") ? "admin" : "public";
}

function getDefaultLinks() {
  const defaults = {};
  for (const platform of PLATFORMS) {
    defaults[platform.id] = platform.defaultUrl;
  }
  return defaults;
}

function readSavedLinks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {};
    }

    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (error) {
    return {};
  }
}

function getLinksModel() {
  const defaults = getDefaultLinks();
  const saved = readSavedLinks();

  return Object.fromEntries(
    PLATFORMS.map((platform) => {
      const value = saved[platform.id] ?? defaults[platform.id] ?? "";
      return [platform.id, String(value).trim()];
    })
  );
}

function saveLinksModel(links) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
    return true;
  } catch (error) {
    return false;
  }
}

function isValidHttpUrl(url) {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch (error) {
    return false;
  }
}

function formatLink(raw) {
  const trimmed = raw.trim();
  if (!trimmed) {
    return "";
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

function appendFallbackIcon(iconWrap, className) {
  if (!className) {
    return;
  }

  const icon = document.createElement("i");
  icon.className = className;
  icon.setAttribute("aria-hidden", "true");
  iconWrap.append(icon);
}

function createIconElement(platform) {
  const iconWrap = document.createElement("span");
  iconWrap.className = "icon-wrap";

  if (platform.iconUrl) {
    const image = document.createElement("img");
    image.className = "brand-icon";
    image.src = platform.iconUrl;
    image.alt = "";
    image.loading = "lazy";
    image.decoding = "async";
    image.setAttribute("aria-hidden", "true");
    image.addEventListener("error", () => {
      if (platform.iconFallbackUrl) {
        const fallbackAbsolute = new URL(platform.iconFallbackUrl, window.location.href).href;
        if (image.src !== fallbackAbsolute) {
          image.src = platform.iconFallbackUrl;
          return;
        }
      }

      image.remove();
      appendFallbackIcon(iconWrap, platform.iconFallbackClass);
    });
    iconWrap.append(image);
    return iconWrap;
  }

  if (platform.iconClass) {
    appendFallbackIcon(iconWrap, platform.iconClass);
  }

  return iconWrap;
}

function createLinkButton(platform, url) {
  const hasUrl = Boolean(url);
  const element = hasUrl ? document.createElement("a") : document.createElement("button");
  element.className = "link-button";

  if (hasUrl) {
    element.href = url;
    element.target = "_blank";
    element.rel = "noopener noreferrer";
  } else {
    element.type = "button";
    element.classList.add("is-disabled");
    element.disabled = true;
  }

  const icon = createIconElement(platform);

  const content = document.createElement("span");
  content.className = "link-content";

  const name = document.createElement("span");
  name.className = "link-name";
  name.textContent = platform.name;

  const status = document.createElement("span");
  status.className = "link-status";
  status.textContent = hasUrl ? "Abrir" : "Em breve";

  content.append(name, status);
  element.append(icon, content);

  return element;
}

function renderPublicLinks() {
  const links = getLinksModel();
  linkList.innerHTML = "";

  for (const platform of PLATFORMS) {
    const url = links[platform.id] || "";
    linkList.append(createLinkButton(platform, url));
  }
}

function renderAdminFields() {
  const links = getLinksModel();
  adminFields.innerHTML = "";

  for (const platform of PLATFORMS) {
    const fieldGroup = document.createElement("div");
    fieldGroup.className = "field-group";

    const label = document.createElement("label");
    label.setAttribute("for", `field-${platform.id}`);
    label.textContent = platform.name;

    const input = document.createElement("input");
    input.type = "url";
    input.id = `field-${platform.id}`;
    input.name = platform.id;
    input.placeholder = platform.placeholder;
    input.value = links[platform.id] || "";

    fieldGroup.append(label, input);
    adminFields.append(fieldGroup);
  }
}

function hasAdminAccess() {
  return sessionStorage.getItem(ADMIN_AUTH_KEY) === "ok";
}

async function hashPassword(password) {
  const normalized = String(password);

  if (window.crypto && window.crypto.subtle) {
    const encoder = new TextEncoder();
    const data = encoder.encode(normalized);
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");
  }

  return sha256Fallback(normalized);
}

function sha256Fallback(value) {
  const rightRotate = (number, amount) => (number >>> amount) | (number << (32 - amount));
  const mathPow = Math.pow;
  const maxWord = mathPow(2, 32);
  const words = [];
  const asciiBitLength = value.length * 8;
  const hash = [];
  const k = [];
  const isComposite = {};
  let result = "";
  let primeCounter = 0;

  for (let candidate = 2; primeCounter < 64; candidate += 1) {
    if (isComposite[candidate]) {
      continue;
    }

    for (let multiple = candidate * candidate; multiple < 313; multiple += candidate) {
      isComposite[multiple] = true;
    }

    hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0;
    k[primeCounter] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
    primeCounter += 1;
  }

  let ascii = value + "\x80";
  while ((ascii.length % 64) !== 56) {
    ascii += "\x00";
  }

  for (let i = 0; i < ascii.length; i += 1) {
    const code = ascii.charCodeAt(i);
    words[i >> 2] = words[i >> 2] || 0;
    words[i >> 2] |= code << ((3 - (i % 4)) * 8);
  }

  words[words.length] = (asciiBitLength / maxWord) | 0;
  words[words.length] = asciiBitLength;

  for (let i = 0; i < words.length; i += 16) {
    const w = words.slice(i, i + 16);
    const workingHash = hash.slice(0);

    for (let round = 0; round < 64; round += 1) {
      const w15 = w[round - 15];
      const w2 = w[round - 2];
      const gamma0 = rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3);
      const gamma1 = rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10);

      w[round] = round < 16 ? w[round] : (((w[round - 16] + gamma0 + w[round - 7] + gamma1) | 0) >>> 0);

      const ch = (workingHash[4] & workingHash[5]) ^ (~workingHash[4] & workingHash[6]);
      const maj =
        (workingHash[0] & workingHash[1]) ^
        (workingHash[0] & workingHash[2]) ^
        (workingHash[1] & workingHash[2]);
      const sigma0 =
        rightRotate(workingHash[0], 2) ^
        rightRotate(workingHash[0], 13) ^
        rightRotate(workingHash[0], 22);
      const sigma1 =
        rightRotate(workingHash[4], 6) ^
        rightRotate(workingHash[4], 11) ^
        rightRotate(workingHash[4], 25);

      const temp1 = (workingHash[7] + sigma1 + ch + k[round] + w[round]) | 0;
      const temp2 = (sigma0 + maj) | 0;

      workingHash[7] = workingHash[6];
      workingHash[6] = workingHash[5];
      workingHash[5] = workingHash[4];
      workingHash[4] = (workingHash[3] + temp1) | 0;
      workingHash[3] = workingHash[2];
      workingHash[2] = workingHash[1];
      workingHash[1] = workingHash[0];
      workingHash[0] = (temp1 + temp2) | 0;
    }

    for (let round = 0; round < 8; round += 1) {
      hash[round] = (hash[round] + workingHash[round]) | 0;
    }
  }

  for (let i = 0; i < 8; i += 1) {
    for (let j = 3; j >= 0; j -= 1) {
      const byteValue = (hash[i] >> (j * 8)) & 255;
      result += byteValue.toString(16).padStart(2, "0");
    }
  }

  return result;
}

async function requestAdminAccess() {
  return new Promise((resolve) => {
    if (!authModal || !authForm || !authPasswordInput || !authCancel || !authError) {
      resolve(false);
      return;
    }

    let settled = false;

    const closeModal = (granted) => {
      if (settled) {
        return;
      }

      settled = true;
      authModal.classList.remove("is-open");
      document.body.classList.remove("modal-open");

      authForm.removeEventListener("submit", onSubmit);
      authCancel.removeEventListener("click", onCancel);
      authModal.removeEventListener("click", onBackdropClick);
      window.removeEventListener("keydown", onKeydown);

      resolve(granted);
    };

    const onCancel = () => {
      closeModal(false);
    };

    const onBackdropClick = (event) => {
      if (event.target === authModal) {
        closeModal(false);
      }
    };

    const onKeydown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeModal(false);
      }
    };

    const onSubmit = async (event) => {
      event.preventDefault();

      const input = authPasswordInput.value.trim();
      if (!input) {
        authError.textContent = "Digite a senha.";
        authPasswordInput.focus();
        return;
      }

      authError.textContent = "";

      try {
        const inputHash = await hashPassword(input);
        if (inputHash === ADMIN_PASSWORD_HASH) {
          sessionStorage.setItem(ADMIN_AUTH_KEY, "ok");
          closeModal(true);
          return;
        }

        authError.textContent = "Senha incorreta. Tente novamente.";
        authPasswordInput.select();
        authPasswordInput.focus();
      } catch (error) {
        authError.textContent = "Nao foi possivel validar a senha neste navegador.";
      }
    };

    authForm.reset();
    authError.textContent = "";
    authModal.classList.add("is-open");
    document.body.classList.add("modal-open");

    authForm.addEventListener("submit", onSubmit);
    authCancel.addEventListener("click", onCancel);
    authModal.addEventListener("click", onBackdropClick);
    window.addEventListener("keydown", onKeydown);

    window.setTimeout(() => {
      authPasswordInput.focus();
    }, 30);
  });
}

function showToast(message, isError = false) {
  if (!toast) {
    return;
  }

  const iconClass = isError ? "bi bi-x-circle-fill" : "bi bi-check-circle-fill";
  toast.className = `toast is-visible${isError ? " is-error" : ""}`;
  toast.innerHTML = `<i class="${iconClass}" aria-hidden="true"></i><span>${message}</span>`;

  if (toastTimerId) {
    window.clearTimeout(toastTimerId);
  }

  toastTimerId = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 3000);
}

function handleAdminSubmit(event) {
  event.preventDefault();

  const formData = new FormData(adminForm);
  const nextLinks = {};
  const invalid = [];

  for (const platform of PLATFORMS) {
    const formatted = formatLink(String(formData.get(platform.id) || ""));

    if (formatted && !isValidHttpUrl(formatted)) {
      invalid.push(platform.name);
    }

    nextLinks[platform.id] = formatted;
  }

  if (invalid.length) {
    showToast(`Links inv\u00e1lidos: ${invalid.join(", ")}.`, true);
    return;
  }

  const saved = saveLinksModel(nextLinks);
  if (!saved) {
    showToast("N\u00e3o foi poss\u00edvel salvar no navegador.", true);
    return;
  }

  renderPublicLinks();
  showToast("Altera\u00e7\u00f5es salvas com sucesso!");
}

function navigate(route, options = {}) {
  const targetPath = buildRoutePath(route);
  const useReplace = Boolean(options.replace);

  try {
    if (useReplace) {
      history.replaceState({}, "", targetPath);
    } else {
      history.pushState({}, "", targetPath);
    }
  } catch (error) {
    window.location.hash = route === "admin" ? "#/admin" : "#/";
  }

  void renderRoute();
}

async function renderRoute() {
  const route = getRouteFromLocation();
  const inAdmin = route === "admin";

  if (inAdmin && !hasAdminAccess()) {
    const granted = await requestAdminAccess();
    if (!granted) {
      window.location.href = buildRoutePath("public");
      return;
    }
  }

  publicView.classList.toggle("hidden", inAdmin);
  adminView.classList.toggle("hidden", !inAdmin);

  adminToggle.textContent = inAdmin ? "Voltar" : "Ajustes";
  document.title = inAdmin ? "Coentro | Admin" : "Coentro | Links Oficiais";

  if (inAdmin) {
    renderAdminFields();
  }
}

function init() {
  renderPublicLinks();
  void renderRoute();

  adminForm.addEventListener("submit", handleAdminSubmit);

  adminToggle.addEventListener("click", () => {
    const route = getRouteFromLocation();

    if (route === "admin") {
      navigate("public");
      return;
    }

    navigate("admin");
  });

  window.addEventListener("popstate", () => {
    void renderRoute();
  });
  window.addEventListener("hashchange", () => {
    void renderRoute();
  });
}

init();
