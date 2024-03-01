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


// login and signup routes


// signup route
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

// login route

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

// middleware
app.use('/blog/*', async (c, next) => {
  try {
    const header = c.req.header('Authorization');
    // console.log(header);
    
    if (!header) {
      c.status(401)
      return c.text('Unauthorized')
    }

    const userId = await verify(header, c.env.JWT_TOKEN);
    c.set('userId', userId)
    await next();
  } catch (error) {
    c.status(401)
    return c.text('Unauthorized')
  }
})


// blog post routes 

// create blog route
app.post('/blog', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json()
  const userId = c.get('userId');

  if (!(body.title || body.content)) {
    c.status(400)
    return c.text('title and content are required')
  }
  const newBlog = await prisma.post.create({
    data: {
      id: body.id,
      title: body.title,
      content: body.content,
      authorId: userId
    }
  })
  return c.text("Blog Created SuccessFully")

})

// update post route 
app.put('/blog/:id', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json()
  const userId = c.get('userId');
  const id = c.req.param('id');  

  const newBlog = await prisma.post.update({
    where: {
      id,
      authorId : userId
    },
    data: {
      title: body.title,
      content: body.content,
    }
  })
  return c.text("Blog Updated SuccessFully")

})


// get all blog route 
app.get('/blog', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const userId = c.get('userId');
  const blogs = await prisma.post.findMany({
    where: {
      authorId : userId
    }
  })
  return c.json(blogs)

})


// get blog by id route

app.get('/blog/:id', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const userId = c.get('userId');
  const id = c.req.param('id');
  const blogs = await prisma.post.findFirst({
    where: {
      id,
      authorId : userId
    }
  })
  return c.json(blogs)

})


export default app
