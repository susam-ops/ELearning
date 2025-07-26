from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from .serializers import RegisterSerializer, LoginSerializer

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        # Handle field name conversion
        if 'confirmPassword' in request.data:
            request.data['confirm_password'] = request.data.pop('confirmPassword')
        
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        token = Token.objects.create(user=user)
        
        return Response({
            "user": {
                "username": user.username,
                "email": user.email
            },
            "token": token.key,
            "message": "User registered successfully"
        }, status=status.HTTP_201_CREATED)


class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = []  # Allow unauthenticated access

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        
        # Get or create token
        token, created = Token.objects.get_or_create(user=user)
        
        # Determine user role and redirect path
        if user.email.lower() == "admin@gmail.com":
            redirect_to = "admin"
        elif user.email.lower() == "teacher@gmail.com":
            redirect_to = "teacher"
        else:
            redirect_to = "user"
        
        return Response({
            "token": token.key,
            "user": {
                "username": user.username,
                "email": user.email,
            },
            "redirect_to": redirect_to,  # Add this field
            "message": "Login successful"
        }, status=status.HTTP_200_OK)