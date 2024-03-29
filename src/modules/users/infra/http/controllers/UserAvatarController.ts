import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { instanceToInstance } from 'class-transformer'

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService'

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateuserAvatar = container.resolve(UpdateUserAvatarService)
    const user = await updateuserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    })

    delete user.password

    return response.json(instanceToInstance(user))
  }
}
