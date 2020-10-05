import {
  EventRequest,
  EventRequestArguments,
  requestStatus,
} from "../models/Event";
import { User } from "../models/User";
import storage from "../storage";

import role from "../utils/role";
import { handleCreateEventProject } from "./EventProject";

export const handleDeleteEventRequest = (
  user: Required<User>,
  eventId: number
): EventRequest[] => {
  const eventRequest = storage.eventRequests[eventId];

  if (!eventRequest) {
    throw { error: new Error("Event request not found"), status: 404 };
  }

  if (user.role === role.customerService || eventRequest.reporter === user.id) {
    delete storage.eventRequests[eventId];
    return Object.values(storage.eventRequests);
  } else {
    throw { error: new Error("Insufficient access"), status: 403 };
  }
};

export const handleEditEventRequest = (
  user: Required<User>,
  eventId: number,
  newValues: Partial<EventRequest>
): EventRequest => {
  const eventRequest = storage.eventRequests[eventId];
  if (eventRequest) {
    if (
      user.role === role.seniorCustomerService ||
      user.role === role.administrationManager ||
      user.role === role.financialManager ||
      eventRequest.reporter === user.id
    ) {
      if (
        newValues.budgetApproved !== undefined &&
        newValues.budgetApproved !== eventRequest.budgetApproved &&
        user.role !== role.financialManager
      ) {
        throw {
          error: new Error("Only financial manager can approve budget"),
          status: 403,
        };
      }

      if (
        newValues.status !== undefined &&
        newValues.status !== eventRequest.status &&
        user.role !== role.administrationManager
      ) {
        throw {
          error: new Error("Only administration manager can change status"),
          status: 403,
        };
      }

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

      storage.eventRequests[eventId] = newEventRequest;

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
    storage.eventRequests[eventRequest.id] = eventRequest;
    return eventRequest;
  } catch (e) {
    throw { error: e, status: 400 };
  }
};

export const handleGetEventRequests = (
  user: Required<User>
): Array<EventRequest> => {
  if (
    user.role === role.seniorCustomerService ||
    user.role === role.financialManager ||
    user.role === role.administrationManager
  ) {
    return Object.values(storage.eventRequests);
  } else if (user.role === role.customerService) {
    const eventRequests = Object.values(storage.eventRequests).filter(
      (e) => e.reporter === user.id
    );
    return eventRequests;
  } else {
    throw { error: new Error("Insufficient access"), status: 403 };
  }
};

export const handleGetEventRequest = (
  user: Required<User>,
  eventId: number
): EventRequest => {
  const eventRequest = storage.eventRequests[eventId];
  if (eventRequest) {
    if (
      user.role === role.seniorCustomerService ||
      user.role === role.financialManager ||
      user.role === role.administrationManager
    )
      return eventRequest;
    else if (user.role === role.customerService) {
      if (eventRequest.reporter === user.id) {
        return eventRequest;
      }
    }
    throw { error: new Error("Insufficient access"), status: 403 };
  } else {
    throw { error: new Error("Event request not found"), status: 404 };
  }
};
