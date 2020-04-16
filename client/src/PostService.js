import axios from 'axios';


const url = '/api/v1/posts';

class PostService {

    //GetAll
    static getPosts() {
        return new Promise((resolve, reject) => {
            axios.get(url)
                .catch((err) => { reject(err) })
                .then((res) => {
                    const data = res.data;
                    resolve(
                        data.map(post => ({
                            ...post,
                            createdAt: new Date(post.createdAt)
                        }))
                    );
                });
        });
    }


    // Add Post
    static insertPost(text) {
        return axios.post(url, { text });
    }

    static deletePost(id) {
        return axios.delete(`${url}/${id}`);
    }
}

export default PostService;