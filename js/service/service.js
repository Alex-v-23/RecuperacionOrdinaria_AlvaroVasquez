const API_URL = 'https://retoolapi.dev/j8IecA/data';

class ProductService {
    async getProducts() {
        try {
            const response = await fetch(API_URL);
            return await response.json();
        } catch (error) {
            console.error('Error al obtener productos:', error);
            return [];
        }
    }

    async createProduct(product) {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product)
            });
            return await response.json();
        } catch (error) {
            console.error('Error al crear producto:', error);
            throw error;
        }
    }

    async updateProduct(id, product) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product)
            });
            return await response.json();
        } catch (error) {
            console.error('Error al actualizar producto:', error);
            throw error;
        }
    }

    async deleteProduct(id) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });
            return await response.json();
        } catch (error) {
            console.error('Error al eliminar producto:', error);
            throw error;
        }
    }
}