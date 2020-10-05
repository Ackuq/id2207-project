/* eslint-disable @typescript-eslint/no-unused-vars */
import role from "../utils/role";
import * as helpers from "../../tests/helpers";
import { handleCreateEventProject } from "../handlers/EventProject";

export default (): void => {
  const _customerService = helpers.createUser(role.customerService);
  const _seniorCustomerService = helpers.createUser(role.seniorCustomerService);
  const _administrationManager = helpers.createUser(role.administrationManager);
  const _HR = helpers.createUser(role.HR);
  const _financialManager = helpers.createUser(role.financialManager);
  const _productionManager = helpers.createUser(role.productionManager);
  const _productionTeamMember = helpers.createUser(role.productionTeamMember);
  const _serviceManager = helpers.createUser(role.serviceManager);
  const _serviceTeamMember = helpers.createUser(role.serviceTeamMember);

  const _eventRequest = helpers.createEventRequest(_customerService);

  const _project = helpers.createProject();
};
