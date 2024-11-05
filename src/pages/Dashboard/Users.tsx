
"use client";

import { Table } from "flowbite-react";
import useAuthenticatedQuery from "../../hooks/useAuthenticatedQuery";
import { getUserData } from "../../data";
import { IUser } from "../../interface";

const Users = () => {
    const user = getUserData();
    const { data } = useAuthenticatedQuery({
        queryKey: ["users"],
        url: "/users",
        config: {
            headers: {
                Authorization: `Bearer ${user?.token}`,
            },
        }
    })

    return (
        <>
            {
                data?.users?.length ?
                    <div className="max-h-[38rem] lg:max-h-[36rem] overflow-auto">
                        <Table>
                            <Table.Head>
                                <Table.HeadCell>Username</Table.HeadCell>
                                <Table.HeadCell>Email</Table.HeadCell>
                                <Table.HeadCell>Gender</Table.HeadCell>
                                <Table.HeadCell>
                                    <span className="sr-only">Action</span>
                                </Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {data.users.map((user: IUser) => (
                                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={user.id}>
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            {user.username}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {user.email}
                                        </Table.Cell>
                                        <Table.Cell>{user.gender}</Table.Cell>
                                        <Table.Cell>
                                            <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                                Edit
                                            </a>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </div>
                    : (
                        <div>
                            No users yet!!
                        </div>
                    )}
        </>
    );
}



export default Users;