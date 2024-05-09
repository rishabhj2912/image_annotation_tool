from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.core.files.storage import FileSystemStorage
from django.shortcuts import get_object_or_404
from rest_framework import status, views
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from .models import Image
from .serializers import ImageSerializer, UserSerializer






class UserCreate(views.APIView):
    permission_classes = (AllowAny,)

    def post(self, request, format='json'):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                token, _ = Token.objects.get_or_create(user=user)  # Changed here to handle existing tokens
                json = serializer.data
                json['token'] = token.key
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(views.APIView):
    permission_classes = (AllowAny,)

    def post(self, request,):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)
        if user:
            return Response({'token': user.auth_token.key}, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_401_UNAUTHORIZED)

@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_image(request):
    if 'image_files' in request.FILES:
        images = []
        for file in request.FILES.getlist('image_files'):
            image = Image.objects.create(owner=request.user, image_file=file)
            if request.data.get('label'):
                image.label = request.data.get('label')
                image.status = 'annotated'
                image.save()
            images.append(image)
        return Response({'message': 'Images uploaded successfully!'})
    return Response({'error': 'No files provided'}, status=400)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_images(request):
    search_query = request.query_params.get('search', None)
    images = Image.objects.filter(owner=request.user)
    if search_query:
        images = images.filter(label__icontains=search_query)
    serializer = ImageSerializer(images, many=True)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_image(request, image_id):
    image = get_object_or_404(Image, id=image_id, owner=request.user)
    image.delete()
    return Response({'message': 'Image deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_image_label(request, image_id):
    image = get_object_or_404(Image, id=image_id, owner=request.user)
    label = request.data.get('label')
    if label:
        image.label = label
        image.save()
        return Response({'message': 'Label updated successfully!'}, status=status.HTTP_200_OK)
    return Response({'error': 'Label is required'}, status=status.HTTP_400_BAD_REQUEST)