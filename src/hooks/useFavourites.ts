import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAddToFavouriteMutation, useDeleteFromFavouriteMutation, useGetFavouriteQuery } from '../app/features/FavouritesSlice';

export const useFavorites = (userData: any) => {
    const navigate = useNavigate();

    const [addToFav, { isSuccess: isAddingFavSuccess, error: AddingFavError, reset: resetAdd }] = useAddToFavouriteMutation();
    const [removeFromFav, { isSuccess: isRemovingFavSuccess, error: RemovingFavError, reset: resetRemove }] = useDeleteFromFavouriteMutation();
    const { data: favouritesData } = useGetFavouriteQuery({ userId: userData?.user?.id });

    const handleAddToFav = async (productId: number) => {
        if (!userData) {
            navigate("/login");
            return;
        }
        const { id: userId } = userData.user;
        if (favouritesData && favouritesData.favourites.find(fav => fav.id === productId)) {
            removeFromFav({ userId, productId });
            return;
        }
        addToFav({ userId, productId });
    };

    useEffect(() => {
        if (isAddingFavSuccess) {
            toast.success('Product is added to favourite', { position: "top-right", duration: 2000 });
            resetAdd();
        }
        if (AddingFavError) {
            toast.error('Failed adding product to favourite', { position: "top-right", duration: 3000 });
            resetAdd();
        }
        if (isRemovingFavSuccess) {
            toast.success('Product is removed from favourite', { position: "top-right", duration: 2000 });
            resetRemove();
        }
        if (RemovingFavError) {
            toast.error('Failed removing product from favourite', { position: "top-right", duration: 3000 });
            resetRemove();
        }
    }, [isAddingFavSuccess, AddingFavError, isRemovingFavSuccess, RemovingFavError, resetAdd, resetRemove]);

    return {
        handleAddToFav,
        favouritesData,
    };
};
