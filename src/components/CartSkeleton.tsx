import { Table } from "flowbite-react"
import PathElement from "./PathElement"

const CartSkeleton = () => {
    return (
        <div className="container">
            <PathElement indexPath={"Cart"} />
            <div role="status" className="animate-pulse">
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
                            {[0, 0, 0].map((_, idx) => (
                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 overflow-x-scroll" key={idx}>
                                    <Table.Cell className="whitespace-nowrap flex gap-2 items-center font-medium text-gray-900 dark:text-white">
                                        <div className="w-8 h-8 rounded-sm bg-gray-200 dark:bg-gray-700"></div>
                                        <div className="w-20 h-2 rounded-sm bg-gray-200 dark:bg-gray-700"></div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className="w-20 h-2 rounded-sm bg-gray-200 dark:bg-gray-700"></div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className="w-20 h-8 rounded-sm bg-gray-200 dark:bg-gray-700"></div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className="w-20 h-2 rounded-sm bg-gray-200 dark:bg-gray-700"></div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className="w-8 h-8 rounded-sm bg-gray-200 dark:bg-gray-700"></div>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </div>
                <div className="flex justify-between mt-5">
                    <div className="w-40 h-10 rounded-sm bg-gray-200 dark:bg-gray-700"></div>
                    <div className="w-40 h-10 rounded-sm bg-gray-200 dark:bg-gray-700"></div>
                </div>
                <div className="flex justify-between my-8">
                    <div className="flex gap-4">
                        <div className="w-60 h-12 rounded-sm bg-gray-200 dark:bg-gray-700"></div>
                        <div className="w-40 h-12 rounded-sm bg-gray-200 dark:bg-gray-700"></div>
                    </div>
                    <div className="w-80 h-64 rounded-sm bg-gray-200 dark:bg-gray-700"></div>
                </div>

            </div>
        </div>
    )
}

export default CartSkeleton