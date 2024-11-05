import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAddToCartMutation, useDeleteFromCartMutation, useGetCartQuery } from "../app/features/CartSlice";
import Button from "../components/ui/button";
import { getUserData } from "../data";
import { IProduct } from "../interface";
import { FaTrashAlt } from "react-icons/fa";
import PathElement from "../components/PathElement";
import CartSkeleton from "../components/CartSkeleton";

const Cart = () => {
    const navigate = useNavigate()
    const userData = getUserData()
    const { id: userId } = userData.user;

    const { isLoading, data } = useGetCartQuery({ userId: userId })
    const [addToCart, { isSuccess: isAddingSuccess }] = useAddToCartMutation();
    const [removeFromCart, { isSuccess: isDeletingSuccess }] = useDeleteFromCartMutation();

    // State to keep track of the cart products locally
    const [cartItems, setCartItems] = useState<IProduct[]>([]);

    // Initialize cartItems with data from the query
    useEffect(() => {
        if (data?.cart) {
            setCartItems(data.cart);
        }
    }, [data]);

    useEffect(() => {
        if (isAddingSuccess) {
            toast.success('Cart is updated successfully', {
                position: "top-right",
                duration: 2000
            })
        }
        if (isDeletingSuccess) {
            toast.success('Product is removed from cart successfully', {
                position: "top-right",
                duration: 2000
            })
        }
    }, [isAddingSuccess, isDeletingSuccess]);

    if (isLoading) return (
        <CartSkeleton />
    )

    // Handle quantity change for each product
    const handleQuantityChange = (productId: number, newQuantity: number) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const handleUpdateCart = () => {
        try {
            addToCart({
                userId,
                products: cartItems.map(item => (
                    { productId: item.id, quantity: item.quantity }
                ))
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteFromCart = (productId: number) => {
        // setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
        removeFromCart({
            userId,
            productId
        })
    }

    return (
        <div className="container">
            <PathElement indexPath={"Cart"} />
            {data?.cart.length ? (
                <>
                    <div className="overflow-x-auto">
                        <Table>
                            <Table.Head>
                                <Table.HeadCell>Product</Table.HeadCell>
                                <Table.HeadCell>Price</Table.HeadCell>
                                <Table.HeadCell>Quantity</Table.HeadCell>
                                <Table.HeadCell>Subtotal</Table.HeadCell>
                                <Table.HeadCell></Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {data?.cart.map((product: IProduct) => (
                                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 overflow-x-scroll" key={product.id}>
                                        <Table.Cell className="whitespace-nowrap flex gap-2 items-center font-medium text-gray-900 dark:text-white">
                                            <img src={product.image} alt={product.title} className="w-8 h-8" />
                                            {product.title}
                                        </Table.Cell>
                                        <Table.Cell>${product.price}</Table.Cell>
                                        <Table.Cell>
                                            <input
                                                className="rounded-sm py-1 pr-0 pl-2"
                                                type="number"
                                                value={product.quantity}
                                                min={1}
                                                max={product.count}
                                                onChange={(e) => handleQuantityChange(product.id, Number(e.target.value))}
                                            />
                                        </Table.Cell>
                                        <Table.Cell>
                                            ${product.price * product.quantity}
                                        </Table.Cell>
                                        <Table.Cell>
                                            <button className="text-red-500" onClick={() => handleDeleteFromCart(product.id)}>
                                                <FaTrashAlt />
                                            </button>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </div>
                    <div className="flex items-start justify-between mt-5">
                        <Button btn="secondary" onClick={() => navigate("/")}>
                            Return to shop
                        </Button>
                        <Button btn="secondary" onClick={handleUpdateCart}>
                            Update cart
                        </Button>
                    </div>
                    <div className="flex items-start justify-between flex-wrap gap-y-5 py-8">
                        <div className="flex gap-2">
                            <input className="rounded-sm" type="text" placeholder="Coupon Code" />
                            <Button width="w-fit">Apply Coupon</Button>
                        </div>
                        <div className="border border-solid border-black rounded-sm p-4 w-[20rem]">
                            <h3 className="font-semibold mb-3">Cart Total</h3>
                            <ul className="space-y-3 mb-5 divide-y">
                                <li className="flex justify-between text-sm pt-2">
                                    Subtotal:
                                    <span>{data?.cart?.reduce((acc: number, curr: IProduct) => acc + curr.price * curr.quantity, 0).toFixed(2)}</span>
                                </li>
                                <li className="flex justify-between text-sm pt-2">
                                    Shipping:
                                    <span>
                                        {/* {data?.cart?.reduce((acc: number, curr: IProduct) => acc + curr.price * curr.quantity, 0).toFixed(2)} */}
                                        Free
                                    </span>
                                </li>
                                <li className="flex justify-between text-sm pt-2">
                                    Total:
                                    <span>{data?.cart?.reduce((acc: number, curr: IProduct) => acc + curr.price * curr.quantity, 0).toFixed(2)}</span>
                                </li>
                            </ul>
                            <Button width="w-fit" centered>Proceed to Checkout</Button>
                        </div>
                    </div>
                </>
            )
                : <div className="min-h-[285.5px] py-12">
                    <h2 className="text-center text-[25px] font-semibold mt-8">No products in cart</h2>
                </div>
            }
        </div >
    )
}

export default Cart