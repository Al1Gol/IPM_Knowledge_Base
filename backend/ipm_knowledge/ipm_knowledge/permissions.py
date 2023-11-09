from rest_framework import permissions


class ModerateCreateAndUpdateOrAdminOrAuthReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.is_authenticated and request.user and request.user.is_staff:
            return True
        elif (
            request.user.is_authenticated
            and request.user
            and request.method in ["PUT", "PUTCH", "CREATE"]
            and request.user.is_moderate
        ):
            return True
        return bool(request.user.is_authenticated and request.method in permissions.SAFE_METHODS)


class AdminUserOrAuthReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.is_authenticated and request.user and request.user.is_staff:
            return True
        return bool(request.user.is_authenticated and request.method in permissions.SAFE_METHODS)
