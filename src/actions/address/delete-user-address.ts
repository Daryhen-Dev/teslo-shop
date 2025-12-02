'use server';
import prisma from "../../../lib/prisma"

export const deleteUserAddress = async (userId: string) => {
    try {
        const deletedAddress = await prisma.userAddress.delete({where: { userId }})
        return {
            ok: true,
            message: 'Dirección del usuario eliminada correctamente',
            address: deletedAddress
        }
    } catch (error) {
        console.log({ error })
        return {
            ok: false,
            message: 'Error al eliminar la dirección del usuario'
        }
    }
}