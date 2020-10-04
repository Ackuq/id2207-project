import {
  EventProject,
  EventRequest,
  EventRequestArguments,
  requestStatus,
} from "../models/event";
import storage from "../storage";

import role from "../utils/role";
import { handleCreateEventProject } from "./eventProject";

export const handleDeleteEventRequest = (
  userRole: role,
  userId: string,
  eventId: number
): EventRequest[] => {
  const eventRequest = storage.eventRequests.find((e) => e.id === eventId);

  if (!eventRequest) {
    throw { error: new Error("Event request not found"), status: 404 };
  }

  if (userRole === role.customerService || eventRequest.reporter === userId) {
    storage.eventRequests.filter((e) => e.id !== eventId);
    return storage.eventRequests;
  } else {
    throw { error: new Error("Insufficient access"), status: 403 };
  }
};

export const handleEditEventRequest = (
  userRole: role,
  userId: string,
  eventId: number,
  newValues: Partial<EventRequest>
): EventRequest => {
  const eventRequest = storage.eventRequests.find((e) => e.id === eventId);
  if (eventRequest) {
    if (
      userRole === role.seniorCustomerService ||
      userRole === role.administrationManager ||
      userRole === role.financialManager ||
      eventRequest.reporter === userId
    ) {
      if (
        newValues.budgetApproved !== undefined &&
        newValues.budgetApproved !== eventRequest.budgetApproved &&
        userRole !== role.financialManager
      ) {
        throw {
          error: new Error("Only financial manager can approve budget"),
          status: 403,
        };
      }

      if (
        newValues.status &&
        newValues.status !== eventRequest.status &&
        userRole !== role.administrationManager
      ) {
        throw {
          error: new Error("Only administration manager can change status"),
          status: 403,
        };
      }

      const index = storage.eventRequests.findIndex((e) => e.id === eventId);
      const newEventRequest = { ...eventRequest, ...newValues };
      if (newEventRequest.status === requestStatus.approved) {
        if (!newEventRequest.budgetApproved) {
          throw {
            error: new Error("Cannot approve if budget is not approved"),
            status: 400,
          };
        }
        // Create a new event project if it becomes approved
        handleCreateEventProject(newEventRequest);
      }

      // Archive if cancelled or approved
      if (
        newEventRequest.status === requestStatus.approved ||
        newEventRequest.status === requestStatus.cancelled
      ) {
        newEventRequest.archived = true;
      }

      storage.eventRequests[index] = newEventRequest;

      return newEventRequest;
    } else {
      throw {
        error: new Error("Insufficient access"),
        status: 403,
      };
    }
  } else {
    throw {
      error: new Error("Event request not found"),
      status: 400,
    };
  }
};

export const handleCreateEventRequest = (
  values: EventRequestArguments
): EventRequest => {
  try {
    const eventRequest = new EventRequest(values);
    storage.eventRequests.push(eventRequest);
    return eventRequest;
  } catch (e) {
    throw { error: e, status: 400 };
  }
};

export const handleGetEventRequests = (
  userRole: role,
  userId: string
): Array<EventRequest> => {
  if (
    userRole === role.seniorCustomerService ||
    userRole === role.financialManager ||
    userRole === role.administrationManager
  ) {
    return storage.eventRequests;
  } else if (userRole === role.customerService) {
    const eventRequests = storage.eventRequests.filter(
      (e) => e.reporter === userId
    );
    return eventRequests;
  } else {
    throw { error: new Error("Insufficient access"), status: 403 };
  }
};

export const handleGetEventRequest = (
  eventId: number,
  userRole: role,
  userId: string
): EventRequest => {
  const eventRequest = storage.eventRequests.find((e) => e.id === eventId);
  if (eventRequest) {
    if (
      userRole === role.seniorCustomerService ||
      userRole === role.financialManager ||
      userRole === role.administrationManager
    )
      return eventRequest;
    else if (userRole === role.customerService) {
      if (eventRequest.reporter === userId) {
        return eventRequest;
      }
    }
    throw { error: new Error("Insufficient access"), status: 403 };
  } else {
    throw { error: new Error("Event request not found"), status: 404 };
  }
};
