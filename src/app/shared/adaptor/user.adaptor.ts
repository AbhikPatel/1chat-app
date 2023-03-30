import { Injectable } from "@angular/core";
import { Adapter } from "src/app/core/adaptor/adaptor";
import { NewUser, User } from "../models/user.model";

@Injectable()
export class userAdaptor implements Adapter<NewUser>{

    public toResponse(item: User): NewUser {
        const fullName = item.first_name + ' ' + item.last_name
        const user:NewUser = new NewUser(
            item._id,
            item.first_name,
            item.last_name,
            fullName,
            item.email,
            item.admin,
            item.timezone,
            item.country,
            item.language,
            item.chats,
            item.passwordChangedAt,
            item._v,
            item.photo
        )
        return user
    }
}