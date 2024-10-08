import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const searchTerm = searchParams.get('search') || '';

        // Fetch classes with optional search term filtering
        const classes = await prisma.classes.findMany({
            where: {
                class_section: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            },
            select: {
                id: true,
                class_name: true,
                class_section: true,
                credits: true,
                description: true,
                fulfill_major_requirements: true,
                terms_offered: true,
                class_day: true,
                class_start_time: true,
                class_end_time: true,
                class_category: true,
                class_size: true,
                current_enrollments: true,
                professor: true
            },
        });

        return new NextResponse(JSON.stringify(classes), { status: 200 });
    } catch (error) {
        console.error('Error fetching classes:', error);
        return new NextResponse('Failed to fetch classes', { status: 500 });
    }
}
