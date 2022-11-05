import mongoose from "mongoose";

const toObjectId = (id: string) => {
  const objId = new mongoose.Types.ObjectId(id);
  return objId;
};

const cleanObject = (obj: any) => {
  Object.keys(obj).forEach((key) =>
    obj[key] === undefined ? delete obj[key] : {}
  );
  return obj;
};

export { toObjectId, cleanObject };
