from django.urls import path
from .views import UserCreate, LoginView, upload_image, get_user_images, delete_image, update_image_label
urlpatterns = [
    path('api/register/', UserCreate.as_view(), name='account-create'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/upload/', upload_image, name='upload-image'),
    path('api/user-images/', get_user_images, name='user-images'),
    path('api/delete-image/<int:image_id>/', delete_image, name='delete-image'),
    path('api/update-image-label/<int:image_id>/', update_image_label, name='update-image-label'),
]
