from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import routers
from mainapp.views import MenuViewSet, SectionsViewSet, ArticleViewSet
from authapp.views import RolesViewSet, UsersViewSet
from rest_framework.authtoken import views
from rest_framework_simplejwt import views as jwt_views

router = routers.DefaultRouter()
router.register('roles', RolesViewSet, basename='roles')
router.register('users', UsersViewSet, basename='users')
router.register('menu', MenuViewSet, basename='menu')
router.register('sections', SectionsViewSet, basename='sections')
router.register('articles', ArticleViewSet, basename='articles')




urlpatterns = [
    path('api/v1/', include(router.urls)),
    path('api/v1/auth/', include('rest_framework.urls')),
    path('api/v1/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/v1/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
]