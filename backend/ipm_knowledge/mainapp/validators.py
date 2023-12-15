import os
import xml.etree.cElementTree as et

from django.core.exceptions import ValidationError


# Более точный валидатор svg. Не работает из-за with open
# Проверка на SVG
def is_svg(filename):
    tag = None
    with open(filename, "r") as f:
        try:
            for event, el in et.iterparse(f, ("start",)):
                tag = el.tag
                break
        except et.ParseError:
            pass
    return tag == "{http://www.w3.org/2000/svg}svg"


def validate_svg(file):
    if not is_svg(file):
        raise ValidationError("Файл не является svg")


# Рабочий валидатор. Проверяет только расширение файла
def validate_file_extension(value):
    ext = os.path.splitext(value.name)[1]  # [0] returns path+filename
    valid_extensions = [".svg"]
    if not ext.lower() in valid_extensions:
        raise ValidationError("Поддеживается загрузка только svg файлов")


# Валидации родителя статьи
def validate(data):
    errors = []
    if "contact_phone" not in data:
        errors.append("Contact phone field is required.")

    if "ticket_type" not in data:
        errors.append("Ticket type field is required.")
    # TODO check if ticket_type is one of available choices

    if errors:
        raise ValidationError(errors)
