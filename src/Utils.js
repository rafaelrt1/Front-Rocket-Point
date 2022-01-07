export function formatPrice(price) {
    try {
        price = price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
        return price;
    }
    catch (e) {
    }
}