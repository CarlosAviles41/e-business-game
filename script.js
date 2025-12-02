// Product database
const products = [
    {
        id: 1,
        name: "Interactive Whiteboard",
        category: "technology",
        price: 299,
        rating: 5,
        description: "Smart board for interactive teaching with touch capabilities",
        emoji: "📺"
    },
    {
        id: 2,
        name: "Tablet Set (10 units)",
        category: "technology",
        price: 450,
        rating: 4,
        description: "Educational tablets for student use in classroom",
        emoji: "📱"
    },
    {
        id: 3,
        name: "Projector System",
        category: "technology",
        price: 350,
        rating: 4,
        description: "HD projector with wireless connectivity",
        emoji: "📽️"
    },
    {
        id: 4,
        name: "Classroom Desk Set",
        category: "furniture",
        price: 280,
        rating: 5,
        description: "Ergonomic desks for 20 students",
        emoji: "🪑"
    },
    {
        id: 5,
        name: "Storage Cabinets",
        category: "furniture",
        price: 150,
        rating: 4,
        description: "Multi-compartment storage for classroom supplies",
        emoji: "🗄️"
    },
    {
        id: 6,
        name: "Whiteboard Markers Set",
        category: "supplies",
        price: 25,
        rating: 5,
        description: "Pack of 50 assorted color markers",
        emoji: "🖊️"
    },
    {
        id: 7,
        name: "Notebooks & Paper",
        category: "supplies",
        price: 45,
        rating: 4,
        description: "Bulk supply of notebooks and paper for students",
        emoji: "📔"
    },
    {
        id: 8,
        name: "Educational Books Set",
        category: "books",
        price: 120,
        rating: 5,
        description: "Comprehensive set of 30 educational books",
        emoji: "📚"
    },
    {
        id: 9,
        name: "Science Lab Kit",
        category: "supplies",
        price: 180,
        rating: 4,
        description: "Complete science experiment kit for classroom",
        emoji: "🔬"
    },
    {
        id: 10,
        name: "Art Supplies Bundle",
        category: "supplies",
        price: 75,
        rating: 5,
        description: "Complete art supplies for creative projects",
        emoji: "🎨"
    },
    {
        id: 11,
        name: "Reading Corner Furniture",
        category: "furniture",
        price: 220,
        rating: 4,
        description: "Comfortable seating and shelves for reading area",
        emoji: "📖"
    },
    {
        id: 12,
        name: "Digital Camera",
        category: "technology",
        price: 200,
        rating: 4,
        description: "Camera for documenting student work and projects",
        emoji: "📷"
    }
];

// Game state
let gameState = {
    budget: 500,
    selectedProducts: [],
    totalCost: 0
};

// Initialize the game
function initGame() {
    console.log('Game initializing...');
    try {
        renderProducts();
        updateUI();
        setupEventListeners();
        console.log('Game initialized successfully!');
    } catch (error) {
        console.error('Error initializing game:', error);
        alert('Error loading game. Please check the browser console for details.');
    }
}

// Render products
function renderProducts() {
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = '';

    const priceFilter = document.getElementById('price-filter').value;
    const categoryFilter = document.getElementById('category-filter').value;

    let filteredProducts = products.filter(product => {
        let priceMatch = true;
        if (priceFilter === 'low') priceMatch = product.price < 100;
        else if (priceFilter === 'medium') priceMatch = product.price >= 100 && product.price <= 250;
        else if (priceFilter === 'high') priceMatch = product.price > 250;

        const categoryMatch = categoryFilter === 'all' || product.category === categoryFilter;
        return priceMatch && categoryMatch;
    });

    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Create product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const isSelected = gameState.selectedProducts.some(p => p.id === product.id);
    const isDisabled = gameState.selectedProducts.length >= 2 && !isSelected;
    
    if (isSelected) card.classList.add('selected');
    if (isDisabled) card.classList.add('disabled');

    const stars = '⭐'.repeat(product.rating);
    
    card.innerHTML = `
        <div class="product-image">${product.emoji}</div>
        <div class="product-name">${product.name}</div>
        <span class="product-category">${product.category}</span>
        <div class="product-price">$${product.price}</div>
        <div class="product-rating">${stars}</div>
        <div class="product-description">${product.description}</div>
    `;

    if (!isDisabled) {
        card.addEventListener('click', () => toggleProduct(product));
    }

    return card;
}

// Toggle product selection
function toggleProduct(product) {
    const index = gameState.selectedProducts.findIndex(p => p.id === product.id);
    
    if (index > -1) {
        // Remove product
        gameState.selectedProducts.splice(index, 1);
    } else {
        // Add product (max 2)
        if (gameState.selectedProducts.length < 2) {
            gameState.selectedProducts.push(product);
        }
    }

    updateTotalCost();
    renderProducts();
    renderBasket();
    updateUI();
}

// Update total cost
function updateTotalCost() {
    gameState.totalCost = gameState.selectedProducts.reduce((sum, product) => sum + product.price, 0);
}

// Render basket
function renderBasket() {
    const basket = document.getElementById('basket');
    
    if (gameState.selectedProducts.length === 0) {
        basket.innerHTML = '<p class="empty-basket">Your basket is empty. Select 2 products to complete the challenge!</p>';
        return;
    }

    basket.innerHTML = '';
    gameState.selectedProducts.forEach(product => {
        const basketItem = document.createElement('div');
        basketItem.className = 'basket-item';
        basketItem.innerHTML = `
            <button class="remove-btn" data-product-id="${product.id}">×</button>
            <div class="basket-item-name">${product.emoji} ${product.name}</div>
            <div class="basket-item-price">$${product.price}</div>
        `;
        const removeBtn = basketItem.querySelector('.remove-btn');
        removeBtn.addEventListener('click', () => removeFromBasket(product.id));
        basket.appendChild(basketItem);
    });
}

// Remove from basket
function removeFromBasket(productId) {
    gameState.selectedProducts = gameState.selectedProducts.filter(p => p.id !== productId);
    updateTotalCost();
    renderProducts();
    renderBasket();
    updateUI();
}

// Update UI
function updateUI() {
    document.getElementById('budget').textContent = gameState.budget;
    document.getElementById('selected-count').textContent = gameState.selectedProducts.length;
    document.getElementById('total-cost').textContent = gameState.totalCost;

    const checkoutBtn = document.getElementById('checkout-btn');
    const canCheckout = gameState.selectedProducts.length === 2 && gameState.totalCost <= gameState.budget;
    checkoutBtn.disabled = !canCheckout;

    // Update budget color if over budget
    const budgetElement = document.querySelector('.budget');
    if (gameState.totalCost > gameState.budget) {
        budgetElement.style.color = '#ff4444';
    } else {
        budgetElement.style.color = 'white';
    }
}

// Setup event listeners
function setupEventListeners() {
    document.getElementById('price-filter').addEventListener('change', renderProducts);
    document.getElementById('category-filter').addEventListener('change', renderProducts);
    
    document.getElementById('checkout-btn').addEventListener('click', completeChallenge);
    document.getElementById('reset-btn').addEventListener('click', resetGame);
    document.getElementById('play-again').addEventListener('click', resetGame);
    
    document.querySelector('.close').addEventListener('click', () => {
        document.getElementById('result-modal').style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        const modal = document.getElementById('result-modal');
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Complete challenge
function completeChallenge() {
    if (gameState.selectedProducts.length !== 2) {
        alert('Please select exactly 2 products!');
        return;
    }

    if (gameState.totalCost > gameState.budget) {
        alert('You have exceeded your budget! Please adjust your selection.');
        return;
    }

    const remainingBudget = gameState.budget - gameState.totalCost;
    const savings = remainingBudget;
    const avgPrice = gameState.totalCost / 2;

    let decisionScore = 0;
    let feedback = [];

    // Evaluate decisions
    if (gameState.totalCost <= gameState.budget) {
        decisionScore += 30;
        feedback.push('✅ You stayed within budget!');
    }

    if (remainingBudget > 0) {
        decisionScore += 20;
        feedback.push(`✅ You saved $${savings} for future purchases!`);
    }

    // Check for product diversity
    const categories = new Set(gameState.selectedProducts.map(p => p.category));
    if (categories.size === 2) {
        decisionScore += 25;
        feedback.push('✅ Great diversity in product categories!');
    }

    // Check for value
    if (avgPrice >= 100 && avgPrice <= 250) {
        decisionScore += 25;
        feedback.push('✅ Good balance between quality and price!');
    }

    // Generate result
    const resultTitle = decisionScore >= 70 ? '🎉 Excellent Decision Making!' : 
                       decisionScore >= 50 ? '👍 Good Choices!' : 
                       '💡 Room for Improvement';

    const resultContent = `
        <div class="success-message">
            <h3>Challenge Complete!</h3>
            <p>You successfully selected 2 products within your budget.</p>
        </div>
        
        <h3>Your Selections:</h3>
        ${gameState.selectedProducts.map(product => `
            <div class="result-item">
                <strong>${product.emoji} ${product.name}</strong><br>
                Category: ${product.category}<br>
                Price: $${product.price}<br>
                Rating: ${'⭐'.repeat(product.rating)}
            </div>
        `).join('')}
        
        <div class="result-item">
            <strong>Total Cost:</strong> $${gameState.totalCost}<br>
            <strong>Remaining Budget:</strong> $${remainingBudget}<br>
            <strong>Decision Score:</strong> ${decisionScore}/100
        </div>
        
        <h3>Feedback:</h3>
        ${feedback.map(f => `<p>${f}</p>`).join('')}
        
        <h3>E-Business Insights:</h3>
        <div class="result-item">
            <p>In e-business, decision-making involves:</p>
            <ul>
                <li>Comparing products across different categories</li>
                <li>Balancing quality, price, and budget constraints</li>
                <li>Considering customer ratings and reviews</li>
                <li>Making strategic purchasing decisions</li>
            </ul>
        </div>
    `;

    document.getElementById('result-title').textContent = resultTitle;
    document.getElementById('result-content').innerHTML = resultContent;
    document.getElementById('result-modal').style.display = 'block';
}

// Reset game
function resetGame() {
    gameState.selectedProducts = [];
    gameState.totalCost = 0;
    document.getElementById('price-filter').value = 'all';
    document.getElementById('category-filter').value = 'all';
    document.getElementById('result-modal').style.display = 'none';
    renderProducts();
    renderBasket();
    updateUI();
}

// Initialize when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGame);
} else {
    // DOM is already loaded
    initGame();
}
