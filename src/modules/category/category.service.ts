import { prisma } from "../../lib/prisma";
import { ICreateCategoryPayload, IUpdateCategoryPayload } from "./category.interface";

const getAllCategories = async () => {
    const categories = await prisma.category.findMany({
        orderBy: {
            createdAt: "desc",
        },
        include: {
            _count: {
                select: { properties: true },
            },
        },
    });

    return categories;
};

const getCategoryById = async (id: string) => {
    const category = await prisma.category.findUniqueOrThrow({
        where: { id },
        include: {
            properties: {
                orderBy: { createdAt: "desc" },
            },
            _count: {
                select: { properties: true },
            },
        },
    });

    return category;
};

const createCategory = async (payload: ICreateCategoryPayload) => {
    const result = await prisma.category.create({
        data: payload,
    });

    return result;
};

const updateCategory = async (id: string, payload: IUpdateCategoryPayload) => {
    await prisma.category.findUniqueOrThrow({
        where: { id },
    });

    const result = await prisma.category.update({
        where: { id },
        data: payload,
    });

    return result;
};

const deleteCategory = async (id: string) => {
    await prisma.category.findUniqueOrThrow({
        where: { id },
    });

    await prisma.category.delete({
        where: { id },
    });
};

export const categoryService = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
};
