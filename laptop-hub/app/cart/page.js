import CartView from "@/components/CartView";

export const metadata = {
  title: "Shopping Cart",
  description:
    "Review the laptops in your LaptopHub cart, adjust quantities and proceed to a secure demo checkout.",
};

export default function CartPage() {
  return <CartView />;
}
