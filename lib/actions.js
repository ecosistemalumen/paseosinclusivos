'use server';

import prisma from '@/lib/db';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

async function getSessionUser() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    return user;
}

export async function getUserProfile() {
    const user = await getSessionUser();
    if (!user) return null;

    return await prisma.profile.findUnique({
        where: { id: user.id },
        include: {
            _count: {
                select: { activity: true, reviews: true }
            }
        }
    });
}

export async function getUserActivity(type) {
    const user = await getSessionUser();
    if (!user) return [];

    // type: 'FAVORITE' | 'WISHLIST' | 'VISITED'
    const activity = await prisma.userActivity.findMany({
        where: {
            userId: user.id,
            type: type
        },
        include: {
            lugar: true
        },
        orderBy: {
            timestamp: 'desc'
        }
    });

    return activity.map(a => ({
        ...a.lugar,
        addedAt: a.timestamp
    }));
}

export async function toggleInteraction(lugarId, type) {
    const user = await getSessionUser();
    if (!user) throw new Error('Debes iniciar sesión');

    // Check if exists
    const existing = await prisma.userActivity.findUnique({
        where: {
            userId_lugarId_type: {
                userId: user.id,
                lugarId: parseInt(lugarId),
                type: type
            }
        }
    });

    if (existing) {
        // Remove functionality (Desmarcar)
        await prisma.userActivity.delete({
            where: { id: existing.id }
        });
        return { added: false };
    } else {
        // Add
        await prisma.userActivity.create({
            data: {
                userId: user.id,
                lugarId: parseInt(lugarId),
                type: type
            }
        });
        return { added: true };
    }

    revalidatePath('/perfil');
    revalidatePath(`/lugar/${lugarId}`); // Hypothetical path, we might need slug
}

export async function checkInteraction(lugarId, type) {
    const user = await getSessionUser();
    if (!user) return false;

    const count = await prisma.userActivity.count({
        where: {
            userId: user.id,
            lugarId: parseInt(lugarId),
            type: type
        }
    });

    return count > 0;
}
