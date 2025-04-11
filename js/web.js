function expandir(button) {
  const src = button.parentElement.previousElementSibling.src;
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position:fixed;top:0;left:0;width:100%;height:100%;
    background:rgba(0,0,0,0.8);display:flex;
    align-items:center;justify-content:center;
    z-index:9999;
  `;
  const img = document.createElement('img');
  img.src = src;
  img.style.cssText = 'max-width:90%;max-height:90%;border-radius:10px;';
  overlay.onclick = () => document.body.removeChild(overlay);
  overlay.appendChild(img);
  document.body.appendChild(overlay);
}


window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    if (window.scrollY > 100) { 
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
