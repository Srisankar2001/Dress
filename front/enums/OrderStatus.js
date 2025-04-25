const OrderStatus = Object.freeze({
    NOT_COMPLETED: 'NOT COMPLETED',
    NOT_PAID: 'NOT PAID',
    PENDING: 'PENDING',
    PROCESSING: 'PROCESSING',
    SHIPPED: 'SHIPPED',
    COMPLETED: 'COMPLETED',
    CANCELLED: 'CANCELLED'
})

module.exports = OrderStatus
