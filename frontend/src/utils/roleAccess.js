const organizerOnly = ["organizer"];

const allRoles = ["organizer", "admin", "owner"];

export const accessCategories = {
  lihat: organizerOnly,
  tambah: organizerOnly,
  edit: organizerOnly,
  hapus: organizerOnly,
};

export const accessTalents = accessCategories;

export const accessEvents = accessCategories;

export const accessParticipant = accessCategories;

export const accessPayments = accessCategories;

export const accessOrders = {
  lihat: allRoles,
  tambah: allRoles,
  edit: allRoles,
  hapus: allRoles,
};

export default function hasRole({ roles, role }) {
  return roles.includes(role);
}
