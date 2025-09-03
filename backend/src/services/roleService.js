import { request, response } from "express";
import roleModel from "../models/roleModel.js";

/**
 * Service class responsible for managing the logic of role.
 */
export default class RoleService {

    /**
       * HANDLES THE SEARCH FOR Role IN THE USERS TABLE.
       *
       * @async
       * @param {response} res - Express response object used to send success or error responses.
       */

    static async getRole(req, res) {
        try {
            const role = await roleModel.getAll();


            const roleInfo = role.map((role) => ({
                role_id: role.id,
                title: role.title,

            }));

            res.success({ admins: roleInfo });

        } catch (error) {
            console.error("role service  error:", error);
            // console.error(error.stack);
            res.error("Internal server error", 500);
        }
    }

}
