import { Injectable } from "@angular/core";
import { Adapter } from "src/app/core/adaptor/adaptor";
import { NewUser, User } from "src/app/shared/models/user.model";

@Injectable()

export class allUserAdaptor implements Adapter<NewUser[]>{

    public toResponse(item: User[]): any[] {
        item.map((data: User) => {
            const fullName: string = data.first_name + ' ' + data.last_name

            const user: NewUser = new NewUser(
                data._id,
                data.first_name,
                data.last_name,
                fullName,
                data.email,
                data.admin,
                data.timezone,
                data.country,
                data.language,
                data.chats,
                data.passwordChangedAt,
                data._v
            )
            data = user
            return data
        });
        return item
    }
}