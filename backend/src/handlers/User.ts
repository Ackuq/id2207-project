import { User } from "../models/User";
import storage from "../storage";
import role from "../utils/role";

export const handleGetSubTeam = (userRole: role): Array<Required<User>> => {
  if (userRole === role.productionManager) {
    const subTeam = storage.users.filter(
      (user) => user.role === role.productionTeamMember
    );
    return subTeam;
  } else if (userRole === role.serviceManager) {
    const subTeam = storage.users.filter(
      (user) => user.role === role.serviceTeamMember
    );
    return subTeam;
  }

  throw { error: new Error("Not a sub team manager"), status: 403 };
};
