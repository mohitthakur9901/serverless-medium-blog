import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono'
import { SignupType, signinInput, signupInput } from 'mohit_mohit'
import { cors } from 'hono/cors';
import { sign, verify } from 'hono/jwt';

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

app.post('/api/v1/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const body = await c.req.json();
    console.log(body);
    const validate = signinInput.safeParse(body);

    console.log(validate);
    if (!validate.success) {
      c.status(403)
      return c.json('invalid input')
    }

    const loginUser = await prisma.user.findUnique({
      where: {
        email: body.email
      }
    })
    if (!loginUser) {
      c.status(403)
      return c.json('user not found')
    }
    const token = await sign({
      userId: loginUser.id
    }, c.env.JWT_TOKEN)

    return c.json({
      user: loginUser,
      token: token,
      message: 'user logged in successfully'
    })

  } catch (error) {
    c.status(403)
    return c.json({ error: "error while signing in" });

  }

})

app.use('/api/v1/blog/*', async (c, next) => {
  try {
    const header = c.req.header('Authorization')
    console.log(header);
    if (!header) {
      c.status(403)
      return c.json('invalid token')
    }
    const userId = await verify(header, c.env.JWT_TOKEN)
    console.log(userId);
    c.set('userId', userId.userId)
    await next()
  } catch (error) {
    c.status(403)
    return c.json({ error: "Invalid Token" });

  }
})

app.get('/api/v1/blog',async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const blogs = await prisma.post.findMany()
    return c.json({
      blogs: blogs,
      message: 'blogs fetched successfully'
    })
  } catch (error) {
    c.status(403)
    return c.json({ error: "error while getting blogs" });

  }
})
 
app.get('/api/v1/blog/:id', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const id = c.req.param('id')
  console.log(id);

  try {
    const blog = await prisma.post.findUnique({
      where: {
        id: id
      }
    })
    if (!blog) {
      c.status(403)
      return c.json('blog not found')
    }
    return c.json({
      blog: blog,
      message: 'blog fetched successfully'
    })

  } catch (error) {
    c.status(403)
    return c.json({ error: "error while getting blog" });

  }
})

app.post('/api/v1/blog', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const body = await c.req.json();
    console.log(body);
    const userId = c.get('userId')
    console.log(userId);
    const newBlog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId
      }
    })
    return c.json({
      blog: newBlog,
      message: 'blog created successfully'
    })
  } catch (error) {
    c.status(403)
    return c.json({ error: "error while creating blog" });
  }

})

app.put('/api/v1/blog', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    console.log(body);
    const userId = c.get('userId')
    const updateBlog = await prisma.post.update({
      where: {
        id: body.id,
        authorId: userId
      },
      data: {
        title: body.title,
        content: body.content,
      }
    })
  } catch (error) {
    c.status(403)
    return c.json({ error: "error while updating blog" });
    
  }
})

app.delete('/api/v1/blog/:id', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const id = c.req.param('id')
  try {
    const userId = c.get('userId')
    const deleteBlog = await prisma.post.delete({
      where: {
        id: id,
        authorId: userId
      }
    })
    return c.json({
      message: 'blog deleted successfully'
    })
  } catch (error) {
    c.status(403)
    return c.json({ error: "error while deleting blog" });

  }
})

app.patch('/api/v1/blog/:id', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const id = c.req.param('id')
  try {
    const userId = c.get('userId')
    const updateBlog = await prisma.post.update({
      where: {
        id: id,
        authorId: userId
      },
      data: {
        published: true
      }
    })
    return c.json({
      message: 'blog updated successfully'
    })
  } catch (error) {
    c.status(403)
    return c.json({ error: "error while updating blog" });

  }
})
export default app
