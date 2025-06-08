document.addEventListener('DOMContentLoaded', () => {
    // Definición de productos (¡Puedes cambiar esto por tus datos reales!)
    const products = {
        classic: {
            name: "Café Yoscafé Clásico",
            price: 25000, // Precio en COP
            id: 'classic',
            keywords: "clásico, tradicional, medio, suave, chocolate, frutos secos, tostado"
        },
        premium: {
            name: "Café Yoscafé Premium Selección",
            price: 40000,
            id: 'premium',
            keywords: "premium, selección, especial, fuerte, intenso, frutal, acidez, floral, exótico"
        },
        decaf: {
            name: "Café Yoscafé Descafeinado",
            price: 30000,
            id: 'decaf',
            keywords: "descafeinado, suave, sin cafeína, noche, ligero, tranquilo"
        }
    };

    let cart = []; // Array para almacenar los productos en el carrito

    // Elementos del DOM
    const productCardsContainer = document.querySelector('.products-grid');
    const productCards = document.querySelectorAll('.product-card');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalSpan = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const emptyCartMessage = document.querySelector('.empty-cart-message');
    const checkoutFormContainer = document.getElementById('checkoutFormContainer');
    const shippingForm = document.getElementById('shippingForm');
    const orderMessage = document.getElementById('orderMessage');

    // Elementos de la barra de búsqueda
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');

    // Campos ocultos para Formspree
    const orderDetailsHidden = document.getElementById('orderDetailsHidden');
    const orderTotalHidden = document.getElementById('orderTotalHidden');

    // --- Funciones de la Barra de Búsqueda (sin cambios) ---

    function filterProducts() {
        const searchTerm = searchInput.value.toLowerCase().trim();

        productCards.forEach(card => {
            const productTitle = card.querySelector('.product-title').textContent.toLowerCase();
            const productDescription = card.querySelector('.product-description').textContent.toLowerCase();
            const productKeywords = card.dataset.keywords ? card.dataset.keywords.toLowerCase() : '';

            if (productTitle.includes(searchTerm) ||
                productDescription.includes(searchTerm) ||
                productKeywords.includes(searchTerm)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // --- Funciones del Carrito (sin cambios, excepto actualización del total) ---

    function updateCartDisplay() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            emptyCartMessage.style.display = 'block';
            checkoutBtn.disabled = true;
            checkoutFormContainer.style.display = 'none';
        } else {
            emptyCartMessage.style.display = 'none';
            checkoutBtn.disabled = false;
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;

                const cartItemDiv = document.createElement('div');
                cartItemDiv.classList.add('cart-item');
                cartItemDiv.innerHTML = `
                    <div class="item-details">
                        <span>${item.name}</span> x ${item.quantity}
                    </div>
                    <div class="item-price">
                        $ ${(itemTotal).toLocaleString('es-CO')} COP
                        <button class="remove-item-btn" data-product-id="${item.id}">Eliminar</button>
                    </div>
                `;
                cartItemsContainer.appendChild(cartItemDiv);
            });
        }

        cartTotalSpan.textContent = `$ ${total.toLocaleString('es-CO')} COP`;

        // Actualizar campos ocultos para Formspree
        orderDetailsHidden.value = JSON.stringify(cart.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            subtotal: item.price * item.quantity
        })));
        orderTotalHidden.value = total.toLocaleString('es-CO'); // Envía el total formateado
    }

    function addToCart(productId, quantity) {
        const product = products[productId];
        if (!product || quantity <= 0) return;

        const existingItemIndex = cart.findIndex(item => item.id === productId);

        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += quantity;
        } else {
            cart.push({ ...product, quantity: quantity });
        }
        updateCartDisplay();
    }

    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        updateCartDisplay();
    }

    // --- Event Listeners ---

    // Añadir al Carrito
    productCards.forEach(card => {
        const productId = card.dataset.productId;
        const quantityInput = card.querySelector('.product-quantity');
        const addToCartBtn = card.querySelector('.add-to-cart-btn');

        addToCartBtn.addEventListener('click', () => {
            const quantity = parseInt(quantityInput.value);
            addToCart(productId, quantity);
        });
    });

    // Eliminar del Carrito
    cartItemsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-item-btn')) {
            const productId = event.target.dataset.productId;
            removeFromCart(productId);
        }
    });

    // Botón Proceder al Pago
    checkoutBtn.addEventListener('click', () => {
        if (cart.length > 0) {
            checkoutFormContainer.style.display = 'block';
            checkoutBtn.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });

    shippingForm.addEventListener('submit', (event) => {
        // Opcional: mostrar un mensaje mientras el formulario se envía a Formspree
        orderMessage.classList.remove('success', 'error');
        orderMessage.textContent = 'Enviando tu orden... Redireccionando a la página de confirmación.';
        orderMessage.classList.add('success'); // O un color neutro
        
        // No necesitas limpiar el carrito aquí, ya que Formspree redirigirá.
        // La limpieza del carrito y el reset del formulario son menos relevantes aquí
        // porque la página se recargará o redirigirá.
    });


    // --- Event Listeners para la Barra de Búsqueda ---
    searchInput.addEventListener('input', filterProducts);
    searchBtn.addEventListener('click', filterProducts);

    // Inicializar la vista del carrito y filtros (mostrar todos los productos al cargar)
    updateCartDisplay();
    filterProducts();
});