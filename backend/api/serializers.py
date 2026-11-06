from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note, PixelArt

# django handles all database


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {
            "password": {"write_only": True}
        }  # no one can read what the password is

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "title", "content", "created_at", "author"]
        extra_kwargs = {
            "author": {"read_only": True}
        }  # author is read-only, set automatically to the logged-in user


class PixelArtSerializer(serializers.ModelSerializer):
    class Meta:
        model = PixelArt
        fields = ["id", "title", "size", "pixels", "created_at", "updated_at", "artist"]
        extra_kwargs = {
            "author": {"read_only": True}
        }  # author is read-only, set automatically to the logged-in user

    def validate(self, data):
        size = data.get("size", getattr(self.instance, "size", 16))
        pixels = data.get("pixels", getattr(self.instance, "pixels", []))

        expected = size * size
        if len(pixels) != expected:
            raise serializers.ValidationError(
                {
                    "pixels": f"Payload contains {len(pixels)} elements, but size {size}x{size} requires {expected}."
                }
            )
        return data
