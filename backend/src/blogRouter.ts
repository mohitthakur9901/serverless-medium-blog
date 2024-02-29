// import { Hono } from 'hono'
// import { PrismaClient } from '@prisma/client/edge'
// import { withAccelerate } from '@prisma/extension-accelerate';



// const blogRouter = new Hono<{
//     Bindings: {
//       DATABASE_URL: string
//       JWT_TOKEN: string
//     }
//   }>();
  

//   blogRouter.post('/blog', async (c) => {
//     const userId = c.get('userId');
//     console.log(userId);
  
//     const prisma = new PrismaClient({
//       datasourceUrl: c.env?.DATABASE_URL,
//     }).$extends(withAccelerate());
  
//     const body = await c.req.json();
//     const newPost = await prisma.post.create({
//       data: {
//         id: body.id,
//         title: body.title,
//         content: body.content,
//         authorId: userId
//       }
//     });
  
//     return c.json({
//       id: newPost.id
//     });
//   })
  
  
//   blogRouter.put('/blog/:id', async (c) => {
//     const prisma = new PrismaClient({
//       datasourceUrl: c.env?.DATABASE_URL,
//     }).$extends(withAccelerate());
//     const body = await c.req.json()
//     const userId = c.get('userId');
//     if (!body.title || !body.content) {
//       c.status(400)
//       return c.text('title and content are required')
//     }
//     const updatePost = await prisma.post.update({
//       where: {
//         id: body.id,
//         authorId: userId ? userId : c.get('userId') as string
//       },
//       data: {
//         title: body.title,
//         content: body.content,
//       }
//     })
//     return c.json({
//       message: "Post Updated Successfully",
//       data: updatePost
//     })
//   })
  
  
//   blogRouter.get('/blog/:id', (c) => {
//     const prisma = new PrismaClient({
//       datasourceUrl: c.env?.DATABASE_URL,
//     }).$extends(withAccelerate());
//     const id = c.req.param('id')
//     const getPost = prisma.post.findUnique({
//       where: {
//         id
//       }
//     })
//     if (!getPost) {
//       c.status(400);
//       return c.json({
//         message: "Invaild Request"
//       })
//     }
//     return c.json(getPost)
//   })