module.exports = class RoleHelper {
    constructor(ownerId, allowedRoleIds, allowedPermissionNames) {
        this.ownerId = ownerId;
        this.allowedRoleIds = allowedRoleIds;
        this.allowedPermissionNames = allowedPermissionNames;
    }

    canAdministrate(member) {
        let canAdmin = false;
        
        if (this.ownerId && member.id === this.ownerId) {
            canAdmin = true;
        }

        if (this.allowedRoleIds && this.allowedRoleIds.length > 0) {
            this.allowedRoleIds.forEach(roleId => {
                if (member.roles.includes(roleId)) {
                    canAdmin = true;
                }
            });
        }

        if (this.allowedPermissionNames && this.allowedPermissionNames.length > 0) {
            this.allowedPermissionNames.forEach(permissionName => {
                if (member.permission.has(permissionName)) {
                    canAdmin = true;
                }
            });
        }
        return canAdmin;
    }
}
