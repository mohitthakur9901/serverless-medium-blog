// import { Hono } from 'hono'
// import { PrismaClient } from '@prisma/client/edge'
// import { withAccelerate } from '@prisma/extension-accelerate';
// import { sign } from 'hono/jwt';

// const userRouter = new Hono<{
//     Bindings: {
//       DATABASE_URL: string
//       JWT_TOKEN: string
//     }
//   }>();
  

//   userRouter.post('/signup', async (c) => {
//     const prisma = new PrismaClient({
//       datasourceUrl: c.env?.DATABASE_URL,
//     }).$extends(withAccelerate());
  
//     const body = await c.req.json()
//     if (!body.email || !body.password) {
//       c.status(400)
//       return c.text('email and password are required')
//     }
//     if (body.password.length < 8) {
//       c.status(400)
//       return c.text('password must be at least 8 characters')
//     }
//     if (!body.email.includes('@')) {
//       c.status(400)
//       return c.text('email must be a valid email address')
//     }
//     const user = await prisma.user.findUnique({
//       where: {
//         email: body.email
//       }
//     })
//     if (user) {
//       return c.text('user already exists')
//     }
  
//     const newUser = await prisma.user.create({
//       data: {
//         email: body.email,
//         password: body.password
//       }
//     })
//     return c.text("User Created SuccessFully")
  
//   });
  
  
//   userRouter.post('/signin', async (c) => {
//     const prisma = new PrismaClient({
//       datasourceUrl: c.env?.DATABASE_URL,
//     }).$extends(withAccelerate());
  
//     const body = await c.req.json()
//     if (!body.email || !body.password) {
//       c.status(400)
//       return c.text('email and password are required')
//     }
//     const user = await prisma.user.findUnique({
//       where: {
//         email: body.email
//       }
//     })
//     if (!user) {
//       return c.text('user not found')
//     }
//     const id = user.id;
//     const token = await sign(id, c.env.JWT_TOKEN)
//     return c.json({
//       token: token,
//       message: "User Logged In SuccessFully"
//     })
  
//   })