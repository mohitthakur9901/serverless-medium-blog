import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono'
import {SignupType, signupInput} from 'mohit_mohit'
import { cors } from 'hono/cors';

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_TOKEN: string
  },
  Variables: {
    userId: string
  }
}>();

app.use('*', cors());

app.get('/', (c) => {
  return c.json('Hello Hono!')
})


app.post('/api/v1/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    console.log(body);
    

    const validate = signupInput.safeParse(body)
    console.log(validate);
    
    if (!validate.success) {  
      c.status(403)
      return c.json('invalid input')
    }

    const user = await prisma.user.findUnique({
      where: {
        email: body.email
      }
    });
    if (user) {
      c.status(403)
      return c.json('user already exists')
    }
    const newUser = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password
      }
    })
    return c.json({
      user: newUser,
      message: "User Created SuccesFully"
    })
  } catch (error) {
    c.status(403)
    return c.json({ error: "error while signing up" });
  }

})

app.post('/api/v1/signin', (c) => {
  return c.text('signin route')
})

app.get('/api/v1/blog/:id', (c) => {
  const id = c.req.param('id')
  console.log(id);
  return c.text('get blog route')
})

app.post('/api/v1/blog', (c) => {

  return c.text('signin route')
})

app.put('/api/v1/blog', (c) => {
  return c.text('signin route')
})


export default app
