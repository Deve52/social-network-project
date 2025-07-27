
import { decreementLike, increementLike} from "../DAO/post.dao.js";

import eventEmitter from "../utils/listener.js";

eventEmitter.on("liked", async (id) => { //here id is post._id

    return await increementLike(id)

})

eventEmitter.on("disliked", async (id) => { //here id is post._id

    return await decreementLike(id)

})

