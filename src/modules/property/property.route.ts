import { Router } from "express";
import { propertyController } from "./property.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();


router.get("/", propertyController.getAllProperties);
router.get("/:id", propertyController.getPropertyById);


router.post(
  "/",
  auth(Role.LANDLORD),
  propertyController.createProperty
);

router.put(
  "/:id",
  auth(Role.LANDLORD),
  propertyController.updateProperty
);

router.delete(
  "/:id",
  auth(Role.LANDLORD),
  propertyController.deleteProperty
);

router.patch(
  "/:id/availability",
  auth(Role.LANDLORD),
  propertyController.toggleAvailability
);

export const propertyRoutes = router;
