from authapp.views import DepartmentsViewSet, ProfileViewSet, UsersViewSet
from django.contrib import admin
from django.urls import include, path, re_path
from mainapp.views import (
    ArticleViewSet,
    FilesViewSet,
    ImagesViewSet,
    MenuViewSet,
    SectionsViewSet,
    VideosViewSet,
)
from rest_framework import routers
from rest_framework.authtoken import views
from rest_framework_simplejwt import views as jwt_views

router = routers.DefaultRouter()
router.register("departmens", DepartmentsViewSet, basename="departmens")
router.register("users", UsersViewSet, basename="users")
router.register("profile", ProfileViewSet, basename="profile")
router.register("menu", MenuViewSet, basename="menu")
router.register("sections", SectionsViewSet, basename="sections")
router.register("articles", ArticleViewSet, basename="articles")
router.register("files", FilesViewSet, basename="files")
router.register("images", ImagesViewSet, basename="images")
router.register("videos", ImagesViewSet, basename="videos")


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
