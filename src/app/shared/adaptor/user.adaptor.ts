import { Injectable } from "@angular/core";
import { Adapter } from "src/app/core/adaptor/adaptor";
import { environment } from "src/environments/environment";
import { User, UserResponse } from "../models/user.model";

@Injectable()
export class userAdaptor implements Adapter<User>{

    public toResponse(item: UserResponse): User {
        const fullName:string = item.first_name + ' ' + item.last_name;
        const profile:string = environment.imageUrl + item.photo;

        const user:User = new User(
            item._id,
            item.first_name,
            item.last_name,
            fullName,
            item.email,
            item.chats,
            profile,
            item.role,
        )
        return user
    }
}