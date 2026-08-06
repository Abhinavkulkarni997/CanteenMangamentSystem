import * as repository from "../repositories/audit.repository.js";

export const getLogs = async (query) => {
  return await repository.getLogs(query);
};