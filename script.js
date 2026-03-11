:root {
  --brand: #6a9a42;
  --brand-strong: #4f7b2f;
  --bg: #f4f1e8;
  --surface: rgba(255, 255, 255, 0.9);
  --text-main: #2f3728;
  --text-soft: #617056;
  --border-soft: #dfe6d7;
  --shadow-soft: 0 16px 36px rgba(68, 90, 48, 0.14);
}

* {
  box-sizing: border-box;
}

img {
  max-width: 100%;
  height: auto;
}

body {
  margin: 0;
  min-height: 100vh;
  font-family: "Nunito Sans", sans-serif;
  color: var(--text-main);
  overflow-x: hidden;
  background:
    radial-gradient(circle at top right, #ebf4dc, transparent 46%),
    radial-gradient(circle at left bottom, #efe5ce, transparent 44%),
    var(--bg);
}

body.modal-open {
  overflow: hidden;
}

.bg-layer {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.leaf {
  position: absolute;
  display: block;
  width: 170px;
  height: 86px;
  border-radius: 90% 0;
  background: linear-gradient(135deg, rgba(106, 154, 66, 0.2), rgba(106, 154, 66, 0.06));
  filter: blur(0.2px);
}

.leaf-1 {
  top: 5%;
  left: -34px;
  transform: rotate(-18deg);
}

.leaf-2 {
  right: -50px;
  top: 28%;
  transform: rotate(30deg) scale(1.1);
}

.leaf-3 {
  bottom: 8%;
  left: 50%;
  transform: translateX(-50%) rotate(12deg);
}

.page-wrap {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 420px;
  margin: auto;
  padding: 1.3rem 0.9rem 2rem;
}

.site-header {
  text-align: center;
  margin-bottom: 1rem;
  animation: rise-in 0.45s ease-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.38rem;
}

.logo {
  width: 100%;
  max-width: 360px;
  height: auto;
  display: block;
}

.card {
  background: var(--surface);
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 20px;
  box-shadow: var(--shadow-soft);
  padding: 1.15rem;
  backdrop-filter: blur(3px);
  animation: rise-in 0.45s ease-out;
}

.section-title h2 {
  margin: 0;
  font-size: 1.15rem;
  font-family: "Fraunces", serif;
  color: var(--brand-strong);
}

.section-title p {
  margin: 0.35rem 0 0.95rem;
  color: var(--text-soft);
  font-size: 0.92rem;
}

.link-list {
  display: grid;
  gap: 0.72rem;
}

.link-button {
  width: 100%;
  min-height: 3.45rem;
  border: 1px solid var(--border-soft);
  border-radius: 16px;
  background: linear-gradient(180deg, #ffffff, #f7faef);
  display: flex;
  align-items: center;
  gap: 0.85rem;
  text-decoration: none;
  color: var(--text-main);
  padding: 0.9rem 1rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  cursor: pointer;
}

.link-button:hover,
.link-button:focus-visible {
  transform: translateY(-2px);
  box-shadow: 0 10px 24px rgba(73, 105, 45, 0.18);
  border-color: rgba(106, 154, 66, 0.55);
  outline: none;
}

.link-button.is-disabled {
  opacity: 0.72;
  background: #f8f8f8;
  cursor: not-allowed;
  box-shadow: none;
}

.link-button.is-disabled:hover,
.link-button.is-disabled:focus-visible {
  transform: none;
  border-color: var(--border-soft);
}

.icon-wrap {
  width: 2.45rem;
  height: 2.45rem;
  border-radius: 0.9rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(106, 154, 66, 0.13);
  color: var(--brand-strong);
  font-size: 1.2rem;
  flex-shrink: 0;
}

.brand-icon {
  width: 1.6rem;
  height: 1.6rem;
  object-fit: contain;
  border-radius: 0.4rem;
}

.icon-badge {
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.link-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 0.75rem;
}

.link-name {
  font-size: 1rem;
  font-weight: 700;
}

.link-status {
  font-size: 0.74rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-soft);
}

.admin-fields {
  display: grid;
  gap: 0.82rem;
}

.admin-panel {
  display: grid;
  gap: 0.92rem;
}

.field-group {
  display: grid;
  gap: 0.45rem;
}

.field-group label {
  font-size: 0.88rem;
  font-weight: 700;
}

.field-group input {
  width: 100%;
  border: 1px solid #d5deca;
  border-radius: 14px;
  padding: 0.82rem 0.92rem;
  font-size: 0.95rem;
  color: var(--text-main);
  background: #fff;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.field-group input:focus {
  border-color: var(--brand);
  box-shadow: 0 0 0 3px rgba(106, 154, 66, 0.2);
  outline: none;
}

.save-btn {
  width: 100%;
  min-height: 3rem;
  border: 0;
  border-radius: 14px;
  background: linear-gradient(135deg, var(--brand), var(--brand-strong));
  color: #fff;
  padding: 0.88rem 1rem;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: filter 0.2s ease, transform 0.2s ease;
}

.save-btn:hover,
.save-btn:focus-visible {
  filter: brightness(1.08);
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(79, 123, 47, 0.28);
  outline: none;
}

.footer-nav {
  margin-top: 0.95rem;
  text-align: center;
}

.admin-toggle {
  border: 1px solid rgba(106, 154, 66, 0.34);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.88);
  color: var(--brand);
  font-weight: 700;
  font-size: 0.92rem;
  min-height: 2.75rem;
  padding: 0.58rem 1.08rem;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
}

.admin-toggle:hover,
.admin-toggle:focus-visible {
  background: #f3f8ec;
  border-color: rgba(106, 154, 66, 0.55);
  transform: translateY(-1px);
  outline: none;
}

.auth-modal {
  position: fixed;
  inset: 0;
  z-index: 35;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.25rem;
  background: rgba(24, 32, 18, 0.44);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 0.25s ease, visibility 0.25s ease;
}

.auth-modal.is-open {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

.auth-card {
  width: min(100%, 390px);
  background: #fff;
  border: 1px solid rgba(255, 255, 255, 0.75);
  border-radius: 22px;
  box-shadow: 0 28px 50px rgba(38, 54, 27, 0.28);
  padding: 1.45rem 1.3rem 1.2rem;
  transform: translateY(10px) scale(0.98);
  transition: transform 0.24s ease;
}

.auth-modal.is-open .auth-card {
  transform: translateY(0) scale(1);
  animation: fade-in 0.26s ease;
}

.auth-card h2 {
  margin: 0;
  font-size: 1.35rem;
  color: var(--brand-strong);
  font-family: "Fraunces", serif;
}

.auth-subtitle {
  margin: 0.3rem 0 1rem;
  color: var(--text-soft);
  font-size: 0.95rem;
}

.auth-form {
  display: grid;
  gap: 0.85rem;
}

.auth-input {
  width: 100%;
  height: 3rem;
  border: 1px solid #d4deca;
  border-radius: 999px;
  padding: 0 1.05rem;
  font-size: 1rem;
  color: var(--text-main);
  background: #fff;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.auth-input:focus {
  border-color: var(--brand);
  box-shadow: 0 0 0 4px rgba(106, 154, 66, 0.2);
  outline: none;
}

.auth-error {
  margin: 0;
  min-height: 1rem;
  font-size: 0.82rem;
  color: #9a2f2f;
}

.auth-actions {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.65rem;
}

.auth-btn {
  border: 0;
  border-radius: 999px;
  min-height: 2.85rem;
  font-weight: 700;
  font-size: 0.93rem;
  cursor: pointer;
  transition: transform 0.2s ease, filter 0.2s ease, background-color 0.2s ease;
}

.auth-btn:hover,
.auth-btn:focus-visible {
  transform: translateY(-1px);
  outline: none;
}

.auth-btn-primary {
  background: linear-gradient(135deg, var(--brand), var(--brand-strong));
  color: #fff;
}

.auth-btn-primary:hover,
.auth-btn-primary:focus-visible {
  filter: brightness(1.05);
}

.auth-btn-secondary {
  background: #edf3e7;
  color: var(--brand-strong);
}

.auth-btn-secondary:hover,
.auth-btn-secondary:focus-visible {
  background: #e3ecdb;
}

.toast {
  position: fixed;
  left: 50%;
  top: 1rem;
  z-index: 40;
  width: min(calc(100vw - 1.2rem), 420px);
  transform: translate(-50%, -10px);
  opacity: 0;
  pointer-events: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.48rem;
  background: linear-gradient(180deg, #75aa47, #5f9039);
  color: #fff;
  border-radius: 999px;
  padding: 0.68rem 1rem;
  font-size: 0.9rem;
  font-weight: 700;
  box-shadow: 0 16px 30px rgba(47, 77, 28, 0.34);
  transition: opacity 0.22s ease, transform 0.22s ease;
}

.toast.is-visible {
  opacity: 1;
  transform: translate(-50%, 0);
}

.toast.is-error {
  background: linear-gradient(180deg, #c85656, #b33e3e);
}

.toast i {
  font-size: 1rem;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.hidden {
  display: none;
}

@media (min-width: 768px) {
  .page-wrap {
    padding: 2.1rem 1rem 2.8rem;
  }

  .site-header {
    margin-bottom: 1.25rem;
  }

  .card {
    border-radius: 24px;
    padding: 1.45rem;
  }

  .link-list {
    gap: 0.82rem;
  }

  .link-button {
    min-height: 3.6rem;
    padding: 0.98rem 1.1rem;
  }

  .link-name {
    font-size: 1.03rem;
  }

  .admin-panel {
    gap: 1rem;
  }

  .admin-fields {
    gap: 0.95rem;
  }

  .field-group input {
    padding: 0.9rem 0.95rem;
    font-size: 0.96rem;
  }

  .save-btn {
    min-height: 3.15rem;
    font-size: 0.98rem;
  }

  .footer-nav {
    margin-top: 1.15rem;
  }

  .admin-toggle {
    min-height: 2.85rem;
    font-size: 0.95rem;
    padding: 0.62rem 1.2rem;
  }

  .auth-card {
    width: min(100%, 410px);
    padding: 1.6rem 1.45rem 1.3rem;
  }

  .auth-actions {
    grid-template-columns: 1fr 1fr;
  }

  .toast {
    top: 1.15rem;
  }
}

@media (min-width: 1024px) {
  .page-wrap {
    padding-top: 2.7rem;
    padding-bottom: 3.3rem;
  }

  .card {
    padding: 1.65rem;
  }

  .link-button {
    min-height: 3.7rem;
    padding: 1.02rem 1.15rem;
  }

  .link-status {
    font-size: 0.76rem;
  }

  .field-group label {
    font-size: 0.9rem;
  }

  .field-group input {
    font-size: 1rem;
  }

  .save-btn {
    font-size: 1rem;
  }

  .auth-card h2 {
    font-size: 1.45rem;
  }

  .auth-subtitle {
    font-size: 1rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

@keyframes rise-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}


