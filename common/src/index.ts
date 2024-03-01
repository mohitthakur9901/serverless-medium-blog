import z from "zod";

 const signupInput = z.object({
    email: z.string().email(),
    password: z.string(),
    name: z.string().optional(),
});

 type SignupType = z.infer<typeof signupInput>;

 const signinInput = z.object({
    email: z.string().email(),
    password: z.string(),
});

 type SigninType = z.infer<typeof signinInput>;

 const createPostInput = z.object({
    title: z.string(),
    content: z.string(),
});

 type CreatePostType = z.infer<typeof createPostInput>;

 const updatePostInput = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
});

 type UpdatePostType = z.infer<typeof updatePostInput>;

 export {
    signupInput,
    signinInput,
    createPostInput,
    updatePostInput,
    SignupType,
    SigninType,
    CreatePostType,
    UpdatePostType
 }