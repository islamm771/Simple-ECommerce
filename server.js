import jsonServer from 'json-server';
import auth from 'json-server-auth';
import cors from 'cors';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const rules = auth.rewriter({
  users: 600,
  posts: 644,
});

server.use(cors()); // Ensure CORS is enabled
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === 'POST' && req.path === '/register') {
    const { email } = req.body;
    const users = router.db.get('users').value();

    const userExists = users.some(user => user.email === email);
    if (userExists) {
      return res.status(400).json({ error: 'Email already exists' });
    }
  }
  next();
});

server.post('/cart/add', (req, res) => {
  const { userId, productId, quantity } = req.body;

  const userCart = router.db.get('carts').find({ userId }).value();

  if (userCart) {
    // Check if the product is already in the cart
    const productInCart = userCart.products.find(p => p.productId === productId);

    if (productInCart) {
      // Update the quantity if the product is already in the cart
      productInCart.quantity += quantity;
    } else {
      // Add the new product to the cart
      userCart.products.push({ productId, quantity });
    }

    router.db.get('carts').find({ userId }).assign(userCart).write();
  } else {
    // Create a new cart for the user if they don't have one
    router.db.get('carts')
      .push({
        id: router.db.get('carts').value().length + 1,
        userId,
        products: [{ productId, quantity }]
      })
      .write();
  }

  res.status(200).json({ success: true, cart: userCart });
});

server.get('/cart/:userId', (req, res) => {
  const { userId } = req.params;
  const userCart = router.db.get('carts').find({ userId: Number(userId) }).value();

  if (!userCart) {
    return res.status(404).json({ error: 'No products in cart' });
  }

  // Fetch product details from the products array
  const detailedCart = userCart.products.map(item => {
    const product = router.db.get('products').find({ id: item.productId }).value();
    return {
      ...product,
      quantity: item.quantity
    };
  });

  res.status(200).json({ cart: detailedCart });
});


server.post('/cart/remove', (req, res) => {
  const { userId, productId } = req.body;

  // Access the 'carts' collection
  const userCart = router.db.get('carts').find({ userId }).value();

  if (userCart) {
    // Filter out the product to be removed
    const updatedProducts = userCart.products.filter(p => p.productId !== productId);

    if (updatedProducts.length === 0) {
      // If no products left, delete the cart
      router.db.get('carts').remove({ userId }).write();
      res.status(200).json({ success: true, message: 'Cart deleted because it is empty' });
    } else {
      // Otherwise, update the cart with the remaining products
      router.db.get('carts').find({ userId }).assign({ products: updatedProducts }).write();
      res.status(200).json({ success: true, cart: updatedProducts });
    }
  } else {
    res.status(404).json({ error: 'Cart not found' });
  }
});


server.db = router.db;

server.use(middlewares);
server.use(rules);
server.use(auth);
server.use(router);

server.listen(3000, () => {
  console.log('JSON Server is running on http://localhost:3000');
});
