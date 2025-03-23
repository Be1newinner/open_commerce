import { Request, Response } from "express";
import { Types } from "mongoose";
import { AddressModel } from "../models/address.models.ts";
import { UserModel } from "../models/users.model.ts";

async function getAllAddressByUID(req: Request, res: Response) {
  try {
    const { uid } = req.params;
    const limit = parseInt(req.query.limit as string) || 5;
    const page = parseInt(req.query.page as string) || 1;

    if (!Types.ObjectId.isValid(uid)) throw new Error("Invalid user ID!");

    const addressData = await AddressModel.find({ uid })
      .limit(limit)
      .skip(Math.max(Math.min(limit, 10) * (page - 1), 0))
      .lean();

    if (!addressData.length) throw new Error("No Address found for this user!");

    res.json({ data: addressData, error: null });
  } catch (error) {
    console.error(error);
    res.status(500).json({ data: null, error: (error as Error).message });
  }
}

async function getSingleAddressByID(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) throw new Error("Invalid Address ID!");

    const addressData = await AddressModel.findById(id).lean();

    if (!addressData) throw new Error("No Address found for this ID!");

    res.json({ data: addressData, error: null });
  } catch (error) {
    console.error(error);
    res.status(500).json({ data: null, error: (error as Error).message });
  }
}

async function updateAddressByID(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { name, phone, address1, address2, city, state, zipcode } = req.body;

    if (!Types.ObjectId.isValid(id)) throw new Error("Invalid Address ID!");

    const addressData = await AddressModel.findByIdAndUpdate(
      id,
      { $set: { name, phone, address1, address2, city, state, zipcode } },
      { new: true }
    ).lean();

    if (!addressData) {
      res.status(404).json({ error: "Address not found!" });
      return;
    }

    res.json({ data: addressData, error: null });
  } catch (error) {
    console.error(error);
    res.status(500).json({ data: null, error: (error as Error).message });
  }
}

async function addAddressByUID(req: Request, res: Response) {
  try {
    const { name, phone, address1, address2, city, state, zipcode, uid } =
      req.body;

    if (
      !name ||
      !phone ||
      !address1 ||
      !address2 ||
      !city ||
      !state ||
      !zipcode ||
      !uid
    ) {
      throw new Error("All required fields are not provided.");
    }

    if (!Types.ObjectId.isValid(uid)) throw new Error("Invalid user ID!");

    const isUserExist = await UserModel.exists({ _id: uid });
    if (!isUserExist) throw new Error("User Doesn't Exist!");

    const addressData = await AddressModel.create({
      name,
      phone,
      address1,
      address2,
      city,
      state,
      zipcode,
      uid,
    });

    console.log({ addressData });

    res.json({ data: addressData, error: null });
  } catch (error) {
    console.error(error);
    res.status(500).json({ data: null, error: (error as Error).message });
  }
}

async function deleteAddressByID(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) throw new Error("Invalid Address ID!");

    const addressData = await AddressModel.deleteOne({ _id: id });

    if (addressData.deletedCount) {
      res.json({
        data: null,
        error: null,
        message: "Address Deleted Successfully!",
      });
    } else {
      throw new Error("Address not deleted!");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ data: null, error: (error as Error).message });
  }
}

export {
  getAllAddressByUID,
  getSingleAddressByID,
  updateAddressByID,
  addAddressByUID,
  deleteAddressByID,
};
