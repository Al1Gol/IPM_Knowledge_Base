"""
Django settings for ipm_knowledge project.

Generated by 'django-admin startproject' using Django 4.2.1.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""

import logging
import os
from datetime import timedelta
from pathlib import Path

from django.utils.log import DEFAULT_LOGGING

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "django-insecure-h@ik9e0(lv3+j#@uz+*rt*c6ysz!zd)wftn!-ji620h-=^bn@!"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False if os.getenv("DJNAGO_PRODUCTION", default=None) else True

ALLOWED_HOSTS = ["*"]

# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "django_filters",
    "corsheaders",
    "debug_toolbar",
    "authapp",
    "mainapp",
]

MIDDLEWARE = [
    "django.middleware.common.CommonMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    # request logger
    "ipm_knowledge.middleware.request_log.RequestLogMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "debug_toolbar.middleware.DebugToolbarMiddleware",
]

DJANGO_LOG_LEVEL = DEBUG

CORS_ALLOWED_ORIGINS = [
    "http://192.168.10.109:8000",
    "http://192.168.10.109:5554",
    "http://192.168.10.109:3000",
    "http://192.168.10.238:8000",
    "http://192.168.10.238:5554",
    "http://192.168.10.172:8000",
    "http://192.168.10.172:3000",
    "http://192.168.10.210:8000",
    "http://192.168.10.210:3000",
    "http://192.168.10.222:8000",
    "http://192.168.10.222:3000",
    "http://localhost:3000",
    "http://localhost:8000",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:8000",
]


DATA_UPLOAD_MAX_MEMORY = 2000000000

ROOT_URLCONF = "ipm_knowledge.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "ipm_knowledge.wsgi.application"


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "ipm_knowledge",
        "USER": "postgres",
        "PASSWORD": "123",
        "HOST": "localhost",
        "PORT": "5432",
    }
}


# Users model
AUTH_USER_MODEL = "authapp.Users"

# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = []


REST_FRAMEWORK = {
    "DATETIME_FORMAT": "%d.%m.%Y %H:%M:%S",
    "DEFAULT_RENDERER_CLASSES": [
        "rest_framework.renderers.JSONRenderer",
        "rest_framework.renderers.BrowsableAPIRenderer",
    ],
    "DEFAULT_FILTER_BACKENDS": ["django_filters.rest_framework.DjangoFilterBackend"],
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticated",
    ],
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework_simplejwt.authentication.JWTAuthentication",
        "rest_framework.authentication.SessionAuthentication",
        "rest_framework.authentication.TokenAuthentication",
    ],
}

# Время жизни токенов JWT
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(hours=12),
    "REFRESH_TOKEN_LIFETIME": timedelta(hours=12),
}


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = "ru-RU"

TIME_ZONE = "UTC"

USE_I18N = True
USE_L10N = True

USE_TZ = False


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = "static/"

# Для дебаг режима и прод режима должны отличаться переменные
if DEBUG:
    STATICFILES_DIRS = (os.path.join(BASE_DIR, "static"),)
else:
    STATIC_ROOT = os.path.join(BASE_DIR, "static")


# Media files
MEDIA_URL = "media/"

MEDIA_ROOT = f"{BASE_DIR}/../media"

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# Создание директорий и файлов для логирования
LOG_DIR = f"{BASE_DIR}/../logs/"

LOG_FILES = ["requests", "urls"]

# Проверка наличия папок и файлов логирования
if not os.path.exists(LOG_DIR):
    os.mkdir(LOG_DIR)
for FILE in LOG_FILES:
    # Проверка наличия папки для хэндлера
    if not os.path.exists(f"{LOG_DIR}{FILE}/"):
        os.mkdir(f"{LOG_DIR}{FILE}/")

# Настройки логирования

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "main_format": {
            "format": "[{asctime}]  [{levelname}]  [{module} - {message}]",
            "style": "{",
        },
    },
    "handlers": {},
    "loggers": {
        "ipm_knowledge.middleware.request_log": {
            "handlers": ["requests"],
            "level": "INFO",
        },
        "django.server": {"level": "INFO", "handlers": ["urls"]},
        "django.request": {"level": "DEBUG", "handlers": ["requests"]},
    },
}

for el in LOG_FILES:
    LOGGING["handlers"][f"{el}"] = {
        "class": "logging.handlers.TimedRotatingFileHandler",
        "formatter": "main_format",
        "filename": f"{LOG_DIR}{el}/{el}.log",
        "when": "midnight",
        "backupCount": 10,
        "delay": True,
        "encoding": "utf-8",
    }

INTERNAL_IPS = [
    "127.0.0.1",
]
