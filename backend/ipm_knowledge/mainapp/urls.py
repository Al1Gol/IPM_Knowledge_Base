from authapp.views import DepartmentsViewSet, ProfileViewSet, UsersViewSet
from django.contrib import admin
from django.urls import include, path, re_path
from mainapp.views import (
    ArticleViewSet,
    FilesViewSet,
    ImagesViewSet,
    MenuViewSet,
    SectionsViewSet,
    SubsectionsViewSet,
)
from rest_framework import routers
from rest_framework.authtoken import views
from rest_framework_simplejwt import views as jwt_views

router = routers.DefaultRouter()
router.register("roles", DepartmentsViewSet, basename="roles")  # Эндпойнт списка подразделений
router.register("users", UsersViewSet, basename="users")  # Эндпойнт вывода списка пользователей
router.register("profile", ProfileViewSet, basename="profile")  # Эндопойнт вывода прфоиля текущего пользователя
router.register("menu", MenuViewSet, basename="menu")  # Эндпойнт списка меню
router.register("sections", SectionsViewSet, basename="sections")  # Эндпойнт списка разделов
router.register("subsections", SubsectionsViewSet, basename="subsections")  # Эндпойнт списка подразделов
router.register("articles", ArticleViewSet, basename="articles")  # Эндпойнт списка статей
router.register("files", FilesViewSet, basename="files")  # Эндпойнт списка файлов статей
router.register("images", ImagesViewSet, basename="images")  # Эндпйонт для отображения изображений


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
