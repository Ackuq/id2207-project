import { User } from "../models/User";
import storage from "../storage";
import role from "../utils/role";

export const handleGetSubTeam = (user: User): Array<Required<User>> => {
  if (user.role === role.productionManager) {
    const subTeam = Object.values(storage.users).filter(
      (user) => user.role === role.productionTeamMember
    );
    return subTeam;
  } else if (user.role === role.serviceManager) {
    const subTeam = Object.values(storage.users).filter(
      (user) => user.role === role.serviceTeamMember
    );
    return subTeam;
  }

  throw { error: new Error("Not a sub team manager"), status: 403 };
};
