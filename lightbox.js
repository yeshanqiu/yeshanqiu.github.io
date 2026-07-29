(function () {
  if (window.__omLightbox) return;
  window.__omLightbox = true;

  var overlay, img, caption;

  function build() {
    overlay = document.createElement('div');
    overlay.setAttribute('data-lightbox', '');
    overlay.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(14,15,13,.94);display:none;align-items:center;justify-content:center;padding:48px;box-sizing:border-box;cursor:zoom-out;';

    img = document.createElement('img');
    img.style.cssText = 'max-width:100%;max-height:100%;width:auto;height:auto;object-fit:contain;box-shadow:0 24px 80px rgba(0,0,0,.6);';
    overlay.appendChild(img);

    caption = document.createElement('div');
    caption.style.cssText = 'position:absolute;left:0;right:0;bottom:16px;text-align:center;font:12px/1.5 Calibri,Carlito,"Segoe UI",system-ui,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:rgba(242,239,232,.55);';
    caption.textContent = 'Click anywhere or press Esc to close';
    overlay.appendChild(caption);

    var close = document.createElement('button');
    close.setAttribute('aria-label', 'Close');
    close.textContent = '\u00d7';
    close.style.cssText = 'position:absolute;top:22px;right:26px;width:40px;height:40px;border-radius:50%;border:none;background:rgba(242,239,232,.9);color:#17181a;font-size:20px;line-height:1;cursor:pointer;';
    overlay.appendChild(close);

    overlay.addEventListener('click', hide);
    document.body.appendChild(overlay);
  }

  function show(src, alt) {
    if (!overlay) build();
    img.src = src;
    img.alt = alt || '';
    overlay.style.display = 'flex';
  }

  function hide() {
    if (overlay) overlay.style.display = 'none';
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href') || '';
    if (!/\.(png|jpe?g|webp|gif|svg)(\?|$)/i.test(href)) return;
    if (/^https?:/i.test(href) && href.indexOf(location.origin) !== 0) return;
    e.preventDefault();
    var inner = a.querySelector('img');
    show(href, inner ? inner.alt : a.textContent);
  }, true);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') hide();
  });
})();
