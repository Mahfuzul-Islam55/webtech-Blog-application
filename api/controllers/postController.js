const {
    createPost,
    getPostById,
    getAllPostBlog,
    updatePost,
    deleteBlog,
    getPostByUsername
} = require('../services/postService');


function base64decode(base64string) {
    let bufferObj = Buffer.from(base64string, "base64")
    let string = bufferObj.toString("utf8")

    return string
}

module.exports = {
    CreatePostByUser: (req, res) => {
        const body = req.body;
        body.user_id = req.userId;
        const check = req.headers.authorization.split(' ')[1].split('.')[1];
        const data = JSON.parse(base64decode(check));
        body.user_id = data.result.id;
        console.log(body.user_id);
        console.log(data.result.id);
        createPost(body, (error, result) => {
            if (error) {
                console.log(error);
                return res.status(500).json({message: "Blog post Creation failed."});
            }
            return res.status(201).json({message: "Successfully Created blog post", data: result})
        })
    },
    getPostByUser: (req, res) => {
        const check = req.headers.authorization.split(' ')[1].split('.')[1];
        const data = JSON.parse(base64decode(check));
        const id = data.result.id;
        getPostById(id, (error, result) => {
            if (error) {
                console.log(error);
                return res.status(500).json({message: error});
            }
            if (!result) {
                return res.json({message: "Data not found"});
            }
            return res.status(200).json({message: "Successfully get  all posts by a  specific user.", data: result})
        })
    },
    getPostByUserName: (req, res) => {
        getPostByUsername(req.params.username, (error, result) => {
            if (error) {
                console.log(error);
                return res.status(500).json({message: error});
            }
            if (!result) {
                return res.status(404).json({message: "Data not found"});
            }
            return res.status(200).json({message: "Successfully get  all posts by a  specific user.", data: result})
        })
    },
    getAllPost: (req, res) => {
        getAllPostBlog((error, result) => {
            if (error) {
                console.log(error);
                return res.status(500).json({message: error});
            }
            if (!result) {
                return res.json({message: "Data not found"});
            }
            return res.status(200).json({message: "Successfully get  all services", data: result})
        })
    },
    updateBlogPost: (req, res) => {
        const id = req.params.id;
        const body = req.body;
        const check = req.headers.authorization.split(' ')[1].split('.')[1];
        const data = JSON.parse(base64decode(check));
        body.user_id = data.result.id;
        body.id = id;

        updatePost(body, (error, result) => {
            if (error) {
                console.log(error);
                return res.status(500).json({message: "Database connection failed."});
            }
            return res.status(200).json({message: "Successfully Updated User blog post", data: result})
        })
    },
    deleteBlogPost: (req, res) => {
        const id = req.params.id;
        const body = req.body;
        const check = req.headers.authorization.split(' ')[1].split('.')[1];
        const data = JSON.parse(base64decode(check));
        body.user_id = data.result.id;
        body.id = id;
        deleteBlog(body, (error, result) => {
            if (error) {
                console.log(error);
                return res.status(500).json({message: error});
            }
            return res.status(200).json({message: "Successfully Delete Blog"})
        })
    },


}