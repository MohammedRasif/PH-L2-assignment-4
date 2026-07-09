import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { propertyService } from "./property.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const getAllProperties = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const filters = {
        location: req.query.location as string,
        minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
        maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
        categoryId: req.query.categoryId as string,
        bedrooms: req.query.bedrooms ? Number(req.query.bedrooms) : undefined,
        amenities: req.query.amenities
            ? (req.query.amenities as string).split(",")
            : undefined,
        isAvailable: req.query.isAvailable !== undefined
            ? req.query.isAvailable === "true"
            : undefined,
        page: req.query.page ? Number(req.query.page) : 1,
        limit: req.query.limit ? Number(req.query.limit) : 10,
        sortBy: (req.query.sortBy as string) || "createdAt",
        sortOrder: (req.query.sortOrder as "asc" | "desc") || "desc",
    };

    const result = await propertyService.getAllProperties(filters);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Properties retrieved successfully",
        data: result.properties,
        meta: {
            page: result.page,
            limit: result.limit,
            total: result.total,
        },
    });
});

const getPropertyById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!id) {
        throw new Error("Property id is required in params");
    }

    const result = await propertyService.getPropertyById(id);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Property retrieved successfully",
        data: result,
    });
});

const createProperty = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const ownerId = req.user?.id;
    const payload = req.body;
    console.log(payload)

    const result = await propertyService.createProperty(ownerId as string, payload);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Property created successfully",
        data: result,
    });
});

const updateProperty = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    console.log("hit update property")
    const ownerId = req.user?.id;
    const { id } = req.params;
    const payload = req.body;
    console.log(req.user?.role)

    const result = await propertyService.updateProperty(id as string, ownerId as string, payload);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Property updated successfully",
        data: result,
    });
});

const deleteProperty = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const ownerId = req.user?.id;
    const { id } = req.params;

    if (!id) {
        throw new Error("Property id is required in params");
    }

    await propertyService.deleteProperty(id, ownerId as string);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Property deleted successfully",
        data: null,
    });
});

const toggleAvailability = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const ownerId = req.user?.id;
    const { id } = req.params;

    if (!id) {
        throw new Error("Property id is required in params");
    }

    const result = await propertyService.toggleAvailability(id, ownerId as string);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Property availability toggled successfully",
        data: result,
    });
});

export const propertyController = {
    getAllProperties,
    getPropertyById,
    createProperty,
    updateProperty,
    deleteProperty,
    toggleAvailability,
};
