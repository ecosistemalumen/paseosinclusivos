import prisma from '@/lib/db';
import { notFound } from 'next/navigation';
import EditSpaceForm from '@/components/Admin/EditSpaceForm';

export const revalidate = 0;

async function getLugar(id) {
    try {
        const lugar = await prisma.lugar.findUnique({
            where: { id: parseInt(id) }
        });
        return lugar;
    } catch (error) {
        console.error("Error fetching place by ID:", error);
        return null;
    }
}

export default async function EditSpacePage({ params }) {
    const { id } = params;
    const lugar = await getLugar(id);

    if (!lugar) {
        notFound();
    }

    return (
        <div className="max-w-6xl mx-auto">
            <EditSpaceForm lugar={lugar} />
        </div>
    );
}
