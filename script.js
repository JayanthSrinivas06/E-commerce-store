// Main JavaScript for Jay Stores E-Commerce Showcase

// --- Sample Data ---

// --- Sample Data ---
const products = [
	{
		id: 1,
		name: "Wireless Headphones",
		category: "electronics",
		image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=400&q=80",
		price: 1999,
		rating: 4.5,
		desc: "High-quality wireless headphones with noise cancellation and 20h battery life."
	},
	{
		id: 2,
		name: "Smart Watch",
		category: "electronics",
		image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=400&q=80",
		price: 2999,
		rating: 4.2,
		desc: "Track your fitness, heart rate, and notifications with this stylish smart watch."
	},
	{
		id: 3,
		name: "Men's Sneakers",
		category: "fashion",
		image: "https://images.unsplash.com/photo-1517260911205-8a3bfa7b3c61?auto=format&fit=crop&w=400&q=80",
		price: 1499,
		rating: 4.0,
		desc: "Comfortable and trendy sneakers for everyday wear."
	},
	{
		id: 4,
		name: "Designer Handbag",
		category: "fashion",
		image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
		price: 2499,
		rating: 4.7,
		desc: "Elegant handbag with premium finish and spacious compartments."
	},
	{
		id: 5,
		name: "LED Table Lamp",
		category: "home",
		image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
		price: 799,
		rating: 4.3,
		desc: "Energy-efficient LED lamp with adjustable brightness and touch controls."
	},
	{
		id: 6,
		name: "Ceramic Vase",
		category: "home",
		image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
		price: 599,
		rating: 4.1,
		desc: "Modern ceramic vase to enhance your home decor."
	}
];

const banners = [
	"https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80",
	"https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80",
	"https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=900&q=80"
];

// --- Product Modal ---
const modal = document.getElementById('productModal');
const closeModal = document.getElementById('closeModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalRating = document.getElementById('modalRating');
const modalPrice = document.getElementById('modalPrice');
const modalDesc = document.getElementById('modalDesc');
const modalAddToCart = document.getElementById('modalAddToCart');
const modalAddToWishlist = document.getElementById('modalAddToWishlist');
let modalProduct = null;
function openModal(product) {
	modalProduct = product;
	modalImage.style.backgroundImage = `url('${product.image}')`;
	modalTitle.textContent = product.name;
	modalRating.innerHTML = '★'.repeat(Math.round(product.rating)) + '☆'.repeat(5-Math.round(product.rating)) + ` <span style='color:#888;font-size:0.9em'>(${product.rating})</span>`;
	modalPrice.textContent = `₹${product.price}`;
	modalDesc.textContent = product.desc;
	modal.classList.add('open');
}
closeModal.onclick = () => modal.classList.remove('open');
modalAddToCart.onclick = () => addToCart(modalProduct.id);
modalAddToWishlist.onclick = () => addToWishlist(modalProduct.id);
window.onclick = e => { if (e.target === modal) modal.classList.remove('open'); };

// --- Cart & Wishlist ---
function addToCart(id, isDeal) {
	let item = cart.find(i => i.id === id);
	if (item) item.qty++;
	else cart.push({ id, qty: 1 });
	localStorage.setItem('cart', JSON.stringify(cart));
	updateCartCount();
	if (isDeal) dealAddToCart.textContent = 'Added!';
	setTimeout(() => { if (isDeal) dealAddToCart.textContent = 'Add to Cart'; }, 1200);
}
function addToWishlist(id) {
	if (!wishlist.includes(id)) wishlist.push(id);
	localStorage.setItem('wishlist', JSON.stringify(wishlist));
	updateWishlistIcon();
}
function updateCartCount() {
	let count = cart.reduce((a, b) => a + b.qty, 0);
	cartCount.textContent = count;
	floatingCartCount.textContent = count;
}
function updateWishlistIcon() {
	wishlistIcon.style.color = wishlist.length ? 'var(--primary)' : 'var(--secondary)';
}
cartIcon.onclick = () => alert('Cart: ' + JSON.stringify(cart));
floatingCart.onclick = () => cartIcon.onclick();
wishlistIcon.onclick = () => alert('Wishlist: ' + wishlist.map(id => products.find(p => p.id === id)?.name).join(', '));

// --- Filtering & Search ---
filterBtns.forEach(btn => btn.onclick = () => {
	filterBtns.forEach(b => b.classList.remove('active'));
	btn.classList.add('active');
	currentCategory = btn.dataset.category;
	categoryDropdown.value = currentCategory;
	renderProducts();
});
categoryDropdown.onchange = e => {
	currentCategory = e.target.value;
	filterBtns.forEach(b => b.classList.toggle('active', b.dataset.category === currentCategory));
	renderProducts();
};
searchInput.oninput = e => {
	searchQuery = e.target.value.toLowerCase();
	renderProducts();
};
document.querySelector('.search-bar').onsubmit = e => { e.preventDefault(); };

// --- Product Card Events ---
productGrid.onclick = e => {
	let card = e.target.closest('.product-card');
	if (!card) return;
	let id = +card.dataset.id;
	if (e.target.classList.contains('add-to-cart')) {
		addToCart(id);
		showPopup('Added to cart!');
	} else if (e.target.classList.contains('quick-view')) {
		openModal(products.find(p => p.id === id));
	} else {
		openModal(products.find(p => p.id === id));
	}
};

// --- Popup for Cart/Wishlist ---
function showPopup(msg) {
	let popup = document.createElement('div');
	popup.className = 'popup-msg';
	popup.textContent = msg;
	document.body.appendChild(popup);
	setTimeout(() => { popup.classList.add('show'); }, 10);
	setTimeout(() => { popup.classList.remove('show'); setTimeout(() => popup.remove(), 400); }, 1800);
}

// --- Dark/Light Mode ---
function setTheme(dark) {
	document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
	themeToggle.innerHTML = dark ? '🌙' : '☀️';
	localStorage.setItem('theme', dark ? 'dark' : 'light');
}
themeToggle.onclick = () => {
	darkMode = !darkMode;
	setTheme(darkMode);
};

// --- Init ---
function init() {
	renderCarousel();
	renderDeal();
	renderProducts();
	updateCartCount();
	updateWishlistIcon();
	setTheme(darkMode);
	updateDealTimer();
	startCarouselTimer();
init();
}
init();