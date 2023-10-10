import React, { useState } from "react";

import { z } from "zod";

export const schema = z.object({
    email: z
        .string()
        .email({ message: "Invalid email address" })
        .min(1, "Email too short"),
    password: z
        .string()
        .min(4, { message: "Password should be at least 8 characters" }),
});
