
// Thumbs -> main image
document.querySelectorAll('#view_item .thumb').forEach(btn => {
  btn.addEventListener('click', () => {
    const src = btn.getAttribute('data-src');
    const main = document.getElementById('mainImage');
    if (src && main) main.src = src;
    document.querySelectorAll('#view_item .thumb').forEach(b => b.classList.remove('ring-2','ring-red-500/30'));
    btn.classList.add('ring-2','ring-red-500/30');
  });
});

// Color selection
const colorGroup = document.getElementById('colorGroup');
let selectedColor = 'Crimson';
colorGroup.addEventListener('click', (e) => {
  const btn = e.target.closest('.color-opt');
  if (!btn) return;
  selectedColor = btn.dataset.color || selectedColor;
  colorGroup.querySelectorAll('.color-opt').forEach(b => b.classList.remove('outline','outline-2','outline-red-600/60'));
  btn.classList.add('outline','outline-2','outline-red-600/60');
});

// Size selection
const sizeGroup = document.getElementById('sizeGroup');
let selectedSize = null;
sizeGroup.addEventListener('click', (e) => {
  const btn = e.target.closest('.size-opt');
  if (!btn) return;
  sizeGroup.querySelectorAll('.size-opt').forEach(b => b.classList.remove('border-red-600','text-red-700','bg-red-50'));
  btn.classList.add('border-red-600','text-red-700','bg-red-50');
  selectedSize = btn.textContent.trim();
});

// Quantity
const qty = document.getElementById('qty');
document.getElementById('qtyInc').addEventListener('click', () => qty.value = String(Math.max(1, (+qty.value||1)+1)));
document.getElementById('qtyDec').addEventListener('click', () => qty.value = String(Math.max(1, (+qty.value||1)-1)));

// Wishlist
const wishBtn = document.getElementById('wishBtn');
wishBtn.addEventListener('click', () => {
  const active = wishBtn.classList.toggle('text-red-600');
  wishBtn.textContent = active ? '♥ Saved' : '♥';
});

