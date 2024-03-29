import { createSlice } from "@reduxjs/toolkit";

interface Blog {
    blog: {
        id: number;
        title: string;
        content: string;
        authorId:string
    }
}

const initialState: Blog = {
    blog: {
        id: 0,
        title: "",
        content: "",
        authorId:""   
    }
}

const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {
        setBlog: (state, action) => {
            state.blog.id = action.payload.id;
            state.blog.title = action.payload.title;
            state.blog.content = action.payload.content;
            state.blog.authorId = action.payload.authorId; 
        }
    }
});

export const { setBlog } = blogSlice.actions;

export default blogSlice.reducer;