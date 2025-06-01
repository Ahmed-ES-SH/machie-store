import { loadStripe } from "@stripe/stripe-js";
import { formatTitle } from "./helpers";

export interface CartItem {
  title: string;
  price: number;
  quantity: number;
}

export async function handleCheckout(cartItems: CartItem[]) {
  if (!cartItems || cartItems.length === 0) {
    throw new Error("Cart is empty");
  }

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const formatFirstTwoCharFromEveryProduct = () => {
    const courseShortTitles = cartItems.map((course) =>
      course.title.slice(0, 2).toUpperCase()
    );
    return courseShortTitles.join(" ");
  };

  const ProductsText = formatFirstTwoCharFromEveryProduct();

  const productDetails = {
    productName: formatTitle(ProductsText),
    amount: subtotal,
    currency: "usd",
    quantity: cartItems.length,
  };

  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productDetails),
  });

  const data = await res.json();

  if (data.sessionId) {
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
    );
    await stripe?.redirectToCheckout({ sessionId: data.sessionId });
  } else {
    throw new Error("Failed to create checkout session");
  }
}
