from authapp.views import DepartamentViewSet, UsersViewSet
from django.contrib import admin
from django.urls import include, path, re_path
from mainapp.views import (
    ArticleViewSet,
    FilesViewSet,
    ImagesViewSet,
    MenuViewSet,
    SectionsViewSet,
)
from rest_framework import routers
from rest_framework.authtoken import views
from rest_framework_simplejwt import views as jwt_views

router = routers.DefaultRouter()
router.register("roles", DepartamentViewSet, basename="roles")
router.register("users", UsersViewSet, basename="users")
router.register("menu", MenuViewSet, basename="menu")
router.register("sections", SectionsViewSet, basename="sections")
router.register("articles", ArticleViewSet, basename="articles")
router.register("files", FilesViewSet, basename="files")
router.register("images", ImagesViewSet, basename="images")


urlpatterns = [
    path("api/v1/", include(router.urls)),
    path("api/v1/auth/", include("rest_framework.urls")),
    path(
        "api/v1/token/",
        jwt_views.TokenObtainPairView.as_view(),
        name="token_obtain_pair",
    ),
    path(
        "api/v1/token/refresh/",
        jwt_views.TokenRefreshView.as_view(),
        name="token_refresh",
    ),
]
