import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_TOKEN: string
  },
  Variables: {
    userId: string
  }
}>();



app.post('/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json()
  if (!body.email || !body.password) {
    c.status(400)
    return c.text('email and password are required')
  }
  if (body.password.length < 8) {
    c.status(400)
    return c.text('password must be at least 8 characters')
  }
  if (!body.email.includes('@')) {
    c.status(400)
    return c.text('email must be a valid email address')
  }
  const user = await prisma.user.findUnique({
    where: {
      email: body.email
    }
  })
  if (user) {
    return c.text('user already exists')
  }

  const newUser = await prisma.user.create({
    data: {
      email: body.email,
      password: body.password
    }
  })
  return c.text("User Created SuccessFully")

});


app.post('/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json()
  if (!body.email || !body.password) {
    c.status(400)
    return c.text('email and password are required')
  }
  const user = await prisma.user.findUnique({
    where: {
      email: body.email
    }
  })
  if (!user) {
    return c.text('user not found')
  }
  const id = user.id;
  const token = await sign(id, c.env.JWT_TOKEN)
  // console.log(token);

  return c.json({
    token: token,
    message: "User Logged In SuccessFully"
  })

})

app.use('/blog/*', async (c, next) => {
  const header = c.req.header("authorization") || "";
  const token = header.split(" ")[1]
  const response = await verify(token, c.env.JWT_TOKEN);

  if(response.id){
    c.set("userId", response.id);
    await next()
  }else{
    c.status(403);
    return c.json({error: "unauthorized"})
  }
})
app.post('/blog', async (c) => {
  const userId = c.get('userId');
  console.log(userId);

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const newPost = await prisma.post.create({
    data: {
      id: body.id,
      title: body.title,
      content: body.content,
      authorId: userId
    }
  });

  return c.json({
    id: newPost.id
  });
})


app.put('/blog/:id', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json()
  const userId = c.get('userId');
  if (!body.title || !body.content) {
    c.status(400)
    return c.text('title and content are required')
  }
  const updatePost = await prisma.post.update({
    where: {
      id: body.id,
      authorId: userId ? userId : c.get('userId') as string
    },
    data: {
      title: body.title,
      content: body.content,
    }
  })
  return c.json({
    message: "Post Updated Successfully",
    data: updatePost
  })
})


app.get('/blog/:id', (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const id = c.req.param('id')
  const getPost = prisma.post.findUnique({
    where: {
      id
    }
  })
  if (!getPost) {
    c.status(400);
    return c.json({
      message: "Invaild Request"
    })
  }
  return c.json(getPost)
})



export default app
