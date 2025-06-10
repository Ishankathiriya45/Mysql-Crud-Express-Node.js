const { Op, where } = require("sequelize");
const crypto = require('node:crypto')
const constants = require('../constants')

const isEmpty = (value) => {
    if (typeof value == "undefined" || value == null) return true;

    if (typeof value == "string") {
        return ["", "null", "undefine"].includes(value.trim())
    }

    if (Array.isArray(value) || typeof value == "object") {
        return Object.keys(value).length == 0;
    }
}

module.exports = {
    isEmpty,

    fetchRecords: async (
        model,
        options = {},
        paginate = false,
        unscoped = false,
    ) => {
        let currentPage = 1,
            pageSize = 10;
        const queryMethod = unscoped ? model.unscoped() : model;

        let rows = [];
        if (paginate == true) {
            currentPage = parseInt(options.currentPage) || 1;
            pageSize = parseInt(options.pageSize) || 10;

            const offset = (currentPage - 1) * pageSize;
            options.limit = pageSize;
            options.offset = offset;
            delete options.currentPage;
            delete options.pageSize;
            delete options.is_paginate;
            rows = await queryMethod.findAll(options);
        } else {
            return await queryMethod.findAll(options);
        }

        const count = await queryMethod.count(options);
        const totalPages = Math.ceil(count / options.limit);

        return {
            totalItems: count,
            totalPages,
            currentPage,
            hasPrevious: currentPage > 1,
            hasNext: currentPage < totalPages,
            previous: currentPage > 1 ? currentPage - 1 : null,
            next: currentPage < totalPages ? currentPage + 1 : null,
            rows,
        };
    },

    generateOtp: () => {
        const otp = Math.floor(1000 + Math.random() * 9000)
        return otp;
    },

    generateFileName: (name) => {
        const fileParts = name.split(".").pop();
        return `${Date.now()}.${fileParts}`;
    },

    getFileUrl: (folderName, fileName) => {
        return `${process.env["URL_" + process.env.RUN_MODE]}/public/upload/${folderName}/${fileName}`;
    },

    getDynamicContent: (contentKey, messageData, contentResource) => {
        const resource = constants[contentResource];
        let content = resource[contentKey];
        if (!isEmpty(content) && !isEmpty(messageData)) {
            for (const key in messageData) {
                content = content.replaceAll(`[${key}]`, messageData[key]);
            }
        }
        return content;
    },

    getRandomCode: (prefix = null) => {
        let randomCode = prefix
            ? `${prefix}-${crypto.randomBytes(3).toString('hex')}`
            : `${crypto.randomBytes(3).toString('hex')}`;
        return randomCode;
    },

    capitalize: (str) =>
        str
            ? str.charAt(0).toUpperCase().trim() + str.slice(1).toLowerCase().trim()
            : "",

    getFilterClauses: (filterData) => {
        const { fields, search } = filterData;

        return fields.includes("userName")
            ? { [Op.and]: { [Op.like]: `%${search}%` } }
            : {
                [Op.or]: fields.map((field) => {
                    if (field == "userName") {
                        return {
                            [field]: { [Op.like]: `%${search}%` }
                        }
                    }
                    return {
                        [field]: { [Op.like]: `%${search}%` }
                    }
                })
            }
    },

    getSearchClause: (filterData) => {
        const { fields, search, options = {} } = filterData;
        const [firstName, lastName] = search.trim().split(" ");

        return fields.includes("userName") && firstName && lastName
            ? {
                [Op.and]: [
                    { [options.first_name]: { [Op.like]: `%${firstName}%` } },
                    { [options.last_name]: { [Op.like]: `%${lastName}%` } },
                ],
            }
            : {
                [Op.or]: fields
                    .map((field) => {
                        if (field === "userName") {
                            return [
                                {
                                    [options.first_name]: {
                                        [Op.like]: `%${firstName || search}%`,
                                    },
                                },
                                {
                                    [options.last_name]: {
                                        [Op.like]: `%${lastName || search}%`,
                                    },
                                },
                            ];
                        }
                        return {
                            [field]: { [Op.like]: `%${search.replace(/%/g, "\\%")}%` },
                        };
                    })
                    .flat(),
            };
    },
}