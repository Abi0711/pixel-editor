from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer, PixelArtSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note, PixelArt


class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user  # gives us the current logged in user
        return Note.objects.filter(author=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(
                author=self.request.user
            )  # Set the author to the logged-in user
        else:
            print(serializer.errors)  # Print validation errors to the console


class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [
        AllowAny
    ]  # Allow any user (authenticated or not) to access this view


class PixelArtCreate(generics.ListCreateAPIView):
    serializer_class = PixelArtSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return PixelArt.objects.filter(author=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)  # Print validation errors to the console


class PixelArtDelete(generics.DestroyAPIView):
    serializer_class = PixelArtSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return PixelArt.objects.filter(author=user)
