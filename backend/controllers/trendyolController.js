const fetchTrendyolOrders = async (req, res) => {
    try {
        const integration = await Integration.findOne();
        if (!integration) {
            return res.status(404).json({ message: 'No integration found' });
        }

        const { apiKey, apiSecret } = integration;
        const url = 'https://api.trendyol.com/sapigw/suppliers/${integration.supplierId}/orders';

        const { data } = await axios.get(url, {
            params: {
                status: 'Created,Picking', // Sadece 'Created' ve 'Picking' statüsündeki siparişleri çek
                size: 200,
                page: 0,
            },
            headers: {
                'User-Agent': 'order-manager',
                'Authorization': `Basic ${Buffer.from(apiKey + ':' + apiSecret).toString('base64')}`,
                'Content-Type': 'application/json',
            },
        });

        const orders = data.content;

        // Yeni siparişler ekleme ve var olan siparişleri güncelleme işlemleri
        for (const order of orders) {
            const existingOrder = await Order.findOne({ id: order.id });
            if (existingOrder) {
                // Var olan siparişi güncelle
                await Order.updateOne({ id: order.id }, order);
            } else {
                // Yeni siparişi ekle
                const newOrder = new Order(order);
                await newOrder.save();
            }
        }

        res.status(200).json({ message: 'Orders fetched and updated successfully' });
    } catch (error) {
        console.error('Error fetching orders:', error.message);
        res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
};
