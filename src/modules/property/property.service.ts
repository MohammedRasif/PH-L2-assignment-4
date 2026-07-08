import { prisma } from "../../lib/prisma";
import { ICreatePropertyPayload, IPropertyFilterQuery, IUpdatePropertyPayload } from "./property.interface";

const getAllProperties = async (filters: IPropertyFilterQuery) => {
    const {
        location,
        minPrice,
        maxPrice,
        categoryId,
        bedrooms,
        amenities,
        isAvailable,
        page = 1,
        limit = 10,
        sortBy = "createdAt",
        sortOrder = "desc",
    } = filters;

    const where: Record<string, unknown> = {};

    if (location) {
        where.location = { contains: location, mode: "insensitive" };
    }
    if (categoryId) {
        where.categoryId = categoryId;
    }
    if (bedrooms) {
        where.bedrooms = bedrooms;
    }
    if (amenities && amenities.length > 0) {
        where.amenities = { hasEvery: amenities };
    }
    if (isAvailable !== undefined) {
        where.isAvailable = isAvailable;
    }
    if (minPrice !== undefined || maxPrice !== undefined) {
        where.price = {
            ...(minPrice !== undefined && { gte: minPrice }),
            ...(maxPrice !== undefined && { lte: maxPrice }),
        };
    }

    const skip = (page - 1) * limit;

    const [properties, total] = await Promise.all([
        prisma.property.findMany({
            where,
            skip,
            take: limit,
            orderBy: { [sortBy]: sortOrder },
            include: {
                category: true,
                owner: {
                    omit: { password: true },
                },
                _count: {
                    select: { reviews: true, rentalRequests: true },
                },
            },
        }),
        prisma.property.count({ where }),
    ]);

    return { properties, total, page, limit };
};

const getPropertyById = async (id: string) => {
    const property = await prisma.property.findUniqueOrThrow({
        where: { id },
        include: {
            category: true,
            owner: {
                omit: { password: true },
            },
            reviews: {
                orderBy: { createdAt: "desc" },
                include: {
                    tenant: {
                        omit: { password: true },
                    },
                },
            },
            _count: {
                select: { reviews: true, rentalRequests: true },
            },
        },
    });

    return property;
};

const createProperty = async (ownerId: string, payload: ICreatePropertyPayload) => {
    console.log("Owner ID:", ownerId);
    console.log("Payload:", payload);
    console.log("Category ID:", payload.categoryId);

    const category = await prisma.category.findUnique({
        where: {
            id: payload.categoryId,
        },
    });

    console.log("Category Found:", category);

    const result = await prisma.property.create({
        data: {
            ...payload,
            ownerId,
        },
        include: {
            category: true,
            owner: {
                omit: {
                    password: true,
                },
            },
        },
    });

    return result;
};

const updateProperty = async (
    propertyId: string,
    ownerId: string,
    payload: IUpdatePropertyPayload
) => {
    const property = await prisma.property.findUniqueOrThrow({
        where: { id: propertyId },
    });

    if (property.ownerId !== ownerId) {
        throw new Error("You are not authorized to update this property");
    }

    const result = await prisma.property.update({
        where: { id: propertyId },
        data: payload,
        include: {
            category: true,
            owner: {
                omit: { password: true },
            },
        },
    });

    return result;
};

const deleteProperty = async (propertyId: string, ownerId: string) => {
    const property = await prisma.property.findUniqueOrThrow({
        where: { id: propertyId },
    });

    if (property.ownerId !== ownerId) {
        throw new Error("You are not authorized to delete this property");
    }

    await prisma.property.delete({
        where: { id: propertyId },
    });
};

const toggleAvailability = async (propertyId: string, ownerId: string) => {
    const property = await prisma.property.findUniqueOrThrow({
        where: { id: propertyId },
    });

    if (property.ownerId !== ownerId) {
        throw new Error("You are not authorized to update this property");
    }

    const result = await prisma.property.update({
        where: { id: propertyId },
        data: {
            isAvailable: !property.isAvailable,
        },
    });

    return result;
};

export const propertyService = {
    getAllProperties,
    getPropertyById,
    createProperty,
    updateProperty,
    deleteProperty,
    toggleAvailability,
};
