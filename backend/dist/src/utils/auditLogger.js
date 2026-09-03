"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logAudit = logAudit;
const prisma_1 = require("../config/prisma");
async function logAudit(options) {
    try {
        const ipAddress = options.req?.headers["x-forwarded-for"]?.toString() ||
            options.req?.socket?.remoteAddress ||
            "127.0.0.1";
        const userAgent = options.req?.headers["user-agent"] || "unknown";
        // Sanitize sensitive data before logging
        const sanitize = (data) => {
            if (!data)
                return null;
            const copy = JSON.parse(JSON.stringify(data));
            if (copy.password)
                delete copy.password;
            if (copy.password_hash)
                delete copy.password_hash;
            if (copy.token)
                delete copy.token;
            return copy;
        };
        await prisma_1.prisma.auditLog.create({
            data: {
                user_id: options.userId,
                action: options.action,
                entity: options.entity,
                entity_id: options.entityId,
                old_data: sanitize(options.oldData),
                new_data: sanitize(options.newData),
                ip_address: ipAddress,
                user_agent: userAgent,
            },
        });
    }
    catch (err) {
        console.error("Audit log creation failed:", err);
    }
}
