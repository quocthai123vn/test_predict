import { cleanObject } from "./other.util";

const createNewData = async (model: any, newData: any) => {
  const data = await model.create(newData);
  await data.save();
  return data;
};

const queryAndPagination = async (
  model: any,
  objectQuery: any,
  pageId: number = 1,
  pageSize: number = 8,
  sortObj: object = { createdAt: -1 },
  properties: string = ""
) => {
  objectQuery = cleanObject(objectQuery);
  const currentPage: number = Number(pageId);
  const totalItems: number = await model.countDocuments(objectQuery);
  const totalPages: number = Math.ceil(totalItems / pageSize);
  const items =
    0 < currentPage && currentPage <= totalPages
      ? await model
          .find(objectQuery, properties)
          .lean()
          .allowDiskUse(true)
          .sort(sortObj)
          .skip(pageSize * (currentPage - 1))
          .limit(pageSize)
      : [];
  return {
    data: items,
    pagination: {
      totalItems,
      pageSize,
      currentPage,
      totalPages,
    },
  };
};

export { createNewData, queryAndPagination };
