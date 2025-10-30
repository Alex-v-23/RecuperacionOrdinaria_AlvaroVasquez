class ProductController {
    constructor() {
        this.service = new ProductService();
        this.currentProductId = null;
        this.init();
    }

    init() {
        this.loadProducts();
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('product-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveProduct();
        });

        document.getElementById('btn-cancel').addEventListener('click', () => {
            this.cancelEdit();
        });
    }

    async loadProducts() {
        const products = await this.service.getProducts();
        this.renderProducts(products);
    }

    renderProducts(products) {
        const tbody = document.getElementById('products-body');
        tbody.innerHTML = '';

        products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.nombreProducto}</td>
                <td>${product.categoriaProducto}</td>
                <td>${product.descripcionProducto}</td>
                <td>${product.precioProducto}</td>
                <td>${product.stockProducto}</td>
                <td>
                    <button class="btn-edit" onclick="controller.editProduct(${product.id})">Actualizar</button>
                    <button class="btn-delete" onclick="controller.deleteProduct(${product.id})">Eliminar</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    async saveProduct() {
        const product = {
            nombreProducto: document.getElementById('nombreProducto').value,
            categoriaProducto: document.getElementById('categoriaProducto').value,
            descripcionProducto: document.getElementById('descripcionProducto').value,
            precioProducto: parseFloat(document.getElementById('precioProducto').value),
            stockProducto: parseInt(document.getElementById('stockProducto').value)
        };

        try {
            if (this.currentProductId) {
                await this.service.updateProduct(this.currentProductId, product);
            } else {
                await this.service.createProduct(product);
            }
            
            this.resetForm();
            this.loadProducts();
        } catch (error) {
            alert('Error al guardar el producto');
        }
    }

    async editProduct(id) {
        const products = await this.service.getProducts();
        const product = products.find(p => p.id === id);
        
        if (product) {
            document.getElementById('product-id').value = id;
            document.getElementById('nombreProducto').value = product.nombreProducto;
            document.getElementById('categoriaProducto').value = product.categoriaProducto;
            document.getElementById('descripcionProducto').value = product.descripcionProducto;
            document.getElementById('precioProducto').value = product.precioProducto;
            document.getElementById('stockProducto').value = product.stockProducto;
            
            document.getElementById('form-title').textContent = 'Actualizar Producto';
            document.getElementById('btn-cancel').style.display = 'inline-block';
            this.currentProductId = id;
        }
    }

    async deleteProduct(id) {
        if (confirm('¿Estás seguro de eliminar este producto?')) {
            try {
                await this.service.deleteProduct(id);
                this.loadProducts();
            } catch (error) {
                alert('Error al eliminar el producto');
            }
        }
    }

    cancelEdit() {
        this.resetForm();
    }

    resetForm() {
        document.getElementById('product-form').reset();
        document.getElementById('product-id').value = '';
        document.getElementById('form-title').textContent = 'Agregar Producto';
        document.getElementById('btn-cancel').style.display = 'none';
        this.currentProductId = null;
    }
}

// Inicializar el controlador
const controller = new ProductController();